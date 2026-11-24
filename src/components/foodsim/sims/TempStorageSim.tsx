import { useState } from 'react';
import { CheckCircle2, RotateCcw, Snowflake, Refrigerator, Thermometer } from 'lucide-react';
import { FoodShell, FoodStat, useLang } from '../foodPrimitives';
import { FOOD_THEMES } from '../foodTheme';
import { useAppStore } from '@/context/store';

const T = FOOD_THEMES.storage;

interface Food { id: string; en: string; hi: string; zone: string }
// zones top→bottom inside a fridge, plus freezer & dry store
const ZONES = [
  { id: 'freezer', en: 'Freezer (−18°C)', hi: 'फ्रीज़र (−18°C)', Icon: Snowflake, col: '#0ea5e9' },
  { id: 'fridge_top', en: 'Fridge – upper (ready-to-eat)', hi: 'फ्रिज – ऊपरी (तैयार)', Icon: Refrigerator, col: '#22c55e' },
  { id: 'fridge_bottom', en: 'Fridge – bottom (raw meat/fish)', hi: 'फ्रिज – निचला (कच्चा मांस)', Icon: Refrigerator, col: '#ef4444' },
  { id: 'dry', en: 'Dry store (ambient)', hi: 'सूखा भंडार', Icon: Thermometer, col: '#f59e0b' },
];
const FOODS: Food[] = [
  { id: 'f1', en: 'Ice cream', hi: 'आइसक्रीम', zone: 'freezer' },
  { id: 'f2', en: 'Frozen peas', hi: 'जमी मटर', zone: 'freezer' },
  { id: 'f3', en: 'Cooked rice (chilled)', hi: 'पका चावल (ठंडा)', zone: 'fridge_top' },
  { id: 'f4', en: 'Fresh salad leaves', hi: 'ताज़ा सलाद', zone: 'fridge_top' },
  { id: 'f5', en: 'Cheese & yoghurt', hi: 'पनीर व दही', zone: 'fridge_top' },
  { id: 'f6', en: 'Raw chicken', hi: 'कच्चा चिकन', zone: 'fridge_bottom' },
  { id: 'f7', en: 'Raw fish', hi: 'कच्ची मछली', zone: 'fridge_bottom' },
  { id: 'f8', en: 'Flour & sugar', hi: 'आटा व चीनी', zone: 'dry' },
  { id: 'f9', en: 'Canned tomatoes', hi: 'डिब्बाबंद टमाटर', zone: 'dry' },
  { id: 'f10', en: 'Dried pasta', hi: 'सूखा पास्ता', zone: 'dry' },
];

