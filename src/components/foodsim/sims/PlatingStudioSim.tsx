import { useState } from 'react';
import { CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { FoodShell, FoodStat, useLang } from '../foodPrimitives';
import { FOOD_THEMES } from '../foodTheme';
import { useAppStore } from '@/context/store';

const T = FOOD_THEMES.plating;

// clock-method plate: protein 6 o'clock, starch 10, veg 2, sauce under/around, garnish centre-high
interface Comp { id: string; en: string; hi: string; color: string; ideal: number; r: number }
const COMPS: Comp[] = [
  { id: 'protein', en: 'Protein', hi: 'प्रोटीन', color: '#b45309', ideal: 6, r: 30 },
  { id: 'starch', en: 'Starch', hi: 'स्टार्च', color: '#eab308', ideal: 10, r: 26 },
  { id: 'veg', en: 'Vegetables', hi: 'सब्ज़ियां', color: '#16a34a', ideal: 2, r: 24 },
  { id: 'sauce', en: 'Sauce', hi: 'सॉस', color: '#dc2626', ideal: 6, r: 38 },
  { id: 'garnish', en: 'Garnish', hi: 'गार्निश', color: '#059669', ideal: 12, r: 22 },
];
// plate centre
const CX = 150, CY = 150, PLATE_R = 120, FOOD_R = 78;
// clock hour → angle (12 at top). svg y down.
function hourPos(hour: number, dist: number) {
  const ang = ((hour % 12) / 12) * Math.PI * 2 - Math.PI / 2;
  return { x: CX + Math.cos(ang) * dist, y: CY + Math.sin(ang) * dist };
}

export function PlatingStudioSim() {
  const L = useLang();
  const { language } = useAppStore();
  const [placed, setPlaced] = useState<Record<string, number>>({}); // comp -> hour slot
  const [sel, setSel] = useState<string>('protein');
  const [checked, setChecked] = useState(false);

  const placeAt = (hour: number) => { setPlaced((p) => ({ ...p, [sel]: hour })); setChecked(false); };
  const removeComp = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPlaced((p) => {
      const next = { ...p };
      delete next[id];
      return next;
    });
    setChecked(false);
  };
  const unplaced = COMPS.filter((c) => placed[c.id] === undefined);

  // scoring: distance between placed hour and ideal (circular), + balance (not all crowded)
  const scoreComp = (c: Comp) => {
    const h = placed[c.id]; if (h === undefined) return 0;
    let d = Math.abs(h - c.ideal); d = Math.min(d, 12 - d); // circular 0..6
    return Math.max(0, 1 - d / 4); // within ~4hrs gets partial
  };
  const total = COMPS.reduce((s, c) => s + scoreComp(c), 0);
  const pct = Math.round((total / COMPS.length) * 100);
  const allPlaced = unplaced.length === 0;

  return (
    <FoodShell accent={T.accent} Icon={T.Icon}
      title={L('Food Plating Studio', 'फूड प्लेटिंग स्टूडियो')}
      subtitle={L('Select a component, then tap a clock position on the plate. Classic clock method: protein at 6, starch at 10, vegetables at 2, with sauce as a base and garnish lifting the centre.',
        'एक घटक चुनें, फिर प्लेट पर घड़ी-स्थिति टैप करें। क्लॉक विधि: प्रोटीन 6 पर, स्टार्च 10 पर, सब्ज़ी 2 पर।')}
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <FoodStat label={L('Placed', 'रखा')} value={`${COMPS.length - unplaced.length}/${COMPS.length}`} color={T.accent} />
        <FoodStat label={L('Remaining', 'शेष')} value={unplaced.length} color={unplaced.length === 0 ? '#16a34a' : '#64748b'} />
        <div className="col-span-2 sm:col-span-1">
          <FoodStat
            label={L('Plating score', 'प्लेटिंग स्कोर')}
            value={checked ? `${pct}%` : '--'}
            color={checked ? (pct >= 80 ? '#16a34a' : pct >= 50 ? '#d97706' : '#dc2626') : '#94a3b8'}
            sub={checked ? (pct >= 80 ? L('Pass', 'उत्तीर्ण') : L('Needs tweak', 'सुधार चाहिए')) : L('Tap Rate my plate', 'रेट करें दबाएं')}
          />
        </div>
      </div>

      {/* palette */}
      <div className="flex flex-wrap gap-2.5">
        {COMPS.map((c) => {
          const isSel = sel === c.id;
          const isPlaced = placed[c.id] !== undefined;
          return (
            <div
              key={c.id}
              onClick={() => setSel(c.id)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all flex items-center gap-2 cursor-pointer shadow-2xs ${
                isSel
                  ? 'border-pink-500 bg-pink-50 dark:bg-pink-950/30 text-pink-700 dark:text-pink-300 ring-2 ring-pink-400/40'
                  : 'bg-white dark:bg-surface-dark-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-slate-300'
              }`}
              style={isSel ? { borderColor: c.color, color: c.color } : {}}
            >
              <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: c.color }} />
              <span>{L(c.en, c.hi)}</span>
              {isPlaced && (
                <div className="flex items-center gap-1 ml-1.5">
                  <CheckCircle2 size={14} className="text-green-600 dark:text-green-400" />
                  <span
                    onClick={(e) => removeComp(c.id, e)}
                    title={language === 'hi' ? 'हटाएं' : 'Remove from plate'}
                    className="text-slate-400 hover:text-red-500 font-extrabold text-sm px-1 rounded cursor-pointer"
                  >
                    ×
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-700 flex justify-center py-4 bg-slate-50 dark:bg-slate-900/40">
        <svg viewBox="0 0 300 300" className="w-full max-w-[340px]" style={{ touchAction: 'manipulation' }}>
          <defs>
            <radialGradient id="plate" cx="0.4" cy="0.35" r="0.8"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#e2e8f0" /></radialGradient>
          </defs>
          <circle cx={CX} cy={CY} r={PLATE_R} fill="url(#plate)" stroke="#cbd5e1" strokeWidth="2" />
          <circle cx={CX} cy={CY} r={PLATE_R - 16} fill="none" stroke="#e2e8f0" strokeWidth="1.5" />

          {/* clickable clock slots */}
          {Array.from({ length: 12 }, (_, i) => {
            const hour = i + 1;
            const p = hourPos(hour, FOOD_R);
            return (
              <g key={hour} onClick={() => placeAt(hour)} style={{ cursor: 'pointer' }}>
                {/* enlarged hit target */}
                <circle cx={p.x} cy={p.y} r="22" fill="transparent" />
                <circle cx={p.x} cy={p.y} r="16" fill="#64748b" fillOpacity="0.08" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 2" />
                <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="10" fontWeight="800" fill="#64748b">{hour}</text>
              </g>
            );
          })}

          {/* placed components */}
          {COMPS.map((c) => {
            const h = placed[c.id]; if (h === undefined) return null;
            const p = hourPos(h, FOOD_R);
            const good = checked && scoreComp(c) >= 0.75;
            const bad = checked && scoreComp(c) < 0.4;
            const isSel = sel === c.id;
            return (
              <g
                key={c.id}
                onClick={() => setSel(c.id)}
                style={{ cursor: 'pointer' }}
              >
                <title>{`${L(c.en, c.hi)} (${h} o'clock) - ${language === 'hi' ? 'स्थान बदलने हेतु टैप करें' : 'Tap to reposition'}`}</title>
                <circle cx={p.x} cy={p.y} r={c.r / 2} fill={c.color} fillOpacity="0.88"
                  stroke={isSel ? '#ea580c' : good ? '#16a34a' : bad ? '#dc2626' : '#fff'}
                  strokeWidth={isSel ? 3 : checked ? 2.5 : 1.5} />
                <text x={p.x} y={p.y + 3} textAnchor="middle" fontSize="7" fill="#fff" fontWeight="700">{L(c.en, c.hi).slice(0, 4)}</text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex items-center gap-2">
        <button disabled={!allPlaced} onClick={() => setChecked(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-40" style={{ background: T.accent }}>
          <Sparkles size={14} /> {L('Rate my plate', 'मेरी प्लेट रेट करें')}
        </button>
        <button onClick={() => { setPlaced({}); setChecked(false); setSel('protein'); }} className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-700">
          <RotateCcw size={13} /> {L('Clear plate', 'प्लेट साफ करें')}
        </button>
      </div>

      {checked && (
        <div className="rounded-xl p-3 text-sm" style={{ background: pct >= 80 ? '#16a34a1a' : pct >= 50 ? '#f59e0b1a' : '#e11d481a', color: pct >= 80 ? '#15803d' : pct >= 50 ? '#b45309' : '#be123c' }}>
          {pct >= 80
            ? L('Beautifully balanced. The clock method gives the diner a clear focal point and natural eating flow — this plate would pass service.',
              'सुंदर संतुलित। क्लॉक विधि स्पष्ट फोकस देती है — यह प्लेट सर्विस पास करेगी।')
            : pct >= 50
              ? L('Decent, but some components drift from their ideal clock position. Aim protein at 6, starch at 10, veg at 2 for a cleaner composition.',
                'ठीक, पर कुछ घटक आदर्श स्थिति से दूर। प्रोटीन 6, स्टार्च 10, सब्ज़ी 2 पर रखें।')
              : L('Crowded / off-balance. Spread the three main components around the plate using the clock method and keep height in the centre.',
                'असंतुलित। क्लॉक विधि से तीन मुख्य घटक फैलाएं व केंद्र में ऊंचाई रखें।')}
        </div>
      )}
    </FoodShell>
  );
}
