import React, { useEffect, useRef, useState } from 'react';
import { Megaphone, Square } from 'lucide-react';
import { useLanguage } from '../../i18n/language';

/**
 * A loud rising-and-falling siren made in the browser, so it works offline.
 * Deliberately no flashing screen, which can trigger seizures.
 */
export const AlarmView: React.FC = () => {
  const { t } = useLanguage();
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<AudioContext | null>(null);
  const supported = typeof window !== 'undefined' && 'AudioContext' in window;

  const stop = () => {
    audioRef.current?.close();
    audioRef.current = null;
    setPlaying(false);
  };

  const start = () => {
    const ctx = new AudioContext();
    const siren = ctx.createOscillator();
    const sweep = ctx.createOscillator();
    const sweepDepth = ctx.createGain();
    const volume = ctx.createGain();

    siren.type = 'square';
    siren.frequency.value = 1000;
    sweep.frequency.value = 2; // two rises and falls a second, like an emergency siren
    sweepDepth.gain.value = 400;
    volume.gain.value = 0.9;

    sweep.connect(sweepDepth).connect(siren.frequency);
    siren.connect(volume).connect(ctx.destination);
    siren.start();
    sweep.start();

    audioRef.current = ctx;
    setPlaying(true);
  };

  // Never leave the siren running after leaving the page
  useEffect(
    () => () => {
      audioRef.current?.close().catch(() => {});
    },
    []
  );

  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <div className="flex items-center space-x-3 mb-3">
        <div className="p-3 bg-emergency text-white rounded-2xl">
          <Megaphone className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-black text-midnight tracking-tight">{t.alarm.title}</h1>
      </div>
      <p className="text-midnight/80 mb-2">{t.alarm.intro}</p>
      <p className="text-sm text-midnight/70 mb-8">{t.alarm.volumeNote}</p>

      {supported ? (
        <button
          type="button"
          onClick={playing ? stop : start}
          aria-pressed={playing}
          className={`w-full inline-flex items-center justify-center space-x-3 font-black px-6 py-10 rounded-3xl text-2xl shadow-md ${
            playing ? 'bg-midnight text-white' : 'bg-emergency hover:bg-emergency-600 text-white'
          }`}
        >
          {playing ? <Square className="w-8 h-8" /> : <Megaphone className="w-8 h-8" />}
          <span>{playing ? t.alarm.stop : t.alarm.start}</span>
        </button>
      ) : (
        <p role="alert" className="p-4 bg-emergency-50 border border-emergency-200 rounded-2xl text-emergency">{t.alarm.unsupported}</p>
      )}

      {playing && (
        <p role="status" className="mt-4 text-center font-bold text-emergency">{t.alarm.playing}</p>
      )}

      <a href="tel:112" className="mt-8 block text-center font-bold text-emergency underline">
        {t.nearMe.call112Button}
      </a>
    </section>
  );
};
