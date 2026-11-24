import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppStore } from '@/context/store';
import { getFoodLab } from '@/data/foodLabs';
import { getFoodSimulation } from '@/components/foodsim';
import { FOOD_THEMES, withAlpha } from '@/components/foodsim/foodTheme';
import { SearchX, ArrowLeft } from 'lucide-react';

export default function FoodLab() {
  const { simId } = useParams<{ simId: string }>();
  const { language, addLabAttempt, labAttempts } = useAppStore();
  const lab = simId ? getFoodLab(simId) : undefined;
  const Sim = simId ? getFoodSimulation(simId) : null;

  // record that this lab was opened (counts toward "labs completed")
  useEffect(() => {
    if (!simId || !lab) return;
    if (!labAttempts.some((a) => a.labId === simId)) {
      addLabAttempt({ labId: simId, score: 0, completedAt: new Date().toISOString(), hintsUsed: 0, timeSpent: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [simId]);

  if (!lab || !Sim) {
    return (
      <div className="text-center py-16 card p-8 max-w-md mx-auto my-8">
        <SearchX className="w-14 h-14 mx-auto mb-4 text-slate-300 dark:text-slate-600" />
        <h2 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100">{language === 'hi' ? 'लैब नहीं मिली' : 'Lab Not Found'}</h2>
        <Link to="/labs" className="btn-primary text-sm px-5 py-2.5 mt-4 inline-flex items-center gap-2">
          <ArrowLeft size={16} /> {language === 'hi' ? 'सभी किचन लैब' : 'All Kitchen Labs'}
        </Link>
      </div>
    );
  }

  const theme = FOOD_THEMES[lab.themeKey];
  const Icon = theme.Icon;
  const L = (b: { en: string; hi: string }) => (language === 'hi' ? b.hi : b.en);

  return (
    <div className="space-y-5 animate-fade-in pb-8">
      {/* Header */}
      <div className="card p-4 sm:p-5">
        <div className="flex items-start gap-3 sm:gap-4">
          <Link
            to="/labs"
            className="p-2 -ml-1 rounded-lg text-slate-400 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-surface-dark-2 transition-colors flex-shrink-0"
            aria-label="Back to Labs list"
            title={language === 'hi' ? 'सभी लैब पर वापस' : 'Back to all labs'}
          >
            <ArrowLeft size={20} />
          </Link>
          <span
            className="grid place-items-center w-12 h-12 rounded-2xl flex-shrink-0 shadow-xs"
            style={{ background: withAlpha(theme.accent, 0.15), color: theme.accent }}
          >
            <Icon size={24} strokeWidth={2.2} />
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl font-bold leading-tight text-slate-900 dark:text-white break-words">
              {L(lab.title)}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              {L(lab.desc)}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full">
        <Sim />
      </div>
    </div>
  );
}