export function TempStorageSim() {
  const L = useLang();
  const { language } = useAppStore();
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [sel, setSel] = useState<string | null>(null);
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  // Two-way assignment handler
  const handleZoneClick = (zId: string) => {
    // If a food is selected, place it in this zone
    if (sel) {
      setPlaced((p) => ({ ...p, [sel]: zId }));
      setSel(null);
      setActiveZone(null);
      setChecked(false);
      return;
    }

    // Otherwise toggle zone focus
    setActiveZone((current) => (current === zId ? null : zId));
  };

  const handleFoodClick = (fId: string) => {
    // If a zone is active, immediately place this food into that zone
    if (activeZone) {
      setPlaced((p) => ({ ...p, [fId]: activeZone }));
      setActiveZone(null);
      setSel(null);
      setChecked(false);
      return;
    }

    // Otherwise toggle food selection
    setSel((current) => (current === fId ? null : fId));
  };

  // Remove a placed food item back to tray
  const removeFood = (fId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPlaced((p) => {
      const next = { ...p };
      delete next[fId];
      return next;
    });
    setChecked(false);
  };

  const unplaced = FOODS.filter((f) => !placed[f.id]);
  const correct = FOODS.filter((f) => placed[f.id] === f.zone).length;

  return (
    <FoodShell accent={T.accent} Icon={T.Icon}
      title={L('Temperature & Storage Lab', 'तापमान व भंडारण लैब')}
      subtitle={L('Select a food item and place it in the correct storage zone. Remember: raw meat always goes below ready-to-eat food, and the danger zone is 5–63°C.',
        'एक खाद्य वस्तु चुनें और सही भंडारण क्षेत्र में रखें। याद रखें: कच्चा मांस हमेशा तैयार भोजन के नीचे; डेंजर ज़ोन 5–63°C।')}
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <FoodStat label={L('Stored', 'भंडारित')} value={`${FOODS.length - unplaced.length}/${FOODS.length}`} color={T.accent} />
        <FoodStat label={L('Remaining', 'शेष')} value={unplaced.length} color={unplaced.length === 0 ? '#16a34a' : '#64748b'} />
        <div className="col-span-2 sm:col-span-1">
          <FoodStat
            label={L('Accuracy', 'सटीकता')}
            value={checked ? `${Math.round((correct / FOODS.length) * 100)}%` : '--'}
            color={checked ? (correct === FOODS.length ? '#16a34a' : T.accent) : '#94a3b8'}
            sub={checked ? `${correct}/${FOODS.length} ${L('correct', 'सही')}` : L('Tap Check storage', 'भंडारण जांचें')}
          />
        </div>
      </div>

      {/* danger-zone bar */}
      <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-2xs">
        <div className="flex text-[10px] sm:text-xs font-bold text-white text-center">
          <div className="py-2" style={{ width: '22%', background: '#0ea5e9' }}>−18°C</div>
          <div className="py-2" style={{ width: '18%', background: '#16a34a' }}>0–5°C</div>
          <div className="py-2 flex items-center justify-center truncate px-1" style={{ width: '40%', background: '#dc2626' }}>{L('DANGER 5–63°C', 'डेंजर 5–63°C')}</div>
          <div className="py-2" style={{ width: '20%', background: '#d97706' }}>63°C+</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {unplaced.length === 0 ? (
          <span className="text-xs text-slate-400 py-1">{L('All items stored — check below.', 'सभी वस्तुएं भंडारित — नीचे जांचें।')}</span>
        ) : unplaced.map((f) => {
          const isSel = sel === f.id;
          return (
            <button
              key={f.id}
              onClick={() => handleFoodClick(f.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer shadow-2xs ${
                isSel
                  ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 ring-2 ring-sky-400/40 font-bold'
                  : 'bg-white dark:bg-surface-dark-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-slate-300'
              }`}
              style={isSel ? { borderColor: T.accent, color: T.accent } : {}}
            >
              {L(f.en, f.hi)}
            </button>
          );
        })}
      </div>

      <div className="grid sm:grid-cols-2 grid-cols-1 gap-2.5">
        {ZONES.map((z) => {
          const items = FOODS.filter((f) => placed[f.id] === z.id);
          const Zi = z.Icon;
          const isActive = activeZone === z.id;
          return (
            <div
              key={z.id}
              onClick={() => handleZoneClick(z.id)}
              className={`rounded-xl border-2 border-dashed p-3 min-h-[95px] cursor-pointer transition-all bg-white dark:bg-surface-dark-1 ${
                isActive ? 'ring-2 ring-sky-500 bg-sky-50/20 dark:bg-sky-950/20' : ''
              }`}
              style={{ borderColor: isActive ? z.col : sel ? T.accent : z.col + '77' }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: z.col }}>
                  <Zi size={15} /> <span>{L(z.en, z.hi)}</span>
                </div>
                {isActive && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 bg-sky-100 dark:bg-sky-950/60 px-2 py-0.5 rounded-full">
                    {language === 'hi' ? 'चयनित' : 'Active'}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {items.length === 0 ? (
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 italic py-1">
                    {sel
                      ? (language === 'hi' ? 'यहाँ रखने हेतु टैप करें' : 'Tap to store selected item')
                      : (language === 'hi' ? 'खाली ज़ोन — टैप करें' : 'Empty zone — tap to select')}
                  </span>
                ) : items.map((f) => {
                  const ok = f.zone === z.id;
                  return (
                    <div
                      key={f.id}
                      onClick={(e) => removeFood(f.id, e)}
                      title={language === 'hi' ? 'हटाने हेतु क्लिक करें' : 'Click to remove'}
                      className={`text-xs px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-medium shadow-2xs group cursor-pointer transition-transform hover:scale-105 ${
                        checked
                          ? ok
                            ? 'bg-green-100 dark:bg-green-950/40 text-green-800 dark:text-green-300 border border-green-300 dark:border-green-800'
                            : 'bg-red-100 dark:bg-red-950/40 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-800'
                          : 'bg-slate-100 dark:bg-surface-dark-2 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-red-300'
                      }`}
                    >
                      <span>{L(f.en, f.hi)}</span>
                      {checked ? (
                        ok ? <CheckCircle2 size={12} className="text-green-600 dark:text-green-400" /> : <span className="font-bold text-red-600 dark:text-red-400">×</span>
                      ) : (
                        <span className="text-slate-400 group-hover:text-red-500 font-bold text-xs ml-0.5">×</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <button disabled={unplaced.length > 0} onClick={() => setChecked(true)}
          className="px-4 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-40" style={{ background: T.accent }}>
          {L('Check storage', 'भंडारण जांचें')}
        </button>
        <button onClick={() => { setPlaced({}); setSel(null); setChecked(false); }} className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-700">
          <RotateCcw size={13} /> {L('Reset', 'रीसेट')}
        </button>
      </div>

      {checked && (
        <div className="rounded-xl p-3 text-sm" style={{ background: correct === FOODS.length ? '#16a34a1a' : '#f59e0b1a', color: correct === FOODS.length ? '#15803d' : '#b45309' }}>
          {correct === FOODS.length
            ? L('Correct on every item. Raw proteins sit below ready-to-eat food and nothing lingers in the danger zone — exactly how an audited fridge is organised.',
              'हर वस्तु सही। कच्चे प्रोटीन तैयार भोजन के नीचे व कुछ भी डेंजर ज़ोन में नहीं — बिलकुल सही।')
            : L(`${correct}/${FOODS.length} correct. Re-check placement — storing raw meat above salad is the single most common cross-contamination failure.`,
              `${correct}/${FOODS.length} सही। दोबारा जांचें — सलाद के ऊपर कच्चा मांस सबसे आम गलती है।`)}
        </div>
      )}
    </FoodShell>
  );
}
