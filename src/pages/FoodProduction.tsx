import { Link } from 'react-router-dom';
import { useAppStore } from '@/context/store';
import { FOOD_MODULES, type Bi } from '@/data/foodData';
import { FOOD_THEMES, withAlpha } from '@/components/foodsim/foodTheme';
import { Check, ChefHat, FlaskConical, ArrowRight } from 'lucide-react';

export default function FoodProduction() {
  const { language, completedLessons } = useAppStore();
  const L = (b: Bi) => (language === 'hi' ? b.hi : b.en);

  // group modules by section label (preserve order)
  const sections: { label: Bi; mods: typeof FOOD_MODULES }[] = [];
  FOOD_MODULES.forEach((m) => {
    let grp = sections.find((s) => s.label.en === m.section.en);
    if (!grp) { grp = { label: m.section, mods: [] }; sections.push(grp); }
    grp.mods.push(m);
  });

  const completedCount = FOOD_MODULES.filter((m) => completedLessons.includes(`food-${m.id}`)).length;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-8">
      {/* Hero Header */}
      <div className="rounded-2xl p-5 sm:p-6 text-white shadow-md relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #ea580c, #c2410c)' }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <span className="grid place-items-center w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex-shrink-0 shadow-inner">
              <ChefHat size={26} />
            </span>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold leading-tight truncate">
                {language === 'hi' ? 'खाद्य उत्पादन (सामान्य)' : 'Food Production (General)'}
              </h1>
              <p className="text-xs sm:text-sm text-white/90 mt-0.5 line-clamp-1">
                {language === 'hi'
                  ? `${FOOD_MODULES.length} मॉड्यूल • ग्रेड 2 पाठ्यक्रम • इंटरैक्टिव रसोई सिमुलेशन`
                  : `${FOOD_MODULES.length} modules • Grade-2 trade syllabus • interactive kitchen simulations`}
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 self-start sm:self-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-xs">
              {Math.round((completedCount / FOOD_MODULES.length) * 100)}% {language === 'hi' ? 'पूर्ण' : 'Completed'}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-2">
          <div className="flex justify-between text-xs text-white/90 mb-1.5 font-medium">
            <span>{language === 'hi' ? 'समग्र प्रगति' : 'Overall Progress'}</span>
            <span className="font-mono">{completedCount}/{FOOD_MODULES.length}</span>
          </div>
          <div className="h-2 rounded-full bg-black/20 overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(completedCount / FOOD_MODULES.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Sections and Module Cards */}
      {sections.map((sec) => (
        <div key={sec.label.en} className="space-y-3">
          <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <h2 className="text-base sm:text-lg font-bold flex items-center gap-2 text-slate-800 dark:text-slate-100">
              <span>{L(sec.label)}</span>
            </h2>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-surface-dark-2 text-slate-600 dark:text-slate-400">
              {sec.mods.filter((m) => completedLessons.includes(`food-${m.id}`)).length}/{sec.mods.length} {language === 'hi' ? 'पूर्ण' : 'done'}
            </span>
          </div>

          <div className="grid gap-3.5 sm:grid-cols-2">
            {sec.mods.map((m) => {
              const theme = FOOD_THEMES[m.themeKey];
              const Icon = theme.Icon;
              const done = completedLessons.includes(`food-${m.id}`);
              return (
                <Link
                  key={m.id}
                  to={`/modules/${m.id}`}
                  className="card p-4 transition-all duration-200 card-hover cursor-pointer block group relative"
                  style={{ borderLeftWidth: '4px', borderLeftColor: theme.accent }}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="grid place-items-center w-11 h-11 rounded-xl flex-shrink-0 transition-transform group-hover:scale-105"
                      style={{ background: withAlpha(theme.accent, 0.14), color: theme.accent }}
                    >
                      <Icon size={22} strokeWidth={2.1} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-sm leading-snug text-slate-900 dark:text-slate-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                          {m.id}. {L(m.title)}
                        </h3>
                        {done && (
                          <span className="flex-shrink-0 inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300">
                            <Check size={11} strokeWidth={2.5} /> {language === 'hi' ? 'पूर्ण' : 'Done'}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {L(m.desc)}
                      </p>
                      <div className="flex items-center justify-between mt-2.5 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: theme.accent }}>
                          <FlaskConical size={12} />
                          <span>{language === 'hi' ? 'इंटरैक्टिव सिमुलेशन' : 'Interactive simulation'}</span>
                        </div>
                        <span className="text-xs text-slate-400 group-hover:text-orange-500 transition-transform group-hover:translate-x-1 flex items-center">
                          <ArrowRight size={13} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
