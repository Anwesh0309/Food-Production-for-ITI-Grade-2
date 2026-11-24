import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/context/store';
import { X } from 'lucide-react';

const ChefIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
    <line x1="6" y1="17" x2="18" y2="17" />
  </svg>
);

const navItems: { path: string; icon: string; key: string; label?: { en: string; hi: string } }[] = [
  { path: '/', icon: '📊', key: 'nav.home' },
  { path: '/modules', icon: '📚', key: 'nav.modules' },
  { path: '/labs', icon: '🔬', key: 'nav.labs' },
  { path: '/missions', icon: '🎯', key: 'nav.missions' },
  { path: '/assessments', icon: '📝', key: 'nav.quiz' },
  { path: '/progress', icon: '📈', key: 'nav.progress' },
  { path: '/glossary', icon: '📖', key: 'nav.glossary' },
];

export default function Sidebar() {
  const { t } = useTranslation();
  const { sidebarOpen, setSidebarOpen, xp, rank, rankHi, language, level } = useAppStore();

  const getItemLabel = (item: typeof navItems[0]) =>
    item.label ? (language === 'hi' ? item.label.hi : item.label.en) : t(item.key);

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar overlay"
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 flex flex-col bg-white dark:bg-surface-dark-1 border-r border-slate-200 dark:border-slate-700/60 transform transition-all duration-300 ${
          sidebarOpen ? 'w-64 translate-x-0' : '-translate-x-full md:translate-x-0 md:w-16'
        }`}
      >
        {/* Logo & Header */}
        <div className={`flex items-center border-b border-slate-200 dark:border-slate-700/50 ${
          sidebarOpen ? 'justify-between px-4 py-4' : 'justify-center p-3'
        }`}>
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white flex-shrink-0 shadow-sm">
              <ChefIcon />
            </div>
            {sidebarOpen && (
              <div className="overflow-hidden min-w-0">
                <h1 className="font-bold text-base text-slate-900 dark:text-white leading-tight truncate">
                  SkillLab
                </h1>
                <p className="text-[11px] text-orange-600 dark:text-orange-400 font-semibold truncate">
                  {language === 'hi' ? 'खाद्य उत्पादन' : 'Food Production'}
                </p>
              </div>
            )}
          </div>
          {/* Mobile close button */}
          {sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 md:hidden"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className={`flex-1 space-y-1 overflow-y-auto ${sidebarOpen ? 'px-3 py-4' : 'px-2 py-4'}`}>
          {navItems.map((item) => {
            const label = getItemLabel(item);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                title={!sidebarOpen ? label : undefined}
                onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}
                className={({ isActive }) =>
                  `${isActive ? 'nav-item-active' : 'nav-item'} ${!sidebarOpen ? 'justify-center px-0 h-10 w-10 mx-auto' : ''}`
                }
                end={item.path === '/'}
              >
                <span className="text-lg flex-shrink-0">{item.icon}</span>
                {sidebarOpen && <span className="truncate">{label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Rank Card */}
        {sidebarOpen ? (
          <div className="mx-3 mb-4 p-3 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 border border-orange-200 dark:border-orange-800/60 shadow-xs">
            <div className="flex items-center gap-2 mb-2 min-w-0">
              <span className="text-xl flex-shrink-0">👨‍🍳</span>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Level {level}
                </p>
                <p className="font-semibold text-sm text-orange-700 dark:text-orange-300 truncate">
                  {language === 'hi' ? rankHi : rank}
                </p>
              </div>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill bg-gradient-to-r from-orange-500 to-amber-500"
                style={{ width: `${(xp % 200) / 2}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 truncate">
              {xp} XP — {200 - (xp % 200)} to next level
            </p>
          </div>
        ) : (
          <div className="mb-4 mx-auto hidden md:flex flex-col items-center justify-center w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60" title={`Level ${level} • ${xp} XP`}>
            <span className="text-[10px] font-bold text-orange-700 dark:text-orange-300">L{level}</span>
          </div>
        )}
      </aside>
    </>
  );
}
