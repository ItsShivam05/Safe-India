// Saves small things (SOS contacts, medical ID) on this device only. Storage can be
// unavailable in private browsing, so failures fall back quietly instead of breaking the page.

export function loadSaved<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function save(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function forget(key: string) {
  try {
    localStorage.removeItem(key);
  } catch {
    // Nothing saved, nothing to remove
  }
}
