import { useState } from 'react';
import { CheckCircle2, RotateCcw, Check, X } from 'lucide-react';
import { FoodShell, FoodStat, useLang } from '../foodPrimitives';
import { FOOD_THEMES, withAlpha } from '../foodTheme';
import { useAppStore } from '@/context/store';
import { playTouchSound } from '@/utils/sound';

const T = FOOD_THEMES.kitchen;

interface Room {
  id: string;
  x: number;
  y: number;
  en: string;
  hi: string;
  hint1En: string;
  hint2En: string;
  hint1Hi: string;
  hint2Hi: string;
  hintEn: string;
  hintHi: string;
}

// 3 x 2 grid floor plan with generous spacing
const ROOMS: Room[] = [
  {
    id: 'receiving', x: 20, y: 20,
    en: 'Receiving', hi: 'प्राप्ति क्षेत्र',
    hint1En: 'Deliveries checked', hint2En: '& weighed here',
    hint1Hi: 'सामान जांचा व', hint2Hi: 'तौला जाता है',
    hintEn: 'Deliveries are checked and weighed here', hintHi: 'यहां सामान जांचा व तौला जाता है'
  },
  {
    id: 'store', x: 215, y: 20,
    en: 'Store / Larder', hi: 'भंडार',
    hint1En: 'Dry goods & cold', hint2En: 'items kept here',
    hint1Hi: 'सूखा व ठंडा सामान', hint2Hi: 'यहां रखा जाता है',
    hintEn: 'Dry goods and cold items are kept here', hintHi: 'सूखा व ठंडा सामान यहां रखा जाता है'
  },
  {
    id: 'prep', x: 410, y: 20,
    en: 'Vegetable Prep', hi: 'सब्ज़ी तैयारी',
    hint1En: 'Washing, peeling', hint2En: '& cutting happen here',
    hint1Hi: 'धुलाई, छिलाई व', hint2Hi: 'कटाई यहां होती है',
    hintEn: 'Washing, peeling and cutting happen here', hintHi: 'धुलाई, छिलाई व कटाई यहां होती है'
  },
  {
    id: 'hot', x: 20, y: 165,
    en: 'Hot Kitchen', hi: 'गर्म रसोई',
    hint1En: 'Food is cooked on', hint2En: 'the range here',
    hint1Hi: 'रेंज पर गर्म भोजन', hint2Hi: 'यहां पकता है',
    hintEn: 'Food is cooked on the range here', hintHi: 'यहां रेंज पर भोजन पकता है'
  },
  {
    id: 'bakery', x: 215, y: 165,
    en: 'Bakery & Pastry', hi: 'बेकरी व पेस्ट्री',
    hint1En: 'Bread & desserts', hint2En: 'baked here',
    hint1Hi: 'ब्रेड व मिठाई', hint2Hi: 'यहां बेक होती है',
    hintEn: 'Bread and desserts are baked here', hintHi: 'यहां ब्रेड व मिठाई बेक होती है'
  },
  {
    id: 'washup', x: 410, y: 165,
    en: 'Wash-up & Service', hi: 'धुलाई व सर्विस',
    hint1En: 'Dishes cleaned &', hint2En: 'food passed out',
    hint1Hi: 'बर्तन साफ व भोजन', hint2Hi: 'परोसा जाता है',
    hintEn: 'Dishes are cleaned and food is passed out', hintHi: 'बर्तन साफ व भोजन परोसा जाता है'
  },
];

