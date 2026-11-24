import { useCallback } from 'react';
import { useAppStore } from '@/context/store';
import type { LucideIcon } from 'lucide-react';
import { withAlpha } from './foodTheme';

/** Bilingual helper tied to the store language. */
export function useLang() {
  const { language } = useAppStore();
  return useCallback((en: string, hi: string) => (language === 'hi' ? hi : en), [language]);
}

/** Standard themed wrapper so every food simulation looks like one unified system. */
export function FoodShell({ title, subtitle, accent, Icon, children, controls }: {
  title: string; subtitle?: string; accent: string; Icon: LucideIcon;
  children: React.ReactNode; controls?: React.ReactNode;
}) {
  return (
    <div
      className="rounded-2xl border overflow-hidden bg-white dark:bg-surface-dark-1 shadow-sm transition-colors"
      style={{ borderColor: withAlpha(accent, 0.28) }}
    >
      <div
        className="px-4 py-3.5 sm:px-5 sm:py-4 border-b flex items-center gap-3.5"
        style={{
          borderColor: withAlpha(accent, 0.18),
          background: `linear-gradient(90deg, ${withAlpha(accent, 0.12)}, transparent)`,
        }}
      >
        <span
          className="grid place-items-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex-shrink-0 shadow-2xs"
          style={{ background: withAlpha(accent, 0.16), color: accent }}
        >
          <Icon size={23} strokeWidth={2.2} />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-base sm:text-lg leading-snug break-words" style={{ color: accent }}>
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 line-clamp-2 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
        {children}
        {controls && <div className="space-y-3.5 pt-2 border-t border-slate-100 dark:border-slate-800">{controls}</div>}
      </div>
    </div>
  );
}

export function FoodSlider({ label, value, min, max, step = 1, unit = '', onChange, color = '#ea580c' }: {
  label: string; value: number; min: number; max: number; step?: number; unit?: string; onChange: (v: number) => void; color?: string;
}) {
  return (
    <label className="block select-none cursor-pointer">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">{label}</span>
        <span
          className="text-xs sm:text-sm font-mono font-bold px-2.5 py-0.5 rounded-md"
          style={{ color, background: withAlpha(color, 0.14) }}
        >
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-3 rounded-full appearance-none cursor-pointer bg-slate-200 dark:bg-slate-700 focus:outline-none"
        style={{ accentColor: color }}
      />
    </label>
  );
}

export function FoodSegmented<T extends string | number>({ options, value, onChange, accent = '#ea580c' }: {
  options: { value: T; label: string }[]; value: T; onChange: (v: T) => void; accent?: string;
}) {
  return (
    <div className="inline-flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-surface-dark-2 border border-slate-200/70 dark:border-slate-700/60">
      {options.map((o) => (
        <button
          key={String(o.value)}
          onClick={() => onChange(o.value)}
          className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            value === o.value
              ? 'bg-white dark:bg-surface-dark-0 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
          style={value === o.value ? { color: accent } : undefined}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function FoodStat({ label, value, unit = '', color = '#ea580c', sub }: {
  label: string; value: string | number; unit?: string; color?: string; sub?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700/80 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-white dark:bg-surface-dark-1 shadow-2xs min-w-0">
      <p className="text-[11px] sm:text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold truncate">
        {label}
      </p>
      <p className="text-lg sm:text-xl font-extrabold font-mono leading-tight truncate mt-0.5" style={{ color }}>
        {value}
        <span className="text-xs sm:text-sm ml-0.5 opacity-80 font-normal">{unit}</span>
      </p>
      {sub && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate font-medium">{sub}</p>}
    </div>
  );
}

export function FoodProgress({ value, max, accent = '#ea580c' }: { value: number; max: number; accent?: string }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700/70 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-300 ease-out"
        style={{ width: `${pct}%`, background: accent }}
      />
    </div>
  );
}
