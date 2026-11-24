import { useState } from 'react';
import { CheckCircle2, RotateCcw, ArrowRight, Siren, X } from 'lucide-react';
import { FoodShell, FoodStat, useLang } from '../foodPrimitives';
import { FOOD_THEMES } from '../foodTheme';

const T = FOOD_THEMES.firstaid;

interface Scn { id: string; en: string; hi: string; options: { en: string; hi: string }[]; correct: number; whyEn: string; whyHi: string }
const SCN: Scn[] = [
  { id: 'oilfire', en: 'A pan of hot oil catches fire', hi: 'गर्म तेल के पैन में आग लग जाती है',
    options: [{ en: 'Throw water on it', hi: 'पानी डालें' }, { en: 'Cover with a lid or fire blanket', hi: 'ढक्कन या फायर ब्लैंकेट से ढकें' }, { en: 'Carry the pan outside', hi: 'पैन बाहर ले जाएं' }],
    correct: 1, whyEn: 'Smother the flames to cut off air. Never use water on an oil fire — it makes the fire explode upward.', whyHi: 'हवा रोकने हेतु आग ढकें। तेल की आग पर कभी पानी नहीं — यह आग को भड़काता है।' },
  { id: 'burn', en: 'You touch a hot tray and burn your hand', hi: 'गर्म ट्रे छूने से हाथ जल जाता है',
    options: [{ en: 'Rub butter or oil on it', hi: 'मक्खन या तेल लगाएं' }, { en: 'Cool under running water for 10+ minutes', hi: '10+ मिनट बहते पानी में ठंडा करें' }, { en: 'Pop any blisters', hi: 'छाले फोड़ें' }],
    correct: 1, whyEn: 'Cool a burn under running water for at least 10 minutes. Never use butter, and never burst blisters.', whyHi: 'जले को कम से कम 10 मिनट बहते पानी में ठंडा करें। मक्खन न लगाएं, छाले न फोड़ें।' },
  { id: 'cut', en: 'A knife slips and cuts your finger', hi: 'चाकू फिसलकर उंगली काट देता है',
    options: [{ en: 'Wash it, press with a clean cloth, cover with a blue plaster', hi: 'धोएं, साफ कपड़े से दबाएं, नीला प्लास्टर लगाएं' }, { en: 'Keep cooking and ignore it', hi: 'अनदेखा कर पकाते रहें' }, { en: 'Lick the cut clean', hi: 'घाव चाटकर साफ करें' }],
    correct: 0, whyEn: 'Clean it, stop the bleeding with pressure, and use a blue (detectable) plaster so it is noticed if it falls into food.', whyHi: 'साफ करें, दबाव से खून रोकें, नीला प्लास्टर लगाएं ताकि भोजन में गिरे तो दिखे।' },
  { id: 'spill', en: 'Oil spills on the kitchen floor', hi: 'रसोई फर्श पर तेल गिर जाता है',
    options: [{ en: 'Leave it until later', hi: 'बाद के लिए छोड़ दें' }, { en: 'Clean it at once and put up a wet-floor sign', hi: 'तुरंत साफ करें व गीला-फर्श चिन्ह लगाएं' }, { en: 'Cover it with a cloth', hi: 'कपड़े से ढक दें' }],
    correct: 1, whyEn: 'Spills cause slips — the biggest cause of kitchen injuries. Clean immediately and warn others with a sign.', whyHi: 'गिरा हुआ फिसलन देता है — रसोई चोटों का बड़ा कारण। तुरंत साफ करें व चिन्ह से सचेत करें।' },
  { id: 'elecfire', en: 'A toaster starts sparking and smoking', hi: 'टोस्टर चिंगारी व धुआं छोड़ने लगता है',
    options: [{ en: 'Pour water on the toaster', hi: 'टोस्टर पर पानी डालें' }, { en: 'Switch off the power, then use a CO₂ extinguisher', hi: 'बिजली बंद करें, फिर CO₂ एक्सटिंग्विशर' }, { en: 'Pull it apart with your hands', hi: 'हाथों से खोलें' }],
    correct: 1, whyEn: 'For an electrical fire, cut the power first, then use a CO₂ or dry-powder extinguisher — never water, which conducts electricity.', whyHi: 'बिजली की आग हेतु पहले बिजली बंद करें, फिर CO₂ या ड्राई-पाउडर — पानी कभी नहीं, जो बिजली प्रवाहित करता है।' },
];

