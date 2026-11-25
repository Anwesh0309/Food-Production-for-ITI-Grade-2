import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/context/store';
import { Check, X } from 'lucide-react';
import { QUESTION_BANK, type Question } from '@/data/assessmentQuestions';
import { playTouchSound } from '@/utils/sound';

const TOPIC_HI: Record<string, string> = {
  Bakery: 'बेकरी',
  Commodities: 'सामग्री',
  Cooking: 'पाक विधि',
  Cuts: 'सब्ज़ी कट्स',
  Equipment: 'उपकरण',
  Hygiene: 'स्वच्छता',
  Kitchen: 'रसोई',
  Presentation: 'प्रस्तुति',
  Safety: 'सुरक्षा',
  Sauces: 'सॉस',
  Storage: 'भंडारण',
  Uniform: 'वर्दी',
};

export default function Assessments() {
  const { t } = useTranslation();
  const { language, addXP, earnBadge } = useAppStore();
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [numericInput, setNumericInput] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');

  const filteredQuestions = selectedDifficulty === 'all'
    ? QUESTION_BANK
    : QUESTION_BANK.filter((q) => q.difficulty === selectedDifficulty);

  const question = filteredQuestions[currentQ];
  const isCorrect = question
    ? question.type === 'numeric'
      ? Number(answers[question.id]) === question.correct
      : answers[question.id] === question.correct
    : false;

  const score = filteredQuestions.filter((q) => {
    const ans = answers[q.id];
    if (q.type === 'numeric') return Number(ans) === q.correct;
    return ans === q.correct;
  }).length;

  const handleAnswer = (value: string | number) => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
    setShowExplanation(true);
    const correctAns = question.type === 'numeric' ? Number(value) === question.correct : value === question.correct;
    playTouchSound(correctAns ? 'success' : 'error');
  };

  const nextQuestion = () => {
    setShowExplanation(false);
    setNumericInput('');
    if (currentQ < filteredQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setQuizComplete(true);
      addXP(score * 20);
      if (score === filteredQuestions.length) {
        earnBadge('quiz_champion');
      }
    }
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setCurrentQ(0);
    setAnswers({});
    setShowExplanation(false);
    setQuizComplete(false);
    setNumericInput('');
  };

  if (!quizStarted) {
    return (
      <div className="space-y-6 animate-fade-in pb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{t('nav.quiz')}</h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {language === 'hi' ? 'खाद्य उत्पादन व्यापार सिद्धांत व व्यावहारिक ज्ञान का परीक्षण करें' : 'Test your food production culinary theory and safety knowledge'}
          </p>
        </div>

        <div className="card p-6 sm:p-8 max-w-lg mx-auto text-center shadow-md">
          <span className="text-5xl block mb-2">📝</span>
          <h2 className="text-lg sm:text-xl font-bold mt-2 text-slate-900 dark:text-slate-100">
            {language === 'hi' ? 'व्यापार मूल्यांकन क्विज़' : 'Trade Knowledge Assessment'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
            {language === 'hi' ? `${filteredQuestions.length} प्रश्न उपलब्ध हैं` : `${filteredQuestions.length} questions available`}
          </p>

          <div className="flex gap-2 justify-center mt-5 flex-wrap">
            {(['all', 'easy', 'medium', 'hard'] as const).map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDifficulty(d)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer shadow-2xs ${
                  selectedDifficulty === d
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-surface-dark-2 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-surface-dark-3'
                }`}
              >
                {d === 'all' ? (language === 'hi' ? 'सभी' : 'All') :
                 d === 'easy' ? (language === 'hi' ? 'आसान' : 'Easy') :
                 d === 'medium' ? (language === 'hi' ? 'मध्यम' : 'Medium') :
                 (language === 'hi' ? 'कठिन' : 'Hard')}
              </button>
            ))}
          </div>

          <button onClick={() => setQuizStarted(true)} className="btn-primary mt-6 px-8 py-3 text-sm font-bold shadow-md cursor-pointer w-full sm:w-auto">
            ▶ {language === 'hi' ? 'क्विज़ शुरू करें' : 'Begin Assessment'}
          </button>
        </div>
      </div>
    );
  }

  if (quizComplete) {
    const percent = Math.round((score / filteredQuestions.length) * 100);
    return (
      <div className="space-y-6 animate-fade-in pb-8">
        <div className="card p-6 sm:p-8 max-w-lg mx-auto text-center shadow-md">
          <span className="text-5xl block mb-2">{percent >= 80 ? '🏆' : percent >= 50 ? '👍' : '📚'}</span>
          <h2 className="text-xl sm:text-2xl font-bold mt-2 text-slate-900 dark:text-white">
            {language === 'hi' ? 'क्विज़ पूरा हुआ!' : 'Assessment Complete!'}
          </h2>
          <p className="text-4xl font-extrabold mt-3 text-orange-600 dark:text-orange-400 font-mono">
            {score}/{filteredQuestions.length}
          </p>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
            {percent}% {language === 'hi' ? 'सही उत्तर' : 'correct'}
          </p>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 mt-5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${percent >= 80 ? 'bg-green-500' : percent >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="text-xs sm:text-sm mt-3 font-semibold text-orange-700 dark:text-orange-300">
            +{score * 20} XP {language === 'hi' ? 'अर्जित हुआ' : 'earned'}
          </p>
          <button onClick={restartQuiz} className="btn-primary mt-6 px-8 py-2.5 text-sm font-semibold shadow-md cursor-pointer">
            🔄 {language === 'hi' ? 'फिर से प्रयास करें' : 'Take Another Quiz'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-slate-500 dark:text-slate-400 font-mono font-semibold">{currentQ + 1}/{filteredQuestions.length}</span>
        <div className="flex-1 progress-bar">
          <div className="progress-fill bg-orange-500" style={{ width: `${((currentQ + 1) / filteredQuestions.length) * 100}%` }} />
        </div>
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 font-mono">
          {language === 'hi' ? `स्कोर: ${score}` : `Score: ${score}`}
        </span>
      </div>

      <div className="card p-5 sm:p-7 max-w-2xl mx-auto shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-4 pb-2.5 border-b border-slate-100 dark:border-slate-800">
          <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
            question.difficulty === 'easy' ? 'bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-300' :
            question.difficulty === 'medium' ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300' :
            'bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-300'
          }`}>
            {language === 'hi'
              ? (question.difficulty === 'easy' ? 'आसान' : question.difficulty === 'medium' ? 'मध्यम' : 'कठिन')
              : question.difficulty}
          </span>
          <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold">
            {language === 'hi' ? (TOPIC_HI[question.topic] || question.topic) : question.topic}
          </span>
        </div>

        <h2 className="text-lg sm:text-xl font-bold mb-5 text-slate-900 dark:text-white leading-snug">
          {language === 'hi' ? question.textHi : question.text}
        </h2>

        {question.type === 'mcq' && question.options && (
          <div className="space-y-3">
            {question.options.map((opt) => {
              const isSelected = answers[question.id] === opt.id;
              const isRight = opt.id === question.correct;
              return (
                <button
                  key={opt.id}
                  onClick={() => !showExplanation && handleAnswer(opt.id)}
                  disabled={showExplanation}
                  className={`w-full text-left p-4 rounded-xl border transition-all text-sm sm:text-base flex items-center justify-between cursor-pointer shadow-2xs ${
                    showExplanation
                      ? isRight
                        ? 'border-green-500 bg-green-50 dark:bg-green-950/30 text-green-800 dark:text-green-200 font-bold'
                        : isSelected
                        ? 'border-red-500 bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-200'
                        : 'border-slate-200 dark:border-slate-700 opacity-40 bg-white dark:bg-surface-dark-2'
                      : isSelected
                      ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/30 text-orange-900 dark:text-orange-200 font-bold'
                      : 'border-slate-200 dark:border-slate-700 hover:border-orange-400 bg-white dark:bg-surface-dark-2 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center min-w-0 pr-2">
                    <span className="font-mono font-bold mr-3 opacity-70 flex-shrink-0 text-sm sm:text-base">{opt.id.toUpperCase()}.</span>
                    <span className="break-words leading-relaxed">{language === 'hi' ? opt.textHi : opt.text}</span>
                  </div>
                  {showExplanation && isRight && <Check size={18} className="text-green-600 dark:text-green-400 flex-shrink-0" />}
                  {showExplanation && isSelected && !isRight && <X size={18} className="text-red-600 dark:text-red-400 flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        )}

        {question.type === 'numeric' && (
          <div className="flex gap-2.5">
            <input
              type="number"
              value={numericInput}
              onChange={(e) => setNumericInput(e.target.value)}
              disabled={showExplanation}
              placeholder={language === 'hi' ? 'संख्यात्मक उत्तर दर्ज करें...' : 'Enter your numeric answer...'}
              className="input-field flex-1 text-base font-mono p-3"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && numericInput && !showExplanation) {
                  handleAnswer(Number(numericInput));
                }
              }}
            />
            {!showExplanation && (
              <button
                onClick={() => handleAnswer(Number(numericInput))}
                disabled={!numericInput}
                className="btn-primary px-6 text-sm sm:text-base font-bold cursor-pointer"
              >
                {language === 'hi' ? 'जमा करें' : 'Submit'}
              </button>
            )}
          </div>
        )}

        {showExplanation && (
          <div className={`mt-5 p-4 sm:p-5 rounded-xl border leading-relaxed ${
            isCorrect
              ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800/40 text-green-900 dark:text-green-200'
              : 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800/40 text-red-900 dark:text-red-200'
          }`}>
            <p className="text-base font-bold mb-1.5 flex items-center gap-2">
              <span>{isCorrect ? '✅' : '❌'}</span>
              <span>
                {isCorrect
                  ? (language === 'hi' ? 'सही उत्तर!' : 'Correct Answer!')
                  : (language === 'hi' ? 'गलत उत्तर' : 'Incorrect')}
              </span>
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {language === 'hi' ? question.explanationHi : question.explanation}
            </p>
          </div>
        )}

        {showExplanation && (
          <button onClick={nextQuestion} className="btn-primary mt-6 w-full py-3.5 text-base font-bold shadow-md cursor-pointer">
            {currentQ < filteredQuestions.length - 1
              ? (language === 'hi' ? 'अगला प्रश्न →' : 'Next Question →')
              : (language === 'hi' ? 'परिणाम देखें' : 'See Results')
            }
          </button>
        )}
      </div>
    </div>
  );
}
