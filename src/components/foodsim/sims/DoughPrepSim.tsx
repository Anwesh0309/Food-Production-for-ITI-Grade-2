import { useMemo, useState } from 'react';
import { CheckCircle2, RotateCcw, X, Timer } from 'lucide-react';
import { FoodShell, FoodSlider, FoodStat, useLang } from '../foodPrimitives';
import { FOOD_THEMES } from '../foodTheme';
import { playTouchSound } from '@/utils/sound';

const T = FOOD_THEMES.dough;

interface Step { id: number; en: string; hi: string }
const STEPS: Step[] = [
  { id: 1, en: 'Sieve the flour', hi: 'आटा छानें' },
  { id: 2, en: 'Mix in yeast, salt & sugar', hi: 'यीस्ट, नमक व चीनी मिलाएं' },
  { id: 3, en: 'Add water, mix to a dough', hi: 'पानी डालकर आटा गूंथें' },
  { id: 4, en: 'Knead until smooth & elastic', hi: 'चिकना व लचीला होने तक गूंधें' },
];

function shuffle<T>(a: T[]): T[] { const r = [...a]; for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; }

// dough blob by stage 0..4
function Dough({ stage, rise = 0 }: { stage: number; rise?: number }) {
  const base = 26 + stage * 4;
  const r = base + rise; // rise 0..30
  const col = stage < 3 ? '#e7d6b8' : '#eacf9f';
  return (
    <svg viewBox="0 0 160 130" className="w-full max-w-[220px]">
      <ellipse cx="80" cy="118" rx="60" ry="8" fill="#0000000f" />
      <rect x="18" y="104" width="124" height="10" rx="3" fill="#cbd5e1" />
      {stage === 0 ? (
        <g>{Array.from({ length: 22 }, (_, i) => <circle key={i} cx={50 + (i % 6) * 12} cy={80 + Math.floor(i / 6) * 7} r="2.4" fill="#e7d6b8" />)}</g>
      ) : stage < 3 ? (
        <path d="M44 100 Q40 74 62 70 Q80 64 100 70 Q120 76 116 100 Z" fill={col} stroke="#d6c08f" strokeWidth="1.5" />
      ) : (
        <circle cx="80" cy={100 - r} r={r} fill={col} stroke="#d6c08f" strokeWidth="1.5" />
      )}
      {stage >= 3 && rise > 0 && Array.from({ length: 5 }, (_, i) => (
        <circle key={i} cx={64 + i * 8} cy={100 - r} r="1.6" fill="#d6c08f" />
      ))}
    </svg>
  );
}

