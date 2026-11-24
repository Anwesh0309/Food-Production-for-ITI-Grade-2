import { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { FoodShell, FoodStat, useLang } from '../foodPrimitives';
import { FOOD_THEMES } from '../foodTheme';

const T = FOOD_THEMES.cooking;
interface Dish { en: string; hi: string; best: string[]; outcomes: Record<string, { ok: boolean; en: string; hi: string }> }
const METHODS = [
  { id: 'braise', en: 'Braise', hi: 'ब्रेज़' }, { id: 'grill', en: 'Grill', hi: 'ग्रिल' },
  { id: 'steam', en: 'Steam', hi: 'भाप' }, { id: 'deepfry', en: 'Deep-fry', hi: 'डीप-फ्राई' },
  { id: 'roast', en: 'Roast', hi: 'रोस्ट' }, { id: 'poach', en: 'Poach', hi: 'पोच' },
];
const DISHES: Dish[] = [
  { en: 'Tough beef shank', hi: 'कठोर बीफ शैंक', best: ['braise'], outcomes: {
    braise: { ok: true, en: 'Low, slow moist heat melts the connective tissue — meltingly tender.', hi: 'धीमा नम ताप संयोजी ऊतक गला देता है — बेहद नरम।' },
    grill: { ok: false, en: 'Fast dry heat leaves a tough cut chewy and dry.', hi: 'तेज़ शुष्क ताप कठोर कट को चिवी व सूखा छोड़ता है।' },
    deepfry: { ok: false, en: 'Frying cannot tenderise a tough cut — still chewy.', hi: 'फ्राइंग कठोर कट नरम नहीं कर सकती — अब भी चिवी।' } } },
  { en: 'Delicate fish fillet', hi: 'नाज़ुक मछली फिलेट', best: ['poach', 'steam'], outcomes: {
    poach: { ok: true, en: 'Gentle liquid keeps the fillet moist and intact.', hi: 'कोमल तरल फिलेट को नम व अखंड रखता है।' },
    steam: { ok: true, en: 'Steam cooks gently without drying — perfect.', hi: 'भाप बिना सुखाए कोमलता से पकाती है — उत्तम।' },
    grill: { ok: false, en: 'High heat can dry and break a delicate fillet.', hi: 'तेज़ ताप नाज़ुक फिलेट सुखा व तोड़ सकता है।' } } },
  { en: 'Whole chicken', hi: 'पूरा चिकन', best: ['roast'], outcomes: {
    roast: { ok: true, en: 'Dry oven heat crisps the skin and cooks it through evenly.', hi: 'शुष्क ओवन ताप त्वचा कुरकुरी व समान पकाता है।' },
    poach: { ok: false, en: 'Poaching gives pale, soft skin with no browning.', hi: 'पोचिंग से त्वचा पीली, नरम व बिना भूरापन।' },
    braise: { ok: false, en: 'Works, but you lose the crisp roasted skin.', hi: 'चलता है, पर कुरकुरी रोस्ट त्वचा खो जाती है।' } } },
  { en: 'Green vegetables', hi: 'हरी सब्ज़ियाँ', best: ['steam'], outcomes: {
    steam: { ok: true, en: 'Quick steaming keeps colour, crunch and vitamins.', hi: 'तेज़ भाप रंग, कुरकुरापन व विटामिन बचाती है।' },
    deepfry: { ok: false, en: 'Greasy and the vegetables lose their fresh bite.', hi: 'चिकनाहट व सब्ज़ियाँ ताज़ा कुरकुरापन खोती हैं।' },
    braise: { ok: false, en: 'Over-soft and dull-coloured.', hi: 'अधिक नरम व फीका रंग।' } } },
];

export function CookingMethodsSim() {
  const L = useLang();
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [asked, setAsked] = useState(0);
  const dish = DISHES[idx % DISHES.length];
  const outcome = picked ? (dish.outcomes[picked] ?? { ok: false, en: 'Not an ideal choice for this dish.', hi: 'इस व्यंजन हेतु आदर्श नहीं।' }) : null;

  const pick = (m: string) => { if (picked) return; setPicked(m); setAsked((a) => a + 1); if (dish.best.includes(m)) setScore((s) => s + 1); };
  const next = () => { setPicked(null); setIdx((i) => i + 1); };

  return (
    <FoodShell accent={T.accent} Icon={T.Icon}
      title={L('Cooking Methods Simulator', 'पाक विधि सिम्युलेटर')}
      subtitle={L('Pick the best cooking method for each dish and see the simulated result.',
        'हर व्यंजन हेतु सर्वोत्तम पाक विधि चुनें व अनुकरणित परिणाम देखें।')}
      controls={<div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {METHODS.map((m) => {
          const state = picked ? (dish.best.includes(m.id) ? 'best' : m.id === picked ? 'wrong' : 'dim') : 'idle';
          return (
            <button key={m.id} onClick={() => pick(m.id)} disabled={!!picked}
              className={`px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer shadow-2xs ${
                state === 'best' ? 'border-green-500 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300 font-bold'
                : state === 'wrong' ? 'border-red-500 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300'
                : state === 'dim' ? 'border-slate-200 dark:border-slate-700 opacity-40 bg-white dark:bg-surface-dark-2'
                : 'border-slate-200 dark:border-slate-700 hover:border-orange-500 bg-white dark:bg-surface-dark-2 text-slate-800 dark:text-slate-200'}`}>
              {L(m.en, m.hi)}
            </button>
          );
        })}
      </div>}
    >
      <div className="rounded-xl border p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3" style={{ borderColor: `${T.accent}44`, background: `${T.accent}0d` }}>
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md text-white flex-shrink-0" style={{ background: T.accent }}>
            {L('Dish', 'व्यंजन')}
          </span>
          <span className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 break-words">{L(dish.en, dish.hi)}</span>
        </div>
        <div className="flex-shrink-0 self-start sm:self-auto">
          <FoodStat label={L('Score', 'स्कोर')} value={`${score}/${asked}`} color={T.accent} />
        </div>
      </div>
      {outcome && (
        <div className="rounded-xl p-3.5 text-xs sm:text-sm border leading-relaxed" style={{
          background: outcome.ok ? '#16a34a14' : '#dc262614',
          borderColor: outcome.ok ? '#16a34a40' : '#dc262640',
          color: outcome.ok ? '#15803d' : '#b91c1c'
        }}>
          <div className="flex items-center gap-2 font-bold mb-1.5">
            {outcome.ok ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
            <span>{outcome.ok ? L('Good choice!', 'अच्छा चुनाव!') : L('Not ideal', 'आदर्श नहीं')}</span>
          </div>
          <p>{L(outcome.en, outcome.hi)}</p>
          <div className="mt-3 text-right">
            <button onClick={next} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-white text-xs shadow-sm cursor-pointer" style={{ background: T.accent }}>
              {L('Next dish', 'अगला व्यंजन')} <ArrowRight size={13} />
            </button>
          </div>
        </div>
      )}
    </FoodShell>
  );
}
