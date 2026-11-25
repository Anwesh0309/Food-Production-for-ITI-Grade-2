import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/context/store';
import {
  ChevronDown, User, Award, Flame, Zap, FlaskConical, Target,
  RotateCcw, Check, Edit2, X, Moon, Sun, Globe, ShieldCheck,
  Volume2, VolumeX
} from 'lucide-react';

export default function TopBar() {
  const { i18n } = useTranslation();
  const {
    theme, toggleTheme, language, setLanguage, sidebarOpen, setSidebarOpen,
    xp, level, streak, rank, rankHi, userName, setUserName, badges, labAttempts,
    resetProgress, soundEnabled, toggleSound
  } = useAppStore();

  const [profileOpen, setProfileOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(userName);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLangToggle = () => {
    const next = language === 'en' ? 'hi' : 'en';
    setLanguage(next);
    i18n.changeLanguage(next);
  };

  const saveName = () => {
    if (tempName.trim()) {
      setUserName(tempName.trim());
    }
    setIsEditingName(false);
  };

  const handleReset = () => {
    resetProgress();
    setShowResetConfirm(false);
    setProfileOpen(false);
  };

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
        setIsEditingName(false);
        setShowResetConfirm(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setProfileOpen(false);
        setIsEditingName(false);
        setShowResetConfirm(false);
      }
    };
    if (profileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [profileOpen]);

  const earnedBadges = badges.filter((b) => b.earned).length;

  return (
    <header className="h-14 flex items-center justify-between px-3 sm:px-4 bg-white dark:bg-surface-dark-1 border-b border-slate-200 dark:border-slate-700/60 flex-shrink-0 z-30 relative">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-surface-dark-2 transition-colors flex-shrink-0 cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Mobile brand text */}
        <div className="hidden xs:flex items-center gap-1.5 md:hidden min-w-0">
          <span className="text-base flex-shrink-0">👨‍🍳</span>
          <span className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100 truncate max-w-[120px]">
            {language === 'hi' ? 'खाद्य उत्पादन' : 'Food Production'}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
        {/* XP Badge */}
        <div className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-700/50 shadow-2xs">
          <span className="text-xs sm:text-sm leading-none">⚡</span>
          <span className="text-[11px] sm:text-xs font-bold text-amber-700 dark:text-amber-300 font-mono">{xp} XP</span>
        </div>

        {/* Language Toggle */}
        <button
          onClick={handleLangToggle}
          className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-surface-dark-2 hover:bg-slate-200 dark:hover:bg-surface-dark-3 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
          title={language === 'en' ? 'Switch to Hindi (हिंदी)' : 'Switch to English'}
          aria-label="Switch language"
        >
          <span>{language === 'en' ? '🇮🇳' : '🇬🇧'}</span>
          <span className="hidden xs:inline sm:inline">{language === 'en' ? 'हिंदी' : 'ENG'}</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-surface-dark-2 transition-colors cursor-pointer"
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          title={theme === 'light' ? (language === 'hi' ? 'डार्क मोड' : 'Dark mode') : (language === 'hi' ? 'लाइट मोड' : 'Light mode')}
        >
          {theme === 'light' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
        </button>

        {/* Touch Sound Toggle */}
        <button
          onClick={toggleSound}
          className={`p-2 rounded-lg transition-colors cursor-pointer ${
            soundEnabled
              ? 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 hover:bg-orange-100 dark:hover:bg-orange-950/60'
              : 'text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-surface-dark-2'
          }`}
          aria-label={soundEnabled ? 'Mute touch sound' : 'Enable touch sound'}
          title={soundEnabled ? (language === 'hi' ? 'टच ध्वनि: चालू' : 'Touch sound: ON') : (language === 'hi' ? 'टच ध्वनि: बंद' : 'Touch sound: OFF')}
        >
          {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>

        {/* Clickable Profile Button with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => {
              setProfileOpen(!profileOpen);
              setShowResetConfirm(false);
            }}
            className="flex items-center gap-1.5 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-surface-dark-2 transition-all cursor-pointer ring-offset-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            aria-label="Open profile options menu"
            aria-expanded={profileOpen}
          >
            <div
              className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white text-xs font-bold shadow-xs flex-shrink-0"
              title={`User: ${userName} (${language === 'hi' ? rankHi : rank})`}
            >
              {userName.charAt(0).toUpperCase()}
            </div>
            <ChevronDown size={14} className={`text-slate-400 transition-transform hidden xs:block ${profileOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Profile Dropdown Menu */}
          {profileOpen && (
            <div className="absolute right-0 top-12 w-80 sm:w-88 max-w-[calc(100vw-1.5rem)] rounded-2xl bg-white dark:bg-surface-dark-1 border border-slate-200 dark:border-slate-700/80 shadow-2xl z-50 p-4 space-y-3.5 animate-scale-in">
              {/* Login & Session Status Badge */}
              <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500 dark:text-slate-400 pb-2.5 border-b border-slate-100 dark:border-slate-800">
                <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>{language === 'hi' ? 'सक्रिय शिक्षार्थी लॉगिन' : 'Active Trainee Session'}</span>
                </span>
                <span className="font-mono bg-slate-100 dark:bg-surface-dark-2 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded text-[10px] border border-slate-200/60 dark:border-slate-700/60">
                  ID: FP-2026-TRN
                </span>
              </div>

              {/* Profile Card Header */}
              <div className="flex items-start gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white text-lg font-extrabold shadow-sm flex-shrink-0">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  {isEditingName ? (
                    <div className="flex items-center gap-1 mt-0.5">
                      <input
                        type="text"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && saveName()}
                        className="text-xs px-2 py-1 rounded border border-orange-400 bg-white dark:bg-surface-dark-2 text-slate-800 dark:text-slate-100 w-full focus:outline-none"
                        autoFocus
                      />
                      <button onClick={saveName} className="p-1 text-green-600 hover:bg-green-50 rounded" title={language === 'hi' ? 'सहेजें' : 'Save'}>
                        <Check size={14} />
                      </button>
                      <button onClick={() => setIsEditingName(false)} className="p-1 text-slate-400 hover:bg-slate-100 rounded" title={language === 'hi' ? 'रद्द करें' : 'Cancel'}>
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 group">
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                        {userName}
                      </h3>
                      <button
                        onClick={() => { setTempName(userName); setIsEditingName(true); }}
                        className="text-slate-400 hover:text-orange-600 p-0.5 rounded cursor-pointer transition-colors"
                        title={language === 'hi' ? 'नाम बदलें' : 'Edit profile name'}
                      >
                        <Edit2 size={12} />
                      </button>
                    </div>
                  )}

                  <p className="text-xs font-semibold text-orange-600 dark:text-orange-400 mt-0.5 flex items-center gap-1">
                    <ShieldCheck size={13} />
                    <span>{language === 'hi' ? rankHi : rank} • {language === 'hi' ? `स्तर ${level}` : `Level ${level}`}</span>
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                    {language === 'hi' ? 'व्यावसायिक पाक कला शिक्षार्थी' : 'Professional Culinary Trainee'}
                  </p>
                </div>
              </div>

              {/* Trainee Stats Grid */}
              <div className="grid grid-cols-4 gap-1.5 text-center">
                <div className="bg-slate-50 dark:bg-surface-dark-2 rounded-xl p-2 border border-slate-100 dark:border-slate-800">
                  <p className="text-sm font-bold text-amber-600 font-mono leading-none">{xp}</p>
                  <p className="text-[9px] uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1 font-semibold">XP</p>
                </div>
                <div className="bg-slate-50 dark:bg-surface-dark-2 rounded-xl p-2 border border-slate-100 dark:border-slate-800">
                  <p className="text-sm font-bold text-orange-600 font-mono leading-none">
                    {streak}{language === 'hi' ? ' दिन' : 'd'}
                  </p>
                  <p className="text-[9px] uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1 font-semibold">{language === 'hi' ? 'लय' : 'Streak'}</p>
                </div>
                <div className="bg-slate-50 dark:bg-surface-dark-2 rounded-xl p-2 border border-slate-100 dark:border-slate-800">
                  <p className="text-sm font-bold text-blue-600 font-mono leading-none">{labAttempts.length}</p>
                  <p className="text-[9px] uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1 font-semibold">{language === 'hi' ? 'लैब' : 'Labs'}</p>
                </div>
                <div className="bg-slate-50 dark:bg-surface-dark-2 rounded-xl p-2 border border-slate-100 dark:border-slate-800">
                  <p className="text-sm font-bold text-purple-600 font-mono leading-none">{earnedBadges}</p>
                  <p className="text-[9px] uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1 font-semibold">{language === 'hi' ? 'बैज' : 'Badges'}</p>
                </div>
              </div>

              {/* Navigation Options */}
              <div className="space-y-1 pt-1 border-t border-slate-100 dark:border-slate-800">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2 py-0.5">
                  {language === 'hi' ? 'प्रोफ़ाइल एवं प्रशिक्षण विकल्प' : 'Training & Career Profile'}
                </p>
                <Link
                  to="/progress"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-orange-600 transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <Award size={15} className="text-orange-500" />
                    <span>{language === 'hi' ? 'कैरियर सीढ़ी व बैज' : 'Career Ladder & Badges'}</span>
                  </span>
                  <span className="text-[10px] font-bold font-mono text-slate-400">{language === 'hi' ? rankHi : rank}</span>
                </Link>
                <Link
                  to="/missions"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-orange-600 transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <Target size={15} className="text-amber-500" />
                    <span>{language === 'hi' ? 'व्यापार मिशन व दक्षताएं' : 'Trade Missions & Competencies'}</span>
                  </span>
                  <span className="text-[10px] font-bold text-amber-600">{language === 'hi' ? '8 मिशन' : '8 Missions'}</span>
                </Link>
                <Link
                  to="/labs"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-orange-600 transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <FlaskConical size={15} className="text-blue-500" />
                    <span>{language === 'hi' ? 'किचन सिमुलेशन लैब्स' : 'Virtual Kitchen Labs'}</span>
                  </span>
                  <span className="text-[10px] font-bold text-blue-600">{language === 'hi' ? '13 लैब' : '13 Labs'}</span>
                </Link>
                <Link
                  to="/assessments"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-orange-600 transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <Zap size={15} className="text-purple-500" />
                    <span>{language === 'hi' ? 'व्यापार ज्ञान परीक्षा' : 'Trade Assessments (50 Qs)'}</span>
                  </span>
                  <span className="text-[10px] font-bold text-purple-600">{language === 'hi' ? '50 प्रश्न' : '50 Qs'}</span>
                </Link>
              </div>

              {/* Preferences & Reset Action */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs px-2">
                  <span className="text-slate-500 dark:text-slate-400">{language === 'hi' ? 'भाषा' : 'Language'}</span>
                  <button
                    onClick={handleLangToggle}
                    className="font-semibold text-orange-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Globe size={13} />
                    <span>{language === 'en' ? 'Switch to हिंदी' : 'Switch to English'}</span>
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs px-2">
                  <span className="text-slate-500 dark:text-slate-400">{language === 'hi' ? 'टच ध्वनि' : 'Touch Sound'}</span>
                  <button
                    onClick={toggleSound}
                    className={`font-semibold flex items-center gap-1.5 cursor-pointer ${
                      soundEnabled ? 'text-orange-600 dark:text-orange-400' : 'text-slate-400'
                    }`}
                  >
                    {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
                    <span>{soundEnabled ? (language === 'hi' ? 'चालू (ON)' : 'ON') : (language === 'hi' ? 'बंद (OFF)' : 'OFF')}</span>
                  </button>
                </div>

                {showResetConfirm ? (
                  <div className="rounded-xl p-2.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-xs space-y-2">
                    <p className="text-red-700 dark:text-red-300 font-medium">
                      {language === 'hi'
                        ? 'क्या आप निश्चित हैं? इससे सारा XP व बैज रीसेट हो जाएगा।'
                        : 'Reset all training XP, lab attempts, and earned badges?'}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={handleReset}
                        className="px-3 py-1 bg-red-600 text-white rounded-lg font-bold text-[11px] hover:bg-red-700 cursor-pointer"
                      >
                        {language === 'hi' ? 'हाँ, रीसेट करें' : 'Yes, Reset'}
                      </button>
                      <button
                        onClick={() => setShowResetConfirm(false)}
                        className="px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-[11px] cursor-pointer"
                      >
                        {language === 'hi' ? 'रद्द करें' : 'Cancel'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowResetConfirm(true)}
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[11px] font-semibold text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
                  >
                    <RotateCcw size={12} />
                    <span>{language === 'hi' ? 'प्रशिक्षण प्रगति रीसेट करें' : 'Reset Training Progress'}</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
