import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Badge {
  id: string;
  name: string;
  nameHi: string;
  icon: string;
  description: string;
  earned: boolean;
  earnedAt?: string;
}

export interface LearningOutcome {
  id: number;
  title: string;
  titleHi: string;
  status: 'locked' | 'available' | 'in_progress' | 'completed';
  score?: number;
  xpEarned: number;
}

export interface LabAttempt {
  labId: string;
  score: number;
  completedAt: string;
  hintsUsed: number;
  timeSpent: number;
}

interface AppState {
  // User
  userName: string;
  setUserName: (name: string) => void;

  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // Sound
  soundEnabled: boolean;
  toggleSound: () => void;

  // Language
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;

  // Sidebar
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;

  // Gamification
  xp: number;
  level: number;
  streak: number;
  rank: string;
  rankHi: string;
  addXP: (amount: number) => void;
  badges: Badge[];
  earnBadge: (badgeId: string) => void;

  // Progress
  completedLessons: string[];
  completeLesson: (lessonId: string) => void;
  labAttempts: LabAttempt[];
  addLabAttempt: (attempt: LabAttempt) => void;
  completedQuizzes: string[];
  completeQuiz: (quizId: string) => void;

  // Learning Outcomes
  outcomes: LearningOutcome[];
  updateOutcomeStatus: (id: number, status: LearningOutcome['status']) => void;

  // Reset
  resetProgress: () => void;
}

const RANKS = [
  { minXP: 0, name: 'Kitchen Trainee', nameHi: 'किचन ट्रेनी' },
  { minXP: 500, name: 'Commis Chef', nameHi: 'कॉमी शेफ' },
  { minXP: 1500, name: 'Chef de Partie', nameHi: 'शेफ द पार्टी' },
  { minXP: 3500, name: 'Sous Chef', nameHi: 'सू शेफ' },
  { minXP: 6000, name: 'Head Chef', nameHi: 'हेड शेफ' },
  { minXP: 10000, name: 'Executive Chef', nameHi: 'एग्ज़ीक्यूटिव शेफ' },
];

const DEFAULT_BADGES: Badge[] = [
  { id: 'hygiene_hero', name: 'Hygiene Hero', nameHi: 'स्वच्छता नायक', icon: '🧼', description: 'Master hand-washing & personal hygiene', earned: false },
  { id: 'knife_skills', name: 'Knife Skills', nameHi: 'चाकू कौशल', icon: '🔪', description: 'Identify every classical vegetable cut', earned: false },
  { id: 'safety_first', name: 'Safety First', nameHi: 'सुरक्षा पहले', icon: '🧯', description: 'Complete kitchen safety & first-aid', earned: false },
  { id: 'master_baker', name: 'Master Baker', nameHi: 'मास्टर बेकर', icon: '🍞', description: 'Complete bakery & dough modules', earned: false },
  { id: 'storage_pro', name: 'Storage Pro', nameHi: 'भंडारण विशेषज्ञ', icon: '❄️', description: 'Store every food at the right temperature', earned: false },
  { id: 'plating_artist', name: 'Plating Artist', nameHi: 'प्लेटिंग कलाकार', icon: '🍽️', description: 'Plate a dish with the clock method', earned: false },
  { id: 'commodity_expert', name: 'Commodity Expert', nameHi: 'सामग्री विशेषज्ञ', icon: '🧺', description: 'Sort all commodities by origin', earned: false },
  { id: 'quiz_champion', name: 'Quiz Champion', nameHi: 'क्विज़ चैंपियन', icon: '🏆', description: 'Score 100% on any quiz', earned: false },
  { id: 'streak_7', name: '7-Day Streak', nameHi: '7-दिन की लय', icon: '🔥', description: 'Practise for 7 days in a row', earned: false },
  { id: 'first_lab', name: 'First Kitchen Lab', nameHi: 'पहली किचन लैब', icon: '🧪', description: 'Complete your first kitchen lab', earned: false },
];