function RoomArt({ id, c }: { id: string; c: string }) {
  switch (id) {
    case 'receiving': return <g stroke={c} strokeWidth="2.2" fill="none"><rect x="0" y="3" width="18" height="14" rx="2" /><path d="M18 7 h7 l4 4 v6 h-11" /><circle cx="6" cy="20" r="2.5" /><circle cx="24" cy="20" r="2.5" /></g>;
    case 'store': return <g stroke={c} strokeWidth="2.2" fill="none"><rect x="2" y="2" width="24" height="20" rx="2" /><line x1="2" y1="8" x2="26" y2="8" /><line x1="2" y1="15" x2="26" y2="15" /></g>;
    case 'prep': return <g stroke={c} strokeWidth="2.2" fill="none"><rect x="2" y="14" width="24" height="7" rx="2" /><path d="M7 14 V5 M7 5 l8 3.5 -8 3.5" /></g>;
    case 'hot': return <g stroke={c} strokeWidth="2.2" fill="none"><circle cx="8" cy="12" r="5" /><circle cx="20" cy="12" r="5" /><path d="M8 12 q-2.5 -5 0 -8 M20 12 q-2.5 -5 0 -8" /></g>;
    case 'bakery': return <g stroke={c} strokeWidth="2.2" fill="none"><rect x="2" y="3" width="24" height="18" rx="2.5" /><rect x="6" y="7" width="16" height="9" rx="1.5" /><line x1="6" y1="11" x2="22" y2="11" /></g>;
    case 'washup': return <g stroke={c} strokeWidth="2.2" fill="none"><rect x="2" y="10" width="24" height="11" rx="2" /><path d="M14 10 V4 h6" /><circle cx="14" cy="16" r="1.5" fill={c} /></g>;
    default: return null;
  }
}

