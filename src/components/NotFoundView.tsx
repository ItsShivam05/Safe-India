import React from 'react';
import { Link } from 'react-router';
import { PhoneCall } from 'lucide-react';
import { useLanguage } from '../i18n/language';
import { TAB_PATHS } from '../data/site';

export const NotFoundView: React.FC = () => {
  const { t: all } = useLanguage();
  const t = all.notFound;

  return (
    <section className="max-w-xl mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-black text-midnight tracking-tight">{t.title}</h1>
      <p className="mt-2 text-midnight/80">{t.body}</p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <a
          href="tel:112"
          className="inline-flex items-center space-x-2 bg-emergency hover:bg-emergency-600 text-white font-extrabold px-5 py-3 rounded-xl text-sm shadow-xs"
        >
          <PhoneCall className="w-4 h-4" />
          <span>{all.nearMe.call112Button}</span>
        </a>
        <Link
          to={TAB_PATHS.emergencies}
          className="bg-plum hover:bg-plum-600 text-white font-bold px-5 py-3 rounded-xl text-sm shadow-xs"
        >
          {t.guides}
        </Link>
        <Link
          to={TAB_PATHS.home}
          className="bg-white hover:bg-ivory-100 text-midnight font-bold px-5 py-3 rounded-xl text-sm border border-lavender"
        >
          {t.home}
        </Link>
      </div>
    </section>
  );
};
