import React, { useState } from 'react';
import { Check, Link2, Share2 } from 'lucide-react';
import { useLanguage } from '../i18n/language';
import { getWhatsAppShareUrl } from '../services/shareService';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ShareButtonsProps {
  title: string;
  message: string;
  url: string;
  compact?: boolean;
}

// Only phones get the system share menu. On a computer it adds little, so we copy the link.
const usesPhoneShareMenu = () =>
  typeof navigator.share === 'function' && window.matchMedia('(pointer: coarse)').matches;

export const ShareButtons: React.FC<ShareButtonsProps> = ({ title, message, url, compact = false }) => {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const t = useLanguage().t.scenarioView;
  const phoneShare = usesPhoneShareMenu();

  const handleShare = async () => {
    if (phoneShare) {
      try {
        await navigator.share({ title, text: message });
      } catch {
        // The person closed the share menu; there is nothing to do.
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
    setTimeout(() => setCopyState('idle'), 2500);
  };

  const shareLabel =
    copyState === 'copied' ? t.copied : copyState === 'failed' ? t.copyFailed : phoneShare ? t.shareProtocol : t.copyLink;
  const ShareIcon = copyState === 'copied' ? Check : phoneShare ? Share2 : Link2;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        href={getWhatsAppShareUrl(message)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.shareWhatsApp}
        className={`inline-flex items-center space-x-2 bg-[#0F7A6C] hover:bg-[#0B5F54] text-white font-bold rounded-xl shadow-xs transition-colors ${
          compact ? 'px-3 py-2 text-xs' : 'px-4 py-2.5 text-sm'
        }`}
      >
        <WhatsAppIcon className={compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
        <span>{compact ? t.shareWhatsAppShort : t.shareWhatsApp}</span>
      </a>

      <button
        type="button"
        onClick={handleShare}
        className={`inline-flex items-center space-x-2 font-semibold text-midnight hover:text-plum bg-white border border-lavender hover:border-plum rounded-xl shadow-xs transition-all ${
          compact ? 'px-3 py-2 text-xs' : 'px-4 py-2.5 text-sm'
        }`}
      >
        <ShareIcon className={`text-plum ${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} />
        <span aria-live="polite">{shareLabel}</span>
      </button>
    </div>
  );
};
