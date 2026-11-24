import { useState } from 'react';
import { TriangleAlert, CheckCircle2, RotateCcw } from 'lucide-react';
import { FoodShell, FoodProgress, useLang } from '../foodPrimitives';
import { FOOD_THEMES } from '../foodTheme';

const T = FOOD_THEMES.safety;
interface Spot {
  id: string; x: number; y: number; hazard: boolean;
  nameEn: string; nameHi: string; whyEn: string; whyHi: string; fixEn: string; fixHi: string;
}
const SPOTS: Spot[] = [
  { id: 'rawabove', x: 92, y: 120, hazard: true, nameEn: 'Raw meat above salad', nameHi: 'सलाद के ऊपर कच्चा मांस',
    whyEn: 'Juices from raw meat can drip onto ready-to-eat salad and cause cross-contamination.', whyHi: 'कच्चे मांस का रस तैयार सलाद पर टपककर क्रॉस-संदूषण कर सकता है।',
    fixEn: 'Store raw meat on the bottom shelf, below all ready-to-eat food.', fixHi: 'कच्चा मांस सबसे नीचे शेल्फ पर, सभी तैयार भोजन के नीचे रखें।' },
  { id: 'wrongboard', x: 360, y: 300, hazard: true, nameEn: 'Raw chicken on green board', nameHi: 'हरे बोर्ड पर कच्चा चिकन',
    whyEn: 'Green boards are for salad/fruit. Raw chicken needs the red board.', whyHi: 'हरा बोर्ड सलाद/फल हेतु है। कच्चे चिकन हेतु लाल बोर्ड चाहिए।',
    fixEn: 'Use the red colour-coded board for raw meat.', fixHi: 'कच्चे मांस हेतु लाल रंग-कोडित बोर्ड प्रयोग करें।' },
  { id: 'cloth', x: 300, y: 262, hazard: true, nameEn: 'Dirty cloth on prep surface', nameHi: 'तैयारी सतह पर गंदा कपड़ा',
    whyEn: 'A re-used dirty cloth spreads bacteria across surfaces and food.', whyHi: 'पुनः प्रयुक्त गंदा कपड़ा सतहों व भोजन पर जीवाणु फैलाता है।',
    fixEn: 'Use clean cloths and single-use paper; sanitise between tasks.', fixHi: 'साफ कपड़े व एकल-उपयोग पेपर प्रयोग करें; कार्यों के बीच सैनिटाइज़ करें।' },
  { id: 'dangerzone', x: 620, y: 250, hazard: true, nameEn: 'Food left in the danger zone', nameHi: 'डेंजर ज़ोन में छोड़ा भोजन',
    whyEn: 'Cooked food standing at room temperature (5–63°C) lets bacteria multiply fast.', whyHi: 'कमरे के तापमान (5–63°C) पर रखा पका भोजन जीवाणु तेज़ बढ़ाता है।',
    fixEn: 'Hot-hold above 63°C or chill below 5°C — don’t leave it out.', fixHi: '63°C से ऊपर हॉट-होल्ड या 5°C से नीचे ठंडा करें — बाहर न छोड़ें।' },
  { id: 'wetfloor', x: 648, y: 430, hazard: true, nameEn: 'Wet floor / spill', nameHi: 'गीला फर्श / गिरा हुआ',
    whyEn: 'A spill is a slip-and-fall hazard, especially carrying hot pans or knives.', whyHi: 'गिरा हुआ फिसलने का खतरा है, विशेषकर गर्म पैन या चाकू ले जाते समय।',
    fixEn: 'Mop spills immediately and use a wet-floor sign.', fixHi: 'गिरा हुआ तुरंत पोंछें व गीला-फर्श चिन्ह लगाएं।' },
  { id: 'knifesink', x: 690, y: 330, hazard: true, nameEn: 'Knife hidden in the sink', nameHi: 'सिंक में छिपा चाकू',
    whyEn: 'A knife under soapy water can badly cut someone reaching in.', whyHi: 'साबुन पानी में डूबा चाकू हाथ डालने वाले को गहरा काट सकता है।',
    fixEn: 'Never submerge knives; wash and store them separately.', fixHi: 'चाकू कभी न डुबोएं; अलग धोएं व भंडारित करें।' },
  { id: 'bin', x: 60, y: 360, hazard: true, nameEn: 'Uncovered bin beside food', nameHi: 'भोजन के पास खुला कूड़ादान',
    whyEn: 'An open bin next to food attracts pests and spreads contamination.', whyHi: 'भोजन के पास खुला कूड़ादान कीट आकर्षित व संदूषण फैलाता है।',
    fixEn: 'Use a lidded, foot-operated bin away from food areas.', fixHi: 'भोजन क्षेत्र से दूर ढक्कनदार, पैर-संचालित कूड़ादान प्रयोग करें।' },
  { id: 'uncovered', x: 540, y: 300, hazard: true, nameEn: 'Uncovered food on counter', nameHi: 'काउंटर पर खुला भोजन',
    whyEn: 'Uncovered food is exposed to physical contaminants, splashes and pests.', whyHi: 'खुला भोजन भौतिक संदूषक, छींटे व कीटों के संपर्क में आता है।',
    fixEn: 'Cover and label food, or keep it in closed containers.', fixHi: 'भोजन ढकें व लेबल करें, या बंद कंटेनर में रखें।' },
  // safe
  { id: 'handwash', x: 150, y: 300, hazard: false, nameEn: 'Hand-wash station', nameHi: 'हाथ-धुलाई स्टेशन',
    whyEn: 'A dedicated hand-wash sink with soap is correct and essential — good practice.', whyHi: 'साबुन सहित समर्पित हाथ-धुलाई सिंक सही व आवश्यक है — अच्छी प्रथा।',
    fixEn: 'This is safe equipment, not a hazard.', fixHi: 'यह सुरक्षित उपकरण है, खतरा नहीं।' },
  { id: 'labelled', x: 440, y: 120, hazard: false, nameEn: 'Covered, labelled container', nameHi: 'ढका, लेबल कंटेनर',
    whyEn: 'Covered and date-labelled storage is exactly right.', whyHi: 'ढका व तिथि-लेबल भंडारण बिलकुल सही है।',
    fixEn: 'This is correct practice, not a hazard.', fixHi: 'यह सही प्रथा है, खतरा नहीं।' },
];
const TOTAL = SPOTS.filter((s) => s.hazard).length;

