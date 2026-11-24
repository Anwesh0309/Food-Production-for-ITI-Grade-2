import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/context/store';

const RANK_THRESHOLDS = [
  { min: 0, name: 'Kitchen Trainee', nameHi: 'किचन ट्रेनी', icon: '🧑‍🍳', color: 'from-slate-400 to-slate-500' },
  { min: 500, name: 'Commis Chef', nameHi: 'कॉमी शेफ', icon: '🔪', color: 'from-orange-400 to-amber-500' },
  { min: 1500, name: 'Chef de Partie', nameHi: 'शेफ द पार्टी', icon: '🍳', color: 'from-green-400 to-emerald-500' },
  { min: 3500, name: 'Sous Chef', nameHi: 'सू शेफ', icon: '🥘', color: 'from-amber-400 to-yellow-500' },
  { min: 6000, name: 'Head Chef', nameHi: 'हेड शेफ', icon: '👨‍🍳', color: 'from-rose-400 to-red-500' },
  { min: 10000, name: 'Executive Chef', nameHi: 'एग्ज़ीक्यूटिव शेफ', icon: '👑', color: 'from-yellow-400 to-orange-500' },
];

export default function Progress() {
  const { t } = useTranslation();
  const {
    xp, level, streak, rank, rankHi, language,
    outcomes, completedLessons, labAttempts, completedQuizzes, badges,
  } = useAppStore();

  const completedOutcomes = outcomes.filter((o) => o.status === 'completed').length;
  const inProgressOutcomes = outcomes.filter((o) => o.status === 'in_progress').length;
  const earnedBadges = badges.filter((b) => b.earned).length;

  const currentRankIdx = RANK_THRESHOLDS.findIndex((r, i) => {
    const next = RANK_THRESHOLDS[i + 1];
    return !next || xp < next.min;
  });
  const currentRank = RANK_THRESHOLDS[currentRankIdx];
  const nextRank = RANK_THRESHOLDS[currentRankIdx + 1];
  const progressToNext = nextRank
    ? ((xp - currentRank.min) / (nextRank.min - currentRank.min)) * 100
    : 100;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">{t('nav.progress')}</h1>
        <p className="text-sm text-slate-500">{language === 'hi' ? 'अपनी प्रगति ट्रैक करें' : 'Track your learning journey'}</p>
      </div>

      {/* Rank Card */}
      <div className={`card p-5 sm:p-6 bg-gradient-to-r ${currentRank.color} text-white border-0 shadow-md relative overflow-hidden`}>
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm text-white/80 font-medium">{language === 'hi' ? 'वर्तमान पद' : 'Current Kitchen Rank'}</p>
            <h2 className="text-xl sm:text-2xl font-bold mt-1 truncate">
              {currentRank.icon} {language === 'hi' ? currentRank.nameHi : currentRank.name}
            </h2>
            <p className="text-xs sm:text-sm mt-1.5 text-white/90 font-mono font-medium">Level {level} • {xp} XP</p>
          </div>
          <div className="text-4xl sm:text-6xl opacity-35 flex-shrink-0 select-none">{currentRank.icon}</div>
        </div>
        {nextRank && (
          <div className="mt-4 pt-3 border-t border-white/20">
            <div className="flex justify-between text-xs opacity-90 mb-1.5 font-medium">
              <span className="truncate pr-2">{language === 'hi' ? 'अगली रैंक तक' : 'Next rank'}: {language === 'hi' ? nextRank.nameHi : nextRank.name}</span>
              <span className="font-mono flex-shrink-0">{nextRank.min - xp} XP {language === 'hi' ? 'शेष' : 'to go'}</span>
            </div>
            <div className="w-full bg-black/20 rounded-full h-2 overflow-hidden">
              <div className="h-2 bg-white rounded-full transition-all duration-500 ease-out" style={{ width: `${progressToNext}%` }} />
            </div>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="card p-3.5 sm:p-4 text-center">
          <p className="text-2xl sm:text-3xl font-extrabold text-orange-600 dark:text-orange-400 font-mono">{completedOutcomes}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">{t('modules.outcomes')}</p>
        </div>
        <div className="card p-3.5 sm:p-4 text-center">
          <p className="text-2xl sm:text-3xl font-extrabold text-green-600 dark:text-green-400 font-mono">{completedLessons.length}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">{language === 'hi' ? 'पूर्ण पाठ' : 'Lessons Done'}</p>
        </div>
        <div className="card p-3.5 sm:p-4 text-center">
          <p className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">{labAttempts.length}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">{language === 'hi' ? 'लैब प्रयास' : 'Lab Attempts'}</p>
        </div>
        <div className="card p-3.5 sm:p-4 text-center">
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">{streak}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">{language === 'hi' ? 'दिन की स्ट्रीक' : 'Day Streak'} 🔥</p>
        </div>
      </div>

      {/* Rank Progression */}
      <div className="card p-5 sm:p-6 shadow-xs">
        <h2 className="font-bold text-lg sm:text-xl mb-4 pb-2.5 border-b border-slate-100 dark:border-slate-800 text-slate-900 dark:text-slate-100">
          {language === 'hi' ? 'करियर सोपान (ब्रिगेड पथ)' : 'Kitchen Career Ladder'}
        </h2>
        <div className="space-y-3">
          {RANK_THRESHOLDS.map((r, i) => {
            const isAchieved = xp >= r.min;
            const isCurrent = i === currentRankIdx;
            return (
              <div key={r.min} className={`flex items-center gap-3.5 p-3.5 rounded-xl transition-all ${
                isCurrent
                  ? 'bg-orange-50 dark:bg-orange-950/30 border-2 border-orange-300 dark:border-orange-800/80 shadow-xs'
                  : isAchieved
                  ? 'bg-slate-50/70 dark:bg-surface-dark-2/40 border border-slate-200/60 dark:border-slate-700/50'
                  : 'opacity-45 bg-slate-50/40 dark:bg-surface-dark-2/20 border border-transparent'
              }`}>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${r.color} flex items-center justify-center text-xl flex-shrink-0 shadow-2xs ${
                  !isAchieved ? 'grayscale opacity-60' : ''
                }`}>
                  {r.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 truncate">{language === 'hi' ? r.nameHi : r.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono font-semibold mt-0.5">{r.min} XP</p>
                </div>
                {isAchieved && !isCurrent && <span className="text-green-500 font-bold text-base">✓</span>}
                {isCurrent && (
                  <span className="text-xs font-bold bg-orange-100 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full flex-shrink-0 shadow-2xs">
                    {language === 'hi' ? 'वर्तमान' : 'Current'}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges */}
      <div className="card p-4 sm:p-5">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
          <h2 className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>🏅</span>
            <span>{t('badges.title')}</span>
          </h2>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-surface-dark-2 text-slate-600 dark:text-slate-300">
            {earnedBadges}/{badges.length}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all ${
                badge.earned
                  ? 'bg-amber-50/70 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/60 shadow-2xs'
                  : 'bg-slate-50/60 dark:bg-surface-dark-2/40 border-slate-200/80 dark:border-slate-700/60 opacity-60'
              }`}
            >
              <span className="text-2xl flex-shrink-0">{badge.icon}</span>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 truncate">{language === 'hi' ? badge.nameHi : badge.name}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{badge.description}</p>
                {badge.earned && <p className="text-[10px] text-green-600 dark:text-green-400 font-semibold mt-1">✓ {language === 'hi' ? 'अर्जित' : 'Unlocked'}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
