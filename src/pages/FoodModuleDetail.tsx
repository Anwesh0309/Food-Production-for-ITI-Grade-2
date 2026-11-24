import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { useAppStore } from '@/context/store';
import { getFoodModule, type Bi } from '@/data/foodData';
import { getFoodSimulation } from '@/components/foodsim';
import { FOOD_THEMES, withAlpha } from '@/components/foodsim/foodTheme';
import {
  Video, BookOpen, Dumbbell, FlaskConical, ClipboardCheck, Wrench, RefreshCw,
  Check, X, Send, RotateCcw, SearchX, ListChecks, Sigma, Target, BookMarked,
  ShieldAlert, Globe, Lightbulb, PartyPopper, ArrowLeft, ArrowRight, type LucideIcon,
} from 'lucide-react';

const STAGES: { key: string; Icon: LucideIcon; en: string; hi: string; desc: Bi }[] = [
  { key: 'watch', Icon: Video, en: 'Watch', hi: 'देखें', desc: { en: 'Overview and learning objectives', hi: 'अवलोकन व सीखने के उद्देश्य' } },
  { key: 'read', Icon: BookOpen, en: 'Read', hi: 'पढ़ें', desc: { en: 'Theory, terminology and formulas', hi: 'सिद्धांत, शब्दावली व सूत्र' } },
  { key: 'practice', Icon: Dumbbell, en: 'Practice', hi: 'अभ्यास', desc: { en: 'Hands-on kitchen exercises', hi: 'व्यावहारिक रसोई अभ्यास' } },
  { key: 'simulate', Icon: FlaskConical, en: 'Simulate', hi: 'सिमुलेट', desc: { en: 'Interactive culinary simulation', hi: 'इंटरैक्टिव पाक सिमुलेशन' } },
  { key: 'quiz', Icon: ClipboardCheck, en: 'Quiz', hi: 'क्विज़', desc: { en: 'Check your understanding', hi: 'अपनी समझ जांचें' } },
  { key: 'apply', Icon: Wrench, en: 'Apply', hi: 'लागू करें', desc: { en: 'Real kitchen scenarios & safety', hi: 'वास्तविक रसोई परिदृश्य व सुरक्षा' } },
  { key: 'review', Icon: RefreshCw, en: 'Review', hi: 'समीक्षा', desc: { en: 'Summary and completion', hi: 'सारांश व समापन' } },
];

