import React, { useState } from 'react';
import { HeartPulse, X, Trash2, Check } from 'lucide-react';
import { useLanguage } from '../../i18n/language';
import { useDialogFocus } from '../../hooks/useDialogFocus';
import { forget, loadSaved, save } from '../../utils/storage';

const MEDICAL_ID_KEY = 'safeindia-medical-id';
const FIELDS = ['name', 'bloodGroup', 'allergies', 'medications', 'conditions', 'contactName', 'contactPhone', 'notes'] as const;
type Field = (typeof FIELDS)[number];
type MedicalId = Record<Field, string>;

const EMPTY: MedicalId = { name: '', bloodGroup: '', allergies: '', medications: '', conditions: '', contactName: '', contactPhone: '', notes: '' };
const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const MedicalIdView: React.FC = () => {
  const { t } = useLanguage();
  const [info, setInfo] = useState<MedicalId>(() => ({ ...EMPTY, ...loadSaved<Partial<MedicalId>>(MEDICAL_ID_KEY, {}) }));
  const [savedNote, setSavedNote] = useState(false);
  const [showing, setShowing] = useState(false);
  const dialogRef = useDialogFocus<HTMLDivElement>(showing);
  const hasAny = FIELDS.some((f) => info[f].trim());

  const update = (field: Field, value: string) => {
    setInfo({ ...info, [field]: value });
    setSavedNote(false);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNote(save(MEDICAL_ID_KEY, info));
  };

  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <div className="flex items-center space-x-3 mb-3">
        <div className="p-3 bg-plum text-white rounded-2xl">
          <HeartPulse className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-black text-midnight tracking-tight">{t.medicalId.title}</h1>
      </div>
      <p className="text-midnight/80 mb-2">{t.medicalId.intro}</p>
      <p className="text-sm text-emergency mb-6">{t.medicalId.warning}</p>

      <button
        type="button"
        onClick={() => setShowing(true)}
        disabled={!hasAny}
        className="mb-6 w-full bg-emergency hover:bg-emergency-600 disabled:opacity-50 text-white font-black px-6 py-4 rounded-2xl"
      >
        {t.medicalId.show}
      </button>
      {!hasAny && <p className="mb-6 text-sm text-midnight/70">{t.medicalId.empty}</p>}

      <form onSubmit={submit} className="bg-white border border-lavender/60 rounded-3xl p-5 sm:p-6 space-y-4">
        {FIELDS.map((field) => (
          <label key={field} className="block text-sm font-semibold text-midnight">
            {t.medicalId[field]}
            {field === 'bloodGroup' ? (
              <select
                value={info.bloodGroup}
                onChange={(e) => update('bloodGroup', e.target.value)}
                className="mt-1 w-full border border-lavender rounded-xl px-3 py-3 text-base bg-white"
              >
                <option value="">—</option>
                {BLOOD_GROUPS.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            ) : field === 'notes' || field === 'allergies' || field === 'medications' || field === 'conditions' ? (
              <textarea
                value={info[field]}
                onChange={(e) => update(field, e.target.value)}
                rows={2}
                className="mt-1 w-full border border-lavender rounded-xl px-3 py-2.5 text-base"
              />
            ) : (
              <input
                value={info[field]}
                onChange={(e) => update(field, e.target.value)}
                type={field === 'contactPhone' ? 'tel' : 'text'}
                className="mt-1 w-full border border-lavender rounded-xl px-3 py-3 text-base"
              />
            )}
          </label>
        ))}

        <button type="submit" className="w-full inline-flex items-center justify-center space-x-2 bg-plum hover:bg-plum-600 text-white font-bold px-6 py-3.5 rounded-2xl">
          {savedNote && <Check className="w-5 h-5" />}
          <span>{savedNote ? t.medicalId.saved : t.medicalId.save}</span>
        </button>
      </form>

      {hasAny && (
        <button
          type="button"
          onClick={() => {
            forget(MEDICAL_ID_KEY);
            setInfo(EMPTY);
            setSavedNote(false);
          }}
          className="mt-4 inline-flex items-center space-x-2 text-sm font-bold text-emergency"
        >
          <Trash2 className="w-4 h-4" />
          <span>{t.medicalId.clear}</span>
        </button>
      )}

      {/* Large-text view for a responder */}
      {showing && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={t.medicalId.responderTitle} tabIndex={-1} className="max-w-2xl mx-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-black text-emergency">{t.medicalId.responderTitle}</h2>
              <button type="button" onClick={() => setShowing(false)} className="p-3 rounded-xl bg-ivory" aria-label={t.medicalId.close}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <dl className="space-y-4">
              {FIELDS.map((field) => (
                <div key={field} className="border-b border-lavender/60 pb-3">
                  <dt className="text-sm font-bold uppercase tracking-wider text-midnight/70">{t.medicalId[field]}</dt>
                  <dd className="text-2xl font-bold text-midnight mt-1 whitespace-pre-wrap">{info[field].trim() || t.medicalId.unknown}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </section>
  );
};
