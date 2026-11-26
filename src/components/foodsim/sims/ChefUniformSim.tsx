import { useState } from 'react';
import { CheckCircle2, RotateCcw, Shirt } from 'lucide-react';
import { FoodShell, FoodProgress, useLang } from '../foodPrimitives';
import { FOOD_THEMES } from '../foodTheme';
import { playTouchSound } from '@/utils/sound';

const T = FOOD_THEMES.uniform;

interface Part { id: string; en: string; hi: string; whyEn: string; whyHi: string }
const PARTS: Part[] = [
  { id: 'toque', en: 'Toque (chef hat)', hi: 'टॉक (शेफ टोपी)',
    whyEn: 'The tall white hat keeps hair out of the food and shows the wearer is a trained chef.', whyHi: 'ऊंची सफेद टोपी बालों को भोजन से दूर रखती है और प्रशिक्षित शेफ दर्शाती है।' },
  { id: 'neckerchief', en: 'Neckerchief', hi: 'गले का स्कार्फ',
    whyEn: 'The neck-cloth soaks up sweat so it does not drip, and once helped cool the neck in a hot kitchen.', whyHi: 'गले का कपड़ा पसीना सोखता है ताकि टपके नहीं, और गर्म रसोई में गर्दन ठंडी रखता था।' },
  { id: 'jacket', en: 'Double-breasted jacket', hi: 'डबल-ब्रेस्टेड जैकेट',
    whyEn: 'Two layers of thick cotton protect the chest from heat and splashes; it can be re-buttoned to hide stains.', whyHi: 'मोटे कपास की दो परतें छाती को गर्मी व छींटों से बचाती हैं; दाग छिपाने हेतु दोबारा बटन लगा सकते हैं।' },
  { id: 'apron', en: 'Apron', hi: 'एप्रन',
    whyEn: 'The apron protects the jacket and trousers from spills and keeps the uniform clean.', whyHi: 'एप्रन जैकेट व पतलून को गिरने से बचाता है और वर्दी साफ रखता है।' },
  { id: 'trousers', en: 'Checked trousers', hi: 'चेकदार पतलून',
    whyEn: 'The black-and-white check hides small stains and the loose fit is comfortable for long shifts.', whyHi: 'काले-सफेद चेक छोटे दाग छिपाते हैं और ढीली फिटिंग लंबी शिफ्ट में आरामदायक है।' },
  { id: 'towel', en: 'Side towel', hi: 'साइड तौलिया',
    whyEn: 'A dry cloth kept at the waist is used to lift hot pans safely — never a wet one, which carries heat.', whyHi: 'कमर पर रखा सूखा कपड़ा गर्म पैन सुरक्षित उठाने हेतु — गीला कभी नहीं, जो गर्मी ले जाता है।' },
  { id: 'shoes', en: 'Safety shoes', hi: 'सुरक्षा जूते',
    whyEn: 'Closed, non-slip shoes protect the feet from dropped knives, hot spills and wet floors.', whyHi: 'बंद, फिसलन-रोधी जूते पैरों को गिरे चाकू, गर्म छींटों व गीले फर्श से बचाते हैं।' },
];

