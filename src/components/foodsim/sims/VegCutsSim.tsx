import { useState, useMemo } from 'react';
import { Check, X, ArrowRight } from 'lucide-react';
import { FoodShell, FoodStat, useLang } from '../foodPrimitives';
import { FOOD_THEMES } from '../foodTheme';

const T = FOOD_THEMES.cuts;
const VEG = '#f59e0b';

interface Cut { id: string; en: string; hi: string; draw: JSX.Element }
const rects = (arr: [number, number, number, number][]) => arr.map(([x, y, w, h], i) => <rect key={i} x={x} y={y} width={w} height={h} rx={1.5} fill={VEG} />);

const CUTS: Cut[] = [
  { id: 'julienne', en: 'Julienne', hi: 'जूलियन', draw: <g>{rects(Array.from({ length: 7 }, (_, i): [number, number, number, number] => [20 + i * 14, 20, 5, 60]))}</g> },
  { id: 'brunoise', en: 'Brunoise', hi: 'ब्रुनोइस', draw: <g>{rects(Array.from({ length: 24 }, (_, i): [number, number, number, number] => [26 + (i % 6) * 15, 22 + Math.floor(i / 6) * 15, 9, 9]))}</g> },
  { id: 'macedoine', en: 'Macédoine (dice)', hi: 'मैसिडॉइन (डाइस)', draw: <g>{rects(Array.from({ length: 9 }, (_, i): [number, number, number, number] => [30 + (i % 3) * 32, 22 + Math.floor(i / 3) * 22, 22, 18]))}</g> },
  { id: 'baton', en: 'Baton / Jardinière', hi: 'बैटन / जार्डिनियर', draw: <g>{rects(Array.from({ length: 4 }, (_, i): [number, number, number, number] => [30 + i * 24, 18, 14, 64]))}</g> },
  { id: 'chiffonade', en: 'Chiffonade', hi: 'शिफोनेड', draw: <g>{Array.from({ length: 6 }, (_, i) => <path key={i} d={`M18 ${22 + i * 10} q30 -6 60 0 t60 0`} stroke={VEG} strokeWidth={4} fill="none" strokeLinecap="round" />)}</g> },
];

export function VegCutsSim() {
  const L = useLang();
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0); const [asked, setAsked] = useState(0);
  const order = useMemo(() => [...CUTS].sort(() => Math.random() - 0.5), []);
  const cut = order[idx % order.length];
  const options = useMemo(() => {
    const wrong = CUTS.filter((c) => c.id !== cut.id).sort(() => Math.random() - 0.5).slice(0, 3);
    return [...wrong, cut].sort(() => Math.random() - 0.5);
  }, [cut]);
  const choose = (id: string) => { if (picked) return; setPicked(id); setAsked((a) => a + 1); if (id === cut.id) setScore((s) => s + 1); };
  const next = () => { setPicked(null); setIdx((i) => i + 1); };

  return (
    <FoodShell accent={T.accent} Icon={T.Icon}
      title={L('Vegetable Cut Identification', 'सब्ज़ी कट पहचान')}
      subtitle={L('Name the classical vegetable cut shown. Uniform cuts cook evenly and look professional.',
        'दिखाया शास्त्रीय सब्ज़ी कट नाम दें। समान कट समान पकते व पेशेवर दिखते हैं।')}
      controls={<div className="grid grid-cols-2 gap-2">
        {options.map((o) => {
          const state = picked ? (o.id === cut.id ? 'right' : o.id === picked ? 'wrong' : 'dim') : 'idle';
          return (
            <button key={o.id} onClick={() => choose(o.id)} disabled={!!picked}
              className={`text-left text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer shadow-2xs ${
                state === 'right' ? 'border-green-500 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300 font-bold'
                : state === 'wrong' ? 'border-red-500 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300'
                : state === 'dim' ? 'border-slate-200 dark:border-slate-700 opacity-40 bg-white dark:bg-surface-dark-2'
                : 'border-slate-200 dark:border-slate-700 hover:border-green-500 bg-white dark:bg-surface-dark-2 text-slate-800 dark:text-slate-200'}`}>
              <span className="pr-1">{L(o.en, o.hi)}</span>
              {state === 'right' && <Check size={16} className="ml-auto text-green-600 flex-shrink-0" />}
              {state === 'wrong' && <X size={16} className="ml-auto text-red-600 flex-shrink-0" />}
            </button>
          );
        })}
      </div>}
    >
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-amber-50/40 dark:bg-slate-900/40">
        <svg viewBox="0 0 180 100" className="w-full max-w-[280px] mx-auto block" style={{ maxHeight: 150 }}>
          <rect x="0" y="0" width="180" height="100" className="fill-amber-50/30 dark:fill-slate-900/50" />
          {/* chopping board */}
          <rect x="8" y="8" width="164" height="84" rx="6" fill="#e9dcc3" stroke="#cbb893" strokeWidth="2" />
          {cut.draw}
        </svg>
      </div>
      <div className="flex items-center justify-between gap-3 flex-wrap pt-1">
        <FoodStat label={L('Score', 'स्कोर')} value={`${score}/${asked}`} color={T.accent} />
        {picked && (
          <button onClick={next} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-white text-xs sm:text-sm shadow-sm cursor-pointer" style={{ background: T.accent }}>
            {L('Next cut', 'अगला कट')} <ArrowRight size={14} />
          </button>
        )}
      </div>
    </FoodShell>
  );
}
