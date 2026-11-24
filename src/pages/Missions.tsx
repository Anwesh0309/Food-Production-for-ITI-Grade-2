import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/context/store';

interface Mission {
  id: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  xpReward: number;
  type: 'daily' | 'weekly' | 'challenge';
  icon: string;
  progress: number;
  target: number;
  completed: boolean;
}

const MISSIONS: Mission[] = [
  {
    id: 'm1', title: 'First Kitchen Lab', titleHi: 'पहली किचन लैब',
    description: 'Open and try your first interactive kitchen lab',
    descriptionHi: 'अपनी पहली इंटरैक्टिव किचन लैब खोलें और आज़माएं',
    xpReward: 50, type: 'daily', icon: '🍳', progress: 0, target: 1, completed: false,
  },
  {
    id: 'm2', title: 'Hazard Hunt', titleHi: 'खतरा खोज',
    description: 'Find all 8 hazards in the Food Safety Inspector',
    descriptionHi: 'खाद्य सुरक्षा निरीक्षक में सभी 8 खतरे खोजें',
    xpReward: 100, type: 'daily', icon: '🧼', progress: 0, target: 8, completed: false,
  },
  {
    id: 'm3', title: 'Quiz Master', titleHi: 'क्विज़ मास्टर',
    description: 'Score 100% on any quiz',
    descriptionHi: 'किसी भी क्विज़ में 100% स्कोर करें',
    xpReward: 75, type: 'daily', icon: '📝', progress: 0, target: 1, completed: false,
  },
  {
    id: 'm4', title: 'Lab Explorer', titleHi: 'लैब एक्सप्लोरर',
    description: 'Open 3 different kitchen labs',
    descriptionHi: '3 अलग-अलग किचन लैब खोलें',
    xpReward: 150, type: 'weekly', icon: '🔬', progress: 0, target: 3, completed: false,
  },
  {
    id: 'm5', title: 'Week Warrior', titleHi: 'सप्ताह योद्धा',
    description: 'Maintain a 7-day learning streak',
    descriptionHi: '7 दिन की लर्निंग स्ट्रीक बनाए रखें',
    xpReward: 200, type: 'weekly', icon: '🔥', progress: 0, target: 7, completed: false,
  },
  {
    id: 'm6', title: 'Knife Skills', titleHi: 'चाकू कौशल',
    description: 'Correctly identify 5 classical vegetable cuts',
    descriptionHi: '5 शास्त्रीय सब्ज़ी कट्स सही पहचानें',
    xpReward: 100, type: 'weekly', icon: '🔪', progress: 0, target: 5, completed: false,
  },
  {
    id: 'm7', title: 'Clean Kitchen Champion', titleHi: 'स्वच्छ रसोई चैंपियन',
    description: 'Complete the hygiene, food safety and kitchen safety modules',
    descriptionHi: 'स्वच्छता, खाद्य सुरक्षा व रसोई सुरक्षा मॉड्यूल पूरे करें',
    xpReward: 300, type: 'challenge', icon: '🧯', progress: 0, target: 3, completed: false,
  },
  {
    id: 'm8', title: 'Complete the Course', titleHi: 'पूरा कोर्स पूर्ण करें',
    description: 'Complete all 14 Food Production modules',
    descriptionHi: 'सभी 14 खाद्य उत्पादन मॉड्यूल पूरे करें',
    xpReward: 500, type: 'challenge', icon: '🎓', progress: 0, target: 14, completed: false,
  },
];

