import { useState } from 'react';
import { CheckCircle2, RotateCcw, ArrowRight, Flame } from 'lucide-react';
import { FoodShell, FoodStat, useLang } from '../foodPrimitives';
import { FOOD_THEMES } from '../foodTheme';

const T = FOOD_THEMES.bakery;

interface Item { id: string; en: string; hi: string; band: number; tempEn: string; tempHi: string }
// band: 0 low(150-170) 1 moderate(180-190) 2 hot(200-220) 3 very hot(230+)
const ITEMS: Item[] = [
  { id: 'cake', en: 'Sponge cake', hi: 'स्पंज केक', band: 0, tempEn: 'Low heat (160–170°C) bakes a sponge gently so it stays soft and does not crack.', tempHi: 'कम आंच (160–170°C) स्पंज को धीरे बेक करती है ताकि वह नरम रहे व न फटे।' },
  { id: 'cookies', en: 'Cookies', hi: 'कुकीज़', band: 1, tempEn: 'Moderate heat (180°C) gives cookies a golden edge and a soft centre.', tempHi: 'मध्यम आंच (180°C) कुकीज़ को सुनहरा किनारा व नरम केंद्र देती है।' },
  { id: 'bread', en: 'Bread loaf', hi: 'ब्रेड लोफ', band: 2, tempEn: 'Hot oven (210–220°C) gives bread a strong rise and a crisp crust.', tempHi: 'गर्म ओवन (210–220°C) ब्रेड को अच्छा उठान व कुरकुरी परत देता है।' },
  { id: 'puff', en: 'Puff pastry', hi: 'पफ पेस्ट्री', band: 3, tempEn: 'Very hot oven (230°C) turns the butter layers to steam fast, making the pastry puff up.', tempHi: 'बहुत गर्म ओवन (230°C) मक्खन परतों को तेज़ भाप में बदलता है, पेस्ट्री फूलती है।' },
];
const BANDS = [
  { en: 'Low · 160°C', hi: 'कम · 160°C' },
  { en: 'Moderate · 180°C', hi: 'मध्यम · 180°C' },
  { en: 'Hot · 215°C', hi: 'गर्म · 215°C' },
  { en: 'Very hot · 230°C', hi: 'बहुत गर्म · 230°C' },
];