export function VirtualKitchenSim() {
  const L = useLang();
  const { language } = useAppStore();
  const [placed, setPlaced] = useState<Record<string, string>>({}); // roomId -> chosen section id
  const [sel, setSel] = useState<string | null>(null); // selected section id from chips
  const [activeRoom, setActiveRoom] = useState<string | null>(null); // selected room from floor plan
  const [checked, setChecked] = useState(false);
  const [hint, setHint] = useState<Room | null>(null);

  // Unassign a specific room
  const unassignRoom = (roomId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPlaced((p) => {
      const next = { ...p };
      delete next[roomId];
      return next;
    });
    setChecked(false);
  };

  // Main tap handler for room box
  const handleRoomClick = (roomId: string) => {
    const currentPlaced = placed[roomId];

    // If user already selected a section chip, assign it to this room
    if (sel) {
      setPlaced((p) => ({ ...p, [roomId]: sel }));
      setSel(null);
      setActiveRoom(null);
      setChecked(false);
      return;
    }

    // If this room is already active, toggle it off
    if (activeRoom === roomId) {
      setActiveRoom(null);
      setHint(null);
      return;
    }

    // Otherwise, activate this room for assignment & show hint
    setActiveRoom(roomId);
    const roomObj = ROOMS.find((r) => r.id === roomId) || null;
    setHint(roomObj);
  };

  // Handle clicking a section chip
  const handleSectionChipClick = (sectionId: string) => {
    // If a room is currently active on the floor plan, immediately assign this section to it!
    if (activeRoom) {
      setPlaced((p) => ({ ...p, [activeRoom]: sectionId }));
      setActiveRoom(null);
      setSel(null);
      setChecked(false);
      return;
    }

    // Otherwise toggle section selection
    setSel((s) => (s === sectionId ? null : sectionId));
  };

  const usedSections = new Set(Object.values(placed));
  const correct = ROOMS.filter((r) => placed[r.id] === r.id).length;
  const allPlaced = Object.keys(placed).length === ROOMS.length;
  const activeRoomObj = activeRoom ? ROOMS.find((r) => r.id === activeRoom) : null;

  return (
    <FoodShell
      accent={T.accent}
      Icon={T.Icon}
      title={L('Virtual Kitchen Layout', 'वर्चुअल रसोई लेआउट')}
      subtitle={L(
        'Pick a section name, then tap the room whose job matches it. Food should flow Receiving → Store → Prep → Hot Kitchen → Service.',
        'एक अनुभाग नाम चुनें, फिर उस कक्ष को टैप करें जिसका कार्य मेल खाता है। भोजन प्रवाह: प्राप्ति → भंडार → तैयारी → गर्म रसोई → सर्विस।'
      )}
    >
      {/* Balanced Stat Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <FoodStat label={L('Placed', 'रखा')} value={`${Object.keys(placed).length}/${ROOMS.length}`} color={T.accent} />
        <FoodStat label={L('Sections', 'अनुभाग')} value={`${ROOMS.length} ${L('zones', 'ज़ोन')}`} color="#64748b" />
        <div className="col-span-2 sm:col-span-1">
          <FoodStat
            label={L('Accuracy', 'सटीकता')}
            value={checked ? `${Math.round((correct / ROOMS.length) * 100)}%` : '--'}
            color={checked ? (correct === ROOMS.length ? '#16a34a' : T.accent) : '#94a3b8'}
            sub={checked ? `${correct}/${ROOMS.length} ${L('correct', 'सही')}` : L('Tap Check layout', 'जांचें दबाएं')}
          />
        </div>
      </div>

      {/* section chips */}
      <div className="flex flex-wrap gap-2">
        {ROOMS.map((r) => {
          const used = usedSections.has(r.id);
          const isSel = sel === r.id;
          return (
            <button
              key={r.id}
              onClick={() => handleSectionChipClick(r.id)}
              disabled={used && !isSel}
              className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer shadow-2xs disabled:opacity-35 disabled:cursor-not-allowed ${
                isSel
                  ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 ring-2 ring-orange-400/40'
                  : 'bg-white dark:bg-surface-dark-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-slate-300'
              }`}
              style={isSel ? { borderColor: T.accent, color: T.accent } : {}}
            >
              {L(r.en, r.hi)}
            </button>
          );
        })}
      </div>

      {/* Floor Plan Canvas */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-50 dark:bg-slate-900/60 shadow-inner">
        <svg viewBox="0 0 600 300" className="w-full block" style={{ touchAction: 'manipulation' }}>
          <defs>
            {/* Arrow markers for directional flow */}
            <marker id="arrow-r" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 z" fill="#f97316" />
            </marker>
            <marker id="arrow-l" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto">
              <path d="M6,0 L0,3 L6,6 z" fill="#f97316" />
            </marker>
            <marker id="arrow-d" markerWidth="6" markerHeight="6" refX="3" refY="5" orient="auto">
              <path d="M0,0 L3,6 L6,0 z" fill="#f97316" />
            </marker>
          </defs>

          <rect x="0" y="0" width="600" height="300" className="fill-slate-50 dark:fill-slate-900" />

          {/* Workflow arrows connecting strictly in the gaps between rooms */}
          {/* Row 1: Receiving -> Store */}
          <path d="M192 75 H211" stroke="#f97316" strokeWidth="2.5" strokeDasharray="4 3" markerEnd="url(#arrow-r)" />
          {/* Row 1: Store -> Prep */}
          <path d="M387 75 H406" stroke="#f97316" strokeWidth="2.5" strokeDasharray="4 3" markerEnd="url(#arrow-r)" />
          {/* Col 3 Down: Prep -> Wash-up */}
          <path d="M495 132 V160" stroke="#f97316" strokeWidth="2.5" strokeDasharray="4 3" markerEnd="url(#arrow-d)" />
          {/* Row 2: Wash-up -> Bakery */}
          <path d="M408 220 H389" stroke="#f97316" strokeWidth="2.5" strokeDasharray="4 3" markerEnd="url(#arrow-l)" />
          {/* Row 2: Bakery -> Hot Kitchen */}
          <path d="M213 220 H194" stroke="#f97316" strokeWidth="2.5" strokeDasharray="4 3" markerEnd="url(#arrow-l)" />

          {ROOMS.map((r, idx) => {
            const chosen = placed[r.id];
            const chosenRoom = ROOMS.find((x) => x.id === chosen);
            const ok = checked && chosen === r.id;
            const bad = checked && chosen && chosen !== r.id;
            const isActive = activeRoom === r.id;
            const border = ok ? '#16a34a' : bad ? '#dc2626' : isActive ? T.accent : sel ? withAlpha(T.accent, 0.7) : '#94a3b8';
            const isTarget = (sel !== null || isActive) && !chosen;

            return (
              <g
                key={r.id}
                onClick={() => handleRoomClick(r.id)}
                style={{ cursor: 'pointer' }}
                className="transition-all"
              >
                {/* Main room box (170 x 110) */}
                <rect
                  x={r.x}
                  y={r.y}
                  width="170"
                  height="110"
                  rx="10"
                  className="fill-white dark:fill-slate-800"
                  stroke={border}
                  strokeWidth={isActive ? 3.5 : sel || checked ? 2.5 : 1.5}
                />

                {/* Top header strip inside the box */}
                <rect
                  x={r.x + 1}
                  y={r.y + 1}
                  width="168"
                  height="30"
                  rx="9"
                  fill={ok ? '#16a34a15' : bad ? '#dc262615' : isActive ? withAlpha(T.accent, 0.2) : isTarget ? withAlpha(T.accent, 0.12) : '#f1f5f9'}
                  className="dark:fill-slate-800/80"
                />

                {/* Room icon */}
                <g transform={`translate(${r.x + 10},${r.y + 6})`}>
                  <RoomArt id={r.id} c={ok ? '#16a34a' : bad ? '#dc2626' : T.accent} />
                </g>

                {/* Room Zone tag */}
                <text
                  x={r.x + 158}
                  y={r.y + 19}
                  textAnchor="end"
                  fontSize="9.5"
                  fontWeight="700"
                  className="fill-slate-400 dark:fill-slate-500 font-mono"
                >
                  {language === 'hi' ? `ज़ोन ${idx + 1}` : `ZONE ${idx + 1}`}
                </text>

                {/* Room Content */}
                {chosen ? (
                  <>
                    {/* Chosen section name pill */}
                    <rect
                      x={r.x + 8}
                      y={r.y + 36}
                      width="154"
                      height="25"
                      rx="6"
                      fill={ok ? '#16a34a18' : bad ? '#dc262618' : withAlpha(T.accent, 0.12)}
                      stroke={ok ? '#16a34a66' : bad ? '#dc262666' : withAlpha(T.accent, 0.4)}
                      strokeWidth="1"
                    />
                    <text
                      x={r.x + 78}
                      y={r.y + 53}
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="700"
                      fill={ok ? '#16a34a' : bad ? '#dc2626' : T.accent}
                    >
                      {L(chosenRoom!.en, chosenRoom!.hi)}
                    </text>

                    {/* Quick remove (X) button inside the pill */}
                    <g
                      onClick={(e) => unassignRoom(r.id, e)}
                      style={{ cursor: 'pointer' }}
                    >
                      <circle cx={r.x + 150} cy={r.y + 48.5} r="7.5" fill="#fee2e2" className="dark:fill-red-950/80" stroke="#f87171" strokeWidth="0.8" />
                      <path
                        d={`M${r.x + 147.5} ${r.y + 46} l5 5 M${r.x + 152.5} ${r.y + 46} l-5 5`}
                        stroke="#dc2626"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </g>

                    {/* Hint text in 2 clean, wrapped lines that never overflow */}
                    <text
                      x={r.x + 85}
                      y={r.y + 77}
                      textAnchor="middle"
                      fontSize="9"
                      className="fill-slate-500 dark:fill-slate-400 font-medium"
                    >
                      {L(r.hint1En, r.hint1Hi)}
                    </text>
                    <text
                      x={r.x + 85}
                      y={r.y + 93}
                      textAnchor="middle"
                      fontSize="9"
                      className="fill-slate-500 dark:fill-slate-400 font-medium"
                    >
                      {L(r.hint2En, r.hint2Hi)}
                    </text>
                  </>
                ) : (
                  <>
                    {/* Unassigned placeholder */}
                    <text
                      x={r.x + 85}
                      y={r.y + 49}
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="700"
                      fill={isActive ? '#ea580c' : isTarget ? T.accent : '#94a3b8'}
                    >
                      {isActive
                        ? (language === 'hi' ? '● अनुभाग चुनें' : '● Select below')
                        : isTarget
                        ? (language === 'hi' ? '← यहाँ रखें' : '← Place here')
                        : (language === 'hi' ? 'टैप करके असाइन करें' : 'Tap to assign')}
                    </text>

                    {/* Job hint in 2 wrapped lines */}
                    <text
                      x={r.x + 85}
                      y={r.y + 72}
                      textAnchor="middle"
                      fontSize="9"
                      className="fill-slate-500 dark:fill-slate-400 font-medium"
                    >
                      {L(r.hint1En, r.hint1Hi)}
                    </text>
                    <text
                      x={r.x + 85}
                      y={r.y + 88}
                      textAnchor="middle"
                      fontSize="9"
                      className="fill-slate-500 dark:fill-slate-400 font-medium"
                    >
                      {L(r.hint2En, r.hint2Hi)}
                    </text>
                  </>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Interactive In-Place Assignment Drawer when a room is tapped */}
      {activeRoom && activeRoomObj && (
        <div className="rounded-xl p-3.5 sm:p-4 bg-orange-50/90 dark:bg-orange-950/30 border-2 border-orange-300 dark:border-orange-800/60 space-y-2.5 animate-fade-in shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
              <span className="font-bold text-xs sm:text-sm text-orange-950 dark:text-orange-200">
                {language === 'hi'
                  ? `ज़ोन ${ROOMS.findIndex((x) => x.id === activeRoom) + 1}: ${L(activeRoomObj.en, activeRoomObj.hi)} हेतु अनुभाग चुनें`
                  : `Assigning Zone ${ROOMS.findIndex((x) => x.id === activeRoom) + 1} (${L(activeRoomObj.en, activeRoomObj.hi)})`}
              </span>
            </div>
            <button
              onClick={() => { setActiveRoom(null); setHint(null); }}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 underline cursor-pointer"
            >
              {language === 'hi' ? 'बंद करें' : 'Close'}
            </button>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            <strong>{L('Zone Job', 'कक्ष कार्य')}:</strong> {L(activeRoomObj.hintEn, activeRoomObj.hintHi)}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {ROOMS.map((sec) => {
              const used = usedSections.has(sec.id);
              const isCurrent = placed[activeRoom] === sec.id;
              return (
                <button
                  key={sec.id}
                  disabled={used && !isCurrent}
                  onClick={() => handleSectionChipClick(sec.id)}
                  className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs disabled:opacity-30 disabled:cursor-not-allowed ${
                    isCurrent
                      ? 'bg-orange-600 text-white'
                      : 'bg-white dark:bg-surface-dark-2 border border-orange-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:bg-orange-100 dark:hover:bg-orange-950/40'
                  }`}
                >
                  {L(sec.en, sec.hi)}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {hint && !activeRoom && !sel && (
        <div className="rounded-xl p-3.5 text-xs sm:text-sm bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/40 text-orange-900 dark:text-orange-200 flex items-center justify-between gap-2">
          <span>
            <strong>{L(hint.en, hint.hi)}:</strong> {L(hint.hintEn, hint.hintHi)}
          </span>
          <span className="text-xs font-semibold text-orange-600 dark:text-orange-400 flex-shrink-0">
            {language === 'hi' ? 'अनुभाग टैप करें' : 'Pick section above'}
          </span>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button
          disabled={!allPlaced}
          onClick={() => {
            setChecked(true);
            playTouchSound(correct === ROOMS.length ? 'success' : 'error');
          }}
          className="px-5 py-2.5 rounded-xl text-sm sm:text-base font-bold text-white disabled:opacity-40 cursor-pointer shadow-sm transition-all"
          style={{ background: T.accent }}
        >
          {L('Check layout', 'लेआउट जांचें')}
        </button>
        <button
          onClick={() => { setPlaced({}); setSel(null); setChecked(false); setHint(null); }}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
        >
          <RotateCcw size={14} /> {L('Reset', 'रीसेट')}
        </button>
      </div>

      {checked && (
        <div
          className="rounded-xl p-3.5 sm:p-4 text-sm sm:text-base leading-relaxed border"
          style={{
            background: correct === ROOMS.length ? '#16a34a1a' : '#f59e0b1a',
            borderColor: correct === ROOMS.length ? '#16a34a40' : '#f59e0b40',
            color: correct === ROOMS.length ? '#15803d' : '#b45309',
          }}
        >
          {correct === ROOMS.length
            ? L(
                'Perfect! You matched every section to its job and the food flows one way with no criss-crossing — that keeps a commercial kitchen fast, hygienic, and compliant.',
                'उत्तम! आपने हर अनुभाग उसके कार्य से मिलाया और भोजन एक दिशा में बहता है — यह व्यावसायिक रसोई को तेज़, स्वच्छ व सुरक्षित रखता है।'
              )
            : L(
                `${correct}/${ROOMS.length} correct. Re-read each room's job hint and try the mismatched sections again.`,
                `${correct}/${ROOMS.length} सही। प्रत्येक कक्ष का कार्य संकेत दोबारा पढ़ें व गलत अनुभाग पुनः प्रयास करें।`
              )}
        </div>
      )}
    </FoodShell>
  );
}