export function KitchenSafetySim() {
  const L = useLang();
  const [idx, setIdx] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);

  const s = SCN[idx];
  const choose = (i: number) => { if (pick !== null) return; setPick(i); if (i === s.correct) setScore((v) => v + 1); setAnswered((a) => a + 1); };
  const next = () => { setIdx((i) => (i + 1) % SCN.length); setPick(null); };
  const reset = () => { setIdx(0); setPick(null); setScore(0); setAnswered(0); };
  const allDone = answered >= SCN.length;

  return (
    <FoodShell accent={T.accent} Icon={T.Icon}
      title={L('Kitchen Safety & First-Aid', 'रसोई सुरक्षा व प्राथमिक उपचार')}
      subtitle={L('Each card is a kitchen emergency. Choose the correct first action — some common reactions are dangerous.',
        'प्रत्येक कार्ड एक रसोई आपात है। सही पहली क्रिया चुनें — कुछ आम प्रतिक्रियाएं खतरनाक हैं।')}
    >
      <div className="grid grid-cols-2 gap-2">
        <FoodStat label={L('Scenario', 'परिदृश्य')} value={`${Math.min(answered + (pick === null ? 1 : 0), SCN.length)}/${SCN.length}`} color={T.accent} />
        <FoodStat label={L('Correct', 'सही')} value={score} color={T.accent2} />
      </div>

      <div className="rounded-xl border p-3.5 sm:p-4 flex items-start gap-3.5 bg-red-50/60 dark:bg-red-950/20 border-red-200 dark:border-red-900/40">
        <span className="grid place-items-center w-11 h-11 rounded-xl flex-shrink-0 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-300"><Siren size={22} /></span>
        <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 mt-1 leading-snug">{L(s.en, s.hi)}</p>
      </div>

      <div className="grid gap-2 sm:gap-2.5">
        {s.options.map((o, i) => {
          const isCorrect = pick !== null && i === s.correct;
          const isWrong = pick === i && i !== s.correct;
          return (
            <button key={i} onClick={() => choose(i)} disabled={pick !== null}
              className={`text-left text-sm sm:text-base px-4 py-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all shadow-2xs min-h-[50px] ${
                isCorrect
                  ? 'border-green-500 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300 font-bold'
                  : isWrong
                  ? 'border-red-500 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300'
                  : pick !== null
                  ? 'border-slate-200 dark:border-slate-700 opacity-40 bg-white dark:bg-surface-dark-2'
                  : 'bg-white dark:bg-surface-dark-2 border-slate-200 dark:border-slate-700 hover:border-red-400 text-slate-800 dark:text-slate-200 cursor-pointer'
              }`}>
              <span className="flex-1">{L(o.en, o.hi)}</span>
              {isCorrect && <CheckCircle2 size={18} className="text-green-600 dark:text-green-400 flex-shrink-0" />}
              {isWrong && <X size={18} className="text-red-600 dark:text-red-400 flex-shrink-0" />}
            </button>
          );
        })}
      </div>

      {pick !== null && (
        <div className={`rounded-xl p-3.5 sm:p-4 text-sm sm:text-base leading-relaxed border ${
          pick === s.correct
            ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800/40 text-green-800 dark:text-green-200'
            : 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/40 text-amber-800 dark:text-amber-200'
        }`}>
          {L(s.whyEn, s.whyHi)}
        </div>
      )}

      {pick !== null && (allDone ? (
        <div className="rounded-xl p-3.5 sm:p-4 text-sm sm:text-base font-semibold flex items-center gap-2.5" style={{ background: '#16a34a1a', color: '#15803d' }}>
          <CheckCircle2 size={20} className="flex-shrink-0" /> {L(`Finished — ${score}/${SCN.length} correct. Knowing the right first action keeps a small kitchen accident from becoming a serious injury.`,
            `समाप्त — ${score}/${SCN.length} सही। सही पहली क्रिया छोटी दुर्घटना को गंभीर चोट बनने से रोकती है।`)}
        </div>
      ) : (
        <button onClick={next} className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm sm:text-base font-bold text-white shadow-sm cursor-pointer" style={{ background: T.accent }}>
          {L('Next emergency', 'अगला आपात')} <ArrowRight size={16} />
        </button>
      ))}

      <button onClick={reset} className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-700">
        <RotateCcw size={13} /> {L('Reset', 'रीसेट')}
      </button>
    </FoodShell>
  );
}