export default function FoodModuleDetail() {
  const { id } = useParams<{ id: string }>();
  const { language, addXP, completeLesson, completedLessons, updateOutcomeStatus } = useAppStore();
  const [activeStage, setActiveStage] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const moduleId = parseInt(id || '1');
  const mod = getFoodModule(moduleId);
  const L = (b: Bi) => (language === 'hi' ? b.hi : b.en);

  if (!mod) {
    return (
      <div className="text-center py-16 card p-8 max-w-md mx-auto my-8">
        <SearchX className="w-14 h-14 mx-auto mb-4 text-slate-300 dark:text-slate-600" />
        <h2 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100">{language === 'hi' ? 'मॉड्यूल नहीं मिला' : 'Module Not Found'}</h2>
        <Link to="/modules" className="btn-primary text-sm px-5 py-2.5 mt-4 inline-flex items-center gap-2">
          <ArrowLeft size={16} /> {language === 'hi' ? 'मॉड्यूल पर वापस' : 'Back to Modules'}
        </Link>
      </div>
    );
  }

  const theme = FOOD_THEMES[mod.themeKey];
  const HeaderIcon = theme.Icon;
  const ActiveStageIcon = STAGES[activeStage].Icon;
  const Sim = getFoodSimulation(mod.simId);
  const isCompleted = completedLessons.includes(`food-${moduleId}`);

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    const correctCount = mod.mcqs.reduce((acc, q, i) => acc + (quizAnswers[i] === q.correct ? 1 : 0), 0);
    const score = mod.mcqs.length > 0 ? Math.round((correctCount / mod.mcqs.length) * 100) : 0;
    if (score >= 60) { addXP(25); completeLesson(`food-${moduleId}-quiz`); }
  };

  const handleComplete = () => { addXP(50); completeLesson(`food-${moduleId}`); updateOutcomeStatus(moduleId, "completed"); };

  return (
    <div className="space-y-5 sm:space-y-6 animate-fade-in pb-10">
      {/* Header */}
      <div className="card p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start gap-3.5 min-w-0">
            <Link
              to="/modules"
              className="p-2 -ml-1 rounded-lg text-slate-400 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-surface-dark-2 transition-colors flex-shrink-0"
              aria-label="Back to all modules"
              title={language === 'hi' ? 'मॉड्यूल सूची पर वापस' : 'Back to Modules'}
            >
              <ArrowLeft size={20} />
            </Link>
            <span
              className="grid place-items-center w-12 h-12 rounded-2xl flex-shrink-0 shadow-xs"
              style={{ background: withAlpha(theme.accent, 0.15), color: theme.accent }}
            >
              <HeaderIcon size={24} strokeWidth={2.2} />
            </span>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl font-bold leading-tight text-slate-900 dark:text-white break-words">
                {L(mod.title)}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {language === 'hi' ? `मॉड्यूल ${moduleId} • ${L(mod.section)}` : `Module ${moduleId} • ${L(mod.section)}`}
              </p>
            </div>
          </div>

          {isCompleted && (
            <div className="flex-shrink-0 self-start sm:self-auto pl-10 sm:pl-0">
              <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 font-semibold shadow-xs">
                <Check size={14} strokeWidth={2.5} /> {language === 'hi' ? 'पूर्ण' : 'Completed'}
              </span>
            </div>
          )}
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 leading-relaxed">
          {L(mod.desc)}
        </p>
      </div>

      {/* 7-stage nav */}
      <div className="card p-2 sm:p-2.5 shadow-sm">
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5 px-0.5">
          {STAGES.map((stage, i) => {
            const isActive = activeStage === i;
            return (
              <button
                key={stage.key}
                onClick={() => setActiveStage(i)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer min-h-[38px] ${
                  isActive
                    ? 'text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-surface-dark-2'
                }`}
                style={isActive ? { background: theme.accent, boxShadow: `0 2px 8px ${withAlpha(theme.accent, 0.35)}` } : {}}
              >
                <stage.Icon size={15} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-white' : 'text-slate-400'} />
                <span>{language === 'hi' ? stage.hi : stage.en}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stage content */}
      <div className="card p-4 sm:p-6 shadow-sm">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-3 mb-5">
          <h2 className="text-base sm:text-lg font-bold flex flex-wrap items-center gap-2 text-slate-900 dark:text-slate-100">
            <ActiveStageIcon size={20} style={{ color: theme.accent }} strokeWidth={2.2} />
            <span>{language === 'hi' ? STAGES[activeStage].hi : STAGES[activeStage].en}</span>
            <span className="text-xs font-normal text-slate-500 dark:text-slate-400 break-words">— {L(STAGES[activeStage].desc)}</span>
          </h2>
        </div>

        {/* WATCH */}
        {activeStage === 0 && (
          <div className="space-y-4">
            <div
              className="rounded-xl overflow-hidden p-6 sm:p-8 text-center text-white relative shadow-inner"
              style={{ background: `linear-gradient(135deg, ${withAlpha(theme.accent, 0.95)}, ${withAlpha(theme.accent2, 0.9)})` }}
            >
              <HeaderIcon className="w-12 h-12 mx-auto mb-3 text-white/90" strokeWidth={1.7} />
              <p className="text-white text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">{L(mod.desc)}</p>
              <div className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/20 text-white/90 text-xs font-medium">
                <Video size={13} /> {language === 'hi' ? 'वीडियो व्याख्यान एवं सिमुलेशन' : 'Video lecture & simulation preview'}
              </div>
            </div>

            <div className="rounded-xl p-4 sm:p-5 border" style={{ background: withAlpha(theme.accent, 0.06), borderColor: withAlpha(theme.accent, 0.2) }}>
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2" style={{ color: theme.accent }}>
                <Target size={16} /> {language === 'hi' ? 'सीखने के मुख्य उद्देश्य' : 'Key Learning Objectives'}
              </h3>
              <ul className="space-y-2">
                {mod.objectives.map((o, i) => (
                  <li key={i} className="text-xs sm:text-sm flex items-start gap-2 text-slate-700 dark:text-slate-200 leading-relaxed">
                    <span style={{ color: theme.accent }} className="mt-0.5 font-bold flex-shrink-0">•</span>
                    <span>{L(o)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700/80">
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2 text-slate-800 dark:text-slate-200">
                <ListChecks size={16} /> {language === 'hi' ? 'मुख्य विषय सूची' : 'Key Topics Covered'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {mod.keyTopics.map((topic, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1.5 rounded-lg font-medium"
                    style={{ background: withAlpha(theme.accent, 0.1), color: theme.accent }}
                  >
                    {L(topic)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* READ */}
        {activeStage === 1 && (
          <div className="space-y-6">
            <div className="text-sm leading-relaxed text-slate-700 dark:text-slate-200 whitespace-pre-line bg-slate-50 dark:bg-surface-dark-2/40 p-4 sm:p-5 rounded-xl border border-slate-200/80 dark:border-slate-700/60 font-sans">
              {L(mod.theory)}
            </div>

            {mod.terminology.length > 0 && (
              <div>
                <h3 className="font-bold text-sm mb-3 flex items-center gap-2 text-slate-800 dark:text-slate-100">
                  <BookMarked size={16} /> {language === 'hi' ? 'महत्वपूर्ण शब्दावली' : 'Key Terminology'}
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {mod.terminology.map((term, i) => (
                    <div key={i} className="rounded-xl p-3.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark-1 shadow-2xs">
                      <p className="text-sm font-bold" style={{ color: theme.accent }}>{L(term.term)}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">{L(term.def)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {mod.formulas && mod.formulas.length > 0 && (
              <div>
                <h3 className="font-bold text-sm mb-3 flex items-center gap-2 text-slate-800 dark:text-slate-100">
                  <Sigma size={16} /> {language === 'hi' ? 'सूत्र व महत्वपूर्ण गणना' : 'Formulas & Culinary Calculations'}
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {mod.formulas.map((f, i) => (
                    <div key={i} className="rounded-xl p-4 border" style={{ background: withAlpha(theme.accent, 0.06), borderColor: withAlpha(theme.accent, 0.2) }}>
                      <p className="text-xs font-semibold mb-1" style={{ color: theme.accent }}>{L(f.name)}</p>
                      <p className="font-mono text-base font-bold text-slate-900 dark:text-slate-100">{f.formula}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{L(f.desc)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* PRACTICE */}
        {activeStage === 2 && (
          <div className="space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {language === 'hi' ? 'इन व्यावहारिक कार्यों को रसोई में या मानसिक रूप से करें — प्रत्येक एक वास्तविक कौशल बनाता है।' : 'Work through these hands-on tasks in the kitchen or mentally — each builds a real skill.'}
            </p>
            <div className="space-y-2.5">
              {mod.practice.map((p, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl p-3.5 border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-surface-dark-1 shadow-2xs">
                  <span className="grid place-items-center w-6 h-6 rounded-full text-xs font-bold text-white flex-shrink-0 mt-0.5" style={{ background: theme.accent }}>
                    {i + 1}
                  </span>
                  <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{L(p)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SIMULATE */}
        {activeStage === 3 && (
          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              {language === 'hi' ? 'नीचे दिए गए इंटरैक्टिव सिमुलेशन के साथ प्रयोग करें — आपके हर कदम पर यह प्रतिक्रिया देता है।' : 'Experiment with the interactive simulation below — it responds to every action you take.'}
            </p>
            {Sim ? (
              <div className="w-full overflow-hidden">
                <Sim />
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 card border-dashed">
                <FlaskConical className="w-10 h-10 mx-auto mb-3 text-slate-300 dark:text-slate-600" strokeWidth={1.6} />
                <p className="text-sm font-medium">{language === 'hi' ? 'सिमुलेशन लोड हो रहा है...' : 'Simulation coming soon'}</p>
              </div>
            )}
          </div>
        )}

        {/* QUIZ */}
        {activeStage === 4 && (
          <div className="space-y-4">
            {mod.mcqs.length === 0 ? (
              <p className="text-sm text-slate-500 py-4 text-center">{language === 'hi' ? 'इस मॉड्यूल के लिए कोई प्रश्न नहीं है।' : 'No questions for this module.'}</p>
            ) : (
              mod.mcqs.map((q, qi) => (
                <div key={qi} className="rounded-xl border border-slate-200 dark:border-slate-700/80 p-4 sm:p-5 bg-white dark:bg-surface-dark-1 shadow-2xs">
                  <p className="font-semibold text-sm sm:text-base text-slate-900 dark:text-slate-100 mb-3.5">
                    {language === 'hi' ? `प्रश्न ${qi + 1}: ${q.q.hi}` : `Q${qi + 1}: ${q.q.en}`}
                  </p>
                  <div className="grid gap-2 sm:gap-2.5">
                    {q.options.map((opt, oi) => {
                      const isSelected = quizAnswers[qi] === oi;
                      const isCorrect = quizSubmitted && oi === q.correct;
                      const isWrong = quizSubmitted && isSelected && oi !== q.correct;
                      return (
                        <button
                          key={oi}
                          onClick={() => !quizSubmitted && setQuizAnswers({ ...quizAnswers, [qi]: oi })}
                          disabled={quizSubmitted}
                          className={`text-left text-xs sm:text-sm px-4 py-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                            isCorrect
                              ? 'border-green-500 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300 font-medium'
                              : isWrong
                              ? 'border-red-500 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300'
                              : isSelected
                              ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/30 text-orange-900 dark:text-orange-200 font-medium'
                              : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-surface-dark-2/50 text-slate-700 dark:text-slate-200'
                          }`}
                        >
                          <div className="flex items-center min-w-0 pr-2">
                            <span className="font-mono text-xs mr-2.5 opacity-60 flex-shrink-0">{String.fromCharCode(65 + oi)}.</span>
                            <span className="break-words">{language === 'hi' ? opt.hi : opt.en}</span>
                          </div>
                          {isCorrect && <Check size={16} className="text-green-600 flex-shrink-0" />}
                          {isWrong && <X size={16} className="text-red-600 flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                  {quizSubmitted && (
                    <div className={`mt-3 p-3 rounded-lg text-xs flex items-start gap-2 ${
                      quizAnswers[qi] === q.correct
                        ? 'bg-green-50 dark:bg-green-950/30 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800/40'
                        : 'bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800/40'
                    }`}>
                      <Lightbulb size={15} className="mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">{language === 'hi' ? q.explanation.hi : q.explanation.en}</span>
                    </div>
                  )}
                </div>
              ))
            )}

            {mod.mcqs.length > 0 && (!quizSubmitted ? (
              <button
                onClick={handleQuizSubmit}
                disabled={Object.keys(quizAnswers).length < mod.mcqs.length}
                className="btn-primary text-sm px-6 py-2.5 disabled:opacity-40"
              >
                <Send size={15} /> {language === 'hi' ? 'उत्तर जमा करें' : 'Submit Answers'}
              </button>
            ) : (
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="text-base font-bold text-slate-800 dark:text-slate-100">
                  {language === 'hi' ? 'स्कोर: ' : 'Score: '}
                  <span className="text-orange-600 dark:text-orange-400 font-mono">
                    {mod.mcqs.reduce((a, q, i) => a + (quizAnswers[i] === q.correct ? 1 : 0), 0)}/{mod.mcqs.length}
                  </span>
                </div>
                <button
                  onClick={() => { setQuizSubmitted(false); setQuizAnswers({}); }}
                  className="btn-secondary text-sm px-5 py-2"
                >
                  <RotateCcw size={15} /> {language === 'hi' ? 'पुनः प्रयास' : 'Try Again'}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* APPLY */}
        {activeStage === 5 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2 text-slate-800 dark:text-slate-100">
                <Globe size={16} style={{ color: theme.accent2 }} /> {language === 'hi' ? 'वास्तविक रसोई परिदृश्य' : 'Real Kitchen Scenarios'}
              </h3>
              <div className="space-y-2.5">
                {mod.apply.map((a, i) => (
                  <div key={i} className="rounded-xl p-3.5 border" style={{ background: withAlpha(theme.accent2, 0.06), borderColor: withAlpha(theme.accent2, 0.25) }}>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{L(a)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2 text-rose-600 dark:text-rose-400">
                <ShieldAlert size={16} /> {language === 'hi' ? 'सुरक्षा व स्वच्छता सावधानियां' : 'Safety & Hygiene Safeguards'}
              </h3>
              <div className="space-y-2.5">
                {mod.safety.map((s, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/40">
                    <ShieldAlert size={15} className="text-rose-500 mt-0.5 flex-shrink-0" />
                    <p className="text-xs sm:text-sm text-rose-900 dark:text-rose-200 leading-relaxed">{L(s)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2 text-slate-800 dark:text-slate-100">
                <Wrench size={16} /> {language === 'hi' ? 'उद्योग अनुप्रयोग' : 'Industry Trade Applications'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {mod.applications.map((app, i) => (
                  <span key={i} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-surface-dark-2 text-slate-700 dark:text-slate-300 font-medium">
                    {L(app)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* REVIEW */}
        {activeStage === 6 && (
          <div className="space-y-5">
            <div className="rounded-xl p-5 border" style={{ background: withAlpha(theme.accent, 0.07), borderColor: withAlpha(theme.accent, 0.25) }}>
              <h3 className="font-bold text-sm mb-2 flex items-center gap-2" style={{ color: theme.accent }}>
                <RefreshCw size={16} /> {language === 'hi' ? 'अध्याय सारांश' : 'Module Summary'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 whitespace-pre-line leading-relaxed">{L(mod.review)}</p>
            </div>

            <div className="rounded-xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-surface-dark-1">
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2 text-slate-800 dark:text-slate-100">
                <ListChecks size={16} /> {language === 'hi' ? 'मुख्य निष्कर्ष' : 'Key Takeaways'}
              </h3>
              <ul className="space-y-2">
                {mod.keyTopics.map((topic, i) => (
                  <li key={i} className="text-xs sm:text-sm flex items-start gap-2.5 text-slate-700 dark:text-slate-200">
                    <span className="font-bold font-mono" style={{ color: theme.accent }}>{i + 1}.</span>
                    <span className="leading-relaxed">{L(topic)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 text-center">
              {!isCompleted ? (
                <button
                  onClick={handleComplete}
                  className="px-6 py-3 rounded-xl font-bold text-sm text-white shadow-md hover:brightness-105 active:scale-98 transition-all inline-flex items-center gap-2 cursor-pointer"
                  style={{ background: theme.accent }}
                >
                  <Check size={18} strokeWidth={2.5} /> {language === 'hi' ? 'मॉड्यूल पूर्ण करें (+50 XP)' : 'Complete Module (+50 XP)'}
                </button>
              ) : (
                <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/40 rounded-xl inline-block max-w-sm mx-auto">
                  <PartyPopper className="w-8 h-8 mx-auto mb-1 text-green-500" />
                  <p className="text-sm font-bold text-green-700 dark:text-green-300">
                    {language === 'hi' ? 'यह मॉड्यूल पूरा हो चुका है!' : 'This module is completed!'}
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-0.5">
                    {language === 'hi' ? 'बधाई! आपकी प्रगति सहेज ली गई है।' : 'Great job! Your progress has been saved.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Prev / Next */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <button
          onClick={() => setActiveStage(Math.max(0, activeStage - 1))}
          disabled={activeStage === 0}
          className="btn-secondary text-xs sm:text-sm px-4 py-2.5 disabled:opacity-30"
        >
          <ArrowLeft size={14} /> {language === 'hi' ? 'पिछला' : 'Previous'}
        </button>
        <button
          onClick={() => setActiveStage(Math.min(STAGES.length - 1, activeStage + 1))}
          disabled={activeStage === STAGES.length - 1}
          className="btn-primary text-xs sm:text-sm px-5 py-2.5 disabled:opacity-30"
          style={{ background: theme.accent }}
        >
          {language === 'hi' ? 'अगला' : 'Next'} <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
