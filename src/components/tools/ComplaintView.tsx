import React, { useState } from 'react';
import { FileText, Copy, Check, PhoneCall } from 'lucide-react';
import { fill, useLanguage } from '../../i18n/language';

type ComplaintType = 'fraud' | 'phone';

const FIELDS: Record<ComplaintType, string[]> = {
  fraud: ['yourName', 'yourPhone', 'dateTime', 'amount', 'transactionId', 'bank', 'fraudster', 'whatHappened'],
  phone: ['yourName', 'yourPhone', 'model', 'imei', 'lostNumber', 'placeTime', 'whatHappened'],
};

/** Builds ready-to-copy complaint text. Nothing typed here is saved or sent anywhere. */
export const ComplaintView: React.FC = () => {
  const { t } = useLanguage();
  const [type, setType] = useState<ComplaintType>('fraud');
  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const value = (key: string) => values[key]?.trim() || t.complaint.notGiven;
  const labels = t.complaint as unknown as Record<string, string>;
  const text = fill(type === 'fraud' ? t.complaint.fraudTemplate : t.complaint.phoneTemplate, {
    name: value('yourName'),
    phone: value('yourPhone'),
    dateTime: value('dateTime'),
    amount: value('amount'),
    transactionId: value('transactionId'),
    bank: value('bank'),
    fraudster: value('fraudster'),
    whatHappened: value('whatHappened'),
    model: value('model'),
    imei: value('imei'),
    lostNumber: value('lostNumber'),
    placeTime: value('placeTime'),
  });

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <div className="flex items-center space-x-3 mb-3">
        <div className="p-3 bg-plum text-white rounded-2xl">
          <FileText className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-black text-midnight tracking-tight">{t.complaint.title}</h1>
      </div>
      <p className="text-midnight/80 mb-6">{t.complaint.intro}</p>

      <div className="grid grid-cols-2 gap-2 mb-6" role="group">
        {(['fraud', 'phone'] as ComplaintType[]).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setType(option)}
            aria-pressed={type === option}
            className={`px-4 py-3 rounded-2xl font-bold text-sm border ${type === option ? 'bg-plum text-white border-plum' : 'bg-white text-midnight border-lavender'}`}
          >
            {option === 'fraud' ? t.complaint.typeFraud : t.complaint.typePhone}
          </button>
        ))}
      </div>

      {type === 'fraud' && (
        <a href="tel:1930" className="mb-6 w-full inline-flex items-center justify-center space-x-2 bg-emergency hover:bg-emergency-600 text-white font-black px-6 py-3.5 rounded-2xl">
          <PhoneCall className="w-5 h-5" />
          <span>{t.scenarioView.callNow} 1930</span>
        </a>
      )}

      <div className="bg-white border border-lavender/60 rounded-3xl p-5 sm:p-6 space-y-4 mb-6">
        {FIELDS[type].map((key) => (
          <label key={key} className="block text-sm font-semibold text-midnight">
            {labels[key]}
            {key === 'whatHappened' ? (
              <textarea
                value={values[key] ?? ''}
                onChange={(e) => setValues({ ...values, [key]: e.target.value })}
                rows={4}
                className="mt-1 w-full border border-lavender rounded-xl px-3 py-2.5 text-base"
              />
            ) : (
              <input
                value={values[key] ?? ''}
                onChange={(e) => setValues({ ...values, [key]: e.target.value })}
                type={key === 'yourPhone' || key === 'lostNumber' ? 'tel' : 'text'}
                className="mt-1 w-full border border-lavender rounded-xl px-3 py-3 text-base"
              />
            )}
          </label>
        ))}
      </div>

      <h2 className="text-sm font-bold uppercase tracking-wider text-midnight/70 mb-2">{t.complaint.preview}</h2>
      <pre className="whitespace-pre-wrap font-sans text-sm bg-ivory border border-lavender/60 rounded-2xl p-4 text-midnight mb-3" data-testid="complaint-text">{text}</pre>
      <button type="button" onClick={copy} className="w-full inline-flex items-center justify-center space-x-2 bg-plum hover:bg-plum-600 text-white font-bold px-6 py-3.5 rounded-2xl mb-3">
        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
        <span>{copied ? t.scenarioView.copied : t.complaint.copy}</span>
      </button>
      <p className="text-sm text-midnight/80">{type === 'fraud' ? t.complaint.nextFraud : t.complaint.nextPhone}</p>
    </section>
  );
};
