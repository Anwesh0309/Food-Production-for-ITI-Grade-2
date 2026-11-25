import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/context/store';

interface GlossaryTerm {
  id: string;
  term: string;
  termHi: string;
  definition: string;
  definitionHi: string;
  category: string;
  symbol?: string;
  unit?: string;
  formula?: string;
}

const GLOSSARY: GlossaryTerm[] = [
  { id: 'g01', term: 'Mise en place', termHi: 'मीज़ ओं प्लास', definition: 'A French term meaning "everything in its place" — having all ingredients weighed, cut and ready before cooking begins.', definitionHi: 'फ्रांसीसी शब्द जिसका अर्थ "हर चीज़ अपनी जगह" — पकाने से पहले सभी सामग्री तौली, कटी व तैयार रखना।', category: 'Kitchen' },
  { id: 'g02', term: 'Brigade de cuisine', termHi: 'ब्रिगेड द कुज़ीन', definition: 'The organised team of chefs and cooks in a professional kitchen, each with a clear rank and duty.', definitionHi: 'व्यावसायिक रसोई में शेफ व रसोइयों की संगठित टीम, प्रत्येक का स्पष्ट पद व कर्तव्य।', category: 'Kitchen' },
  { id: 'g03', term: 'Commis', termHi: 'कॉमी', definition: 'A junior cook who assists a chef de partie and is learning the trade.', definitionHi: 'जूनियर रसोइया जो शेफ द पार्टी की मदद करता व व्यापार सीखता है।', category: 'Kitchen' },
  { id: 'g04', term: 'Toque', termHi: 'टॉक', definition: 'The tall white chef’s hat that keeps hair out of the food and marks a trained chef.', definitionHi: 'ऊंची सफेद शेफ टोपी जो बालों को भोजन से दूर रखती व प्रशिक्षित शेफ दर्शाती है।', category: 'Uniform' },
  { id: 'g05', term: 'Personal hygiene', termHi: 'व्यक्तिगत स्वच्छता', definition: 'Keeping the body, hands, hair and clothing clean so germs do not reach the food.', definitionHi: 'शरीर, हाथ, बाल व कपड़े साफ रखना ताकि कीटाणु भोजन तक न पहुंचें।', category: 'Hygiene' },
  { id: 'g06', term: 'Cross-contamination', termHi: 'क्रॉस-संदूषण', definition: 'The spread of germs from one food to another, usually from raw food to ready-to-eat food.', definitionHi: 'एक भोजन से दूसरे में कीटाणु फैलना, आमतौर पर कच्चे से तैयार भोजन में।', category: 'Safety' },
  { id: 'g07', term: 'Danger zone', termHi: 'डेंजर ज़ोन', definition: 'The temperature range 5–63°C where bacteria multiply fastest. Food should not be left standing in it.', definitionHi: 'तापमान सीमा 5–63°C जहां जीवाणु सबसे तेज़ बढ़ते हैं। भोजन इसमें खड़ा न छोड़ें।', category: 'Safety', formula: '5°C – 63°C' },
  { id: 'g08', term: 'FIFO', termHi: 'फीफो', definition: 'First In, First Out — using older stock before newer stock so nothing spoils unused.', definitionHi: 'पहले आया, पहले गया — नए से पहले पुराना स्टॉक उपयोग करना।', category: 'Storage' },
  { id: 'g09', term: 'Colour-coded boards', termHi: 'रंग-कोडित बोर्ड', definition: 'Chopping boards of different colours for different foods — red for raw meat, green for salad and fruit.', definitionHi: 'विभिन्न भोजन हेतु अलग रंग के बोर्ड — कच्चे मांस हेतु लाल, सलाद हेतु हरा।', category: 'Safety' },
  { id: 'g10', term: 'Perishable', termHi: 'नाशवान', definition: 'Food that spoils quickly, such as milk, meat and fish, and must be kept refrigerated.', definitionHi: 'जल्दी खराब होता भोजन, जैसे दूध, मांस व मछली, जिसे रेफ्रिजरेट करना ज़रूरी है।', category: 'Commodities' },
  { id: 'g11', term: 'Commodity', termHi: 'सामग्री', definition: 'Any raw food material used in cooking, grouped by plant or animal origin.', definitionHi: 'पाक में प्रयुक्त कोई कच्ची खाद्य वस्तु, पौधा या जंतु मूल अनुसार समूहित।', category: 'Commodities' },
  { id: 'g12', term: 'Julienne', termHi: 'जूलियन', definition: 'A classical cut producing long, thin matchstick-shaped pieces of vegetable.', definitionHi: 'शास्त्रीय कट जो सब्ज़ी की लंबी, पतली तीली-आकार टुकड़े बनाता है।', category: 'Cooking' },
  { id: 'g13', term: 'Blanching', termHi: 'ब्लांचिंग', definition: 'Briefly boiling food, then plunging it into cold water to set colour and loosen skins.', definitionHi: 'भोजन को थोड़ा उबालकर ठंडे पानी में डालना ताकि रंग बना रहे व छिलके ढीले हों।', category: 'Cooking' },
  { id: 'g14', term: 'Moist-heat cooking', termHi: 'नम-ऊष्मा पाक', definition: 'Cooking using water or steam — boiling, steaming, poaching and stewing.', definitionHi: 'पानी या भाप से पकाना — उबालना, भाप, पोच व स्ट्यू।', category: 'Cooking' },
  { id: 'g15', term: 'Dry-heat cooking', termHi: 'शुष्क-ऊष्मा पाक', definition: 'Cooking with hot air or direct heat — baking, roasting and grilling.', definitionHi: 'गर्म हवा या सीधी ऊष्मा से पकाना — बेक, रोस्ट व ग्रिल।', category: 'Cooking' },
  { id: 'g16', term: 'Kneading', termHi: 'गूंधना', definition: 'Working dough until smooth and elastic to develop gluten, which lets bread rise.', definitionHi: 'आटा चिकना व लचीला होने तक गूंधना ताकि ग्लूटेन बने, जो ब्रेड फुलाता है।', category: 'Bakery' },
  { id: 'g17', term: 'Proving', termHi: 'प्रूविंग', definition: 'Leaving yeast dough in a warm place to rise, roughly doubling in size, before baking.', definitionHi: 'यीस्ट आटे को गर्म स्थान पर फूलने देना, लगभग दोगुना, बेकिंग से पहले।', category: 'Bakery' },
  { id: 'g18', term: 'Gluten', termHi: 'ग्लूटेन', definition: 'A stretchy protein network formed in dough that traps gas so bread can rise.', definitionHi: 'आटे में बना लचीला प्रोटीन जाल जो गैस रोककर ब्रेड फुलाता है।', category: 'Bakery' },
  { id: 'g19', term: 'Batter', termHi: 'घोल', definition: 'A thin, pourable mixture of flour and liquid, as used for dosa, idli or pancakes.', definitionHi: 'आटे व तरल का पतला, डालने योग्य मिश्रण, जैसे दोसा, इडली या पैनकेक हेतु।', category: 'Bakery' },
  { id: 'g20', term: 'Garnish', termHi: 'गार्निश', definition: 'A small, edible decoration added to a dish to improve its look; it must suit the food.', definitionHi: 'व्यंजन की सुंदरता हेतु जोड़ा छोटा, खाने योग्य सजावट; यह भोजन से मेल खाना चाहिए।', category: 'Presentation' },
  { id: 'g21', term: 'Clock method', termHi: 'क्लॉक विधि', definition: 'A plating guide: protein at 6 o’clock, starch at 10 and vegetables at 2, for balance.', definitionHi: 'प्लेटिंग गाइड: प्रोटीन 6 बजे, स्टार्च 10 बजे व सब्ज़ी 2 बजे, संतुलन हेतु।', category: 'Presentation' },
  { id: 'g22', term: 'Salamander', termHi: 'सैलामैंडर', definition: 'An overhead grill used to brown, glaze or finish the top of a dish quickly.', definitionHi: 'ऊपरी ग्रिल जो व्यंजन की सतह को तेज़ी से ब्राउन, ग्लेज़ या फिनिश करती है।', category: 'Equipment' },
  { id: 'g23', term: 'Deep fat fryer', termHi: 'डीप फैट फ्रायर', definition: 'An appliance that holds a bath of hot oil at a set temperature for deep frying.', definitionHi: 'यंत्र जो डीप फ्राई हेतु निर्धारित तापमान पर गर्म तेल रखता है।', category: 'Equipment' },
  { id: 'g24', term: 'CO₂ fire extinguisher', termHi: 'CO₂ अग्निशामक', definition: 'An extinguisher that smothers electrical and oil fires without water; never use water on these fires.', definitionHi: 'अग्निशामक जो बिजली व तेल आग को बिना पानी बुझाता है; इन पर पानी कभी न डालें।', category: 'Safety' },
];

