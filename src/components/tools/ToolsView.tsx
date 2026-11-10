import React from 'react';
import { Link } from 'react-router';
import { Siren, LocateFixed, Megaphone, HeartPulse, FileText, ArrowRight, WifiOff } from 'lucide-react';
import { useLanguage } from '../../i18n/language';
import { TAB_PATHS } from '../../data/site';

export const ToolsView: React.FC = () => {
  const { t } = useLanguage();

  const tools = [
    { to: TAB_PATHS.sos, title: t.sos.title, desc: t.tools.sosDesc, icon: Siren, accent: 'bg-emergency text-white' },
    { to: TAB_PATHS.whereami, title: t.whereAmI.title, desc: t.tools.whereDesc, icon: LocateFixed, accent: 'bg-midnight text-lavender' },
    { to: TAB_PATHS.alarm, title: t.alarm.title, desc: t.tools.alarmDesc, icon: Megaphone, accent: 'bg-emergency text-white' },
    { to: TAB_PATHS.medicalid, title: t.medicalId.title, desc: t.tools.medicalDesc, icon: HeartPulse, accent: 'bg-plum text-white' },
    { to: TAB_PATHS.complaint, title: t.complaint.title, desc: t.tools.complaintDesc, icon: FileText, accent: 'bg-plum text-white' },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <span className="inline-flex items-center space-x-2 bg-lavender/30 text-plum text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full border border-lavender mb-3">
        <WifiOff className="w-4 h-4" />
        <span>{t.tools.badge}</span>
      </span>
      <h1 className="text-3xl sm:text-4xl font-black text-midnight tracking-tight">{t.tools.title}</h1>
      <p className="mt-2 mb-8 text-midnight/75">{t.tools.subheading}</p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tools.map(({ to, title, desc, icon: Icon, accent }) => (
          <li key={to}>
            <Link to={to} className="h-full flex items-start space-x-4 bg-white border border-lavender/60 hover:border-plum rounded-3xl p-5 shadow-xs transition-colors group">
              <span className={`p-3 rounded-2xl shrink-0 ${accent}`}>
                <Icon className="w-6 h-6" />
              </span>
              <span className="min-w-0">
                <span className="block text-lg font-bold text-midnight group-hover:text-plum">{title}</span>
                <span className="block text-sm text-midnight/75 mt-1">{desc}</span>
                <span className="mt-2 inline-flex items-center space-x-1 text-sm font-bold text-plum">
                  <span>{t.tools.open}</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
