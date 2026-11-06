import type { AwarenessGuide, EmergencyScenario, OfficialResource } from '../types';
import { absoluteUrl, awarenessPath, scenarioPath, TAB_PATHS } from '../data/site';

const SHARED_STEP_COUNT = 3;

const numberedSteps = (steps: string[]) =>
  steps.slice(0, SHARED_STEP_COUNT).map((step, idx) => `${idx + 1}. ${step}`);

/**
 * Includes the key steps as well as the link, so the message still helps
 * someone with a weak signal. Never add the user's location or personal details here.
 */
export function buildScenarioShareMessage(scenario: EmergencyScenario): string {
  const lines = [`🚨 *${scenario.title.en}: what to do*`, ''];

  if (scenario.immediateCallNumber) {
    lines.push(`📞 Call ${scenario.immediateCallNumber}`, '');
  }

  lines.push(...numberedSteps(scenario.doNow.en));

  if (scenario.dont.en[0]) {
    lines.push('', `⚠️ ${scenario.dont.en[0]}`);
  }

  lines.push('', `Full guide: ${absoluteUrl(scenarioPath(scenario.id))}`);
  return lines.join('\n');
}

export function buildAwarenessShareMessage(guide: AwarenessGuide): string {
  return [
    `🛡️ *${guide.title.en}*`,
    guide.summary.en,
    '',
    ...numberedSteps(guide.doList.en),
    '',
    `Full guide: ${absoluteUrl(awarenessPath(guide.id))}`,
  ].join('\n');
}

export function buildHelplineShareMessage(resource: OfficialResource): string {
  return [
    `📞 *${resource.name.en}: ${resource.phone}*`,
    resource.purpose.en,
    '',
    `More helplines: ${absoluteUrl(TAB_PATHS.resources)}`,
  ].join('\n');
}

/**
 * No phone number in the link, so WhatsApp asks which friends or groups to send it to.
 */
export function getWhatsAppShareUrl(message: string): string {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}