export function ChefUniformSim() {
  const L = useLang();
  const [worn, setWorn] = useState<Set<string>>(new Set());
  const [active, setActive] = useState<Part | null>(null);
  const toggle = (p: Part) => {
    setActive(p);
    setWorn((w) => {
      const n = new Set(w);
      const willAdd = !n.has(p.id);
      if (willAdd) {
        n.add(p.id);
        playTouchSound(n.size === PARTS.length ? 'success' : 'pop');
      } else {
        n.delete(p.id);
        playTouchSound('tap');
      }
      return n;
    });
  };
  const has = (id: string) => worn.has(id);
  const done = worn.size === PARTS.length;

  return (
    <FoodShell accent={T.accent} Icon={T.Icon}
      title={L('Chef Uniform Studio', 'शेफ वर्दी स्टूडियो')}
      subtitle={L('Tap each item to dress the chef and learn why every part of the uniform matters.',
        'शेफ को तैयार करने हेतु प्रत्येक वस्तु टैप करें और जानें कि वर्दी का हर भाग क्यों ज़रूरी है।')}
    >
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-slate-600 dark:text-slate-300">{L('Uniform complete', 'वर्दी पूर्ण')}</span>
        <span className="font-mono font-bold" style={{ color: T.accent }}>{worn.size}/{PARTS.length}</span>
      </div>
      <FoodProgress value={worn.size} max={PARTS.length} accent={T.accent} />

      <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">
        {/* chef figure */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-surface-dark-2 flex justify-center py-3">
          <svg viewBox="0 0 220 320" className="w-full max-w-[260px]">
            {/* legs / trousers */}
            <g onClick={() => { const p = PARTS.find(x => x.id === 'trousers'); if (p) toggle(p); }} style={{ cursor: 'pointer' }}>
              {has('trousers') ? (
                <g>
                  <rect x="78" y="210" width="28" height="86" rx="4" fill="#e5e7eb" />
                  <rect x="114" y="210" width="28" height="86" rx="4" fill="#e5e7eb" />
                  {Array.from({ length: 6 }, (_, i) => <line key={'a' + i} x1="78" y1={216 + i * 14} x2="106" y2={216 + i * 14} stroke="#334155" strokeWidth="1" />)}
                  {Array.from({ length: 6 }, (_, i) => <line key={'b' + i} x1="114" y1={216 + i * 14} x2="142" y2={216 + i * 14} stroke="#334155" strokeWidth="1" />)}
                  {Array.from({ length: 2 }, (_, i) => <line key={'c' + i} x1={85 + i * 12} y1="210" x2={85 + i * 12} y2="296" stroke="#334155" strokeWidth="1" />)}
                  {Array.from({ length: 2 }, (_, i) => <line key={'d' + i} x1={121 + i * 12} y1="210" x2={121 + i * 12} y2="296" stroke="#334155" strokeWidth="1" />)}
                </g>
              ) : (
                <g><rect x="78" y="210" width="28" height="86" rx="4" fill="#cbd5e1" /><rect x="114" y="210" width="28" height="86" rx="4" fill="#cbd5e1" /></g>
              )}
            </g>
            {/* shoes */}
            <g onClick={() => { const p = PARTS.find(x => x.id === 'shoes'); if (p) toggle(p); }} style={{ cursor: 'pointer' }}>
              <rect x="72" y="296" width="36" height="14" rx="5" fill={has('shoes') ? '#1f2937' : '#e2e8f0'} stroke="#94a3b8" strokeWidth={has('shoes') ? 0 : 1} />
              <rect x="112" y="296" width="36" height="14" rx="5" fill={has('shoes') ? '#1f2937' : '#e2e8f0'} stroke="#94a3b8" strokeWidth={has('shoes') ? 0 : 1} />
            </g>
            {/* arms */}
            <rect x="50" y="150" width="20" height="70" rx="9" fill={has('jacket') ? '#f8fafc' : '#f1c9a5'} stroke="#cbd5e1" strokeWidth="1" />
            <rect x="150" y="150" width="20" height="70" rx="9" fill={has('jacket') ? '#f8fafc' : '#f1c9a5'} stroke="#cbd5e1" strokeWidth="1" />
            {/* torso / jacket */}
            <g onClick={() => { const p = PARTS.find(x => x.id === 'jacket'); if (p) toggle(p); }} style={{ cursor: 'pointer' }}>
              {has('jacket') ? (
                <g>
                  <rect x="66" y="142" width="88" height="78" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
                  <path d="M110 142 V220" stroke="#e2e8f0" strokeWidth="1" />
                  {Array.from({ length: 4 }, (_, i) => <circle key={'l' + i} cx="96" cy={156 + i * 15} r="2.5" fill="#cbd5e1" />)}
                  {Array.from({ length: 4 }, (_, i) => <circle key={'r' + i} cx="124" cy={156 + i * 15} r="2.5" fill="#cbd5e1" />)}
                </g>
              ) : (
                <rect x="70" y="146" width="80" height="74" rx="8" fill="#f1c9a5" stroke="#e2b48c" strokeWidth="1" />
              )}
            </g>
            {/* apron */}
            <g onClick={() => { const p = PARTS.find(x => x.id === 'apron'); if (p) toggle(p); }} style={{ cursor: 'pointer' }}>
              {has('apron') ? (
                <g>
                  <rect x="84" y="176" width="52" height="88" rx="4" fill="#ffffff" fillOpacity="0.92" stroke="#e2e8f0" />
                  <line x1="110" y1="150" x2="96" y2="176" stroke="#e5e7eb" strokeWidth="3" />
                  <line x1="110" y1="150" x2="124" y2="176" stroke="#e5e7eb" strokeWidth="3" />
                </g>
              ) : (
                <rect x="84" y="176" width="52" height="40" rx="4" fill="transparent" />
              )}
            </g>
            {/* side towel */}
            <g onClick={() => { const p = PARTS.find(x => x.id === 'towel'); if (p) toggle(p); }} style={{ cursor: 'pointer' }}>
              {has('towel') ? (
                <rect x="138" y="196" width="16" height="30" rx="2" fill="#dbeafe" stroke="#93c5fd" transform="rotate(6 146 211)" />
              ) : (
                <rect x="138" y="196" width="16" height="30" rx="2" fill="transparent" />
              )}
            </g>
            {/* neckerchief */}
            <g onClick={() => { const p = PARTS.find(x => x.id === 'neckerchief'); if (p) toggle(p); }} style={{ cursor: 'pointer' }}>
              {has('neckerchief') && <path d="M92 140 L128 140 L110 160 Z" fill="#1e3a8a" />}
            </g>
            {/* neck */}
            <rect x="100" y="120" width="20" height="24" fill="#f1c9a5" />
            {/* head */}
            <circle cx="110" cy="100" r="26" fill="#f1c9a5" stroke="#e2b48c" strokeWidth="1" />
            <circle cx="102" cy="98" r="2.2" fill="#475569" /><circle cx="118" cy="98" r="2.2" fill="#475569" />
            <path d="M103 110 Q110 115 117 110" fill="none" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round" />
            {/* toque */}
            <g onClick={() => { const p = PARTS.find(x => x.id === 'toque'); if (p) toggle(p); }} style={{ cursor: 'pointer' }}>
              {has('toque') ? (
                <g>
                  <rect x="84" y="46" width="52" height="30" rx="6" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
                  <ellipse cx="96" cy="46" rx="14" ry="16" fill="#ffffff" stroke="#e2e8f0" />
                  <ellipse cx="110" cy="42" rx="15" ry="18" fill="#ffffff" stroke="#e2e8f0" />
                  <ellipse cx="124" cy="46" rx="14" ry="16" fill="#ffffff" stroke="#e2e8f0" />
                  <rect x="84" y="70" width="52" height="8" rx="2" fill="#f1f5f9" stroke="#e2e8f0" />
                </g>
              ) : (
                <g>
                  <rect x="84" y="46" width="52" height="36" fill="transparent" />
                  <path d="M86 84 Q110 70 134 84" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
                </g>
              )}
            </g>
          </svg>
        </div>

        {/* parts tray */}
        <div className="flex flex-col gap-2.5">
          {PARTS.map((p) => {
            const isWorn = has(p.id);
            return (
              <button
                key={p.id}
                onClick={() => toggle(p)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs sm:text-sm font-bold border transition-all text-left cursor-pointer shadow-2xs ${
                  isWorn
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 ring-2 ring-blue-400/30'
                    : 'bg-white dark:bg-surface-dark-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-200'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Shirt size={17} className={isWorn ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'} />
                  <span>{L(p.en, p.hi)}</span>
                </span>
                {isWorn && <CheckCircle2 size={17} className="text-blue-600 dark:text-blue-400 flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {active ? (
        <div className="rounded-xl border p-4 bg-blue-50/70 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/40">
          <p className="font-bold text-sm sm:text-base mb-1.5 text-blue-700 dark:text-blue-300">{L(active.en, active.hi)}</p>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{L(active.whyEn, active.whyHi)}</p>
        </div>
      ) : (
        <p className="text-xs sm:text-sm text-slate-400 text-center py-1.5">{L('Tap an item to put it on the chef and read why it matters.', 'शेफ पर पहनाने व कारण पढ़ने हेतु वस्तु टैप करें।')}</p>
      )}

      {done && (
        <div className="rounded-xl p-3.5 text-xs sm:text-sm font-medium flex items-center gap-2 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800/40">
          <CheckCircle2 size={18} className="flex-shrink-0" />
          <span>{L('Fully dressed and ready for service. Every part of the uniform protects the chef and keeps the food safe.',
            'पूरी तरह तैयार। वर्दी का हर भाग शेफ की रक्षा और भोजन को सुरक्षित रखता है।')}</span>
        </div>
      )}
      <button onClick={() => { setWorn(new Set()); setActive(null); }} className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-700">
        <RotateCcw size={13} /> {L('Undress / reset', 'रीसेट करें')}
      </button>
    </FoodShell>
  );
}
