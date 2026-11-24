import { useState } from 'react';
import { Check, X, ArrowRight } from 'lucide-react';
import { FoodShell, FoodStat, useLang } from '../foodPrimitives';
import { FOOD_THEMES } from '../foodTheme';

const T = FOOD_THEMES.commodity;
const GROUPS = [
  { id: 'cereal', en: 'Cereals & pulses', hi: 'अनाज व दालें' },
  { id: 'veg', en: 'Vegetables & fruit', hi: 'सब्ज़ी व फल' },
  { id: 'dairy', en: 'Dairy & eggs', hi: 'डेयरी व अंडे' },
  { id: 'protein', en: 'Meat / poultry / fish', hi: 'मांस / पोल्ट्री / मछली' },
  { id: 'fat', en: 'Fats, oils & seasonings', hi: 'वसा, तेल व मसाले' },
];
const ITEMS = [
  { en: 'Basmati rice', hi: 'बासमती चावल', group: 'cereal' },
  { en: 'Paneer', hi: 'पनीर', group: 'dairy' },
  { en: 'Spinach', hi: 'पालक', group: 'veg' },
  { en: 'Chicken breast', hi: 'चिकन ब्रेस्ट', group: 'protein' },
  { en: 'Mustard oil', hi: 'सरसों तेल', group: 'fat' },
  { en: 'Red lentils', hi: 'मसूर दाल', group: 'cereal' },
  { en: 'Pomfret fish', hi: 'पॉम्फ्रेट मछली', group: 'protein' },
  { en: 'Black pepper', hi: 'काली मिर्च', group: 'fat' },
];

export function IngredientIdSim() {
  const L = useLang();
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0); const [asked, setAsked] = useState(0);
  const item = ITEMS[idx % ITEMS.length];
  const choose = (g: string) => { if (picked) return; setPicked(g); setAsked((a) => a + 1); if (g === item.group) setScore((s) => s + 1); };
  const next = () => { setPicked(null); setIdx((i) => i + 1); };

  return (
    <FoodShell accent={T.accent} Icon={T.Icon}
      title={L('Ingredient Classification', 'सामग्री वर्गीकरण')}
      subtitle={L('Sort each commodity into its correct food group — the first step of good stores management.',
        'हर वस्तु को सही खाद्य समूह में रखें — अच्छे भंडार प्रबंधन का पहला चरण।')}
      controls={<div className="grid sm:grid-cols-2 gap-2">
        {GROUPS.map((g) => {
          const state = picked ? (g.id === item.group ? 'right' : g.id === picked ? 'wrong' : 'dim') : 'idle';
          return (
            <button key={g.id} onClick={() => choose(g.id)} disabled={!!picked}
              className={`text-left text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer shadow-2xs ${
                state === 'right' ? 'border-green-500 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300 font-bold'
                : state === 'wrong' ? 'border-red-500 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300'
                : state === 'dim' ? 'border-slate-200 dark:border-slate-700 opacity-40 bg-white dark:bg-surface-dark-2'
                : 'border-slate-200 dark:border-slate-700 hover:border-amber-500 bg-white dark:bg-surface-dark-2 text-slate-800 dark:text-slate-200'}`}>
              <span className="pr-2">{L(g.en, g.hi)}</span>
              {state === 'right' && <Check size={16} className="ml-auto text-green-600 flex-shrink-0" />}
              {state === 'wrong' && <X size={16} className="ml-auto text-red-600 flex-shrink-0" />}
            </button>
          );
        })}
      </div>}
    >
      <div className="rounded-xl border p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3" style={{ borderColor: `${T.accent}44`, background: `${T.accent}0d` }}>
        <div className="flex items-center gap-3 min-w-0">
          <span className="grid place-items-center w-11 h-11 rounded-xl text-white flex-shrink-0 shadow-xs" style={{ background: T.accent }}><T.Icon size={22} /></span>
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">{L('Which food group does this belong to?', 'यह किस खाद्य समूह में आता है?')}</p>
            <p className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 break-words">{L(item.en, item.hi)}</p>
          </div>
        </div>
        <div className="flex-shrink-0 self-start sm:self-auto">
          <FoodStat label={L('Score', 'स्कोर')} value={`${score}/${asked}`} color={T.accent} />
        </div>
      </div>
      {picked && (
        <div className="text-right pt-1">
          <button onClick={next} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-white text-xs sm:text-sm shadow-sm cursor-pointer" style={{ background: T.accent }}>
            {L('Next item', 'अगली सामग्री')} <ArrowRight size={14} />
          </button>
        </div>
      )}
    </FoodShell>
  );
}