export default function Missions() {
  const { t } = useTranslation();
  const { language, streak, labAttempts, completedQuizzes, outcomes } = useAppStore();
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'challenge'>('daily');

  // Calculate real progress
  const missionsWithProgress = MISSIONS.map((m) => {
    let progress = m.progress;
    let completed = m.completed;
    switch (m.id) {
      case 'm1': // First Kitchen Lab
        progress = labAttempts.length;
        completed = labAttempts.length >= m.target;
        break;
      case 'm2': // Safety hazards
        progress = labAttempts.some((a) => a.labId === 'safetyHaccp' || a.labId === 'foodSafety') ? 8 : 0;
        completed = progress >= m.target;
        break;
      case 'm3': // Quiz Master
        progress = completedQuizzes.length || (outcomes.some((o) => o.status === 'completed') ? 1 : 0);
        completed = progress >= m.target;
        break;
      case 'm4': // Lab explorer
        progress = labAttempts.length;
        completed = labAttempts.length >= m.target;
        break;
      case 'm5': // Streak
        progress = streak;
        completed = streak >= m.target;
        break;
      case 'm6': // Knife Skills
        progress = labAttempts.some((a) => a.labId === 'cuts' || a.labId === 'knifeSkills') ? 5 : 0;
        completed = progress >= m.target;
        break;
      case 'm7': // hygiene + food safety + kitchen safety modules (ids 4, 12, 13)
        progress = outcomes.filter((o) => [4, 12, 13].includes(o.id) && o.status === 'completed').length;
        completed = progress >= m.target;
        break;
      case 'm8': // all modules
        progress = outcomes.filter((o) => o.status === 'completed').length;
        completed = progress >= m.target;
        break;
    }
    return { ...m, progress: Math.min(progress, m.target), completed };
  });

  const filtered = missionsWithProgress.filter((m) => m.type === activeTab);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">{t('nav.missions')}</h1>
        <p className="text-sm text-slate-500">{language === 'hi' ? 'मिशन पूरा करें, XP कमाएं' : 'Complete missions, earn XP'}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 p-1.5 bg-slate-100 dark:bg-surface-dark-2 rounded-xl border border-slate-200/60 dark:border-slate-700/60 shadow-2xs">
        {(['daily', 'weekly', 'challenge'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 px-3 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === tab
                ? 'bg-white dark:bg-surface-dark-0 shadow-xs text-orange-600 dark:text-orange-400'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {tab === 'daily' && `📅 ${language === 'hi' ? 'दैनिक' : 'Daily'}`}
            {tab === 'weekly' && `📆 ${language === 'hi' ? 'साप्ताहिक' : 'Weekly'}`}
            {tab === 'challenge' && `🏆 ${language === 'hi' ? 'चुनौती' : 'Challenge'}`}
          </button>
        ))}
      </div>

      <div className="space-y-3.5">
        {filtered.map((mission) => (
          <div
            key={mission.id}
            className={`card p-4 sm:p-5 transition-all shadow-xs ${
              mission.completed
                ? 'bg-green-50/70 dark:bg-green-950/20 border-green-200 dark:border-green-800/60'
                : 'hover:border-slate-300 dark:hover:border-slate-600'
            }`}
          >
            <div className="flex items-start gap-3.5 sm:gap-4">
              <span className="text-4xl sm:text-5xl flex-shrink-0 select-none">{mission.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2.5">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2 flex-wrap">
                      <span>{language === 'hi' ? mission.titleHi : mission.title}</span>
                      {mission.completed && <span className="text-green-600 text-sm">✅</span>}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {language === 'hi' ? mission.descriptionHi : mission.description}
                    </p>
                  </div>
                  <span className="flex-shrink-0 text-xs sm:text-sm font-bold font-mono bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 px-3 py-1.5 rounded-full shadow-2xs">
                    +{mission.xpReward} XP
                  </span>
                </div>
                <div className="mt-4 pt-2.5 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5 font-semibold">
                    <span>{language === 'hi' ? 'प्रगति' : 'Progress'}</span>
                    <span className="font-mono">{mission.progress}/{mission.target}</span>
                  </div>
                  <div className="progress-bar h-2.5">
                    <div
                      className={`progress-fill ${mission.completed ? 'bg-green-500' : 'bg-orange-500'}`}
                      style={{ width: `${(mission.progress / mission.target) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