export function FoodSafetySim() {
  const L = useLang();
  const [found, setFound] = useState<Set<string>>(new Set());
  const [misses, setMisses] = useState(0);
  const [active, setActive] = useState<Spot | null>(null);
  const click = (s: Spot) => { setActive(s); if (s.hazard && !found.has(s.id)) setFound(new Set(found).add(s.id)); else if (!s.hazard) setMisses((m) => m + 1); };
  const done = found.size === TOTAL;

  return (
    <FoodShell accent={T.accent} Icon={T.Icon}
      title={L('Food Safety Inspector', 'खाद्य सुरक्षा निरीक्षक')}
      subtitle={L('Inspect the kitchen and tap every hygiene and safety hazard you can find.',
        'रसोई का निरीक्षण करें और हर स्वच्छता व सुरक्षा खतरा टैप करें।')}
    >
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-slate-600 dark:text-slate-300">{L('Hazards found', 'मिले खतरे')}</span>
        <span className="font-mono font-bold" style={{ color: T.accent }}>{found.size}/{TOTAL}</span>
      </div>
      <FoodProgress value={found.size} max={TOTAL} accent={T.accent} />

      <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
        <svg viewBox="0 0 800 460" className="w-full block select-none" style={{ touchAction: 'manipulation' }}>
          <defs>
            <linearGradient id="kwall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e8eef3" /><stop offset="1" stopColor="#d4dde6" /></linearGradient>
            <linearGradient id="ksteel" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#cbd5e1" /><stop offset="0.5" stopColor="#eef2f6" /><stop offset="1" stopColor="#9aa7b5" /></linearGradient>
          </defs>
          <rect x="0" y="0" width="800" height="320" fill="url(#kwall)" />
          <rect x="0" y="320" width="800" height="140" fill="#b9c2cc" />
          {/* tiles */}
          {Array.from({ length: 9 }, (_, i) => <line key={i} x1={i * 100} y1="0" x2={i * 100} y2="320" stroke="#ffffff" strokeOpacity="0.4" />)}
          {/* fridge (left) with two shelves */}
          <rect x="40" y="60" width="110" height="170" rx="6" fill="url(#ksteel)" stroke="#94a3b8" strokeWidth="2" />
          <rect x="52" y="96" width="86" height="28" rx="3" fill="#fff" stroke="#cbd5e1" />
          <rect x="60" y="100" width="30" height="18" rx="2" fill="#ef4444" /><rect x="96" y="100" width="30" height="18" rx="2" fill="#f87171" />
          <rect x="52" y="150" width="86" height="28" rx="3" fill="#fff" stroke="#cbd5e1" />
          <rect x="60" y="154" width="70" height="18" rx="2" fill="#86efac" />
          {/* bin (bottom-left) */}
          <rect x="44" y="340" width="40" height="60" rx="4" fill="#64748b" /><rect x="40" y="334" width="48" height="8" rx="2" fill="#475569" transform="rotate(-12 64 338)" />
          {/* hand-wash sink */}
          <rect x="122" y="286" width="60" height="30" rx="4" fill="url(#ksteel)" stroke="#94a3b8" /><rect x="140" y="270" width="6" height="18" fill="#94a3b8" /><circle cx="168" cy="292" r="4" fill="#38bdf8" />
          {/* prep table (center) */}
          <rect x="250" y="270" width="200" height="14" fill="url(#ksteel)" />
          <rect x="320" y="282" width="86" height="40" rx="3" fill="#22c55e" /> {/* green board */}
          <ellipse cx="363" cy="300" rx="26" ry="12" fill="#f9a8b4" /> {/* raw chicken */}
          <rect x="276" y="250" width="44" height="18" rx="2" fill="#cbd5e1" transform="rotate(-6 298 259)" /> {/* dirty cloth */}
          {/* covered labelled container (top center) */}
          <rect x="414" y="104" width="52" height="34" rx="4" fill="#e2e8f0" stroke="#94a3b8" /><rect x="414" y="104" width="52" height="8" rx="4" fill="#94a3b8" /><rect x="424" y="118" width="20" height="8" fill="#fde68a" />
          {/* uncovered food + danger-zone thermometer (right) */}
          <rect x="500" y="270" width="200" height="14" fill="url(#ksteel)" />
          <ellipse cx="540" cy="286" rx="30" ry="12" fill="#fbbf24" /> {/* uncovered food */}
          <rect x="604" y="226" width="32" height="40" rx="4" fill="#fff" stroke="#cbd5e1" /><rect x="616" y="232" width="8" height="30" rx="4" fill="#fecaca" /><rect x="616" y="248" width="8" height="14" rx="4" fill="#ef4444" />
          {/* sink with knife + spill (right) */}
          <rect x="660" y="300" width="70" height="34" rx="4" fill="url(#ksteel)" stroke="#94a3b8" /><rect x="664" y="306" width="62" height="22" rx="2" fill="#7dd3fc" opacity="0.7" />
          <rect x="686" y="300" width="4" height="30" fill="#cbd5e1" /><rect x="682" y="296" width="12" height="8" rx="1" fill="#94a3b8" />
          <ellipse cx="648" cy="430" rx="48" ry="12" fill="#7dd3fc" opacity="0.55" />

          {SPOTS.map((s) => {
            const isFound = found.has(s.id); const isSafe = !s.hazard && active?.id === s.id;
            const col = isFound ? '#16a34a' : isSafe ? '#0891b2' : T.accent;
            return (
              <g key={s.id} onClick={() => click(s)} style={{ cursor: 'pointer' }}>
                {/* Enlarged invisible touch target for mobile responsiveness */}
                <circle cx={s.x} cy={s.y} r="28" fill="transparent" />
                {!isFound && !isSafe && (
                  <circle cx={s.x} cy={s.y} r="20" fill="none" stroke={col} strokeWidth="2" opacity="0.8">
                    <animate attributeName="r" values="16;24;16" dur="1.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8;0.1;0.8" dur="1.8s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle cx={s.x} cy={s.y} r="15" fill={isFound || isSafe ? col : '#ffffff'} fillOpacity={isFound || isSafe ? 0.9 : 0.35} stroke={col} strokeWidth="2.5" />
                {(isFound || isSafe) && <path d={`M${s.x - 6} ${s.y} l4 4 l8 -8`} fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />}
              </g>
            );
          })}
        </svg>
      </div>

      {active ? (
        <div className={`rounded-xl border p-3.5 transition-colors ${
          active.hazard
            ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/40'
            : 'bg-cyan-50 dark:bg-cyan-950/30 border-cyan-200 dark:border-cyan-900/40'
        }`}>
          <div className="flex items-center gap-2 mb-1.5">
            {active.hazard ? <TriangleAlert size={16} className="text-rose-600 dark:text-rose-400 flex-shrink-0" /> : <CheckCircle2 size={16} className="text-cyan-600 dark:text-cyan-400 flex-shrink-0" />}
            <span className={`font-bold text-sm ${active.hazard ? 'text-rose-700 dark:text-rose-300' : 'text-cyan-800 dark:text-cyan-200'}`}>
              {L(active.nameEn, active.nameHi)}
            </span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{L(active.whyEn, active.whyHi)}</p>
          <p className={`text-xs mt-1.5 font-bold ${active.hazard ? 'text-rose-700 dark:text-rose-300' : 'text-cyan-700 dark:text-cyan-300'}`}>
            → {L(active.fixEn, active.fixHi)}
          </p>
        </div>
      ) : (
        <p className="text-xs text-slate-400 text-center py-2">{L('Tap a pulsing marker to inspect it.', 'जांचने हेतु स्पंदित मार्कर टैप करें।')}</p>
      )}

      {done && (
        <div className="rounded-xl p-3.5 text-xs sm:text-sm font-medium flex items-center gap-2 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800/40">
          <CheckCircle2 size={18} className="flex-shrink-0" />
          <span>{L(`All ${TOTAL} hazards found (${misses} false alarms). This inspection habit is what passes a real food-safety audit.`,
            `सभी ${TOTAL} खतरे मिले (${misses} गलत)। यही निरीक्षण आदत असली खाद्य-सुरक्षा ऑडिट पास कराती है।`)}</span>
        </div>
      )}
      <button onClick={() => { setFound(new Set()); setMisses(0); setActive(null); }} className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-700">
        <RotateCcw size={13} /> {L('Reset inspection', 'निरीक्षण रीसेट करें')}
      </button>
    </FoodShell>
  );
}
