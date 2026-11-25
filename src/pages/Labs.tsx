import { Link } from 'react-router-dom';
import { useAppStore } from '@/context/store';
import { FOOD_LABS } from '@/data/foodLabs';
import { FOOD_THEMES, withAlpha } from '@/components/foodsim/foodTheme';
import { ArrowRight, FlaskConical } from 'lucide-react';

export default function Labs() {
  const { language } = useAppStore();
  const L = (b: { en: string; hi: string }) => (language === 'hi' ? b.hi : b.en);

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <FlaskConical size={24} className="text-orange-500" />
            <span>{language === 'hi' ? 'वर्चुअल किचन लैब' : 'Virtual Kitchen Labs'}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {language === 'hi'
              ? 'इंटरैक्टिव रसोई सिमुलेशन — अभ्यास करें, वास्तविक समय प्रतिक्रिया पाएं, कौशल बनाएं।'
              : 'Interactive kitchen simulations — practise hands-on, receive instant feedback, build trade skills.'}
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 self-start sm:self-auto">
          {FOOD_LABS.length} {language === 'hi' ? 'लैब उपलब्ध' : 'Labs Available'}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FOOD_LABS.map((lab) => {
          const theme = FOOD_THEMES[lab.themeKey];
          const Icon = theme.Icon;
          return (
            <Link
              key={lab.simId}
              to={`/labs/${lab.simId}`}
              className="card p-5 card-hover flex flex-col justify-between group relative h-full shadow-xs"
              style={{ borderLeftWidth: '4px', borderLeftColor: theme.accent }}
            >
              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3.5">
                  <span
                    className="grid place-items-center w-12 h-12 sm:w-13 sm:h-13 rounded-2xl shadow-2xs group-hover:scale-105 transition-transform"
                    style={{ background: withAlpha(theme.accent, 0.15), color: theme.accent }}
                  >
                    <Icon size={25} strokeWidth={2.2} />
                  </span>
                  <span
                    className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-2xs"
                    style={{ background: withAlpha(theme.accent, 0.12), color: theme.accent }}
                  >
                    {L(lab.tag)}
                  </span>
                </div>
                <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  {L(lab.title)}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed line-clamp-3 flex-1">
                  {L(lab.desc)}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs sm:text-sm font-bold" style={{ color: theme.accent }}>
                <span>{language === 'hi' ? 'लैब खोलें' : 'Open simulation'}</span>
                <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
