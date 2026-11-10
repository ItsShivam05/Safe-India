import type { AwarenessGuide, EmergencyScenario, OfficialResource } from '../types';
import { absoluteUrl, awarenessPath, scenarioPath, TAB_PATHS } from '../data/site';
import { pickText, type Lang } from '../i18n/language';

const SHARED_STEP_COUNT = 3;

const LABELS = {
  en: { whatToDo: 'what to do', call: 'Call', fullGuide: 'Full guide', moreHelplines: 'More helplines' },
  hi: { whatToDo: 'क्या करें', call: 'कॉल करें', fullGuide: 'पूरी गाइड', moreHelplines: 'और हेल्पलाइन' },
};

const numberedSteps = (steps: string[]) =>
  steps.slice(0, SHARED_STEP_COUNT).map((step, idx) => `${idx + 1}. ${step}`);

/**
 * Includes the key steps as well as the link, so the message still helps
 * someone with a weak signal. Never add the user's location or personal details here.
 */
export function buildScenarioShareMessage(scenario: EmergencyScenario, lang: Lang = 'en'): string {
  const label = LABELS[lang];
  const lines = [`🚨 *${pickText(scenario.title, lang)}: ${label.whatToDo}*`, ''];

  if (scenario.immediateCallNumber) {
    lines.push(`📞 ${label.call} ${scenario.immediateCallNumber}`, '');
  }

  const doNow = pickText(scenario.doNow, lang);
  const dont = pickText(scenario.dont, lang);
  lines.push(...numberedSteps(doNow));
  if (dont[0]) lines.push('', `⚠️ ${dont[0]}`);

  lines.push('', `${label.fullGuide}: ${absoluteUrl(scenarioPath(scenario.id))}`);
  return lines.join('\n');
}

export function buildAwarenessShareMessage(guide: AwarenessGuide, lang: Lang = 'en'): string {
  return [
    `🛡️ *${pickText(guide.title, lang)}*`,
    pickText(guide.summary, lang),
    '',
    ...numberedSteps(pickText(guide.doList, lang)),
    '',
    `${LABELS[lang].fullGuide}: ${absoluteUrl(awarenessPath(guide.id))}`,
  ].join('\n');
}

export function buildHelplineShareMessage(resource: OfficialResource, lang: Lang = 'en'): string {
  return [
    `📞 *${pickText(resource.name, lang)}: ${resource.phone}*`,
    pickText(resource.purpose, lang),
    '',
    `${LABELS[lang].moreHelplines}: ${absoluteUrl(TAB_PATHS.resources)}`,
  ].join('\n');
}

/**
 * No phone number in the link, so WhatsApp asks which friends or groups to send it to.
 */
export function getWhatsAppShareUrl(message: string): string {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}
