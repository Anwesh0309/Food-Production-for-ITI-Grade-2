import { useState, useMemo } from 'react';
import { Check, X, ArrowRight } from 'lucide-react';
import { FoodShell, FoodStat, useLang } from '../foodPrimitives';
import { FOOD_THEMES } from '../foodTheme';

const T = FOOD_THEMES.equipment;
interface Q { tool: { en: string; hi: string }; use: { en: string; hi: string }; wrong: { en: string; hi: string }[] }
const TOOLS: Q[] = [
  { tool: { en: 'Paring knife', hi: 'पैरिंग चाकू' }, use: { en: 'Peeling and small detailed work', hi: 'छिलना व छोटे बारीक कार्य' }, wrong: [{ en: 'Slicing bread', hi: 'ब्रेड स्लाइस करना' }, { en: 'Cleaving bone', hi: 'हड्डी काटना' }, { en: 'Whisking eggs', hi: 'अंडे फेंटना' }] },
  { tool: { en: 'Boning knife', hi: 'बोनिंग चाकू' }, use: { en: 'Separating meat from the bone', hi: 'मांस को हड्डी से अलग करना' }, wrong: [{ en: 'Spreading butter', hi: 'मक्खन लगाना' }, { en: 'Grating cheese', hi: 'चीज़ कद्दूकस' }, { en: 'Peeling potatoes', hi: 'आलू छीलना' }] },
  { tool: { en: 'Mandoline', hi: 'मैंडोलिन' }, use: { en: 'Thin, even slices quickly', hi: 'जल्दी पतली समान स्लाइस' }, wrong: [{ en: 'Deep-frying', hi: 'डीप-फ्राई' }, { en: 'Measuring liquids', hi: 'तरल मापना' }, { en: 'Kneading dough', hi: 'आटा गूंथना' }] },
  { tool: { en: 'Whisk', hi: 'व्हिस्क' }, use: { en: 'Incorporating air / blending', hi: 'हवा मिलाना / ब्लेंड करना' }, wrong: [{ en: 'Cutting vegetables', hi: 'सब्ज़ी काटना' }, { en: 'Flipping steaks', hi: 'स्टेक पलटना' }, { en: 'Straining stock', hi: 'स्टॉक छानना' }] },
  { tool: { en: 'Chinois / strainer', hi: 'शिनोइस / छलनी' }, use: { en: 'Straining sauces and stocks smooth', hi: 'सॉस व स्टॉक चिकना छानना' }, wrong: [{ en: 'Browning meat', hi: 'मांस भूनना' }, { en: 'Weighing flour', hi: 'आटा तौलना' }, { en: 'Piping cream', hi: 'क्रीम पाइप करना' }] },
  { tool: { en: 'Tongs', hi: 'टोंग' }, use: { en: 'Gripping and turning food without piercing', hi: 'भोजन बिना छेदे पकड़ना व पलटना' }, wrong: [{ en: 'Zesting lemon', hi: 'नींबू ज़ेस्ट' }, { en: 'Rolling pastry', hi: 'पेस्ट्री बेलना' }, { en: 'Measuring heat', hi: 'ताप मापना' }] },
];

export function EquipmentIdSim() {
  const L = useLang();
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0); const [asked, setAsked] = useState(0);
  const q = TOOLS[idx % TOOLS.length];
  const options = useMemo(() => [q.use, ...q.wrong].sort(() => Math.random() - 0.5), [idx]);
  const choose = (en: string) => { if (picked) return; setPicked(en); setAsked((a) => a + 1); if (en === q.use.en) setScore((s) => s + 1); };
  const next = () => { setPicked(null); setIdx((i) => i + 1); };

  return (
    <FoodShell accent={T.accent} Icon={T.Icon}
      title={L('Equipment & Tool Identification', 'उपकरण व औज़ार पहचान')}
      subtitle={L('What is each kitchen tool mainly used for? Build speed before your practical exam.',
        'हर रसोई औज़ार मुख्यतः किसलिए प्रयोग होता है? प्रैक्टिकल परीक्षा से पहले गति बनाएं।')}
      controls={<div className="grid sm:grid-cols-2 gap-2">
        {options.map((o) => {
          const state = picked ? (o.en === q.use.en ? 'right' : o.en === picked ? 'wrong' : 'dim') : 'idle';
          return (
            <button key={o.en} onClick={() => choose(o.en)} disabled={!!picked}
              className={`text-left text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer shadow-2xs ${
                state === 'right' ? 'border-green-500 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300 font-bold'
                : state === 'wrong' ? 'border-red-500 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300'
                : state === 'dim' ? 'border-slate-200 dark:border-slate-700 opacity-40 bg-white dark:bg-surface-dark-2'
                : 'border-slate-200 dark:border-slate-700 hover:border-indigo-500 bg-white dark:bg-surface-dark-2 text-slate-800 dark:text-slate-200'}`}>
              <span className="pr-2">{L(o.en, o.hi)}</span>
              {state === 'right' && <Check size={16} className="ml-auto text-green-600 flex-shrink-0" />}
              {state === 'wrong' && <X size={16} className="ml-auto text-red-600 flex-shrink-0" />}
            </button>
          );
        })}
      </div>}
    >
      <div className="rounded-xl border p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3" style={{ borderColor: `${T.accent}44`, background: `${T.accent}0d` }}>
        <div className="flex items-center gap-3 min-w-0">
          <span className="grid place-items-center w-11 h-11 rounded-xl text-white font-bold flex-shrink-0 shadow-xs" style={{ background: T.accent }}><T.Icon size={22} /></span>
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">{L('Identify the primary use of', 'मुख्य उपयोग पहचानें')}</p>
            <p className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 break-words">{L(q.tool.en, q.tool.hi)}</p>
          </div>
        </div>
        <div className="flex-shrink-0 self-start sm:self-auto">
          <FoodStat label={L('Score', 'स्कोर')} value={`${score}/${asked}`} color={T.accent} />
        </div>
      </div>
      {picked && (
        <div className="text-right pt-1">
          <button onClick={next} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-white text-xs sm:text-sm shadow-sm cursor-pointer" style={{ background: T.accent }}>
            {L('Next tool', 'अगला औज़ार')} <ArrowRight size={14} />
          </button>
        </div>
      )}
    </FoodShell>
  );
}
