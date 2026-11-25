import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAppStore } from '@/context/store';
import { ArrowRight, Sparkles } from 'lucide-react';

function StatCard({ icon, label, value, color }: { icon: string; label: string; value: string | number; color: string }) {
  return (
    <div className="card p-4 sm:p-5 shadow-xs">
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${color} flex items-center justify-center text-xl sm:text-2xl flex-shrink-0 shadow-2xs`}>
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-white truncate font-mono">
            {value}
          </p>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate mt-0.5 font-semibold">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { t } = useTranslation();
  const { xp, labAttempts, streak, rank, rankHi, language, outcomes, completedLessons, badges, userName } = useAppStore();
  const completedOutcomes = outcomes.filter((o) => o.status === 'completed').length;
  const earnedBadges = badges.filter((b) => b.earned).length;
  const total = outcomes.length || 1;
  const progressPercent = Math.round((completedOutcomes / total) * 100);
  const part1Done = outcomes.filter((o) => o.id <= 6 && o.status === 'completed').length;
  const part2Done = outcomes.filter((o) => o.id > 6 && o.status === 'completed').length;

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      {/* Welcome Banner */}
      <div
        className="card p-5 sm:p-6 text-white border-0 shadow-md relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #ea580c, #c2410c)' }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold leading-tight">
              {t('dashboard.welcome')}, {userName === 'Trainee' && language === 'hi' ? 'प्रशिक्षु' : userName}! 👨‍🍳
            </h1>
            <p className="text-orange-100 mt-1 text-xs sm:text-sm leading-relaxed max-w-xl">
              {language === 'hi'
                ? 'आज रसोई में कुछ नया सीखने का समय है। अपना व्यावहारिक कौशल व ज्ञान जारी रखें।'
                : 'Time to learn something new in the kitchen today. Keep up your culinary practice and safety standards.'}
            </p>
          </div>
          <Link
            to="/labs"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-xs rounded-xl font-semibold text-xs sm:text-sm transition-all shadow-xs flex-shrink-0 self-start sm:self-auto"
          >
            <span>🔬</span>
            <span>{t('dashboard.startLab')}</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <StatCard icon="⭐" label={t('dashboard.xpEarned')} value={xp} color="bg-amber-100 dark:bg-amber-950/40 text-amber-600" />
        <StatCard icon="🧪" label={t('dashboard.labsCompleted')} value={labAttempts.length} color="bg-blue-100 dark:bg-blue-950/40 text-blue-600" />
        <StatCard icon="🔥" label={t('dashboard.streakDays')} value={streak} color="bg-orange-100 dark:bg-orange-950/40 text-orange-600" />
        <StatCard icon="👨‍🍳" label={t('dashboard.rank')} value={language === 'hi' ? rankHi : rank} color="bg-purple-100 dark:bg-purple-950/40 text-purple-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        {/* Overall Progress */}
        <div className="lg:col-span-2 card p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
            <h2 className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100">{t('dashboard.overallProgress')}</h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-100 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300">
              {progressPercent}% {language === 'hi' ? 'पूर्ण' : 'Complete'}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-5">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
              <svg className="w-20 h-20 sm:w-24 sm:h-24 -rotate-90" viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" className="text-slate-100 dark:text-surface-dark-2" strokeWidth="3.2" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" className="text-orange-500" strokeWidth="3.2" strokeDasharray={`${progressPercent}, 100`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg sm:text-xl font-bold font-mono text-slate-900 dark:text-white">{progressPercent}%</span>
              </div>
            </div>
            <div className="flex-1 w-full space-y-1.5 text-center sm:text-left">
              <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                {completedOutcomes} / {total} {t('modules.outcomes')}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {completedLessons.length} {language === 'hi' ? 'पाठ पूर्ण' : 'lessons completed'}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {earnedBadges} / {badges.length} {t('badges.title')} {language === 'hi' ? 'अर्जित' : 'unlocked'}
              </p>
            </div>
          </div>

          {/* Section progress bars */}
          <div className="space-y-3.5 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1.5 font-medium">
                <span className="truncate pr-2">{t('modules.year1')}</span>
                <span className="font-mono flex-shrink-0">{part1Done}/6</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill bg-orange-600" style={{ width: `${(part1Done / 6) * 100}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1.5 font-medium">
                <span className="truncate pr-2">{t('modules.year2')}</span>
                <span className="font-mono flex-shrink-0">{part2Done}/8</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill bg-amber-500" style={{ width: `${(part2Done / 8) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <h2 className="font-bold text-base sm:text-lg mb-3 pb-2 border-b border-slate-100 dark:border-slate-800 text-slate-900 dark:text-slate-100">
              {t('dashboard.quickActions')}
            </h2>
            <div className="space-y-2.5">
              <Link to="/labs/virtualKitchen" className="card-hover p-3 sm:p-3.5 flex items-center justify-between gap-3 group">
                <div className="flex items-center gap-3.5 min-w-0">
                  <span className="text-3xl flex-shrink-0">🍳</span>
                  <div className="min-w-0">
                    <p className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-200 truncate">{language === 'hi' ? 'वर्चुअल रसोई' : 'Virtual Kitchen'}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{language === 'hi' ? 'रसोई अनुभाग लेआउट' : 'Lay out kitchen sections'}</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-slate-400 group-hover:text-orange-500 group-hover:translate-x-1.5 transition-all flex-shrink-0" />
              </Link>
              <Link to="/labs/foodSafety" className="card-hover p-3 sm:p-3.5 flex items-center justify-between gap-3 group">
                <div className="flex items-center gap-3.5 min-w-0">
                  <span className="text-3xl flex-shrink-0">🧼</span>
                  <div className="min-w-0">
                    <p className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-200 truncate">{language === 'hi' ? 'खाद्य सुरक्षा निरीक्षक' : 'Food Safety Inspector'}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{language === 'hi' ? 'खतरे खोजें' : 'Spot kitchen hazards'}</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-slate-400 group-hover:text-orange-500 group-hover:translate-x-1.5 transition-all flex-shrink-0" />
              </Link>
              <Link to="/labs/kitchenSafety" className="card-hover p-3 sm:p-3.5 flex items-center justify-between gap-3 group">
                <div className="flex items-center gap-3.5 min-w-0">
                  <span className="text-3xl flex-shrink-0">🧯</span>
                  <div className="min-w-0">
                    <p className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-200 truncate">{language === 'hi' ? 'रसोई सुरक्षा' : 'Kitchen Safety'}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{language === 'hi' ? 'आपात प्रतिक्रिया' : 'Emergency response'}</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-slate-400 group-hover:text-orange-500 group-hover:translate-x-1.5 transition-all flex-shrink-0" />
              </Link>
              <Link to="/assessments" className="card-hover p-3 sm:p-3.5 flex items-center justify-between gap-3 group">
                <div className="flex items-center gap-3.5 min-w-0">
                  <span className="text-3xl flex-shrink-0">📝</span>
                  <div className="min-w-0">
                    <p className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-200 truncate">{t('nav.quiz')}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{language === 'hi' ? 'अपना ज्ञान परखें' : 'Test your knowledge'}</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-slate-400 group-hover:text-orange-500 group-hover:translate-x-1.5 transition-all flex-shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="card p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-slate-100 dark:border-slate-800">
          <h2 className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Sparkles size={20} className="text-amber-500" />
            <span>{t('badges.title')}</span>
          </h2>
          <span className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-surface-dark-2 text-slate-600 dark:text-slate-300">
            {earnedBadges}/{badges.length}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`flex items-center gap-3.5 p-3.5 rounded-xl border transition-all ${
                badge.earned
                  ? 'bg-amber-50/70 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/60 shadow-2xs'
                  : 'bg-slate-50/60 dark:bg-surface-dark-2/40 border-slate-200/80 dark:border-slate-700/60 opacity-60'
              }`}
            >
              <span className="text-3xl flex-shrink-0">{badge.icon}</span>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                  {language === 'hi' ? badge.nameHi : badge.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                  {badge.earned
                    ? (language === 'hi' ? '✓ अर्जित' : '✓ Unlocked')
                    : (language === 'hi' ? (badge.descriptionHi || badge.description) : badge.description)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
