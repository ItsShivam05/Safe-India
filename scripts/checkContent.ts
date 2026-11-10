import type { Plugin } from 'vite';
import { emergencyScenarios } from '../src/data/emergencies.ts';
import { awarenessGuides } from '../src/data/awareness.ts';
import { officialResources } from '../src/data/resources.ts';

export interface ContentReport {
  errors: string[];
  warnings: string[];
}

const DIALABLE = /^\d{3,15}$/;
const DIALABLE_WITH_SPACES = /^\d[\d ]{1,18}\d$/;

// Numbers a guide may tell people to call, besides the ones in our helpline lists.
const EXTRA_KNOWN_NUMBERS = ['100'];

/**
 * Checks the guide and helpline data for mistakes that would break the site or mislead
 * someone in an emergency. Errors stop the build, so a broken guide can never be deployed.
 */
export function checkContent(): ContentReport {
  const errors: string[] = [];
  const warnings: string[] = [];

  const checkUnique = (kind: string, ids: string[]) => {
    const seen = new Set<string>();
    for (const id of ids) {
      if (seen.has(id)) errors.push(`${kind}: id "${id}" is used more than once`);
      seen.add(id);
    }
  };
  checkUnique('Emergency guide', emergencyScenarios.map((sc) => sc.id));
  checkUnique('Awareness guide', awarenessGuides.map((g) => g.id));
  checkUnique('Helpline', officialResources.map((r) => r.id));

  const checkUrl = (where: string, url: string | undefined) => {
    if (url !== undefined && !/^https:\/\/[^\s]+$/.test(url)) errors.push(`${where}: link "${url}" must start with https://`);
  };

  // Translations must line up step for step, or Hindi readers would get different advice
  const checkSteps = (where: string, steps: { en: string[]; hi?: string[] }, required: boolean) => {
    if (required && steps.en.length === 0) errors.push(`${where}: has no steps`);
    if (steps.hi && steps.hi.length !== steps.en.length) {
      errors.push(`${where}: has ${steps.en.length} English steps but ${steps.hi.length} Hindi steps`);
    }
  };

  const knownNumbers = new Set<string>(EXTRA_KNOWN_NUMBERS);
  for (const res of officialResources) {
    const where = `Helpline "${res.name.en}"`;
    if (!DIALABLE.test(res.phone)) errors.push(`${where}: phone "${res.phone}" is not a dialable number`);
    if (res.alternatePhone !== undefined && !DIALABLE_WITH_SPACES.test(res.alternatePhone)) {
      errors.push(`${where}: alternate phone "${res.alternatePhone}" is not a dialable number`);
    }
    checkUrl(where, res.website);
    knownNumbers.add(res.phone);
    if (res.alternatePhone) knownNumbers.add(res.alternatePhone.replace(/ /g, ''));
  }

  for (const sc of emergencyScenarios) {
    const where = `Emergency guide "${sc.id}"`;
    if (sc.immediateCallNumber !== undefined && !DIALABLE.test(sc.immediateCallNumber)) {
      errors.push(`${where}: call number "${sc.immediateCallNumber}" is not a dialable number`);
    }
    for (const ref of sc.resources) {
      if (!ref.phone && !ref.url) errors.push(`${where}: helpline "${ref.name}" has neither a phone number nor a link`);
      if (ref.phone !== undefined && !DIALABLE.test(ref.phone)) {
        errors.push(`${where}: helpline "${ref.name}" phone "${ref.phone}" is not a dialable number`);
      }
      checkUrl(`${where}, helpline "${ref.name}"`, ref.url);
      if (ref.phone) knownNumbers.add(ref.phone);
    }
    if (sc.immediateCallNumber) knownNumbers.add(sc.immediateCallNumber);
    checkSteps(`${where}, "do now"`, sc.doNow, true);
    checkSteps(`${where}, "don't"`, sc.dont, true);
    checkSteps(`${where}, "after"`, sc.afterDanger, true);
    if (!sc.source.name) errors.push(`${where}: has no source`);
    checkUrl(`${where}, source`, sc.source.url);
    if (!sc.source.url) warnings.push(`${where}: source "${sc.source.name}" has no link`);
  }

  for (const guide of awarenessGuides) {
    const where = `Awareness guide "${guide.id}"`;
    checkSteps(`${where}, "do"`, guide.doList, true);
    checkSteps(`${where}, "don't"`, guide.dontList, true);
    if (guide.checklist) checkSteps(`${where}, checklist`, guide.checklist, false);
    checkUrl(`${where}, source`, guide.source.url);
    if (!guide.source.url) warnings.push(`${where}: source "${guide.source.name}" has no link`);
  }

  // A number someone is told to call must be one we list, so a typo can't send people to a wrong line
  const allText = [
    ...emergencyScenarios.flatMap((sc) => [sc.immediateActionText?.en ?? '', ...sc.doNow.en, ...sc.dont.en, ...sc.afterDanger.en]),
    ...awarenessGuides.flatMap((g) => [g.summary.en, ...g.doList.en, ...g.dontList.en, ...(g.checklist?.en ?? [])]),
  ];
  for (const text of allText) {
    for (const match of text.matchAll(/\b(?:call|dial|helpline|phone)\b[^.!?]{0,40}/gi)) {
      for (const num of match[0].match(/\b\d{3,5}\b/g) ?? []) {
        if (!knownNumbers.has(num)) errors.push(`Unknown number ${num} in: "${text}"`);
      }
    }
  }

  return { errors, warnings };
}

/**
 * Runs the content check at the start of every production build, including on Vercel.
 */
export function contentCheck(): Plugin {
  return {
    name: 'safeindia-content-check',
    apply: 'build',
    buildStart() {
      const { errors, warnings } = checkContent();
      if (warnings.length > 0) {
        this.warn(`Content check: ${warnings.length} guides have no source link, e.g. ${warnings[0]}`);
      }
      if (errors.length > 0) {
        this.error(`Content check found ${errors.length} problem(s):\n- ${errors.join('\n- ')}`);
      }
    },
  };
}