const CATEGORIES = [
  { key: 'All', en: 'All', hi: 'सभी' },
  { key: 'Kitchen', en: 'Kitchen', hi: 'रसोई' },
  { key: 'Uniform', en: 'Uniform', hi: 'वर्दी' },
  { key: 'Hygiene', en: 'Hygiene', hi: 'स्वच्छता' },
  { key: 'Commodities', en: 'Commodities', hi: 'सामग्री' },
  { key: 'Storage', en: 'Storage', hi: 'भंडारण' },
  { key: 'Cooking', en: 'Cooking', hi: 'पाक' },
  { key: 'Bakery', en: 'Bakery', hi: 'बेकरी' },
  { key: 'Equipment', en: 'Equipment', hi: 'उपकरण' },
  { key: 'Safety', en: 'Safety', hi: 'सुरक्षा' },
  { key: 'Presentation', en: 'Presentation', hi: 'प्रस्तुति' },
];

const CATEGORY_HI: Record<string, string> = Object.fromEntries(CATEGORIES.map((c) => [c.key, c.hi]));

export default function Glossary() {
  const { t } = useTranslation();
  const { language } = useAppStore();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    return GLOSSARY.filter((term) => {
      const matchCategory = category === 'All' || term.category === category;
      const matchSearch =
        !search ||
        term.term.toLowerCase().includes(search.toLowerCase()) ||
        term.termHi.includes(search) ||
        term.definition.toLowerCase().includes(search.toLowerCase()) ||
        term.definitionHi.includes(search);
      return matchCategory && matchSearch;
    });
  }, [search, category]);

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{t('nav.glossary')}</h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          {language === 'hi' ? 'खाद्य उत्पादन शब्दावली — द्विभाषी हिंदी एवं अंग्रेज़ी शब्दकोश' : 'Food production culinary glossary — bilingual Hindi & English reference'}
        </p>
      </div>

      {/* Search and category filter */}
      <div className="space-y-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={language === 'hi' ? '🔍 शब्द या परिभाषा खोजें...' : '🔍 Search terms, definitions, formulas...'}
          className="input-field text-sm"
        />

        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((cat) => {
            const isCat = category === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setCategory(cat.key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex-shrink-0 cursor-pointer shadow-2xs ${
                  isCat
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-white dark:bg-surface-dark-2 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                {language === 'hi' ? cat.hi : cat.en}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
        <span>{filtered.length} {language === 'hi' ? 'परिभाषाएं उपलब्ध' : 'terms listed'}</span>
        {search && (
          <button onClick={() => setSearch('')} className="text-orange-600 hover:underline">
            {language === 'hi' ? 'खोज हटाएं' : 'Clear search'}
          </button>
        )}
      </div>

      {/* Terms grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map((term) => (
          <div key={term.id} className="card p-5 card-hover flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-start justify-between gap-2.5">
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 truncate">{term.term}</h3>
                  <p className="text-xs sm:text-sm text-orange-600 dark:text-orange-400 font-semibold mt-0.5 truncate">{term.termHi}</p>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-surface-dark-2 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full flex-shrink-0 border border-slate-200/60 dark:border-slate-700/60 shadow-2xs">
                  {language === 'hi' ? (CATEGORY_HI[term.category] || term.category) : term.category}
                </span>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                {language === 'hi' ? term.definitionHi : term.definition}
              </p>
            </div>

            {(term.symbol || term.unit || term.formula) && (
              <div className="flex flex-wrap gap-2 mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                {term.symbol && (
                  <span className="text-xs font-mono bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-lg border border-blue-200 dark:border-blue-800/40 font-bold">
                    {language === 'hi' ? 'प्रतीक' : 'Symbol'}: {term.symbol}
                  </span>
                )}
                {term.unit && (
                  <span className="text-xs font-mono bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-300 px-2.5 py-1 rounded-lg border border-green-200 dark:border-green-800/40 font-bold">
                    {language === 'hi' ? 'इकाई' : 'Unit'}: {term.unit}
                  </span>
                )}
                {term.formula && (
                  <span className="text-xs font-mono bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 px-2.5 py-1 rounded-lg border border-orange-200 dark:border-orange-800/40 font-extrabold">
                    {term.formula}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
