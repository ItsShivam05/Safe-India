import React from 'react';
import { ShieldCheck, Zap, RefreshCw, CheckCircle2, HeartHandshake, BookOpenCheck, ShieldAlert } from 'lucide-react';
import { translations } from '../data/locales';

interface PhilosophyProps {}

export const Philosophy: React.FC<PhilosophyProps> = () => {
  const t = translations.en;

  return (
    <section className="py-12 md:py-16 bg-ivory text-midnight border-b border-lavender/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-plum bg-lavender/30 px-3.5 py-1 rounded-full border border-lavender">
            Our Safety Approach
          </span>
          <h2 className="mt-3 text-2xl sm:text-4xl font-black text-midnight tracking-tight">
            {t.philosophy.title}
          </h2>
          <p className="mt-2 text-midnight/70 text-sm sm:text-base">
            Structured around one question:{' '}
            <strong className="text-midnight">&quot;Something has happened. What should I do now?&quot;</strong>
          </p>
        </div>

        {/* 3 Step Protocol Cards (Before / During / After) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">

          {/* Pillar 1: Before */}
          <div className="bg-white border border-lavender/60 rounded-3xl p-6 sm:p-7 shadow-xs hover:border-plum transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-lavender/40 text-plum flex items-center justify-center font-bold text-xl mb-4 border border-lavender">
                <ShieldCheck className="w-6 h-6 text-plum" />
              </div>
              <span className="text-[11px] font-bold text-plum uppercase tracking-wider block mb-1">Phase 1</span>
              <h3 className="text-xl font-bold text-midnight mb-2">
                {t.philosophy.before} → Prepare
              </h3>
              <p className="text-sm text-midnight/75 leading-relaxed">
                {t.philosophy.beforeDesc}
              </p>
            </div>
            <ul className="mt-5 pt-4 border-t border-lavender/30 space-y-2 text-xs text-midnight/80 font-medium">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-sage-600 shrink-0" />
                <span>Emergency preparedness checklists</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-sage-600 shrink-0" />
                <span>Digital scam awareness guides</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2: During */}
          <div className="bg-white border-2 border-emergency/40 rounded-3xl p-6 sm:p-7 shadow-xs hover:border-emergency transition-all duration-200 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 bg-emergency text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-xl">
              Critical
            </div>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emergency-50 text-emergency flex items-center justify-center font-bold text-xl mb-4 border border-emergency-200">
                <Zap className="w-6 h-6 text-emergency" />
              </div>
              <span className="text-[11px] font-bold text-emergency uppercase tracking-wider block mb-1">Phase 2</span>
              <h3 className="text-xl font-bold text-midnight mb-2">
                {t.philosophy.during} → Act
              </h3>
              <p className="text-sm text-midnight/75 leading-relaxed">
                {t.philosophy.duringDesc}
              </p>
            </div>
            <ul className="mt-5 pt-4 border-t border-emergency-100 space-y-2 text-xs text-midnight/80 font-medium">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emergency shrink-0" />
                <span>Numbered immediate DO THIS NOW steps</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emergency shrink-0" />
                <span>High-contrast DON&apos;T warnings</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3: After */}
          <div className="bg-white border border-sage/60 rounded-3xl p-6 sm:p-7 shadow-xs hover:border-sage-600 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sage/30 text-midnight flex items-center justify-center font-bold text-xl mb-4 border border-sage">
                <RefreshCw className="w-6 h-6 text-sage-700" />
              </div>
              <span className="text-[11px] font-bold text-sage-700 uppercase tracking-wider block mb-1">Phase 3</span>
              <h3 className="text-xl font-bold text-midnight mb-2">
                {t.philosophy.after} → Recover
              </h3>
              <p className="text-sm text-midnight/75 leading-relaxed">
                {t.philosophy.afterDesc}
              </p>
            </div>
            <ul className="mt-5 pt-4 border-t border-sage/40 space-y-2 text-xs text-midnight/80 font-medium">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-sage-600 shrink-0" />
                <span>Official government emergency helplines</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-sage-600 shrink-0" />
                <span>Legal rights & RBI Zero Liability protection</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Storytelling Modules with Cinematic Anime Illustrations */}
        <div className="space-y-12">
          
          {/* Story 1: Community Support & Bystander Assistance */}
          <div className="bg-white rounded-3xl border border-lavender/50 overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1 p-6 sm:p-8 lg:p-10 space-y-4">
              <div className="inline-flex items-center space-x-2 bg-lavender/30 text-plum px-3 py-1 rounded-full text-xs font-bold">
                <HeartHandshake className="w-3.5 h-3.5 text-plum" />
                <span>Bystander Support & Solidarity</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-midnight tracking-tight leading-snug">
                Strong communities keep each other safe before help arrives.
              </h3>
              <p className="text-sm text-midnight/80 leading-relaxed font-normal">
                In busy public spaces, markets, and colleges, bystander awareness creates an immediate safety net. Under Indian law (Good Samaritan Protection), bystanders who assist victims in emergencies are legally protected from police detention or civil liability.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold text-midnight/70">
                <span className="bg-ivory px-2.5 py-1 rounded-lg border border-lavender">Good Samaritan Guidelines</span>
                <span className="bg-ivory px-2.5 py-1 rounded-lg border border-lavender">Calm Intervention</span>
                <span className="bg-ivory px-2.5 py-1 rounded-lg border border-lavender">Calling 112 for Others</span>
              </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2 h-64 sm:h-80 lg:h-96 relative overflow-hidden bg-midnight">
              <img
                src="/illustrations/community_support.jpg"
                alt="Cinematic 2D anime illustration of supportive Indian community members, students, and elders in an illuminated public park boulevard"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Story 2: Emergency Preparedness & First-Aid Knowledge */}
          <div className="bg-white rounded-3xl border border-lavender/50 overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 h-64 sm:h-80 lg:h-96 relative overflow-hidden bg-midnight">
              <img
                src="/illustrations/safety_preparedness.jpg"
                alt="Cinematic 2D anime illustration of an Indian woman safety instructor demonstrating emergency first-aid bandages and preparedness in a sunlit training hall"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 space-y-4">
              <div className="inline-flex items-center space-x-2 bg-sage/30 text-midnight px-3 py-1 rounded-full text-xs font-bold border border-sage">
                <BookOpenCheck className="w-3.5 h-3.5 text-sage-700" />
                <span>First Aid & Preparedness</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-midnight tracking-tight leading-snug">
                Knowledge turns emergency panic into focused, calm action.
              </h3>
              <p className="text-sm text-midnight/80 leading-relaxed font-normal">
                From stopping severe bleeding and heat exhaustion to recognizing cyber fraud and gas leaks, practical preparation gives you the confidence to protect your home, workplace, and family without hesitation.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold text-midnight/70">
                <span className="bg-ivory px-2.5 py-1 rounded-lg border border-lavender">CPR & Bleeding Control</span>
                <span className="bg-ivory px-2.5 py-1 rounded-lg border border-lavender">Fire Evacuation</span>
                <span className="bg-ivory px-2.5 py-1 rounded-lg border border-lavender">Household Kits</span>
              </div>
            </div>
          </div>

          {/* Story 3: Accessing Dedicated Public Responders */}
          <div className="bg-white rounded-3xl border border-lavender/50 overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1 p-6 sm:p-8 lg:p-10 space-y-4">
              <div className="inline-flex items-center space-x-2 bg-emergency-50 text-emergency px-3 py-1 rounded-full text-xs font-bold border border-emergency-200">
                <ShieldAlert className="w-3.5 h-3.5 text-emergency" />
                <span>Civic Emergency Response</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-midnight tracking-tight leading-snug">
                Direct connections to India’s dedicated public emergency services.
              </h3>
              <p className="text-sm text-midnight/80 leading-relaxed font-normal">
                SafeIndia connects you directly to 112 National Emergency (Police, Fire, Ambulance), 1930 Cyber Helpline, 108 Medical Ambulance, and 1091 Women Helpline. Knowing who to call and what details to give helps responders reach you quickly.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold text-midnight/70">
                <span className="bg-ivory px-2.5 py-1 rounded-lg border border-lavender">112 Single Emergency</span>
                <span className="bg-ivory px-2.5 py-1 rounded-lg border border-lavender">1930 Cyber Fraud</span>
                <span className="bg-ivory px-2.5 py-1 rounded-lg border border-lavender">108 Ambulance</span>
              </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2 h-64 sm:h-80 lg:h-96 relative overflow-hidden bg-midnight">
              <img
                src="/illustrations/emergency_responders.jpg"
                alt="Cinematic 2D anime illustration of Indian emergency responders including a woman doctor, police officer, and firefighter ready with rescue vehicles"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