const DEFAULT_OUTCOMES: LearningOutcome[] = [
  // Foundations & the Professional Chef
  { id: 1, title: 'Introduction to Food Production & the Kitchen', titleHi: 'खाद्य उत्पादन एवं रसोई का परिचय', status: 'available', xpEarned: 0 },
  { id: 2, title: 'Kitchen Organization & the Brigade', titleHi: 'रसोई संगठन एवं ब्रिगेड', status: 'available', xpEarned: 0 },
  { id: 3, title: 'Chef’s Uniform & Protective Clothing', titleHi: 'शेफ की वर्दी एवं सुरक्षात्मक वस्त्र', status: 'available', xpEarned: 0 },
  { id: 4, title: 'Personal Hygiene & Hand-Washing', titleHi: 'व्यक्तिगत स्वच्छता एवं हाथ धुलाई', status: 'available', xpEarned: 0 },
  // Equipment, Commodities & Storage
  { id: 5, title: 'Kitchen Equipment & Appliances', titleHi: 'रसोई उपकरण एवं यंत्र', status: 'available', xpEarned: 0 },
  { id: 6, title: 'Kitchen Tools, Knives & Vegetable Cuts', titleHi: 'रसोई औज़ार, चाकू एवं सब्ज़ी कट्स', status: 'available', xpEarned: 0 },
  { id: 7, title: 'Kitchen Commodities', titleHi: 'रसोई सामग्री', status: 'available', xpEarned: 0 },
  { id: 8, title: 'Storage of Commodities & Food Temperatures', titleHi: 'सामग्री भंडारण एवं खाद्य तापमान', status: 'available', xpEarned: 0 },
  // Cooking & Bakery
  { id: 9, title: 'Methods of Cooking', titleHi: 'पाक विधियाँ', status: 'available', xpEarned: 0 },
  { id: 10, title: 'Bakery & Baking', titleHi: 'बेकरी एवं बेकिंग', status: 'available', xpEarned: 0 },
  { id: 11, title: 'Dough & Batter Preparation', titleHi: 'आटा एवं घोल तैयारी', status: 'available', xpEarned: 0 },
  // Safety & Service
  { id: 12, title: 'Kitchen Safety, First-Aid & Firefighting', titleHi: 'रसोई सुरक्षा, प्राथमिक उपचार एवं अग्निशमन', status: 'available', xpEarned: 0 },
  { id: 13, title: 'Food Safety & Cross-Contamination', titleHi: 'खाद्य सुरक्षा एवं क्रॉस-संदूषण', status: 'available', xpEarned: 0 },
  { id: 14, title: 'Food Presentation & Plating', titleHi: 'खाद्य प्रस्तुति एवं प्लेटिंग', status: 'available', xpEarned: 0 },
];

function getRank(xp: number) {
  let rank = RANKS[0];
  for (const r of RANKS) {
    if (xp >= r.minXP) rank = r;
  }
  return rank;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // User
      userName: 'Trainee',
      setUserName: (name) => set({ userName: name }),

      // Theme
      theme: 'light',
      toggleTheme: () =>
        set((s) => {
          const next = s.theme === 'light' ? 'dark' : 'light';
          document.documentElement.classList.toggle('dark', next === 'dark');
          return { theme: next };
        }),

      // Sound
      soundEnabled: true,
      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),

      // Language
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),

      // Sidebar
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      // Gamification
      xp: 0,
      level: 1,
      streak: 0,
      rank: 'Kitchen Trainee',
      rankHi: 'किचन ट्रेनी',
      addXP: (amount) =>
        set((s) => {
          const newXP = s.xp + amount;
          const newLevel = Math.floor(newXP / 200) + 1;
          const r = getRank(newXP);
          return { xp: newXP, level: newLevel, rank: r.name, rankHi: r.nameHi };
        }),
      badges: DEFAULT_BADGES,
      earnBadge: (badgeId) =>
        set((s) => ({
          badges: s.badges.map((b) =>
            b.id === badgeId ? { ...b, earned: true, earnedAt: new Date().toISOString() } : b
          ),
        })),

      // Progress
      completedLessons: [],
      completeLesson: (lessonId) =>
        set((s) => ({
          completedLessons: s.completedLessons.includes(lessonId)
            ? s.completedLessons
            : [...s.completedLessons, lessonId],
        })),
      labAttempts: [],
      addLabAttempt: (attempt) =>
        set((s) => ({ labAttempts: [...s.labAttempts, attempt] })),
      completedQuizzes: [],
      completeQuiz: (quizId) =>
        set((s) => ({
          completedQuizzes: s.completedQuizzes.includes(quizId)
            ? s.completedQuizzes
            : [...s.completedQuizzes, quizId],
        })),

      // Learning Outcomes
      outcomes: DEFAULT_OUTCOMES,
      updateOutcomeStatus: (id, status) =>
        set((s) => ({
          outcomes: s.outcomes.map((o) => (o.id === id ? { ...o, status } : o)),
        })),

      // Reset
      resetProgress: () =>
        set({
          xp: 0,
          level: 1,
          streak: 0,
          rank: 'Kitchen Trainee',
          rankHi: 'किचन ट्रेनी',
          badges: DEFAULT_BADGES,
          completedLessons: [],
          labAttempts: [],
          completedQuizzes: [],
          outcomes: DEFAULT_OUTCOMES,
        }),
    }),
    {
      name: 'foodproduction-skilllab-storage',
    }
  )
);