export function BakerySim() {
  const L = useLang();
  const [idx, setIdx] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [doneCount, setDoneCount] = useState(0);

  const item = ITEMS[idx];
  const diff = choice === null ? 0 : choice - item.band; // 0 perfect, <0 pale, >0 burnt
  const result = choice === null ? 'raw' : diff === 0 ? 'golden' : diff < 0 ? 'pale' : 'burnt';
  const bakeColor = result === 'golden' ? '#c8841f' : result === 'pale' ? '#ecd9b0' : result === 'burnt' ? '#3f2a1a' : '#e7d6b8';

  const choose = (b: number) => {
    if (choice !== null) return;
    setChoice(b);
    if (b === item.band) setScore((s) => s + 1);
    setDoneCount((d) => d + 1);
  };
  const next = () => { setIdx((i) => (i + 1) % ITEMS.length); setChoice(null); };
  const reset = () => { setIdx(0); setChoice(null); setScore(0); setDoneCount(0); };
  const allDone = doneCount >= ITEMS.length;

  return (
    <FoodShell accent={T.accent} Icon={T.Icon}
      title={L('Bakery: Bake at the Right Heat', 'बेकरी: सही आंच पर बेक करें')}
      subtitle={L('Each baked item needs its own oven temperature. Choose the right heat and watch it bake.',
        'प्रत्येक बेक वस्तु को अपना ओवन तापमान चाहिए। सही आंच चुनें व बेक होते देखें।')}
    >
      <div className="grid grid-cols-2 gap-2">
        <FoodStat label={L('Item', 'वस्तु')} value={`${Math.min(doneCount + (choice === null ? 1 : 0), ITEMS.length)}/${ITEMS.length}`} color={T.accent} />
        <FoodStat label={L('Correct bakes', 'सही बेक')} value={score} color={T.accent2} />
      </div>

      {/* oven */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-100 dark:bg-slate-900/60">
        <svg viewBox="0 0 320 200" className="w-full block max-w-md mx-auto">
          <rect x="0" y="0" width="320" height="200" className="fill-slate-100 dark:fill-slate-900" />
          <rect x="60" y="30" width="200" height="150" rx="10" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
          <rect x="74" y="60" width="172" height="100" rx="6" fill={result === 'burnt' ? '#2a1a10' : '#4b3626'} />
          {/* heat glow */}
          {choice !== null && <rect x="74" y="60" width="172" height="100" rx="6" fill={result === 'burnt' ? '#dc2626' : '#f59e0b'} fillOpacity={result === 'golden' ? 0.18 : result === 'burnt' ? 0.3 : 0.08} />}
          {/* rack */}
          <line x1="80" y1="150" x2="240" y2="150" stroke="#64748b" strokeWidth="2" />
          {/* baked item shape */}
          {item.id === 'cake' && <rect x="128" y="120" width="64" height="30" rx="4" fill={bakeColor} />}
          {item.id === 'cookies' && <g><circle cx="140" cy="140" r="12" fill={bakeColor} /><circle cx="168" cy="140" r="12" fill={bakeColor} /><circle cx="196" cy="140" r="12" fill={bakeColor} /></g>}
          {item.id === 'bread' && <path d="M126 150 Q126 112 160 112 Q194 112 194 150 Z" fill={bakeColor} />}
          {item.id === 'puff' && <path d={`M130 150 L138 ${result === 'golden' || result === 'burnt' ? 112 : 128} L150 ${result === 'golden' || result === 'burnt' ? 118 : 132} L162 ${result === 'golden' || result === 'burnt' ? 110 : 128} L174 ${result === 'golden' || result === 'burnt' ? 118 : 132} L182 ${result === 'golden' || result === 'burnt' ? 112 : 128} L190 150 Z`} fill={bakeColor} />}
          {/* knobs */}
          <circle cx="90" cy="46" r="6" fill="#64748b" /><circle cx="110" cy="46" r="6" fill="#64748b" />
          <text x="160" y="24" textAnchor="middle" fontSize="12" className="fill-slate-700 dark:fill-slate-200" fontWeight="700">{L(item.en, item.hi)}</text>
        </svg>
      </div>

      {choice === null ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {BANDS.map((b, i) => (
            <button key={i} onClick={() => choose(i)}
              className="px-3 py-2.5 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all bg-white dark:bg-surface-dark-2 border-slate-200 dark:border-slate-700 hover:border-orange-500 dark:hover:border-orange-400 text-slate-800 dark:text-slate-200 cursor-pointer shadow-2xs">
              <Flame size={14} className="text-orange-500 flex-shrink-0" />
              <span className="truncate">{L(b.en, b.hi)}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="rounded-xl p-3.5 text-xs sm:text-sm leading-relaxed border" style={{
            background: result === 'golden' ? '#16a34a14' : '#e11d4814',
            borderColor: result === 'golden' ? '#16a34a40' : '#e11d4840',
            color: result === 'golden' ? '#15803d' : '#be123c'
          }}>
            {result === 'golden'
              ? L(`Golden and perfect! ${item.tempEn}`, `सुनहरा व उत्तम! ${item.tempHi}`)
              : result === 'pale'
                ? L(`Too pale and under-baked — the oven was too cool. ${item.tempEn}`, `बहुत हल्का व कच्चा — ओवन बहुत ठंडा था। ${item.tempHi}`)
                : L(`Burnt — the oven was too hot. ${item.tempEn}`, `जल गया — ओवन बहुत गर्म था। ${item.tempHi}`)}
          </div>
          {!allDone ? (
            <button onClick={next} className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white shadow-sm cursor-pointer" style={{ background: T.accent }}>
              {L('Next item', 'अगली वस्तु')} <ArrowRight size={14} />
            </button>
          ) : (
            <div className="rounded-xl p-3.5 text-xs sm:text-sm font-medium flex items-center gap-2 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800/40">
              <CheckCircle2 size={18} className="flex-shrink-0" />
              <span>{L(`You baked all items — ${score}/${ITEMS.length} at the right heat. Delicate cakes need low heat; bread and pastry need a hot oven.`,
                `आपने सभी वस्तुएं बेक कीं — ${score}/${ITEMS.length} सही आंच पर। नाज़ुक केक को कम आंच; ब्रेड व पेस्ट्री को गर्म ओवन चाहिए।`)}</span>
            </div>
          )}
        </div>
      )}

      <button onClick={reset} className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-700">
        <RotateCcw size={13} /> {L('Reset', 'रीसेट')}
      </button>
    </FoodShell>
  );
}
