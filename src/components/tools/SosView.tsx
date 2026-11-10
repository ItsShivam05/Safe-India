import React, { useState } from 'react';
import { Siren, PhoneCall, Loader2, MessageSquare, Pencil, Trash2, AlertTriangle } from 'lucide-react';
import type { LocationCoordinates } from '../../types';
import { fill, useLanguage } from '../../i18n/language';
import { getCurrentLocation } from '../../services/locationService';
import { buildSosMessage, normalizeMobile, smsTo, SOS_CONTACTS_KEY, whatsAppTo, type SosContact } from '../../services/sosService';
import { forget, loadSaved, save } from '../../utils/storage';
import { WhatsAppIcon } from '../WhatsAppIcon';

type Stage = 'idle' | 'locating' | 'ready';

export const SosView: React.FC = () => {
  const { t, lang } = useLanguage();
  const [contacts, setContacts] = useState<SosContact[]>(() => loadSaved<SosContact[]>(SOS_CONTACTS_KEY, []));
  const [editing, setEditing] = useState(contacts.length === 0);
  const [stage, setStage] = useState<Stage>('idle');
  const [message, setMessage] = useState('');
  const [hasLocation, setHasLocation] = useState(true);

  const prepare = async () => {
    setStage('locating');
    let location: LocationCoordinates | null = null;
    try {
      location = await getCurrentLocation();
    } catch {
      // Still send the SOS; it just asks the contact to call instead
    }
    const time = new Date().toLocaleTimeString(lang === 'hi' ? 'hi-IN' : 'en-IN', { hour: '2-digit', minute: '2-digit' });
    setHasLocation(location !== null);
    setMessage(buildSosMessage(t, location, time));
    setStage('ready');
  };

  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <div className="flex items-center space-x-3 mb-3">
        <div className="p-3 bg-emergency text-white rounded-2xl">
          <Siren className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-black text-midnight tracking-tight">{t.sos.title}</h1>
      </div>
      <p className="text-midnight/80 mb-6">{t.sos.intro}</p>

      <a
        href="tel:112"
        className="mb-6 w-full inline-flex items-center justify-center space-x-2 bg-white border-2 border-emergency text-emergency font-black px-6 py-3.5 rounded-2xl"
      >
        <PhoneCall className="w-5 h-5" />
        <span>{t.nearMe.call112Button}</span>
      </a>

      {editing ? (
        <ContactsForm
          initial={contacts}
          onSave={(saved) => {
            save(SOS_CONTACTS_KEY, saved);
            setContacts(saved);
            setEditing(false);
            setStage('idle');
          }}
        />
      ) : (
        <div className="space-y-5">
          {stage !== 'ready' && (
            <button
              type="button"
              onClick={prepare}
              disabled={stage === 'locating'}
              className="w-full inline-flex items-center justify-center space-x-3 bg-emergency hover:bg-emergency-600 disabled:opacity-70 text-white font-black px-6 py-6 rounded-3xl text-lg shadow-md"
            >
              {stage === 'locating' ? <Loader2 className="w-6 h-6 animate-spin" /> : <Siren className="w-6 h-6" />}
              <span>{stage === 'locating' ? t.sos.preparing : t.sos.prepare}</span>
            </button>
          )}

          {stage === 'ready' && (
            <div className="bg-white border-2 border-emergency/40 rounded-3xl p-5 sm:p-6 space-y-4" role="status">
              <p className="font-bold text-midnight">{t.sos.ready}</p>
              {!hasLocation && (
                <p className="flex items-start space-x-2 text-sm text-emergency">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{t.sos.noLocation}</span>
                </p>
              )}

              <div className="space-y-3">
                {contacts.map((contact) => (
                  <a
                    key={contact.phone}
                    href={whatsAppTo(contact.phone, message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center space-x-2 bg-[#0F7A6C] hover:bg-[#0B5F54] text-white font-bold px-5 py-4 rounded-2xl"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                    <span>{fill(t.sos.sendWhatsApp, { name: contact.name })}</span>
                  </a>
                ))}
                <a
                  href={smsTo(contacts.map((c) => c.phone), message)}
                  className="w-full inline-flex items-center justify-center space-x-2 bg-midnight hover:bg-midnight-800 text-white font-bold px-5 py-4 rounded-2xl"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>{t.sos.sendSms}</span>
                </a>
              </div>
              <p className="text-xs text-midnight/70">{t.sos.whyTap}</p>

              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-midnight/70 mb-1">{t.sos.previewTitle}</h2>
                <pre className="whitespace-pre-wrap font-sans text-sm bg-ivory border border-lavender/60 rounded-xl p-3 text-midnight" data-testid="sos-message">{message}</pre>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="inline-flex items-center space-x-2 bg-white border border-lavender text-midnight font-bold px-4 py-2.5 rounded-xl text-sm"
            >
              <Pencil className="w-4 h-4 text-plum" />
              <span>{t.sos.edit}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                forget(SOS_CONTACTS_KEY);
                setContacts([]);
                setEditing(true);
                setStage('idle');
              }}
              className="inline-flex items-center space-x-2 bg-white border border-lavender text-midnight font-bold px-4 py-2.5 rounded-xl text-sm"
            >
              <Trash2 className="w-4 h-4 text-emergency" />
              <span>{t.sos.remove}</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

const ContactsForm: React.FC<{ initial: SosContact[]; onSave: (contacts: SosContact[]) => void }> = ({ initial, onSave }) => {
  const { t } = useLanguage();
  const [rows, setRows] = useState(() => [0, 1].map((i) => ({ name: initial[i]?.name ?? '', phone: initial[i]?.phone ?? '' })));
  const [errors, setErrors] = useState<Array<{ name?: string; phone?: string }>>([{}, {}]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = rows.map((row) => ({
      name: row.name.trim() ? undefined : t.sos.nameRequired,
      phone: normalizeMobile(row.phone) ? undefined : t.sos.invalidPhone,
    }));
    setErrors(nextErrors);
    if (nextErrors.some((err) => err.name || err.phone)) return;
    onSave(rows.map((row) => ({ name: row.name.trim(), phone: normalizeMobile(row.phone)! })));
  };

  return (
    <form onSubmit={submit} className="bg-white border border-lavender/60 rounded-3xl p-5 sm:p-6 space-y-5" noValidate>
      <div>
        <h2 className="text-xl font-black text-midnight">{t.sos.setupTitle}</h2>
        <p className="text-sm text-midnight/70 mt-1">{t.sos.setupIntro}</p>
      </div>

      {rows.map((row, idx) => (
        <fieldset key={idx} className="space-y-3">
          <legend className="font-bold text-midnight mb-1">{fill(t.sos.contact, { n: idx + 1 })}</legend>
          <label className="block text-sm font-semibold text-midnight">
            {t.sos.name}
            <input
              value={row.name}
              onChange={(e) => setRows(rows.map((r, i) => (i === idx ? { ...r, name: e.target.value } : r)))}
              autoComplete="off"
              className="mt-1 w-full border border-lavender rounded-xl px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-plum"
              aria-invalid={!!errors[idx].name}
            />
            {errors[idx].name && <span className="block text-xs text-emergency mt-1">{errors[idx].name}</span>}
          </label>
          <label className="block text-sm font-semibold text-midnight">
            {t.sos.phone}
            <input
              value={row.phone}
              onChange={(e) => setRows(rows.map((r, i) => (i === idx ? { ...r, phone: e.target.value } : r)))}
              type="tel"
              inputMode="tel"
              autoComplete="off"
              className="mt-1 w-full border border-lavender rounded-xl px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-plum"
              aria-invalid={!!errors[idx].phone}
            />
            <span className="block text-xs text-midnight/70 mt-1">{t.sos.phoneHint}</span>
            {errors[idx].phone && <span className="block text-xs text-emergency mt-1">{errors[idx].phone}</span>}
          </label>
        </fieldset>
      ))}

      <button type="submit" className="w-full bg-plum hover:bg-plum-600 text-white font-bold px-6 py-3.5 rounded-2xl">
        {t.sos.save}
      </button>
    </form>
  );
};
