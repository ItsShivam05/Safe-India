import { useCallback, useEffect, useState } from 'react';
import type { Lang } from '../i18n/language';

/**
 * Reads text aloud with the phone's built-in voice, so someone can follow a guide with their hands busy.
 * Stops when the page closes. `supported` is false on browsers without speech.
 */
export function useSpeech(lang: Lang) {
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const [speaking, setSpeaking] = useState(false);

  const stop = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [supported]);

  const speak = useCallback(
    (parts: string[]) => {
      if (!supported) return;
      window.speechSynthesis.cancel();
      const utterances = parts.filter(Boolean).map((text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
        utterance.rate = 0.95;
        return utterance;
      });
      if (utterances.length === 0) return;
      utterances[utterances.length - 1].onend = () => setSpeaking(false);
      utterances.forEach((u) => window.speechSynthesis.speak(u));
      setSpeaking(true);
    },
    [lang, supported]
  );

  useEffect(() => stop, [stop]);

  return { supported, speaking, speak, stop };
}
