import type { LocationCoordinates } from '../types';
import { fill } from '../i18n/language';
import type { Strings } from '../data/locales';

export interface SosContact {
  name: string;
  phone: string; // Stored in international form, e.g. +919876543210
}

export const SOS_CONTACTS_KEY = 'safeindia-sos-contacts';

/**
 * Turns what someone typed into an international number, or null if it isn't a usable mobile number.
 * Indian numbers can be typed with or without +91 or a leading 0.
 */
export function normalizeMobile(input: string): string | null {
  const trimmed = input.trim();
  const digits = trimmed.replace(/\D/g, '');

  if (trimmed.startsWith('+')) {
    if (digits.startsWith('91')) return /^91[6-9]\d{9}$/.test(digits) ? `+${digits}` : null;
    return digits.length >= 8 && digits.length <= 15 ? `+${digits}` : null;
  }
  const local = digits.length === 12 && digits.startsWith('91') ? digits.slice(2) : digits.length === 11 && digits.startsWith('0') ? digits.slice(1) : digits;
  return /^[6-9]\d{9}$/.test(local) ? `+91${local}` : null;
}

export const mapsLink = (lat: number, lon: number) => `https://maps.google.com/?q=${lat.toFixed(6)},${lon.toFixed(6)}`;

export function buildSosMessage(t: Strings, location: LocationCoordinates | null, time: string): string {
  const lines = [t.sos.messageHelp];
  if (location) {
    lines.push(fill(t.sos.messageLocation, { url: mapsLink(location.lat, location.lon), m: location.accuracyMeters ?? '?' }));
  } else {
    lines.push(t.sos.messageNoLocation);
  }
  lines.push(fill(t.sos.messageTime, { time }));
  return lines.join('\n');
}

/** WhatsApp chat with one contact, with the message already typed. */
export const whatsAppTo = (phone: string, message: string) =>
  `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;

/** One SMS to several people. iPhones and Android phones expect different link formats. */
export function smsTo(phones: string[], message: string): string {
  const body = encodeURIComponent(message);
  const isApple = /iPhone|iPad|iPod/.test(navigator.userAgent);
  return isApple ? `sms:/open?addresses=${phones.join(',')}&body=${body}` : `sms:${phones.join(',')}?body=${body}`;
}
