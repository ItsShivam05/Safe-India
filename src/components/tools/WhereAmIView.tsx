import React, { useState } from 'react';
import { LocateFixed, Loader2, PhoneCall, Copy, Check, ExternalLink, AlertTriangle } from 'lucide-react';
import type { LocationCoordinates } from '../../types';
import { fill, useLanguage } from '../../i18n/language';
import { getCurrentLocation, GeolocationError, reverseGeocode } from '../../services/locationService';
import { getWhatsAppShareUrl } from '../../services/shareService';
import { mapsLink } from '../../services/sosService';
import { WhatsAppIcon } from '../WhatsAppIcon';

/** Shows the person's address and coordinates in large text, to read out to the 112 operator. */
export const WhereAmIView: React.FC = () => {
  const { t, lang } = useLanguage();
  const [location, setLocation] = useState<LocationCoordinates | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const find = async () => {
    setLoading(true);
    setError(null);
    try {
      const coords = await getCurrentLocation();
      setLocation(coords);
      // The coordinates alone are enough to help; the address is a bonus if the lookup works
      setAddress(await reverseGeocode(coords.lat, coords.lon, lang).catch(() => null));
    } catch (err) {
      setError(
        err instanceof GeolocationError && err.code === 'PERMISSION_DENIED'
          ? t.nearMe.permissionDenied
          : err instanceof GeolocationError && err.code === 'TIMEOUT'
            ? t.nearMe.locationTimeout
            : t.nearMe.locationUnavailable
      );
    } finally {
      setLoading(false);
    }
  };

  const coords = location ? `${location.lat.toFixed(5)}, ${location.lon.toFixed(5)}` : '';
  const message = location
    ? fill(t.whereAmI.message, { address: address ?? coords, coords, url: mapsLink(location.lat, location.lon) })
    : '';

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <div className="flex items-center space-x-3 mb-3">
        <div className="p-3 bg-midnight text-white rounded-2xl">
          <LocateFixed className="w-6 h-6 text-lavender" />
        </div>
        <h1 className="text-3xl font-black text-midnight tracking-tight">{t.whereAmI.title}</h1>
      </div>
      <p className="text-midnight/80 mb-6">{t.whereAmI.intro}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <button
          type="button"
          onClick={find}
          disabled={loading}
          className="inline-flex items-center justify-center space-x-2 bg-plum hover:bg-plum-600 disabled:opacity-70 text-white font-bold px-6 py-4 rounded-2xl"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <LocateFixed className="w-5 h-5" />}
          <span>{loading ? t.whereAmI.finding : t.whereAmI.find}</span>
        </button>
        <a
          href="tel:112"
          className="inline-flex items-center justify-center space-x-2 bg-emergency hover:bg-emergency-600 text-white font-black px-6 py-4 rounded-2xl"
        >
          <PhoneCall className="w-5 h-5" />
          <span>{t.nearMe.call112Button}</span>
        </a>
      </div>

      {error && (
        <p role="alert" className="mb-6 p-4 bg-emergency-50 border border-emergency-200 rounded-2xl text-sm text-emergency flex items-start space-x-2">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </p>
      )}

      {location && (
        <div className="bg-white border-2 border-plum/30 rounded-3xl p-5 sm:p-6 space-y-4" role="status">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-midnight/70">{t.whereAmI.address}</h2>
            <p className="text-xl sm:text-2xl font-bold text-midnight leading-snug mt-1" data-testid="address">
              {address ?? t.whereAmI.addressUnavailable}
            </p>
            {address && <p className="text-xs text-midnight/70 mt-1">{t.whereAmI.addressApprox}</p>}
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-midnight/70">{t.whereAmI.coordinates}</h2>
            <p className="text-2xl font-black text-midnight font-mono mt-1" data-testid="coordinates">{coords}</p>
            {location.accuracyMeters !== undefined && (
              <p className="text-xs text-midnight/70 mt-1">{fill(t.nearMe.accuracy, { m: location.accuracyMeters })}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center justify-center space-x-2 bg-white border border-lavender text-midnight font-bold px-4 py-3 rounded-xl text-sm"
            >
              {copied ? <Check className="w-4 h-4 text-sage-700" /> : <Copy className="w-4 h-4 text-plum" />}
              <span>{copied ? t.scenarioView.copied : t.whereAmI.copy}</span>
            </button>
            <a
              href={mapsLink(location.lat, location.lon)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 bg-white border border-lavender text-midnight font-bold px-4 py-3 rounded-xl text-sm"
            >
              <ExternalLink className="w-4 h-4 text-plum" />
              <span>{t.whereAmI.openMaps}</span>
            </a>
            <a
              href={getWhatsAppShareUrl(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 bg-[#0F7A6C] hover:bg-[#0B5F54] text-white font-bold px-4 py-3 rounded-xl text-sm"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>{t.whereAmI.shareWhatsApp}</span>
            </a>
          </div>
        </div>
      )}

      <p className="mt-6 text-xs text-midnight/70">{t.whereAmI.privacy}</p>
    </section>
  );
};