export function DoughPrepSim() {
  const L = useLang();
  const [ordered, setOrdered] = useState<number[]>([]);
  const [wrongId, setWrongId] = useState<number | null>(null);
  const [prove, setProve] = useState(0);
  const [tested, setTested] = useState(false);
  const shuffled = useMemo(() => shuffle(STEPS), []);

  const kneaded = ordered.length === STEPS.length;
  const nextExpected = ordered.length + 1;
  const pick = (s: Step) => {
    if (s.id === nextExpected) {
      const isDone = ordered.length + 1 === STEPS.length;
      setOrdered((o) => [...o, s.id]);
      playTouchSound(isDone ? 'success' : 'pop');
    } else {
      setWrongId(s.id);
      playTouchSound('error');
      setTimeout(() => setWrongId(null), 600);
    }
  };

  // proving sweet-spot 55–95 min
  const rise = kneaded ? Math.min(30, Math.max(0, (prove - 10) * 0.28)) * (prove > 150 ? 0.4 : 1) : 0;
  const proveVerdict = prove < 40 ? 'under' : prove > 150 ? 'over' : prove >= 55 && prove <= 110 ? 'perfect' : 'ok';

  return (
    <FoodShell accent={T.accent} Icon={T.Icon}
      title={L('Dough Preparation', 'आटा तैयारी')}
      subtitle={L('First put the dough-making steps in order, then prove the dough for the right time so it rises perfectly.',
        'पहले आटा बनाने के चरण क्रम में रखें, फिर सही समय तक प्रूव करें ताकि यह पूरी तरह फूले।')}
    >
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-surface-dark-2 flex justify-center py-2">
        <Dough stage={kneaded ? 4 : ordered.length} rise={rise} />
      </div>

      {/* Phase 1: order steps */}
      {!kneaded && (
        <div className="space-y-2">
          {ordered.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {ordered.map((id, i) => (
                <span key={id} className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-lg" style={{ background: `${T.accent}14`, color: T.accent }}>
                  <span className="font-bold">{i + 1}</span> {L(STEPS[id - 1].en, STEPS[id - 1].hi)}
                </span>
              ))}
            </div>
          )}
          <p className="text-xs text-slate-500">{L(`Which step is next? (${nextExpected}/${STEPS.length})`, `अगला चरण? (${nextExpected}/${STEPS.length})`)}</p>
          {shuffled.filter((s) => !ordered.includes(s.id)).map((s) => (
            <button key={s.id} onClick={() => pick(s)}
              className={`w-full text-left text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border flex items-center gap-2.5 transition-all cursor-pointer shadow-2xs ${
                wrongId === s.id
                  ? 'border-red-500 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300'
                  : 'bg-white dark:bg-surface-dark-2 border-slate-200 dark:border-slate-700 hover:border-amber-500 text-slate-800 dark:text-slate-200'
              }`}>
              <span className="flex-1">{L(s.en, s.hi)}</span>
              {wrongId === s.id && <X size={15} className="text-red-500 flex-shrink-0" />}
            </button>
          ))}
        </div>
      )}

      {/* Phase 2: prove */}
      {kneaded && (
        <div className="space-y-3">
          <div className="rounded-lg p-2.5 text-xs flex items-center gap-2" style={{ background: '#16a34a14', color: '#15803d' }}>
            <CheckCircle2 size={14} /> {L('Dough kneaded and smooth. Now let it prove (rise).', 'आटा गूंधा व चिकना। अब इसे प्रूव (फूलने) दें।')}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <FoodStat label={L('Proving time', 'प्रूविंग समय')} value={prove} unit=" min" color={T.accent} />
            <FoodStat label={L('Rise', 'फुलाव')} value={`${Math.round((rise / 30) * 100)}%`} color={proveVerdict === 'perfect' ? '#16a34a' : T.accent} />
          </div>
          <FoodSlider label={L('Drag to prove the dough', 'आटा प्रूव करने हेतु खींचें')} value={prove} min={0} max={180} step={5} unit=" min" onChange={(v) => { setProve(v); setTested(true); }} color={T.accent} />
          {tested && (
            <div className="rounded-xl p-3 text-sm" style={{
              background: proveVerdict === 'perfect' ? '#16a34a1a' : proveVerdict === 'over' || proveVerdict === 'under' ? '#e11d481a' : '#f59e0b1a',
              color: proveVerdict === 'perfect' ? '#15803d' : proveVerdict === 'over' || proveVerdict === 'under' ? '#be123c' : '#b45309',
            }}>
              {proveVerdict === 'under' && L('Under-proved — too little time. The yeast has not made enough gas, so the bread will be dense and heavy.', 'कम प्रूव — बहुत कम समय। यीस्ट ने पर्याप्त गैस नहीं बनाई, ब्रेड घनी व भारी होगी।')}
              {proveVerdict === 'ok' && L('Almost there. Give it a little more time to double in size.', 'लगभग तैयार। दोगुना होने हेतु थोड़ा और समय दें।')}
              {proveVerdict === 'perfect' && L('Perfectly proved! The dough has doubled and springs back slowly — ready to knock back, shape and bake.', 'पूर्ण प्रूव! आटा दोगुना हो गया व धीरे वापस आता है — अब आकार देकर बेक करें।')}
              {proveVerdict === 'over' && L('Over-proved — too long. The dough has stretched too far and will collapse in the oven.', 'अधिक प्रूव — बहुत लंबा। आटा बहुत खिंच गया व ओवन में बैठ जाएगा।')}
            </div>
          )}
        </div>
      )}

      <button onClick={() => { setOrdered([]); setProve(0); setTested(false); setWrongId(null); }} className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-700">
        <RotateCcw size={13} /> {L('Start over', 'फिर से शुरू करें')}
      </button>
      <p className="text-[11px] text-slate-400 flex items-center gap-1"><Timer size={11} /> {L('Tip: real bread dough proves in a warm place for about 1 hour until doubled.', 'सुझाव: असली ब्रेड आटा गर्म स्थान पर लगभग 1 घंटे में दोगुना होता है।')}</p>
    </FoodShell>
  );
}
