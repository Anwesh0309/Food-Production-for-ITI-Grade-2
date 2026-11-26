import { useMemo, useState } from 'react';
import { CheckCircle2, RotateCcw, Droplets, X } from 'lucide-react';
import { FoodShell, FoodStat, useLang } from '../foodPrimitives';
import { FOOD_THEMES } from '../foodTheme';
import { playTouchSound } from '@/utils/sound';

const T = FOOD_THEMES.hygiene;

interface Step { id: number; en: string; hi: string }
// correct order by id 1..7
const STEPS: Step[] = [
  { id: 1, en: 'Wet hands with clean running water', hi: 'साफ बहते पानी से हाथ गीले करें' },
  { id: 2, en: 'Apply enough soap', hi: 'पर्याप्त साबुन लगाएं' },
  { id: 3, en: 'Rub palms together', hi: 'हथेलियां आपस में रगड़ें' },
  { id: 4, en: 'Scrub between fingers & backs of hands', hi: 'उंगलियों के बीच व हाथों के पीछे रगड़ें' },
  { id: 5, en: 'Scrub thumbs, fingertips & nails', hi: 'अंगूठे, उंगलियों के सिरे व नाखून रगड़ें' },
  { id: 6, en: 'Rinse well under running water', hi: 'बहते पानी में अच्छी तरह धोएं' },
  { id: 7, en: 'Dry with a clean towel / hand dryer', hi: 'साफ तौलिये / ड्रायर से सुखाएं' },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

export function KitchenHygieneSim() {
  const L = useLang();
  const [ordered, setOrdered] = useState<number[]>([]);
  const [wrongId, setWrongId] = useState<number | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const shuffled = useMemo(() => shuffle(STEPS), []);

  const nextExpected = ordered.length + 1; // ids are 1..7 in order
  const pick = (s: Step) => {
    if (ordered.includes(s.id)) return;
    if (s.id === nextExpected) {
      const isDone = ordered.length + 1 === STEPS.length;
      setOrdered((o) => [...o, s.id]);
      setWrongId(null);
      playTouchSound(isDone ? 'success' : 'pop');
    } else {
      setWrongId(s.id);
      setMistakes((m) => m + 1);
      playTouchSound('error');
      setTimeout(() => setWrongId(null), 600);
    }
  };
  const germs = Math.max(0, 100 - Math.round((ordered.length / STEPS.length) * 100));
  const done = ordered.length === STEPS.length;

  return (
    <FoodShell accent={T.accent} Icon={T.Icon}
      title={L('Kitchen Hygiene: Hand-Washing', 'रसोई स्वच्छता: हाथ धुलाई')}
      subtitle={L('Tap the steps in the correct order. Watch the germ level fall as you wash your hands the right way.',
        'चरणों को सही क्रम में टैप करें। सही तरीके से हाथ धोते ही कीटाणु स्तर गिरता देखें।')}
    >
      <div className="grid grid-cols-2 gap-2">
        <FoodStat label={L('Germs left', 'बचे कीटाणु')} value={`${germs}%`} color={germs > 50 ? '#dc2626' : germs > 0 ? '#d97706' : '#16a34a'} />
        <FoodStat label={L('Wrong taps', 'गलत टैप')} value={mistakes} color={T.accent} />
      </div>

      {/* germ bar + hands */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-3 flex items-center gap-4">
        <svg viewBox="0 0 90 90" className="w-20 h-20 flex-shrink-0">
          <path d="M30 70 Q24 50 28 38 Q30 30 34 38 L35 44 Q35 30 40 28 Q44 28 43 40 Q45 28 50 28 Q54 29 52 42 Q56 34 59 40 Q61 46 56 58 Q54 66 48 72 Z" fill="#f1c9a5" stroke="#e2b48c" strokeWidth="1" />
          {Array.from({ length: Math.round((germs / 100) * 6) }, (_, i) => (
            <circle key={i} cx={30 + (i % 3) * 9} cy={40 + Math.floor(i / 3) * 12} r="3" fill="#16a34a" fillOpacity="0.5">
              <animate attributeName="r" values="2.5;3.5;2.5" dur="1.4s" repeatCount="indefinite" />
            </circle>
          ))}
        </svg>
        <div className="flex-1">
          <div className="flex justify-between text-[11px] font-medium mb-1">
            <span className="text-slate-500">{L('Cleanliness', 'स्वच्छता')}</span>
            <span style={{ color: germs === 0 ? '#16a34a' : T.accent }}>{100 - germs}%</span>
          </div>
          <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width: `${100 - germs}%`, background: germs === 0 ? '#16a34a' : `linear-gradient(90deg, ${T.accent}, ${T.accent2})` }} />
          </div>
        </div>
      </div>

      {/* ordered sequence so far */}
      {ordered.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {ordered.map((id, i) => (
            <span key={id} className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-lg" style={{ background: `${T.accent}14`, color: T.accent }}>
              <span className="font-bold">{i + 1}</span> {L(STEPS[id - 1].en, STEPS[id - 1].hi)}
            </span>
          ))}
        </div>
      )}

      {/* remaining choices */}
      {!done && (
        <div className="grid gap-2">
          <p className="text-xs text-slate-500">{L(`Which step comes next? (step ${nextExpected} of ${STEPS.length})`, `अगला चरण कौन सा? (चरण ${nextExpected}/${STEPS.length})`)}</p>
          {shuffled.filter((s) => !ordered.includes(s.id)).map((s) => (
            <button key={s.id} onClick={() => pick(s)}
              className={`text-left text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border flex items-center gap-2.5 transition-all cursor-pointer shadow-2xs ${
                wrongId === s.id
                  ? 'border-red-500 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300'
                  : 'bg-white dark:bg-surface-dark-2 border-slate-200 dark:border-slate-700 hover:border-cyan-500 text-slate-800 dark:text-slate-200'
              }`}>
              <Droplets size={15} style={{ color: T.accent }} className="flex-shrink-0" />
              <span className="flex-1">{L(s.en, s.hi)}</span>
              {wrongId === s.id && <X size={15} className="text-red-500 flex-shrink-0" />}
            </button>
          ))}
        </div>
      )}

      {done && (
        <div className="rounded-xl p-3 text-sm font-medium flex items-center gap-2" style={{ background: '#16a34a1a', color: '#15803d' }}>
          <CheckCircle2 size={18} /> {L(`Hands clean! You ordered all 7 steps with ${mistakes} wrong taps. Wash this way before cooking, after touching raw food, and after using the toilet.`,
            `हाथ साफ! आपने सभी 7 चरण ${mistakes} गलत टैप के साथ क्रम में रखे। खाना पकाने से पहले, कच्चा भोजन छूने के बाद व शौचालय के बाद ऐसे धोएं।`)}
        </div>
      )}
      <button onClick={() => { setOrdered([]); setMistakes(0); setWrongId(null); }} className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-700">
        <RotateCcw size={13} /> {L('Start over', 'फिर से शुरू करें')}
      </button>
    </FoodShell>
  );
}
