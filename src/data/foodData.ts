/* ============================================================
   FOOD PRODUCTION (GENERAL) — Grade 2 / entry-level trade module
   Aligned to the CBSE 409 (Class IX–X) and DGT CTS "Food
   Production (General)" syllabus: the professional kitchen,
   kitchen sections, protective clothing, personal hygiene,
   equipment & tools, commodities, storage, methods of cooking,
   bakery, dough, kitchen safety & first-aid, food safety and
   plating. Deliberately NOT a hospitality-management course —
   no costing, menu engineering or inventory mathematics.
   ============================================================ */

export interface Bi { en: string; hi: string }
export interface FoodMCQ { q: Bi; options: Bi[]; correct: number; explanation: Bi }
export interface FoodFormula { name: Bi; formula: string; desc: Bi }
export interface FoodModule {
  id: number; section: Bi; themeKey: string; simId: string;
  title: Bi; desc: Bi; objectives: Bi[]; keyTopics: Bi[]; theory: Bi;
  terminology: { term: Bi; def: Bi }[]; practice: Bi[]; mcqs: FoodMCQ[];
  apply: Bi[]; review: Bi; safety: Bi[]; applications: Bi[]; formulas?: FoodFormula[];
}

const S = {
  kitchen:   { en: 'The Kitchen', hi: 'रसोई' },
  chef:      { en: 'The Professional Chef', hi: 'व्यावसायिक शेफ' },
  equip:     { en: 'Equipment & Tools', hi: 'उपकरण व औज़ार' },
  commodity: { en: 'Commodities & Storage', hi: 'सामग्री व भंडारण' },
  cooking:   { en: 'Cooking & Bakery', hi: 'पाक व बेकरी' },
  service:   { en: 'Safety & Service', hi: 'सुरक्षा व सर्विस' },
};

export const FOOD_MODULES: FoodModule[] = [
  /* 1 — Introduction to Food Production & the Kitchen */
  {
    id: 1, section: S.kitchen, themeKey: 'kitchen', simId: 'virtualKitchen',
    title: { en: 'Introduction to Food Production & the Kitchen', hi: 'खाद्य उत्पादन एवं रसोई का परिचय' },
    desc: { en: 'What food production means, where cooks work, and the parts of a professional kitchen.', hi: 'खाद्य उत्पादन का अर्थ, रसोइये कहां काम करते हैं, और व्यावसायिक रसोई के भाग।' },
    objectives: [
      { en: 'Explain what the food production department does', hi: 'समझाएं कि खाद्य उत्पादन विभाग क्या करता है' },
      { en: 'Name the main sections of a professional kitchen', hi: 'व्यावसायिक रसोई के मुख्य अनुभाग बताएं' },
      { en: 'Describe where a trained cook can find work', hi: 'बताएं कि प्रशिक्षित रसोइया कहां काम पा सकता है' },
    ],
    keyTopics: [
      { en: 'Meaning of food production', hi: 'खाद्य उत्पादन का अर्थ' },
      { en: 'Hotels, restaurants, canteens, catering', hi: 'होटल, रेस्तरां, कैंटीन, कैटरिंग' },
      { en: 'Sections of a kitchen', hi: 'रसोई के अनुभाग' },
      { en: 'Flow of food from delivery to service', hi: 'वितरण से सर्विस तक भोजन का प्रवाह' },
    ],
    theory: {
      en: 'Food production is the department of a hotel, restaurant or catering unit where raw ingredients are turned into cooked, ready-to-serve food. The place where this work happens is the kitchen.\n\nA professional kitchen is divided into sections so that work flows smoothly and safely. Goods arrive at the receiving area, are kept in the store or larder, are cleaned and cut in the preparation area, are cooked in the hot kitchen, baked in the bakery, and finally sent out from the service area. Dirty dishes are cleaned in the wash-up.\n\nFood is always meant to move in ONE direction — from raw to cooked to served — so that clean food never crosses paths with dirty plates or raw waste. A trained cook can work in hotels, restaurants, canteens, hospitals, ships, airlines and catering companies, or can start a small food business.',
      hi: 'खाद्य उत्पादन होटल, रेस्तरां या कैटरिंग इकाई का वह विभाग है जहां कच्ची सामग्री को पकाकर परोसने योग्य भोजन में बदला जाता है। यह कार्य रसोई में होता है।\n\nव्यावसायिक रसोई को अनुभागों में बांटा जाता है ताकि कार्य सुचारू व सुरक्षित चले। सामान प्राप्ति क्षेत्र में आता है, भंडार में रखा जाता है, तैयारी क्षेत्र में साफ व कटता है, गर्म रसोई में पकता है, बेकरी में बेक होता है, और अंत में सर्विस क्षेत्र से भेजा जाता है।\n\nभोजन हमेशा एक ही दिशा में चलना चाहिए — कच्चे से पके से परोसे तक। प्रशिक्षित रसोइया होटल, रेस्तरां, कैंटीन, अस्पताल, जहाज़, एयरलाइंस व कैटरिंग में काम कर सकता है।',
    },
    terminology: [
      { term: { en: 'Food production', hi: 'खाद्य उत्पादन' }, def: { en: 'Turning raw ingredients into cooked food ready to serve', hi: 'कच्ची सामग्री को परोसने योग्य पके भोजन में बदलना' } },
      { term: { en: 'Section', hi: 'अनुभाग' }, def: { en: 'A separate work area of the kitchen with its own job', hi: 'रसोई का अलग कार्य क्षेत्र जिसका अपना काम होता है' } },
      { term: { en: 'Larder', hi: 'लार्डर' }, def: { en: 'The cool store where raw and cold foods are kept', hi: 'ठंडा भंडार जहां कच्चा व ठंडा भोजन रखा जाता है' } },
      { term: { en: 'Service', hi: 'सर्विस' }, def: { en: 'Sending finished food out to the guest', hi: 'तैयार भोजन अतिथि तक भेजना' } },
    ],
    practice: [
      { en: 'List five places near you where food is cooked for many people at once.', hi: 'अपने आसपास पांच स्थान लिखें जहां एक साथ कई लोगों हेतु भोजन पकता है।' },
      { en: 'Draw a simple plan of a kitchen and label its sections.', hi: 'रसोई की सरल योजना बनाएं व उसके अनुभाग नामांकित करें।' },
      { en: 'Trace the path a vegetable takes from delivery to the guest’s plate.', hi: 'सब्ज़ी का रास्ता वितरण से अतिथि की थाली तक बनाएं।' },
    ],
    mcqs: [
      { q: { en: 'What is the main job of the food production department?', hi: 'खाद्य उत्पादन विभाग का मुख्य कार्य क्या है?' },
        options: [{ en: 'Serving drinks at tables', hi: 'मेज़ पर पेय परोसना' }, { en: 'Turning raw ingredients into cooked food', hi: 'कच्ची सामग्री को पके भोजन में बदलना' }, { en: 'Booking hotel rooms', hi: 'होटल कमरे बुक करना' }],
        correct: 1, explanation: { en: 'Food production cooks raw ingredients into ready-to-serve dishes.', hi: 'खाद्य उत्पादन कच्ची सामग्री को परोसने योग्य व्यंजन में पकाता है।' } },
      { q: { en: 'Why is a kitchen divided into sections?', hi: 'रसोई को अनुभागों में क्यों बांटा जाता है?' },
        options: [{ en: 'To make the work flow smoothly and safely', hi: 'कार्य सुचारू व सुरक्षित चलाने हेतु' }, { en: 'To use more electricity', hi: 'अधिक बिजली उपयोग हेतु' }, { en: 'To confuse new cooks', hi: 'नए रसोइयों को भ्रमित करने हेतु' }],
        correct: 0, explanation: { en: 'Sections keep food moving one way and stop clean and dirty work from mixing.', hi: 'अनुभाग भोजन को एक दिशा में रखते हैं व साफ-गंदे कार्य को मिलने से रोकते हैं।' } },
    ],
    apply: [
      { en: 'A new delivery of vegetables arrives. In what order do they pass through the kitchen sections before reaching the plate?', hi: 'सब्ज़ियों की नई खेप आती है। थाली तक पहुंचने से पहले वे किस क्रम में अनुभागों से गुज़रती हैं?' },
      { en: 'Your school canteen wants to cook for 200 students. Which kitchen sections would it need?', hi: 'आपकी स्कूल कैंटीन 200 छात्रों हेतु पकाना चाहती है। उसे कौन से अनुभाग चाहिए?' },
    ],
    review: { en: 'Food production turns raw ingredients into cooked food inside a kitchen that is split into sections — receiving, store, preparation, hot kitchen, bakery, wash-up and service. Food flows in one direction so clean and dirty work never cross. Trained cooks are needed everywhere food is served.', hi: 'खाद्य उत्पादन रसोई में कच्ची सामग्री को पके भोजन में बदलता है, जो अनुभागों में बंटी है — प्राप्ति, भंडार, तैयारी, गर्म रसोई, बेकरी, धुलाई व सर्विस। भोजन एक दिशा में बहता है। प्रशिक्षित रसोइये हर जगह चाहिए।' },
    safety: [
      { en: 'Keep clean food and dirty dishes on separate paths to avoid contamination.', hi: 'संदूषण से बचने हेतु साफ भोजन व गंदे बर्तन अलग रास्तों पर रखें।' },
      { en: 'Walkways between sections must be kept clear to prevent trips.', hi: 'गिरने से बचने हेतु अनुभागों के बीच रास्ते साफ रखें।' },
    ],
    applications: [
      { en: 'Hotels and resorts', hi: 'होटल व रिसॉर्ट' },
      { en: 'Restaurants and cafés', hi: 'रेस्तरां व कैफे' },
      { en: 'Hospital, school and factory canteens', hi: 'अस्पताल, स्कूल व फैक्ट्री कैंटीन' },
      { en: 'Catering and cloud kitchens', hi: 'कैटरिंग व क्लाउड किचन' },
    ],
  },

  /* 2 — Kitchen Organization & the Brigade */
  {
    id: 2, section: S.kitchen, themeKey: 'organization', simId: 'virtualKitchen',
    title: { en: 'Kitchen Organization & the Brigade', hi: 'रसोई संगठन एवं ब्रिगेड' },
    desc: { en: 'Who works in a kitchen, the chef hierarchy, and each person’s duties.', hi: 'रसोई में कौन काम करता है, शेफ पदानुक्रम, और प्रत्येक के कर्तव्य।' },
    objectives: [
      { en: 'Describe the kitchen brigade and its main ranks', hi: 'रसोई ब्रिगेड व उसके मुख्य पद बताएं' },
      { en: 'State the duties of a commis and a chef de partie', hi: 'कॉमी व शेफ द पार्टी के कर्तव्य बताएं' },
      { en: 'Explain why teamwork and discipline matter in a kitchen', hi: 'समझाएं कि रसोई में टीमवर्क व अनुशासन क्यों ज़रूरी है' },
    ],
    keyTopics: [
      { en: 'Kitchen brigade (brigade de cuisine)', hi: 'रसोई ब्रिगेड' },
      { en: 'Executive chef, sous chef, chef de partie, commis', hi: 'एग्ज़ीक्यूटिव शेफ, सू शेफ, शेफ द पार्टी, कॉमी' },
      { en: 'Duties and responsibilities', hi: 'कर्तव्य व ज़िम्मेदारियां' },
      { en: 'Discipline, punctuality and teamwork', hi: 'अनुशासन, समय-पालन व टीमवर्क' },
    ],
    theory: {
      en: 'A busy kitchen runs like a team with clear ranks — this team is called the brigade de cuisine, first organised by the French chef Auguste Escoffier.\n\nAt the top is the executive chef (head chef), who plans menus and runs the kitchen. The sous chef is second-in-command and takes charge when the head chef is away. Each section is led by a chef de partie (station chef) — for example the sauce chef or the pastry chef. Under them work the commis (junior cooks) who learn the trade, and kitchen helpers who clean and fetch.\n\nEveryone has a clear job, so food is ready on time and nothing is missed. A good kitchen worker is punctual, clean, disciplined, willing to learn, and works calmly as part of the team even when the kitchen is busy.',
      hi: 'व्यस्त रसोई एक टीम की तरह स्पष्ट पदों के साथ चलती है — इसे ब्रिगेड द कुज़ीन कहते हैं, जिसे फ्रांसीसी शेफ ऑगस्ट एस्कॉफ़िए ने व्यवस्थित किया।\n\nशीर्ष पर एग्ज़ीक्यूटिव शेफ (हेड शेफ) होता है, जो मेन्यू बनाता व रसोई चलाता है। सू शेफ दूसरा प्रमुख है। प्रत्येक अनुभाग का नेतृत्व शेफ द पार्टी करता है — जैसे सॉस शेफ या पेस्ट्री शेफ। उनके नीचे कॉमी (जूनियर रसोइये) व सहायक काम करते हैं।\n\nहर किसी का स्पष्ट काम होता है, इसलिए भोजन समय पर तैयार होता है। अच्छा रसोई कर्मचारी समयनिष्ठ, स्वच्छ, अनुशासित व सीखने को तैयार रहता है।',
    },
    terminology: [
      { term: { en: 'Brigade de cuisine', hi: 'ब्रिगेड द कुज़ीन' }, def: { en: 'The organised team of cooks in a kitchen', hi: 'रसोई में रसोइयों की संगठित टीम' } },
      { term: { en: 'Sous chef', hi: 'सू शेफ' }, def: { en: 'Second-in-command, below the head chef', hi: 'हेड शेफ के नीचे दूसरा प्रमुख' } },
      { term: { en: 'Chef de partie', hi: 'शेफ द पार्टी' }, def: { en: 'The chef in charge of one section or station', hi: 'एक अनुभाग का प्रभारी शेफ' } },
      { term: { en: 'Commis', hi: 'कॉमी' }, def: { en: 'A junior cook learning the trade', hi: 'व्यापार सीखता जूनियर रसोइया' } },
    ],
    practice: [
      { en: 'Draw a ladder showing the kitchen ranks from commis up to executive chef.', hi: 'कॉमी से एग्ज़ीक्यूटिव शेफ तक रसोई पदों की सीढ़ी बनाएं।' },
      { en: 'Write two duties for each of: head chef, chef de partie, commis.', hi: 'हेड शेफ, शेफ द पार्टी, कॉमी में से प्रत्येक के दो कर्तव्य लिखें।' },
      { en: 'List three habits that make someone a good kitchen team member.', hi: 'तीन आदतें लिखें जो किसी को अच्छा रसोई सदस्य बनाती हैं।' },
    ],
    mcqs: [
      { q: { en: 'Who is second-in-command in the kitchen?', hi: 'रसोई में दूसरा प्रमुख कौन है?' },
        options: [{ en: 'Commis', hi: 'कॉमी' }, { en: 'Sous chef', hi: 'सू शेफ' }, { en: 'Kitchen helper', hi: 'रसोई सहायक' }],
        correct: 1, explanation: { en: 'The sous chef runs the kitchen when the head chef is away.', hi: 'हेड शेफ की अनुपस्थिति में सू शेफ रसोई चलाता है।' } },
      { q: { en: 'A chef de partie is in charge of:', hi: 'शेफ द पार्टी किसका प्रभारी है?' },
        options: [{ en: 'The whole hotel', hi: 'पूरे होटल' }, { en: 'One kitchen section or station', hi: 'एक रसोई अनुभाग' }, { en: 'Guest bookings', hi: 'अतिथि बुकिंग' }],
        correct: 1, explanation: { en: 'Each station, like sauce or pastry, has its own chef de partie.', hi: 'प्रत्येक स्टेशन, जैसे सॉस या पेस्ट्री, का अपना शेफ द पार्टी होता है।' } },
    ],
    apply: [
      { en: 'During a busy dinner the sauce station falls behind. Who should step in, and who ultimately decides?', hi: 'व्यस्त रात्रिभोज में सॉस स्टेशन पिछड़ जाता है। किसे मदद करनी चाहिए, और अंततः कौन निर्णय लेता है?' },
      { en: 'As a new commis, name three things you can do to support your chef de partie.', hi: 'नए कॉमी के रूप में, अपने शेफ द पार्टी की मदद हेतु तीन कार्य बताएं।' },
    ],
    review: { en: 'The brigade de cuisine is the kitchen team, led by the executive chef, supported by the sous chef, with each section run by a chef de partie and juniors called commis. Clear ranks and duties, plus discipline and teamwork, keep a busy kitchen running on time.', hi: 'ब्रिगेड द कुज़ीन रसोई टीम है, जिसका नेतृत्व एग्ज़ीक्यूटिव शेफ करता है, सू शेफ सहायता करता है, प्रत्येक अनुभाग शेफ द पार्टी व कॉमी चलाते हैं। स्पष्ट पद, अनुशासन व टीमवर्क रसोई समय पर चलाते हैं।' },
    safety: [
      { en: 'Follow the chef’s instructions exactly — guessing in a busy kitchen causes accidents.', hi: 'शेफ के निर्देश ठीक से मानें — व्यस्त रसोई में अनुमान दुर्घटना कराता है।' },
      { en: 'Report problems early so a senior can act before they grow.', hi: 'समस्याएं जल्दी बताएं ताकि वरिष्ठ समय रहते कार्य कर सके।' },
    ],
    applications: [
      { en: 'Large hotel kitchens', hi: 'बड़ी होटल रसोई' },
      { en: 'Banquet and catering teams', hi: 'बैंक्वेट व कैटरिंग टीम' },
      { en: 'Restaurant chains', hi: 'रेस्तरां श्रृंखलाएं' },
    ],
  },

  /* 3 — Chef's Uniform & Protective Clothing */
  {
    id: 3, section: S.chef, themeKey: 'uniform', simId: 'chefUniform',
    title: { en: 'Chef’s Uniform & Protective Clothing', hi: 'शेफ की वर्दी एवं सुरक्षात्मक वस्त्र' },
    desc: { en: 'The parts of a chef’s uniform, why each is worn, and how to keep it clean.', hi: 'शेफ की वर्दी के भाग, प्रत्येक क्यों पहना जाता है, और इसे साफ कैसे रखें।' },
    objectives: [
      { en: 'Name each part of the chef’s uniform', hi: 'शेफ की वर्दी का प्रत्येक भाग बताएं' },
      { en: 'Explain the purpose of each item of protective clothing', hi: 'प्रत्येक सुरक्षात्मक वस्त्र का उद्देश्य समझाएं' },
      { en: 'Describe how to keep the uniform clean and well-maintained', hi: 'वर्दी को साफ व अच्छी तरह बनाए रखना बताएं' },
    ],
    keyTopics: [
      { en: 'Toque, jacket, neckerchief, apron', hi: 'टॉक, जैकेट, गले का स्कार्फ, एप्रन' },
      { en: 'Checked trousers, safety shoes, side towel', hi: 'चेकदार पतलून, सुरक्षा जूते, साइड तौलिया' },
      { en: 'Purpose of protective clothing', hi: 'सुरक्षात्मक वस्त्र का उद्देश्य' },
      { en: 'Care and maintenance of the uniform', hi: 'वर्दी की देखभाल व रखरखाव' },
    ],
    theory: {
      en: 'The chef’s uniform is not just a costume — every part protects the cook and keeps the food safe.\n\nThe tall white hat, the toque, keeps hair out of the food. The double-breasted jacket is made of thick cotton; its two layers shield the chest from heat and splashes, and it can be re-buttoned to hide stains. The neckerchief soaks up sweat. The apron protects the jacket and trousers from spills. Checked trousers hide small stains and are loose for comfort. Closed, non-slip safety shoes protect the feet from dropped knives and hot liquids. A dry side towel is used to lift hot pans — never a wet cloth, because water carries heat and will burn the hand.\n\nThe uniform must always be clean, pressed and in good repair. A dirty uniform can carry germs to food, so a fresh one is worn each day.',
      hi: 'शेफ की वर्दी केवल पोशाक नहीं है — हर भाग रसोइये की रक्षा व भोजन को सुरक्षित रखता है।\n\nऊंची सफेद टोपी, टॉक, बालों को भोजन से दूर रखती है। डबल-ब्रेस्टेड जैकेट मोटे कपास की होती है; इसकी दो परतें छाती को गर्मी व छींटों से बचाती हैं। गले का स्कार्फ पसीना सोखता है। एप्रन जैकेट व पतलून को बचाता है। चेकदार पतलून दाग छिपाती है। बंद, फिसलन-रोधी जूते पैरों की रक्षा करते हैं। सूखा साइड तौलिया गर्म पैन उठाने हेतु — गीला कभी नहीं, क्योंकि पानी गर्मी ले जाता है।\n\nवर्दी हमेशा साफ, प्रेस व अच्छी स्थिति में हो। गंदी वर्दी भोजन में कीटाणु ला सकती है, इसलिए रोज़ ताज़ी पहनें।',
    },
    terminology: [
      { term: { en: 'Toque', hi: 'टॉक' }, def: { en: 'The tall white chef’s hat', hi: 'ऊंची सफेद शेफ टोपी' } },
      { term: { en: 'Double-breasted jacket', hi: 'डबल-ब्रेस्टेड जैकेट' }, def: { en: 'Two-layer cotton coat that protects from heat', hi: 'दो-परत कपास कोट जो गर्मी से बचाता है' } },
      { term: { en: 'Side towel', hi: 'साइड तौलिया' }, def: { en: 'A dry cloth used to hold hot pans safely', hi: 'गर्म पैन सुरक्षित पकड़ने हेतु सूखा कपड़ा' } },
      { term: { en: 'Protective clothing', hi: 'सुरक्षात्मक वस्त्र' }, def: { en: 'Clothes worn to keep the worker and food safe', hi: 'कर्मचारी व भोजन सुरक्षित रखने हेतु पहने कपड़े' } },
    ],
    practice: [
      { en: 'Label a drawing of a chef with the name of every uniform part.', hi: 'शेफ के चित्र पर हर वर्दी भाग का नाम लगाएं।' },
      { en: 'Match each uniform item to the danger it protects against.', hi: 'प्रत्येक वर्दी वस्तु को उस खतरे से मिलाएं जिससे वह बचाती है।' },
      { en: 'Explain why a wet side towel should never be used to lift a hot pan.', hi: 'समझाएं कि गीला साइड तौलिया गर्म पैन उठाने हेतु क्यों नहीं।' },
    ],
    mcqs: [
      { q: { en: 'Why is the chef’s jacket double-breasted?', hi: 'शेफ की जैकेट डबल-ब्रेस्टेड क्यों होती है?' },
        options: [{ en: 'To look fashionable', hi: 'फैशनेबल दिखने हेतु' }, { en: 'Two layers protect from heat and can hide stains', hi: 'दो परतें गर्मी से बचाती व दाग छिपाती हैं' }, { en: 'To keep money in the pockets', hi: 'जेब में पैसे रखने हेतु' }],
        correct: 1, explanation: { en: 'The double layer shields the chest and can be re-buttoned to hide stains.', hi: 'दोहरी परत छाती बचाती है व दोबारा बटन लगाकर दाग छिपती है।' } },
      { q: { en: 'A side towel used to lift a hot pan should be:', hi: 'गर्म पैन उठाने हेतु साइड तौलिया कैसा हो?' },
        options: [{ en: 'Wet', hi: 'गीला' }, { en: 'Dry', hi: 'सूखा' }, { en: 'Made of plastic', hi: 'प्लास्टिक का' }],
        correct: 1, explanation: { en: 'A wet cloth carries heat and will burn you — always use a dry towel.', hi: 'गीला कपड़ा गर्मी ले जाकर जला देगा — हमेशा सूखा तौलिया।' } },
    ],
    apply: [
      { en: 'A cook arrives with a stained jacket and open sandals. List what is wrong and what they should wear instead.', hi: 'एक रसोइया दाग़दार जैकेट व खुली चप्पल में आता है। क्या गलत है व उसे क्या पहनना चाहिए?' },
      { en: 'You need to carry a hot tray across the kitchen. Which uniform items help you do it safely?', hi: 'आपको गर्म ट्रे रसोई में ले जानी है। कौन सी वर्दी वस्तुएं इसे सुरक्षित बनाती हैं?' },
    ],
    review: { en: 'Every part of the chef’s uniform has a safety reason: the toque keeps hair back, the double-breasted jacket shields from heat, the apron keeps the uniform clean, checked trousers hide stains, safety shoes protect the feet and a dry side towel lifts hot pans. A clean, fresh uniform worn daily also protects the food.', hi: 'शेफ की वर्दी के हर भाग का सुरक्षा कारण है: टॉक बाल रोकती है, जैकेट गर्मी से बचाती है, एप्रन वर्दी साफ रखता है, पतलून दाग छिपाती है, जूते पैर बचाते हैं व सूखा तौलिया गर्म पैन उठाता है। रोज़ साफ वर्दी भोजन भी बचाती है।' },
    safety: [
      { en: 'Never wear loose sleeves, dangling jewellery or open shoes near heat and knives.', hi: 'गर्मी व चाकू के पास ढीली आस्तीन, झूलते गहने या खुले जूते कभी न पहनें।' },
      { en: 'Change out of a soiled uniform at once — it can carry bacteria to food.', hi: 'गंदी वर्दी तुरंत बदलें — यह भोजन में जीवाणु ला सकती है।' },
    ],
    applications: [
      { en: 'All professional kitchens', hi: 'सभी व्यावसायिक रसोई' },
      { en: 'Culinary schools and training', hi: 'पाक विद्यालय व प्रशिक्षण' },
      { en: 'Food stalls and catering', hi: 'खाद्य स्टॉल व कैटरिंग' },
    ],
  },

  /* 4 — Personal Hygiene & Hand-Washing */
  {
    id: 4, section: S.chef, themeKey: 'hygiene', simId: 'kitchenHygiene',
    title: { en: 'Personal Hygiene & Hand-Washing', hi: 'व्यक्तिगत स्वच्छता एवं हाथ धुलाई' },
    desc: { en: 'Keeping your body, hands and habits clean so the food you make is safe to eat.', hi: 'अपने शरीर, हाथ व आदतें साफ रखना ताकि आपका बनाया भोजन सुरक्षित हो।' },
    objectives: [
      { en: 'Explain why personal hygiene matters in a kitchen', hi: 'समझाएं कि रसोई में व्यक्तिगत स्वच्छता क्यों ज़रूरी है' },
      { en: 'Carry out the correct hand-washing steps in order', hi: 'सही हाथ-धुलाई चरण क्रम में करें' },
      { en: 'List good grooming habits for a food handler', hi: 'खाद्य कर्मी हेतु अच्छी साज-संभाल आदतें बताएं' },
    ],
    keyTopics: [
      { en: 'Importance of personal hygiene', hi: 'व्यक्तिगत स्वच्छता का महत्व' },
      { en: 'Hand-washing technique', hi: 'हाथ-धुलाई तकनीक' },
      { en: 'When to wash hands', hi: 'हाथ कब धोएं' },
      { en: 'Grooming: nails, hair, cuts, illness', hi: 'साज-संभाल: नाखून, बाल, घाव, बीमारी' },
    ],
    theory: {
      en: 'A food handler’s own body is the most common way germs reach food, so personal hygiene is the first rule of a kitchen.\n\nHands must be washed often and in the right way: wet them with clean running water, apply soap, rub palms together, scrub between the fingers and the backs of the hands, clean the thumbs, fingertips and nails, rinse well, and dry with a clean towel or hand dryer. Hands should be washed before starting work, after touching raw meat, after using the toilet, after touching the face or hair, and after handling waste.\n\nGood grooming completes the picture: keep nails short and clean with no nail polish, tie back and cover hair, remove jewellery, cover any cut with a blue waterproof plaster, and never come to work when suffering from an upset stomach or infection.',
      hi: 'खाद्य कर्मी का अपना शरीर कीटाणुओं के भोजन तक पहुंचने का सबसे आम रास्ता है, इसलिए व्यक्तिगत स्वच्छता रसोई का पहला नियम है।\n\nहाथ अक्सर व सही तरीके से धोएं: साफ बहते पानी से गीला करें, साबुन लगाएं, हथेलियां रगड़ें, उंगलियों के बीच व पीछे रगड़ें, अंगूठे, सिरे व नाखून साफ करें, अच्छी तरह धोएं, साफ तौलिये से सुखाएं। काम शुरू करने से पहले, कच्चा मांस छूने के बाद, शौचालय के बाद व कचरा संभालने के बाद हाथ धोएं।\n\nअच्छी साज-संभाल: नाखून छोटे व साफ रखें, बाल ढकें, गहने हटाएं, घाव नीले प्लास्टर से ढकें, और बीमारी में काम पर न आएं।',
    },
    terminology: [
      { term: { en: 'Personal hygiene', hi: 'व्यक्तिगत स्वच्छता' }, def: { en: 'Keeping your own body and habits clean', hi: 'अपना शरीर व आदतें साफ रखना' } },
      { term: { en: 'Food handler', hi: 'खाद्य कर्मी' }, def: { en: 'Anyone who prepares, cooks or serves food', hi: 'जो भोजन तैयार, पकाता या परोसता है' } },
      { term: { en: 'Contamination', hi: 'संदूषण' }, def: { en: 'When germs or dirt get into food', hi: 'जब कीटाणु या गंदगी भोजन में आ जाए' } },
      { term: { en: 'Blue plaster', hi: 'नीला प्लास्टर' }, def: { en: 'A bright waterproof bandage easy to spot if it falls in food', hi: 'चमकीली जलरोधी पट्टी जो भोजन में गिरे तो दिखे' } },
    ],
    practice: [
      { en: 'Practise the 7 hand-washing steps until you can do them in order from memory.', hi: '7 हाथ-धुलाई चरण याद से क्रम में करने तक अभ्यास करें।' },
      { en: 'Make a list of five moments when a cook must wash their hands.', hi: 'पांच क्षण लिखें जब रसोइये को हाथ धोने चाहिए।' },
      { en: 'Check a partner’s grooming against a hygiene checklist.', hi: 'साथी की साज-संभाल स्वच्छता सूची से जांचें।' },
    ],
    mcqs: [
      { q: { en: 'When must a cook wash their hands?', hi: 'रसोइये को हाथ कब धोने चाहिए?' },
        options: [{ en: 'Only at the end of the day', hi: 'केवल दिन के अंत में' }, { en: 'After handling raw meat and after using the toilet', hi: 'कच्चा मांस व शौचालय के बाद' }, { en: 'Only if hands look dirty', hi: 'केवल जब हाथ गंदे दिखें' }],
        correct: 1, explanation: { en: 'Germs are invisible, so wash at key moments, not just when hands look dirty.', hi: 'कीटाणु अदृश्य हैं, इसलिए मुख्य क्षणों पर धोएं, न कि केवल गंदे दिखने पर।' } },
      { q: { en: 'How should a cut on the hand be covered?', hi: 'हाथ के घाव को कैसे ढकें?' },
        options: [{ en: 'With a blue waterproof plaster', hi: 'नीले जलरोधी प्लास्टर से' }, { en: 'With a tissue', hi: 'टिशू से' }, { en: 'Leave it open', hi: 'खुला छोड़ दें' }],
        correct: 0, explanation: { en: 'A blue waterproof plaster is easy to see if it falls into the food.', hi: 'नीला जलरोधी प्लास्टर भोजन में गिरे तो आसानी से दिखता है।' } },
    ],
    apply: [
      { en: 'A cook finishes cutting raw chicken and reaches for bread without washing. What should happen first and why?', hi: 'रसोइया कच्चा चिकन काटकर बिना धोए ब्रेड उठाता है। पहले क्या हो व क्यों?' },
      { en: 'A team member has a cold and keeps sneezing. What is the safe thing to do?', hi: 'एक सदस्य को सर्दी है व छींक रहा है। सुरक्षित क्या है?' },
    ],
    review: { en: 'Because a food handler’s body spreads germs easily, personal hygiene is the first rule of safe cooking. Wash hands the right way at key moments, keep nails and hair neat, cover cuts with a blue plaster, and stay home when ill. Clean habits make safe food.', hi: 'चूंकि खाद्य कर्मी का शरीर कीटाणु आसानी से फैलाता है, व्यक्तिगत स्वच्छता सुरक्षित पाक का पहला नियम है। सही तरीके से हाथ धोएं, नाखून व बाल साफ रखें, घाव नीले प्लास्टर से ढकें, बीमारी में घर रहें।' },
    safety: [
      { en: 'Never taste food with your fingers or a used spoon returned to the pot.', hi: 'उंगलियों या प्रयुक्त चम्मच से भोजन न चखें जो वापस बर्तन में जाए।' },
      { en: 'Keep the first-aid box stocked with blue plasters for food areas.', hi: 'खाद्य क्षेत्र हेतु प्राथमिक उपचार बॉक्स में नीले प्लास्टर रखें।' },
    ],
    applications: [
      { en: 'Every food business, by law', hi: 'हर खाद्य व्यवसाय, कानूनन' },
      { en: 'Street food and home catering', hi: 'स्ट्रीट फूड व घरेलू कैटरिंग' },
      { en: 'Hospital and school kitchens', hi: 'अस्पताल व स्कूल रसोई' },
    ],
  },

  /* 5 — Kitchen Equipment & Appliances */
  {
    id: 5, section: S.equip, themeKey: 'equipment', simId: 'equipmentId',
    title: { en: 'Kitchen Equipment & Appliances', hi: 'रसोई उपकरण एवं यंत्र' },
    desc: { en: 'The large equipment and appliances of a kitchen, their uses and their care.', hi: 'रसोई के बड़े उपकरण व यंत्र, उनके उपयोग व देखभाल।' },
    objectives: [
      { en: 'Identify common large kitchen equipment', hi: 'सामान्य बड़े रसोई उपकरण पहचानें' },
      { en: 'Match each piece of equipment to its correct use', hi: 'प्रत्येक उपकरण को सही उपयोग से मिलाएं' },
      { en: 'State basic care and safety for appliances', hi: 'यंत्रों हेतु मूल देखभाल व सुरक्षा बताएं' },
    ],
    keyTopics: [
      { en: 'Cooking range, oven, deep fryer, griddle', hi: 'कुकिंग रेंज, ओवन, डीप फ्रायर, ग्रिडल' },
      { en: 'Refrigerator and deep freezer', hi: 'रेफ्रिजरेटर व डीप फ्रीज़र' },
      { en: 'Mixers, grinders and food processors', hi: 'मिक्सर, ग्राइंडर व फूड प्रोसेसर' },
      { en: 'Care and maintenance of equipment', hi: 'उपकरण की देखभाल व रखरखाव' },
    ],
    theory: {
      en: 'Large equipment does the heavy work of a kitchen and must be used and cleaned correctly.\n\nThe cooking range with its burners is used for boiling, frying and simmering. The oven bakes and roasts. A deep fryer holds hot oil for frying, and a griddle is a flat hot plate for dosa, eggs and sandwiches. The refrigerator keeps food cold (below 5°C) and the deep freezer keeps it frozen (around −18°C). Powered machines such as the planetary mixer, wet grinder and food processor save time on mixing, grinding and chopping.\n\nEvery appliance must be cleaned after use, switched off at the mains before cleaning, and checked for loose parts or damaged cords. Equipment that is cared for lasts longer and is far safer to use.',
      hi: 'बड़े उपकरण रसोई का भारी काम करते हैं व सही उपयोग व सफाई चाहिए।\n\nबर्नर सहित कुकिंग रेंज उबालने, तलने व धीमी आंच हेतु है। ओवन बेक व रोस्ट करता है। डीप फ्रायर तलने हेतु गर्म तेल रखता है, ग्रिडल सपाट गर्म प्लेट है। रेफ्रिजरेटर भोजन ठंडा (5°C से नीचे) व डीप फ्रीज़र जमा (−18°C) रखता है। मिक्सर, वेट ग्राइंडर व फूड प्रोसेसर मिश्रण, पीसने व काटने में समय बचाते हैं।\n\nहर यंत्र उपयोग के बाद साफ करें, सफाई से पहले मेन से बंद करें, व ढीले भाग या खराब तार जांचें। देखभाल किया उपकरण अधिक चलता व सुरक्षित होता है।',
    },
    terminology: [
      { term: { en: 'Cooking range', hi: 'कुकिंग रेंज' }, def: { en: 'The main gas or electric cooktop with burners', hi: 'बर्नर सहित मुख्य गैस या बिजली चूल्हा' } },
      { term: { en: 'Griddle', hi: 'ग्रिडल' }, def: { en: 'A flat heated plate for dosa, eggs and sandwiches', hi: 'दोसा, अंडे व सैंडविच हेतु सपाट गर्म प्लेट' } },
      { term: { en: 'Deep freezer', hi: 'डीप फ्रीज़र' }, def: { en: 'An appliance that keeps food frozen near −18°C', hi: 'यंत्र जो भोजन −18°C पर जमा रखता है' } },
      { term: { en: 'Food processor', hi: 'फूड प्रोसेसर' }, def: { en: 'A powered machine that chops, grinds and mixes', hi: 'बिजली मशीन जो काटती, पीसती व मिलाती है' } },
    ],
    practice: [
      { en: 'Match ten kitchen appliances to the task each one does.', hi: 'दस रसोई यंत्रों को उनके कार्य से मिलाएं।' },
      { en: 'Write a cleaning routine for a deep fryer after service.', hi: 'सर्विस के बाद डीप फ्रायर की सफाई दिनचर्या लिखें।' },
      { en: 'Spot which appliances must be switched off at the mains before cleaning.', hi: 'पहचानें कौन से यंत्र सफाई से पहले मेन से बंद होने चाहिए।' },
    ],
    mcqs: [
      { q: { en: 'Which appliance is used to keep food frozen?', hi: 'भोजन जमा रखने हेतु कौन सा यंत्र?' },
        options: [{ en: 'Deep fryer', hi: 'डीप फ्रायर' }, { en: 'Deep freezer', hi: 'डीप फ्रीज़र' }, { en: 'Griddle', hi: 'ग्रिडल' }],
        correct: 1, explanation: { en: 'A deep freezer holds food at about −18°C; a deep fryer holds hot oil.', hi: 'डीप फ्रीज़र भोजन −18°C पर रखता है; डीप फ्रायर गर्म तेल।' } },
      { q: { en: 'Before cleaning an electric mixer you should:', hi: 'बिजली मिक्सर साफ करने से पहले आपको:' },
        options: [{ en: 'Switch it off at the mains', hi: 'मेन से बंद करें' }, { en: 'Leave it running', hi: 'चलता छोड़ें' }, { en: 'Pour water inside the motor', hi: 'मोटर में पानी डालें' }],
        correct: 0, explanation: { en: 'Always switch off and unplug powered equipment before cleaning.', hi: 'सफाई से पहले हमेशा बिजली उपकरण बंद व अनप्लग करें।' } },
    ],
    apply: [
      { en: 'You must cook rice, fry samosas and chill a dessert. Which equipment does each job?', hi: 'आपको चावल पकाना, समोसे तलना व मिठाई ठंडी करनी है। प्रत्येक काम कौन सा उपकरण करे?' },
      { en: 'A mixer’s cord is frayed. What should you do before anyone uses it?', hi: 'मिक्सर का तार कटा है। कोई उपयोग करे उससे पहले क्या करें?' },
    ],
    review: { en: 'Large equipment — ranges, ovens, fryers, griddles, refrigerators, freezers and powered mixers — does the heavy work of the kitchen. Knowing each one’s use, cleaning it after service and switching off powered machines before cleaning keeps equipment safe and long-lasting.', hi: 'बड़े उपकरण — रेंज, ओवन, फ्रायर, ग्रिडल, रेफ्रिजरेटर, फ्रीज़र व बिजली मिक्सर — रसोई का भारी काम करते हैं। हर एक का उपयोग जानना, सर्विस के बाद साफ करना व बिजली मशीन बंद करना उपकरण सुरक्षित व टिकाऊ रखता है।' },
    safety: [
      { en: 'Never put water into the motor of an electrical appliance.', hi: 'बिजली यंत्र की मोटर में कभी पानी न डालें।' },
      { en: 'Report frayed cords and loose parts; do not use damaged equipment.', hi: 'कटे तार व ढीले भाग बताएं; खराब उपकरण उपयोग न करें।' },
    ],
    applications: [
      { en: 'Commercial and institutional kitchens', hi: 'व्यावसायिक व संस्थागत रसोई' },
      { en: 'Bakeries and sweet shops', hi: 'बेकरी व मिठाई दुकानें' },
      { en: 'Food processing units', hi: 'खाद्य प्रसंस्करण इकाइयां' },
    ],
  },

  /* 6 — Kitchen Tools, Knives & Vegetable Cuts */
  {
    id: 6, section: S.equip, themeKey: 'cuts', simId: 'toolsCuts',
    title: { en: 'Kitchen Tools, Knives & Vegetable Cuts', hi: 'रसोई औज़ार, चाकू एवं सब्ज़ी कट्स' },
    desc: { en: 'Hand tools and knives, how to handle a knife safely, and the classical vegetable cuts.', hi: 'हाथ औज़ार व चाकू, चाकू सुरक्षित पकड़ना, और शास्त्रीय सब्ज़ी कट्स।' },
    objectives: [
      { en: 'Identify common kitchen hand tools and knives', hi: 'सामान्य रसोई हाथ औज़ार व चाकू पहचानें' },
      { en: 'Hold and use a knife safely', hi: 'चाकू सुरक्षित पकड़ें व उपयोग करें' },
      { en: 'Recognise the classical vegetable cuts', hi: 'शास्त्रीय सब्ज़ी कट्स पहचानें' },
    ],
    keyTopics: [
      { en: 'Hand tools: peeler, whisk, ladle, spatula', hi: 'हाथ औज़ार: पीलर, व्हिस्क, करछी, स्पैचुला' },
      { en: 'Knives and their maintenance', hi: 'चाकू व उनका रखरखाव' },
      { en: 'Safe knife handling', hi: 'सुरक्षित चाकू उपयोग' },
      { en: 'Cuts: julienne, brunoise, dice, chiffonade', hi: 'कट्स: जूलियन, ब्रुनोइज़, डाइस, शिफोनाड' },
    ],
    theory: {
      en: 'Small hand tools and knives are a cook’s everyday companions. Tools such as the peeler, whisk, ladle, spatula, grater and sieve each have one clear job.\n\nThe knife is the most important tool. A sharp knife is safer than a blunt one because it does not slip. Hold the handle firmly, curl the fingers of the other hand into a “claw” to guard the fingertips, and cut on a stable board placed on a damp cloth so it does not move. Wash and dry knives separately, and store them in a rack — never loose in a sink.\n\nUniform cuts make food cook evenly and look neat. The classical cuts include julienne (thin matchsticks), brunoise (tiny dice), macédoine (small dice), baton/jardinière (thick sticks) and chiffonade (fine ribbons of leaves).',
      hi: 'छोटे हाथ औज़ार व चाकू रसोइये के रोज़ के साथी हैं। पीलर, व्हिस्क, करछी, स्पैचुला, ग्रेटर व छलनी जैसे औज़ारों का एक स्पष्ट काम है।\n\nचाकू सबसे महत्वपूर्ण औज़ार है। तेज़ चाकू कुंद से सुरक्षित है क्योंकि फिसलता नहीं। हैंडल मज़बूती से पकड़ें, दूसरे हाथ की उंगलियां “पंजे” में मोड़ें, व स्थिर बोर्ड पर काटें जो गीले कपड़े पर रखा हो। चाकू अलग धोएं व सुखाएं, रैक में रखें — सिंक में कभी नहीं।\n\nसमान कट्स भोजन समान पकाते व साफ दिखाते हैं। कट्स: जूलियन (पतली तीली), ब्रुनोइज़ (छोटे क्यूब), मासेदोइन (छोटा डाइस), बैटन (मोटी तीली) व शिफोनाड (पत्तों की पतली पट्टी)।',
    },
    terminology: [
      { term: { en: 'Claw grip', hi: 'पंजा पकड़' }, def: { en: 'Curling the fingers to guard fingertips while cutting', hi: 'काटते समय सिरे बचाने हेतु उंगलियां मोड़ना' } },
      { term: { en: 'Julienne', hi: 'जूलियन' }, def: { en: 'Long thin matchstick-shaped cut', hi: 'लंबा पतला तीली-आकार कट' } },
      { term: { en: 'Brunoise', hi: 'ब्रुनोइज़' }, def: { en: 'Very small, even dice', hi: 'बहुत छोटे, समान क्यूब' } },
      { term: { en: 'Chiffonade', hi: 'शिफोनाड' }, def: { en: 'Fine ribbons of leafy vegetables or herbs', hi: 'पत्तेदार सब्ज़ी या जड़ी की पतली पट्टियां' } },
    ],
    practice: [
      { en: 'Name ten hand tools and the one job each does.', hi: 'दस हाथ औज़ार व प्रत्येक का एक काम बताएं।' },
      { en: 'Demonstrate the claw grip on a practice vegetable.', hi: 'अभ्यास सब्ज़ी पर पंजा पकड़ दिखाएं।' },
      { en: 'Identify each classical cut from its shape.', hi: 'प्रत्येक शास्त्रीय कट उसके आकार से पहचानें।' },
    ],
    mcqs: [
      { q: { en: 'Why is a sharp knife safer than a blunt one?', hi: 'तेज़ चाकू कुंद से सुरक्षित क्यों है?' },
        options: [{ en: 'It looks nicer', hi: 'अच्छा दिखता है' }, { en: 'It does not slip and needs less force', hi: 'फिसलता नहीं व कम बल चाहिए' }, { en: 'It is cheaper', hi: 'सस्ता है' }],
        correct: 1, explanation: { en: 'A blunt knife slips and needs force — that is how cuts happen.', hi: 'कुंद चाकू फिसलता व बल चाहिए — इसी से चोट लगती है।' } },
      { q: { en: 'A very small, even dice is called:', hi: 'बहुत छोटा, समान डाइस कहलाता है:' },
        options: [{ en: 'Julienne', hi: 'जूलियन' }, { en: 'Brunoise', hi: 'ब्रुनोइज़' }, { en: 'Chiffonade', hi: 'शिफोनाड' }],
        correct: 1, explanation: { en: 'Brunoise is the tiny even dice, often cut from julienne.', hi: 'ब्रुनोइज़ छोटा समान डाइस है, अक्सर जूलियन से कटता है।' } },
    ],
    apply: [
      { en: 'A soup needs vegetables that cook fast and look neat. Which cut would you choose and why?', hi: 'सूप को तेज़ पकने व साफ दिखने वाली सब्ज़ी चाहिए। कौन सा कट व क्यों?' },
      { en: 'A knife is lying under soapy water in the sink. Why is that dangerous and what is correct?', hi: 'चाकू सिंक में साबुन पानी के नीचे है। यह खतरनाक क्यों व सही क्या है?' },
    ],
    review: { en: 'Hand tools each do one job, and the knife is the cook’s key tool. A sharp knife, a firm claw grip and a steady board make cutting safe. Uniform classical cuts — julienne, brunoise, macédoine, baton and chiffonade — help food cook evenly and look professional.', hi: 'हर हाथ औज़ार एक काम करता है, व चाकू मुख्य औज़ार है। तेज़ चाकू, मज़बूत पंजा पकड़ व स्थिर बोर्ड कटाई सुरक्षित बनाते हैं। समान कट्स — जूलियन, ब्रुनोइज़, मासेदोइन, बैटन व शिफोनाड — भोजन समान पकाते व पेशेवर दिखाते हैं।' },
    safety: [
      { en: 'Always cut with the blade moving away from your body.', hi: 'हमेशा ब्लेड शरीर से दूर ले जाते हुए काटें।' },
      { en: 'Carry a knife point-down by your side; never leave it in a sink.', hi: 'चाकू नोक-नीचे बगल में ले जाएं; सिंक में कभी न छोड़ें।' },
    ],
    applications: [
      { en: 'Vegetable and garde manger sections', hi: 'सब्ज़ी व गार्दमांजे अनुभाग' },
      { en: 'Salad and garnish preparation', hi: 'सलाद व गार्निश तैयारी' },
      { en: 'All hands-on cookery', hi: 'सभी व्यावहारिक पाक' },
    ],
  },

  /* 7 — Kitchen Commodities */
  {
    id: 7, section: S.commodity, themeKey: 'commodity', simId: 'commodityId',
    title: { en: 'Kitchen Commodities', hi: 'रसोई सामग्री' },
    desc: { en: 'The raw materials of cooking, grouped by plant and animal origin.', hi: 'पाक की कच्ची सामग्री, पौधा व जंतु मूल अनुसार समूहित।' },
    objectives: [
      { en: 'Define a commodity and give examples', hi: 'सामग्री परिभाषित करें व उदाहरण दें' },
      { en: 'Sort foods into plant-origin and animal-origin groups', hi: 'भोजन को पौधा-मूल व जंतु-मूल समूहों में छांटें' },
      { en: 'Name the main food groups used in a kitchen', hi: 'रसोई में प्रयुक्त मुख्य खाद्य समूह बताएं' },
    ],
    keyTopics: [
      { en: 'Meaning of commodities', hi: 'सामग्री का अर्थ' },
      { en: 'Plant origin: cereals, pulses, vegetables, fruits, spices', hi: 'पौधा मूल: अनाज, दालें, सब्ज़ियां, फल, मसाले' },
      { en: 'Animal origin: dairy, eggs, meat, poultry, fish', hi: 'जंतु मूल: डेयरी, अंडे, मांस, मुर्गी, मछली' },
      { en: 'Perishable and non-perishable foods', hi: 'नाशवान व अनाशवान भोजन' },
    ],
    theory: {
      en: 'A commodity is any raw food material used in cooking. Commodities are grouped by where they come from.\n\nPlant-origin foods include cereals (rice, wheat), pulses (dal, beans), vegetables, fruits, nuts, and spices and herbs. Animal-origin foods include dairy products (milk, curd, paneer, cheese), eggs, meat, poultry and fish/seafood. Knowing the group helps a cook store and handle each food correctly.\n\nFoods are also grouped by how quickly they spoil. Perishable foods such as milk, meat, fish and cut fruit spoil fast and must be refrigerated. Non-perishable foods such as rice, flour, sugar and spices last a long time if kept dry and sealed. Choosing fresh, good-quality commodities is the first step to good food.',
      hi: 'सामग्री पाक में प्रयुक्त कोई कच्ची खाद्य वस्तु है। सामग्री उनके स्रोत अनुसार समूहित होती है।\n\nपौधा-मूल: अनाज (चावल, गेहूं), दालें, सब्ज़ियां, फल, मेवे, व मसाले-जड़ी। जंतु-मूल: डेयरी (दूध, दही, पनीर), अंडे, मांस, मुर्गी व मछली। समूह जानना भोजन सही भंडारण व संभालने में मदद करता है।\n\nभोजन खराब होने की गति अनुसार भी समूहित: नाशवान जैसे दूध, मांस, मछली व कटा फल तेज़ खराब होते व रेफ्रिजरेट करें। अनाशवान जैसे चावल, आटा, चीनी व मसाले सूखा व बंद रखने पर लंबे चलते हैं।',
    },
    terminology: [
      { term: { en: 'Commodity', hi: 'सामग्री' }, def: { en: 'A raw food material used in cooking', hi: 'पाक में प्रयुक्त कच्ची खाद्य वस्तु' } },
      { term: { en: 'Perishable', hi: 'नाशवान' }, def: { en: 'Food that spoils quickly and needs cold storage', hi: 'जल्दी खराब होता भोजन जिसे ठंडा भंडारण चाहिए' } },
      { term: { en: 'Cereal', hi: 'अनाज' }, def: { en: 'Grain foods such as rice and wheat', hi: 'अनाज भोजन जैसे चावल व गेहूं' } },
      { term: { en: 'Pulses', hi: 'दालें' }, def: { en: 'Dried seeds of beans and lentils (dal)', hi: 'फलियों व दालों के सूखे बीज' } },
    ],
    practice: [
      { en: 'Sort twenty foods into plant-origin and animal-origin groups.', hi: 'बीस भोजन पौधा-मूल व जंतु-मूल समूहों में छांटें।' },
      { en: 'Mark each food as perishable or non-perishable.', hi: 'प्रत्येक भोजन नाशवान या अनाशवान चिह्नित करें।' },
      { en: 'List signs of freshness for vegetables, fish and eggs.', hi: 'सब्ज़ी, मछली व अंडों की ताज़गी के संकेत लिखें।' },
    ],
    mcqs: [
      { q: { en: 'Which of these is an animal-origin commodity?', hi: 'इनमें से कौन जंतु-मूल सामग्री है?' },
        options: [{ en: 'Wheat', hi: 'गेहूं' }, { en: 'Paneer (cheese)', hi: 'पनीर' }, { en: 'Potato', hi: 'आलू' }],
        correct: 1, explanation: { en: 'Paneer is a dairy product, so it is animal-origin.', hi: 'पनीर डेयरी उत्पाद है, इसलिए जंतु-मूल।' } },
      { q: { en: 'Which food is non-perishable?', hi: 'कौन सा भोजन अनाशवान है?' },
        options: [{ en: 'Fresh fish', hi: 'ताज़ी मछली' }, { en: 'Milk', hi: 'दूध' }, { en: 'Dry rice', hi: 'सूखा चावल' }],
        correct: 2, explanation: { en: 'Dry rice keeps for months if sealed; fish and milk spoil fast.', hi: 'सूखा चावल बंद रखने पर महीनों चलता; मछली व दूध तेज़ खराब होते हैं।' } },
    ],
    apply: [
      { en: 'A delivery brings milk, rice, spinach and flour. Which go to the fridge and which to the dry store?', hi: 'खेप में दूध, चावल, पालक व आटा आते हैं। कौन फ्रिज व कौन सूखे भंडार में?' },
      { en: 'You are given curd and lentils. Group each by origin and by perishability.', hi: 'आपको दही व दाल दी गई। प्रत्येक को मूल व नाशवानता अनुसार समूहित करें।' },
    ],
    review: { en: 'Commodities are the raw materials of cooking, grouped by origin — plant (cereals, pulses, vegetables, fruits, spices) and animal (dairy, eggs, meat, poultry, fish) — and by how fast they spoil. Knowing the group tells a cook how to choose, store and handle each food.', hi: 'सामग्री पाक की कच्ची वस्तुएं हैं, मूल अनुसार समूहित — पौधा (अनाज, दालें, सब्ज़ी, फल, मसाले) व जंतु (डेयरी, अंडे, मांस, मुर्गी, मछली) — व खराब होने की गति अनुसार। समूह जानना चुनाव, भंडारण व संभाल बताता है।' },
    safety: [
      { en: 'Keep raw animal foods apart from ready-to-eat foods at all times.', hi: 'कच्चे जंतु भोजन को तैयार भोजन से हमेशा अलग रखें।' },
      { en: 'Check freshness before use; reject food that smells or looks off.', hi: 'उपयोग से पहले ताज़गी जांचें; बदबूदार या खराब भोजन अस्वीकार करें।' },
    ],
    applications: [
      { en: 'Store and larder sections', hi: 'भंडार व लार्डर अनुभाग' },
      { en: 'Purchasing and receiving', hi: 'खरीद व प्राप्ति' },
      { en: 'Menu and recipe planning', hi: 'मेन्यू व रेसिपी योजना' },
    ],
  },

  /* 8 — Storage of Commodities & the Cold Chain */
  {
    id: 8, section: S.commodity, themeKey: 'storage', simId: 'foodStorage',
    title: { en: 'Storage of Commodities & Food Temperatures', hi: 'सामग्री भंडारण एवं खाद्य तापमान' },
    desc: { en: 'Keeping food at safe temperatures and in the right place so it stays fresh and safe.', hi: 'भोजन सुरक्षित तापमान व सही स्थान पर रखना ताकि ताज़ा व सुरक्षित रहे।' },
    objectives: [
      { en: 'Place foods in the correct storage area', hi: 'भोजन सही भंडारण क्षेत्र में रखें' },
      { en: 'Explain the danger zone and safe temperatures', hi: 'डेंजर ज़ोन व सुरक्षित तापमान समझाएं' },
      { en: 'Store raw and ready-to-eat foods to prevent cross-contamination', hi: 'कच्चा व तैयार भोजन क्रॉस-संदूषण रोकने हेतु रखें' },
    ],
    keyTopics: [
      { en: 'Dry store, refrigerator, freezer', hi: 'सूखा भंडार, रेफ्रिजरेटर, फ्रीज़र' },
      { en: 'The danger zone (5–63°C)', hi: 'डेंजर ज़ोन (5–63°C)' },
      { en: 'Raw below ready-to-eat', hi: 'कच्चा, तैयार के नीचे' },
      { en: 'FIFO — first in, first out', hi: 'FIFO — पहले आया, पहले गया' },
    ],
    theory: {
      en: 'Food must be stored at the right temperature and in the right place to stay safe.\n\nDry, sealed stores hold non-perishables like rice, flour and spices. The refrigerator (0–5°C) holds perishables for a few days, and the freezer (around −18°C) holds food for much longer. Between 5°C and 63°C lies the danger zone, where bacteria multiply fastest — cooked and perishable food should not be left standing in this range.\n\nInside the fridge, raw meat and fish always go on the bottom shelf, below ready-to-eat foods, so their juices cannot drip onto food that will not be cooked again. Older stock is used before newer stock — this is called FIFO, first in, first out — so nothing is forgotten until it spoils.',
      hi: 'भोजन सही तापमान व स्थान पर भंडारित हो ताकि सुरक्षित रहे।\n\nसूखा, बंद भंडार अनाशवान जैसे चावल, आटा व मसाले रखता है। रेफ्रिजरेटर (0–5°C) नाशवान कुछ दिन, व फ्रीज़र (−18°C) बहुत लंबा रखता है। 5°C व 63°C के बीच डेंजर ज़ोन है, जहां जीवाणु तेज़ बढ़ते हैं — पका व नाशवान भोजन इस सीमा में खड़ा न छोड़ें।\n\nफ्रिज में कच्चा मांस व मछली हमेशा सबसे नीचे शेल्फ पर, तैयार भोजन के नीचे, ताकि रस न टपके। पुराना स्टॉक पहले उपयोग करें — इसे FIFO कहते हैं।',
    },
    terminology: [
      { term: { en: 'Danger zone', hi: 'डेंजर ज़ोन' }, def: { en: '5–63°C, the range where bacteria grow fastest', hi: '5–63°C, वह सीमा जहां जीवाणु सबसे तेज़ बढ़ते हैं' } },
      { term: { en: 'Perishable store', hi: 'नाशवान भंडार' }, def: { en: 'Chilled or frozen storage for foods that spoil fast', hi: 'जल्दी खराब भोजन हेतु ठंडा या जमा भंडार' } },
      { term: { en: 'FIFO', hi: 'फीफो' }, def: { en: 'First In, First Out — use older stock first', hi: 'पहले आया पहले गया — पुराना स्टॉक पहले उपयोग' } },
      { term: { en: 'Cross-contamination', hi: 'क्रॉस-संदूषण' }, def: { en: 'Germs passing from one food to another', hi: 'एक भोजन से दूसरे में कीटाणु जाना' } },
    ],
    practice: [
      { en: 'Place ten foods into dry store, fridge or freezer.', hi: 'दस भोजन सूखे भंडार, फ्रिज या फ्रीज़र में रखें।' },
      { en: 'Arrange a fridge shelf-by-shelf with raw meat at the bottom.', hi: 'फ्रिज शेल्फ-दर-शेल्फ व्यवस्थित करें, कच्चा मांस नीचे।' },
      { en: 'Use date labels to decide which stock to use first (FIFO).', hi: 'तिथि लेबल से तय करें कौन सा स्टॉक पहले उपयोग (FIFO)।' },
    ],
    mcqs: [
      { q: { en: 'What is the temperature danger zone?', hi: 'तापमान डेंजर ज़ोन क्या है?' },
        options: [{ en: '5–63°C', hi: '5–63°C' }, { en: '−18 to 0°C', hi: '−18 से 0°C' }, { en: '100–150°C', hi: '100–150°C' }],
        correct: 0, explanation: { en: 'Bacteria multiply fastest between 5°C and 63°C.', hi: 'जीवाणु 5°C व 63°C के बीच सबसे तेज़ बढ़ते हैं।' } },
      { q: { en: 'Where should raw chicken be kept in the fridge?', hi: 'फ्रिज में कच्चा चिकन कहां रखें?' },
        options: [{ en: 'Top shelf', hi: 'ऊपरी शेल्फ' }, { en: 'Bottom shelf, below ready-to-eat food', hi: 'निचली शेल्फ, तैयार भोजन के नीचे' }, { en: 'On the door', hi: 'दरवाज़े पर' }],
        correct: 1, explanation: { en: 'Raw meat goes at the bottom so its juices cannot drip onto other food.', hi: 'कच्चा मांस नीचे ताकि रस अन्य भोजन पर न टपके।' } },
    ],
    apply: [
      { en: 'Cooked rice is left on the counter for three hours. Why is this unsafe and what should have been done?', hi: 'पका चावल तीन घंटे काउंटर पर छूटता है। यह असुरक्षित क्यों व क्या करना था?' },
      { en: 'Two boxes of curd arrive, one older. Which do you use first and what is this rule called?', hi: 'दही के दो डिब्बे आते हैं, एक पुराना। पहले कौन सा उपयोग व यह नियम क्या कहलाता है?' },
    ],
    review: { en: 'Safe storage means the right temperature and the right place: dry store for non-perishables, fridge and freezer for perishables, and nothing left in the 5–63°C danger zone. Raw meat sits below ready-to-eat food, and older stock is used first (FIFO) so food stays safe and fresh.', hi: 'सुरक्षित भंडारण यानी सही तापमान व स्थान: अनाशवान सूखे भंडार, नाशवान फ्रिज व फ्रीज़र, व 5–63°C डेंजर ज़ोन में कुछ न छूटे। कच्चा मांस तैयार भोजन के नीचे, व पुराना स्टॉक पहले (FIFO)।' },
    safety: [
      { en: 'Cool cooked food quickly and refrigerate within about two hours.', hi: 'पका भोजन जल्दी ठंडा कर लगभग दो घंटे में रेफ्रिजरेट करें।' },
      { en: 'Keep storerooms dry, covered and free of pests.', hi: 'भंडार सूखा, ढका व कीट-मुक्त रखें।' },
    ],
    applications: [
      { en: 'Cold rooms and dry stores', hi: 'कोल्ड रूम व सूखे भंडार' },
      { en: 'Receiving and stores control', hi: 'प्राप्ति व भंडार नियंत्रण' },
      { en: 'Any kitchen handling fresh food', hi: 'ताज़ा भोजन संभालती कोई रसोई' },
    ],
  },

  /* 9 — Methods of Cooking */
  {
    id: 9, section: S.cooking, themeKey: 'cooking', simId: 'cookingMethods',
    title: { en: 'Methods of Cooking', hi: 'पाक विधियाँ' },
    desc: { en: 'Why we cook food and the main moist-heat, dry-heat and fat-based methods.', hi: 'हम भोजन क्यों पकाते हैं और मुख्य नम-ऊष्मा, शुष्क-ऊष्मा व वसा विधियां।' },
    objectives: [
      { en: 'State why food is cooked', hi: 'बताएं कि भोजन क्यों पकाया जाता है' },
      { en: 'Classify cooking methods as moist, dry or fat-based', hi: 'पाक विधियां नम, शुष्क या वसा अनुसार वर्गीकृत करें' },
      { en: 'Choose a suitable method for a given dish', hi: 'दिए व्यंजन हेतु उपयुक्त विधि चुनें' },
    ],
    keyTopics: [
      { en: 'Aims of cooking food', hi: 'भोजन पकाने के उद्देश्य' },
      { en: 'Moist heat: boil, steam, poach, stew', hi: 'नम ऊष्मा: उबालना, भाप, पोच, स्ट्यू' },
      { en: 'Dry heat: bake, roast, grill', hi: 'शुष्क ऊष्मा: बेक, रोस्ट, ग्रिल' },
      { en: 'Fat-based: fry, sauté, deep-fry', hi: 'वसा आधारित: तलना, सॉते, डीप-फ्राई' },
    ],
    theory: {
      en: 'We cook food to make it safe to eat, easier to digest, tastier and more pleasing in colour and smell. Cooking kills harmful germs and softens tough foods.\n\nCooking methods are grouped by how heat reaches the food. Moist-heat methods use water or steam — boiling, steaming, poaching and stewing — and suit rice, vegetables and tougher cuts. Dry-heat methods use hot air or direct heat — baking, roasting and grilling — and give browning and crisp surfaces. Fat-based methods use oil — shallow frying, sautéing and deep frying — and give a rich, crisp result.\n\nThe right method depends on the food: delicate fish is poached or steamed, bread is baked, and potatoes can be boiled, roasted or fried. Choosing well keeps food tasty and nutritious.',
      hi: 'हम भोजन सुरक्षित, पचने योग्य, स्वादिष्ट व रंग-गंध में सुखद बनाने हेतु पकाते हैं। पकाना हानिकारक कीटाणु मारता व कठोर भोजन नरम करता है।\n\nविधियां ऊष्मा के भोजन तक पहुंचने अनुसार समूहित: नम-ऊष्मा पानी या भाप — उबालना, भाप, पोच, स्ट्यू — चावल, सब्ज़ी हेतु। शुष्क-ऊष्मा गर्म हवा — बेक, रोस्ट, ग्रिल — ब्राउनिंग देती। वसा आधारित तेल — तलना, सॉते, डीप-फ्राई — कुरकुरा परिणाम।\n\nसही विधि भोजन पर निर्भर: नाज़ुक मछली पोच, ब्रेड बेक, आलू उबाल, रोस्ट या तल सकते हैं।',
    },
    terminology: [
      { term: { en: 'Moist-heat cooking', hi: 'नम-ऊष्मा पाक' }, def: { en: 'Cooking in water or steam (boil, steam, poach)', hi: 'पानी या भाप में पकाना' } },
      { term: { en: 'Dry-heat cooking', hi: 'शुष्क-ऊष्मा पाक' }, def: { en: 'Cooking with hot air or direct heat (bake, roast, grill)', hi: 'गर्म हवा या सीधी ऊष्मा से पकाना' } },
      { term: { en: 'Sauté', hi: 'सॉते' }, def: { en: 'Quick frying in a little hot fat', hi: 'थोड़े गर्म वसा में तेज़ तलना' } },
      { term: { en: 'Poach', hi: 'पोच' }, def: { en: 'Cooking gently in water just below boiling', hi: 'उबाल से ठीक नीचे पानी में धीरे पकाना' } },
    ],
    practice: [
      { en: 'Sort ten dishes by the cooking method used.', hi: 'दस व्यंजन प्रयुक्त पाक विधि अनुसार छांटें।' },
      { en: 'For each method, write one food it suits best.', hi: 'प्रत्येक विधि हेतु एक सबसे उपयुक्त भोजन लिखें।' },
      { en: 'Explain what changes in food when it is cooked.', hi: 'समझाएं कि पकने पर भोजन में क्या बदलता है।' },
    ],
    mcqs: [
      { q: { en: 'Which is a moist-heat cooking method?', hi: 'कौन नम-ऊष्मा विधि है?' },
        options: [{ en: 'Grilling', hi: 'ग्रिलिंग' }, { en: 'Steaming', hi: 'भाप' }, { en: 'Roasting', hi: 'रोस्टिंग' }],
        correct: 1, explanation: { en: 'Steaming uses water vapour, so it is a moist-heat method.', hi: 'भाप जलवाष्प उपयोग करती है, इसलिए नम-ऊष्मा विधि।' } },
      { q: { en: 'A main reason we cook food is to:', hi: 'भोजन पकाने का मुख्य कारण:' },
        options: [{ en: 'Make it safe and easier to digest', hi: 'सुरक्षित व पचने योग्य बनाना' }, { en: 'Make it colder', hi: 'ठंडा बनाना' }, { en: 'Use more fuel', hi: 'अधिक ईंधन उपयोग' }],
        correct: 0, explanation: { en: 'Cooking kills germs and makes food safe, tasty and digestible.', hi: 'पकाना कीटाणु मारता व भोजन सुरक्षित, स्वादिष्ट व पाच्य बनाता है।' } },
    ],
    apply: [
      { en: 'You must cook a delicate fish so it does not break apart. Which method suits it and why?', hi: 'नाज़ुक मछली ऐसे पकानी है कि टूटे नहीं। कौन सी विधि व क्यों?' },
      { en: 'Potatoes can be boiled, roasted or fried. Describe how the result differs for each.', hi: 'आलू उबाल, रोस्ट या तल सकते हैं। प्रत्येक का परिणाम कैसे भिन्न?' },
    ],
    review: { en: 'We cook food to make it safe, digestible and tasty. Methods are grouped as moist-heat (boil, steam, poach, stew), dry-heat (bake, roast, grill) and fat-based (fry, sauté, deep-fry). Matching the method to the food keeps it nutritious and delicious.', hi: 'हम भोजन सुरक्षित, पाच्य व स्वादिष्ट बनाने हेतु पकाते हैं। विधियां: नम-ऊष्मा (उबाल, भाप, पोच, स्ट्यू), शुष्क-ऊष्मा (बेक, रोस्ट, ग्रिल) व वसा (तलना, सॉते, डीप-फ्राई)। विधि भोजन से मिलाना पोषक व स्वादिष्ट रखता है।' },
    safety: [
      { en: 'Keep pan handles turned inward and lower food gently to avoid hot splashes.', hi: 'पैन हैंडल अंदर रखें व भोजन धीरे डालें ताकि गर्म छींटे न उड़ें।' },
      { en: 'Make sure food is cooked right through, especially meat, chicken and eggs.', hi: 'सुनिश्चित करें भोजन पूरा पके, विशेषकर मांस, चिकन व अंडे।' },
    ],
    applications: [
      { en: 'Hot kitchen / range section', hi: 'गर्म रसोई / रेंज अनुभाग' },
      { en: 'Home and street cooking', hi: 'घरेलू व स्ट्रीट पाक' },
      { en: 'All à la carte and bulk cooking', hi: 'सभी आ ला कार्ते व थोक पाक' },
    ],
  },

  /* 10 — Bakery & Baking Equipment */
  {
    id: 10, section: S.cooking, themeKey: 'bakery', simId: 'bakery',
    title: { en: 'Bakery & Baking', hi: 'बेकरी एवं बेकिंग' },
    desc: { en: 'The bakery section, its tools, and baking different products at the right heat.', hi: 'बेकरी अनुभाग, उसके औज़ार, व विभिन्न उत्पाद सही आंच पर बेक करना।' },
    objectives: [
      { en: 'Describe the bakery section and its basic tools', hi: 'बेकरी अनुभाग व उसके मूल औज़ार बताएं' },
      { en: 'Explain that baking is a precise, measured process', hi: 'समझाएं कि बेकिंग सटीक, मापा प्रक्रिया है' },
      { en: 'Match baked products to the correct oven temperature', hi: 'बेक उत्पादों को सही ओवन तापमान से मिलाएं' },
    ],
    keyTopics: [
      { en: 'The bakery and pastry section', hi: 'बेकरी व पेस्ट्री अनुभाग' },
      { en: 'Bakery tools: scale, rolling pin, piping bag, moulds', hi: 'बेकरी औज़ार: तराज़ू, बेलन, पाइपिंग बैग, सांचे' },
      { en: 'Baking is weighing by exact amounts', hi: 'बेकिंग सटीक मात्रा में तौलना है' },
      { en: 'Oven temperatures for cakes, bread and pastry', hi: 'केक, ब्रेड व पेस्ट्री हेतु ओवन तापमान' },
    ],
    theory: {
      en: 'The bakery and pastry section makes bread, cakes, biscuits and desserts. Unlike everyday cooking, baking is a precise science: ingredients must be weighed exactly and the oven set to the right temperature, or the product fails.\n\nBakery tools include the weighing scale (the baker’s most important tool), rolling pin, pastry brush, piping bag, dough scraper, moulds and baking tins, and the oven itself. Because the amounts are fixed, bakers weigh rather than guess.\n\nDifferent products need different oven heat. Delicate sponge cakes bake at a low heat (around 160°C) so they stay soft; cookies bake at a moderate heat (around 180°C); bread needs a hot oven (around 210–220°C) to rise with a crisp crust; and puff pastry needs a very hot oven (around 230°C) so its butter layers steam and puff up. Choosing the right heat is the difference between golden and burnt.',
      hi: 'बेकरी व पेस्ट्री अनुभाग ब्रेड, केक, बिस्कुट व मिठाई बनाता है। रोज़ के पाक से अलग, बेकिंग सटीक विज्ञान है: सामग्री ठीक तौलें व ओवन सही तापमान पर, वरना उत्पाद बिगड़ता है।\n\nबेकरी औज़ार: तराज़ू (बेकर का सबसे महत्वपूर्ण औज़ार), बेलन, पेस्ट्री ब्रश, पाइपिंग बैग, डो स्क्रैपर, सांचे व बेकिंग टिन, व ओवन। मात्रा निश्चित होने से बेकर अनुमान नहीं, तौलते हैं।\n\nविभिन्न उत्पाद भिन्न आंच चाहते हैं। नाज़ुक स्पंज केक कम आंच (160°C); कुकीज़ मध्यम (180°C); ब्रेड गर्म ओवन (210–220°C); पफ पेस्ट्री बहुत गर्म (230°C)। सही आंच ही सुनहरे व जले का अंतर है।',
    },
    terminology: [
      { term: { en: 'Bakery', hi: 'बेकरी' }, def: { en: 'The section that makes bread, cakes and desserts', hi: 'ब्रेड, केक व मिठाई बनाता अनुभाग' } },
      { term: { en: 'Weighing scale', hi: 'तराज़ू' }, def: { en: 'The tool bakers use to measure exact amounts', hi: 'सटीक मात्रा मापने का बेकर औज़ार' } },
      { term: { en: 'Piping bag', hi: 'पाइपिंग बैग' }, def: { en: 'A cone used to pipe cream or icing in shapes', hi: 'क्रीम या आइसिंग आकार में निकालने का कोन' } },
      { term: { en: 'Oven temperature', hi: 'ओवन तापमान' }, def: { en: 'The set heat at which a product is baked', hi: 'निर्धारित आंच जिस पर उत्पाद बेक होता है' } },
    ],
    practice: [
      { en: 'Match each bakery tool to the job it does.', hi: 'प्रत्येक बेकरी औज़ार को उसके काम से मिलाएं।' },
      { en: 'Decide the right oven temperature for cake, bread and pastry.', hi: 'केक, ब्रेड व पेस्ट्री हेतु सही ओवन तापमान तय करें।' },
      { en: 'Explain why a baker weighs ingredients instead of guessing.', hi: 'समझाएं कि बेकर अनुमान के बजाय सामग्री क्यों तौलता है।' },
    ],
    mcqs: [
      { q: { en: 'Why is baking called a precise science?', hi: 'बेकिंग को सटीक विज्ञान क्यों कहते हैं?' },
        options: [{ en: 'Ingredients must be weighed exactly', hi: 'सामग्री ठीक तौलनी होती है' }, { en: 'It is done in the dark', hi: 'अंधेरे में होती है' }, { en: 'It needs no oven', hi: 'ओवन नहीं चाहिए' }],
        correct: 0, explanation: { en: 'Exact amounts and temperature decide whether a bake succeeds.', hi: 'सटीक मात्रा व तापमान तय करते हैं बेक सफल होगा या नहीं।' } },
      { q: { en: 'Which product needs the hottest oven?', hi: 'किस उत्पाद को सबसे गर्म ओवन चाहिए?' },
        options: [{ en: 'Sponge cake', hi: 'स्पंज केक' }, { en: 'Puff pastry', hi: 'पफ पेस्ट्री' }, { en: 'Custard', hi: 'कस्टर्ड' }],
        correct: 1, explanation: { en: 'Puff pastry needs a very hot oven so its butter layers steam and puff.', hi: 'पफ पेस्ट्री को बहुत गर्म ओवन चाहिए ताकि मक्खन परतें भाप बनें व फूलें।' } },
    ],
    apply: [
      { en: 'A sponge cake comes out dark and dry. What might have gone wrong with the oven setting?', hi: 'स्पंज केक गहरा व सूखा निकलता है। ओवन सेटिंग में क्या गलत हुआ?' },
      { en: 'A baker has no scale, only a cup. Why is this a problem for a cake recipe?', hi: 'बेकर के पास तराज़ू नहीं, केवल कप है। केक रेसिपी हेतु यह समस्या क्यों?' },
    ],
    review: { en: 'The bakery makes bread, cakes and desserts, and baking is a precise, measured science. Bakers weigh with a scale and set the oven to the right heat — low for delicate cakes, moderate for cookies, hot for bread and very hot for pastry. The right temperature is the difference between golden and burnt.', hi: 'बेकरी ब्रेड, केक व मिठाई बनाती है, व बेकिंग सटीक, मापा विज्ञान है। बेकर तराज़ू से तौलते व ओवन सही आंच पर रखते हैं — नाज़ुक केक कम, कुकीज़ मध्यम, ब्रेड गर्म, पेस्ट्री बहुत गर्म। सही तापमान ही सुनहरे व जले का अंतर है।' },
    safety: [
      { en: 'Always use dry oven gloves to handle hot trays and tins.', hi: 'गर्म ट्रे व टिन हेतु हमेशा सूखे ओवन दस्ताने उपयोग करें।' },
      { en: 'Open a hot oven door slowly, standing back from the escaping steam.', hi: 'गर्म ओवन दरवाज़ा धीरे खोलें, भाप से पीछे हटकर खड़े रहें।' },
    ],
    applications: [
      { en: 'Bakeries and patisseries', hi: 'बेकरी व पेटिसरी' },
      { en: 'Hotel pastry sections', hi: 'होटल पेस्ट्री अनुभाग' },
      { en: 'Cake and biscuit units', hi: 'केक व बिस्कुट इकाइयां' },
    ],
  },

  /* 11 — Dough & Batter Preparation */
  {
    id: 11, section: S.cooking, themeKey: 'dough', simId: 'doughPrep',
    title: { en: 'Dough & Batter Preparation', hi: 'आटा एवं घोल तैयारी' },
    desc: { en: 'Making bread dough step by step, kneading, and proving it for the right time.', hi: 'चरणबद्ध ब्रेड आटा बनाना, गूंधना, व सही समय तक प्रूव करना।' },
    objectives: [
      { en: 'List the ingredients of a basic bread dough', hi: 'मूल ब्रेड आटे की सामग्री बताएं' },
      { en: 'Prepare dough in the correct order of steps', hi: 'आटा सही चरण क्रम में तैयार करें' },
      { en: 'Explain kneading and proving and why they matter', hi: 'गूंधना व प्रूविंग व उनका महत्व समझाएं' },
    ],
    keyTopics: [
      { en: 'Ingredients: flour, water, yeast, salt, sugar', hi: 'सामग्री: आटा, पानी, यीस्ट, नमक, चीनी' },
      { en: 'Steps of making dough', hi: 'आटा बनाने के चरण' },
      { en: 'Kneading to develop gluten', hi: 'ग्लूटेन विकास हेतु गूंधना' },
      { en: 'Proving (rising) the dough', hi: 'आटा प्रूविंग (फुलाना)' },
    ],
    theory: {
      en: 'Bread begins as a simple dough of flour, water, yeast, salt and a little sugar. The order of work matters.\n\nFirst sieve the flour to remove lumps and add air. Mix in the yeast, salt and sugar. Add water and bring it together into a rough dough. Then knead it — pushing and folding — until it becomes smooth and elastic; kneading develops gluten, the stretchy network that traps gas and lets bread rise.\n\nNext comes proving: the dough is left in a warm place so the yeast makes carbon-dioxide gas and the dough roughly doubles in size, usually in about an hour. Too little proving gives dense, heavy bread; too much proving over-stretches the dough so it collapses in the oven. When it has doubled and springs back slowly, it is knocked back, shaped and baked. A thinner mixture, like for pancakes, is called a batter and is poured, not kneaded.',
      hi: 'ब्रेड आटा, पानी, यीस्ट, नमक व थोड़ी चीनी के सरल आटे से शुरू होती है। कार्य का क्रम महत्वपूर्ण है।\n\nपहले आटा छानें ताकि गांठें हटें व हवा मिले। यीस्ट, नमक व चीनी मिलाएं। पानी डालकर आटा बनाएं। फिर गूंधें — दबाना व मोड़ना — जब तक चिकना व लचीला न हो; गूंधना ग्लूटेन विकसित करता है जो गैस रोककर ब्रेड फुलाता है।\n\nफिर प्रूविंग: आटा गर्म स्थान पर छोड़ें ताकि यीस्ट CO₂ गैस बनाए व आटा लगभग दोगुना हो, आमतौर पर एक घंटे में। कम प्रूविंग घनी भारी ब्रेड; अधिक प्रूविंग आटा बैठा देती है। पतला मिश्रण, जैसे पैनकेक हेतु, घोल कहलाता है व डाला जाता, गूंधा नहीं।',
    },
    terminology: [
      { term: { en: 'Dough', hi: 'आटा' }, def: { en: 'A thick mix of flour and liquid that is kneaded', hi: 'आटे व तरल का गाढ़ा मिश्रण जो गूंधा जाता है' } },
      { term: { en: 'Kneading', hi: 'गूंधना' }, def: { en: 'Working dough until smooth to develop gluten', hi: 'ग्लूटेन विकास हेतु आटा चिकना होने तक गूंधना' } },
      { term: { en: 'Proving', hi: 'प्रूविंग' }, def: { en: 'Letting dough rest and rise before baking', hi: 'बेकिंग से पहले आटे को फूलने देना' } },
      { term: { en: 'Batter', hi: 'घोल' }, def: { en: 'A thin pourable mix, as for pancakes or dosa', hi: 'पतला डालने योग्य मिश्रण, जैसे पैनकेक या दोसा' } },
    ],
    practice: [
      { en: 'Put the dough-making steps in the correct order.', hi: 'आटा बनाने के चरण सही क्रम में रखें।' },
      { en: 'Describe what properly kneaded dough looks and feels like.', hi: 'ठीक गूंधा आटा कैसा दिखता व महसूस होता है बताएं।' },
      { en: 'Explain what happens if dough is proved too little or too long.', hi: 'समझाएं कि आटा कम या अधिक प्रूव हो तो क्या होता है।' },
    ],
    mcqs: [
      { q: { en: 'What does kneading develop in dough?', hi: 'गूंधना आटे में क्या विकसित करता है?' },
        options: [{ en: 'Gluten', hi: 'ग्लूटेन' }, { en: 'Sugar', hi: 'चीनी' }, { en: 'Salt', hi: 'नमक' }],
        correct: 0, explanation: { en: 'Kneading builds gluten, which traps gas so bread can rise.', hi: 'गूंधना ग्लूटेन बनाता है जो गैस रोककर ब्रेड फुलाता है।' } },
      { q: { en: 'What happens if dough is over-proved?', hi: 'आटा अधिक प्रूव हो तो क्या होता है?' },
        options: [{ en: 'It rises perfectly', hi: 'पूरी तरह फूलता है' }, { en: 'It over-stretches and collapses in the oven', hi: 'अधिक खिंचकर ओवन में बैठ जाता है' }, { en: 'It turns to batter', hi: 'घोल बन जाता है' }],
        correct: 1, explanation: { en: 'Too long and the stretched dough collapses; too little and it stays dense.', hi: 'अधिक लंबा खिंचा आटा बैठता; कम में घना रहता है।' } },
    ],
    apply: [
      { en: 'A loaf comes out small, dense and heavy. Which step was probably cut short?', hi: 'ब्रेड छोटी, घनी व भारी निकलती है। कौन सा चरण संभवतः छोटा रहा?' },
      { en: 'You need a mixture for dosa and one for bread. Which is a batter and which a dough, and how do they differ?', hi: 'आपको दोसा व ब्रेड हेतु मिश्रण चाहिए। कौन घोल व कौन आटा, व कैसे भिन्न?' },
    ],
    review: { en: 'Bread dough is made in order — sieve flour, add yeast/salt/sugar, mix in water, then knead to a smooth, elastic dough that develops gluten. Proving lets yeast raise the dough until doubled; too little leaves it dense, too much makes it collapse. A thin pourable mix is a batter, not a dough.', hi: 'ब्रेड आटा क्रम में बनता है — आटा छानें, यीस्ट/नमक/चीनी मिलाएं, पानी डालें, फिर चिकना लचीला गूंधें जो ग्लूटेन बनाए। प्रूविंग आटा दोगुना फुलाती है; कम में घना, अधिक में बैठता है। पतला मिश्रण घोल है, आटा नहीं।' },
    safety: [
      { en: 'Keep the work surface and hands clean and floured when handling dough.', hi: 'आटा संभालते समय सतह व हाथ साफ व आटा-लगे रखें।' },
      { en: 'Prove dough covered, in a clean warm place, away from contamination.', hi: 'आटा ढककर, साफ गर्म स्थान पर, संदूषण से दूर प्रूव करें।' },
    ],
    applications: [
      { en: 'Bread and bun production', hi: 'ब्रेड व बन उत्पादन' },
      { en: 'Indian breads and batters (dosa, idli)', hi: 'भारतीय ब्रेड व घोल (दोसा, इडली)' },
      { en: 'Pizza and pastry bases', hi: 'पिज़्ज़ा व पेस्ट्री बेस' },
    ],
  },

  /* 12 — Kitchen Safety, First-Aid & Firefighting */
  {
    id: 12, section: S.service, themeKey: 'firstaid', simId: 'kitchenSafety',
    title: { en: 'Kitchen Safety, First-Aid & Firefighting', hi: 'रसोई सुरक्षा, प्राथमिक उपचार एवं अग्निशमन' },
    desc: { en: 'Preventing accidents and responding correctly to cuts, burns, slips and fires.', hi: 'दुर्घटना रोकना और कट, जलन, फिसलन व आग का सही जवाब देना।' },
    objectives: [
      { en: 'Identify common kitchen hazards and prevent them', hi: 'सामान्य रसोई खतरे पहचानें व रोकें' },
      { en: 'Give correct first-aid for cuts and burns', hi: 'कट व जलन हेतु सही प्राथमिक उपचार दें' },
      { en: 'Choose the right way to put out a kitchen fire', hi: 'रसोई आग बुझाने का सही तरीका चुनें' },
    ],
    keyTopics: [
      { en: 'Common hazards: cuts, burns, slips, fire', hi: 'सामान्य खतरे: कट, जलन, फिसलन, आग' },
      { en: 'First-aid for cuts and burns', hi: 'कट व जलन हेतु प्राथमिक उपचार' },
      { en: 'Oil fires vs electrical fires', hi: 'तेल आग बनाम बिजली आग' },
      { en: 'Fire blanket and extinguishers', hi: 'फायर ब्लैंकेट व एक्सटिंग्विशर' },
    ],
    theory: {
      en: 'Kitchens are full of heat, sharp tools and wet floors, so accidents must be prevented and handled correctly.\n\nFor a cut, wash it, press with a clean cloth to stop bleeding, and cover it with a blue waterproof plaster. For a burn or scald, cool it under clean running water for at least ten minutes — never put butter on a burn or burst a blister. For a spill, clean it at once and put up a wet-floor sign, because slips are the most common kitchen injury.\n\nFires need the right response. A pan of burning oil must be smothered with a lid or fire blanket to cut off air — never water, which makes burning oil explode upward. An electrical fire, such as a sparking toaster, means switch off the power first, then use a CO₂ or dry-powder extinguisher — never water, which conducts electricity. Knowing the right first action keeps a small accident from becoming a serious injury.',
      hi: 'रसोई गर्मी, तेज़ औज़ार व गीले फर्श से भरी है, इसलिए दुर्घटनाएं रोकनी व सही संभालनी चाहिए।\n\nकट हेतु धोएं, साफ कपड़े से दबाकर खून रोकें, नीले जलरोधी प्लास्टर से ढकें। जलन हेतु साफ बहते पानी में कम से कम दस मिनट ठंडा करें — मक्खन कभी न लगाएं, छाला न फोड़ें। गिरने पर तुरंत साफ करें व गीला-फर्श चिन्ह लगाएं।\n\nआग को सही जवाब चाहिए। जलते तेल का पैन ढक्कन या फायर ब्लैंकेट से ढकें — पानी कभी नहीं, जो तेल भड़काता है। बिजली आग में पहले बिजली बंद करें, फिर CO₂ या ड्राई-पाउडर — पानी कभी नहीं, जो बिजली प्रवाहित करता है।',
    },
    terminology: [
      { term: { en: 'Hazard', hi: 'खतरा' }, def: { en: 'Anything that can cause harm or injury', hi: 'कुछ भी जो हानि या चोट पहुंचा सके' } },
      { term: { en: 'First-aid', hi: 'प्राथमिक उपचार' }, def: { en: 'The first help given to an injured person', hi: 'घायल को दी पहली मदद' } },
      { term: { en: 'Fire blanket', hi: 'फायर ब्लैंकेट' }, def: { en: 'A cloth used to smother a small fire', hi: 'छोटी आग ढकने का कपड़ा' } },
      { term: { en: 'Scald', hi: 'झुलसना' }, def: { en: 'A burn caused by hot liquid or steam', hi: 'गर्म तरल या भाप से जलन' } },
    ],
    practice: [
      { en: 'Match each injury (cut, burn, slip) to its correct first-aid.', hi: 'प्रत्येक चोट (कट, जलन, फिसलन) को सही प्राथमिक उपचार से मिलाएं।' },
      { en: 'Decide how to put out an oil fire and an electrical fire.', hi: 'तेल आग व बिजली आग बुझाने का तरीका तय करें।' },
      { en: 'Point out five hazards in a picture of a messy kitchen.', hi: 'अव्यवस्थित रसोई चित्र में पांच खतरे बताएं।' },
    ],
    mcqs: [
      { q: { en: 'How do you put out a pan of burning oil?', hi: 'जलते तेल का पैन कैसे बुझाएं?' },
        options: [{ en: 'Throw water on it', hi: 'पानी डालें' }, { en: 'Cover it with a lid or fire blanket', hi: 'ढक्कन या फायर ब्लैंकेट से ढकें' }, { en: 'Fan it with a cloth', hi: 'कपड़े से हवा करें' }],
        correct: 1, explanation: { en: 'Smother it to remove air. Water makes burning oil explode upward.', hi: 'हवा हटाने हेतु ढकें। पानी जलते तेल को भड़काता है।' } },
      { q: { en: 'First-aid for a burn is to:', hi: 'जलन का प्राथमिक उपचार:' },
        options: [{ en: 'Rub butter on it', hi: 'मक्खन लगाएं' }, { en: 'Cool it under running water for 10+ minutes', hi: '10+ मिनट बहते पानी में ठंडा करें' }, { en: 'Cover it with flour', hi: 'आटा डालें' }],
        correct: 1, explanation: { en: 'Cool a burn with running water; never use butter or burst blisters.', hi: 'जले को बहते पानी से ठंडा करें; मक्खन व छाले न फोड़ें।' } },
    ],
    apply: [
      { en: 'A toaster starts to spark and smoke. List your actions in the correct order.', hi: 'टोस्टर चिंगारी व धुआं छोड़ने लगता है। अपनी क्रियाएं सही क्रम में लिखें।' },
      { en: 'A colleague slips on a wet floor. What should have been done to prevent it?', hi: 'सहकर्मी गीले फर्श पर फिसलता है। इसे रोकने हेतु क्या करना था?' },
    ],
    review: { en: 'Prevent accidents, and know the right first action. Cuts are washed, pressed and covered with a blue plaster; burns are cooled under running water; spills are cleaned at once with a warning sign. Smother an oil fire with a lid — never water; for an electrical fire, cut the power and use a CO₂ extinguisher — never water.', hi: 'दुर्घटनाएं रोकें व सही पहली क्रिया जानें। कट धोएं, दबाएं व नीले प्लास्टर से ढकें; जलन बहते पानी से ठंडा करें; गिरा हुआ तुरंत साफ करें। तेल आग ढक्कन से ढकें — पानी नहीं; बिजली आग में बिजली बंद कर CO₂ उपयोग करें।' },
    safety: [
      { en: 'Know where the fire blanket, extinguisher and first-aid box are kept.', hi: 'जानें फायर ब्लैंकेट, एक्सटिंग्विशर व प्राथमिक उपचार बॉक्स कहां हैं।' },
      { en: 'Never use water on oil or electrical fires.', hi: 'तेल या बिजली आग पर कभी पानी न डालें।' },
    ],
    applications: [
      { en: 'Every kitchen, by safety law', hi: 'हर रसोई, सुरक्षा कानून अनुसार' },
      { en: 'Catering and outdoor cooking', hi: 'कैटरिंग व बाहरी पाक' },
      { en: 'Food safety and HACCP teams', hi: 'खाद्य सुरक्षा व HACCP टीम' },
    ],
  },

  /* 13 — Food Safety & Cross-Contamination */
  {
    id: 13, section: S.service, themeKey: 'safety', simId: 'foodSafety',
    title: { en: 'Food Safety & Cross-Contamination', hi: 'खाद्य सुरक्षा एवं क्रॉस-संदूषण' },
    desc: { en: 'Spotting hygiene hazards and stopping germs from spreading between foods.', hi: 'स्वच्छता खतरे पहचानना व भोजन के बीच कीटाणु फैलना रोकना।' },
    objectives: [
      { en: 'Identify hygiene and safety hazards in a kitchen', hi: 'रसोई में स्वच्छता व सुरक्षा खतरे पहचानें' },
      { en: 'Explain how cross-contamination happens', hi: 'समझाएं क्रॉस-संदूषण कैसे होता है' },
      { en: 'Use colour-coded boards to keep foods separate', hi: 'भोजन अलग रखने हेतु रंग-कोडित बोर्ड उपयोग करें' },
    ],
    keyTopics: [
      { en: 'Types of hazard: biological, chemical, physical', hi: 'खतरे के प्रकार: जैविक, रासायनिक, भौतिक' },
      { en: 'Cross-contamination routes', hi: 'क्रॉस-संदूषण के रास्ते' },
      { en: 'Colour-coded chopping boards', hi: 'रंग-कोडित चॉपिंग बोर्ड' },
      { en: 'Keeping raw and ready-to-eat apart', hi: 'कच्चा व तैयार अलग रखना' },
    ],
    theory: {
      en: 'Food safety means keeping food free from anything that could make a guest ill. Hazards come in three kinds: biological (germs from raw meat, dirty hands), chemical (cleaning liquids near food) and physical (hair, glass, a loose plaster).\n\nThe biggest everyday risk is cross-contamination — germs moving from one food to another, usually from raw food to ready-to-eat food. This happens through dirty hands, the same knife or board used for raw and cooked food, raw meat dripping onto salad, or a dirty cloth wiped across surfaces.\n\nTo stop it, keep raw and ready-to-eat foods apart, wash hands and equipment between tasks, store raw meat below other food, and use colour-coded chopping boards — for example red for raw meat and green for salad and fruit — so the same board is never used for both. A clean, well-organised kitchen is a safe one.',
      hi: 'खाद्य सुरक्षा यानी भोजन को ऐसी किसी चीज़ से मुक्त रखना जो अतिथि को बीमार करे। खतरे तीन तरह के: जैविक (कच्चे मांस, गंदे हाथ से कीटाणु), रासायनिक (भोजन पास सफाई तरल) व भौतिक (बाल, कांच, ढीला प्लास्टर)।\n\nसबसे बड़ा दैनिक जोखिम क्रॉस-संदूषण है — कीटाणु एक भोजन से दूसरे में जाना, आमतौर पर कच्चे से तैयार भोजन में। यह गंदे हाथ, कच्चे व पके हेतु एक ही चाकू/बोर्ड, कच्चे मांस का सलाद पर टपकना, या गंदे कपड़े से होता है।\n\nरोकने हेतु कच्चा व तैयार अलग रखें, कार्यों के बीच हाथ व उपकरण धोएं, कच्चा मांस नीचे रखें, व रंग-कोडित बोर्ड उपयोग करें — जैसे कच्चे मांस हेतु लाल व सलाद हेतु हरा।',
    },
    terminology: [
      { term: { en: 'Food safety', hi: 'खाद्य सुरक्षा' }, def: { en: 'Keeping food free from harm so it is safe to eat', hi: 'भोजन को हानि से मुक्त रखना ताकि सुरक्षित हो' } },
      { term: { en: 'Cross-contamination', hi: 'क्रॉस-संदूषण' }, def: { en: 'Germs passing from one food to another', hi: 'एक भोजन से दूसरे में कीटाणु जाना' } },
      { term: { en: 'Colour-coded boards', hi: 'रंग-कोडित बोर्ड' }, def: { en: 'Different coloured boards for different food types', hi: 'विभिन्न भोजन हेतु अलग रंग के बोर्ड' } },
      { term: { en: 'Ready-to-eat', hi: 'तैयार भोजन' }, def: { en: 'Food that will not be cooked again before eating', hi: 'भोजन जो खाने से पहले दोबारा नहीं पकेगा' } },
    ],
    practice: [
      { en: 'Inspect a kitchen scene and tap every hygiene hazard you find.', hi: 'रसोई दृश्य जांचें व हर स्वच्छता खतरा टैप करें।' },
      { en: 'Match each colour-coded board to its correct food.', hi: 'प्रत्येक रंग-कोडित बोर्ड को सही भोजन से मिलाएं।' },
      { en: 'List four ways cross-contamination can happen and how to stop each.', hi: 'क्रॉस-संदूषण के चार तरीके व प्रत्येक रोकना लिखें।' },
    ],
    mcqs: [
      { q: { en: 'Which colour board is used for raw meat?', hi: 'कच्चे मांस हेतु कौन सा रंग बोर्ड?' },
        options: [{ en: 'Green', hi: 'हरा' }, { en: 'Red', hi: 'लाल' }, { en: 'Blue', hi: 'नीला' }],
        correct: 1, explanation: { en: 'Red is for raw meat; green is for salad and fruit.', hi: 'लाल कच्चे मांस हेतु; हरा सलाद व फल हेतु।' } },
      { q: { en: 'Cross-contamination usually spreads germs from:', hi: 'क्रॉस-संदूषण आमतौर पर कीटाणु फैलाता है:' },
        options: [{ en: 'Ready-to-eat food to raw food', hi: 'तैयार भोजन से कच्चे में' }, { en: 'Raw food to ready-to-eat food', hi: 'कच्चे भोजन से तैयार में' }, { en: 'Plates to the floor', hi: 'थाली से फर्श पर' }],
        correct: 1, explanation: { en: 'Germs from raw food reach food that will not be cooked again.', hi: 'कच्चे भोजन से कीटाणु उस भोजन तक जो दोबारा नहीं पकेगा।' } },
    ],
    apply: [
      { en: 'A cook cuts raw chicken, then slices salad on the same board without washing it. What is the risk and the fix?', hi: 'रसोइया कच्चा चिकन काटकर उसी बोर्ड पर बिना धोए सलाद काटता है। जोखिम व समाधान?' },
      { en: 'Name three things you would check first when inspecting a kitchen for food safety.', hi: 'खाद्य सुरक्षा हेतु रसोई जांचते समय पहले जांचने वाली तीन चीज़ें बताएं।' },
    ],
    review: { en: 'Food safety keeps food free of biological, chemical and physical hazards. The main daily danger is cross-contamination — germs moving from raw to ready-to-eat food. Stop it by separating raw and cooked foods, washing hands and tools between tasks, storing raw meat low, and using colour-coded boards.', hi: 'खाद्य सुरक्षा भोजन को जैविक, रासायनिक व भौतिक खतरों से मुक्त रखती है। मुख्य दैनिक खतरा क्रॉस-संदूषण है — कच्चे से तैयार भोजन में कीटाणु। कच्चा व पका अलग रखकर, कार्यों के बीच हाथ व औज़ार धोकर, कच्चा मांस नीचे रखकर व रंग-कोडित बोर्ड से रोकें।' },
    safety: [
      { en: 'Never let raw meat or its juices touch ready-to-eat food.', hi: 'कच्चा मांस या उसका रस तैयार भोजन को कभी न छुए।' },
      { en: 'Clean and sanitise boards and knives between different foods.', hi: 'विभिन्न भोजन के बीच बोर्ड व चाकू साफ व सैनिटाइज़ करें।' },
    ],
    applications: [
      { en: 'All food businesses (FSSAI rules)', hi: 'सभी खाद्य व्यवसाय (FSSAI नियम)' },
      { en: 'HACCP and food audits', hi: 'HACCP व खाद्य ऑडिट' },
      { en: 'Catering and street food', hi: 'कैटरिंग व स्ट्रीट फूड' },
    ],
  },

  /* 14 — Food Presentation & Plating */
  {
    id: 14, section: S.service, themeKey: 'plating', simId: 'plating',
    title: { en: 'Food Presentation & Plating', hi: 'खाद्य प्रस्तुति एवं प्लेटिंग' },
    desc: { en: 'Arranging food on the plate using balance, colour and the clock method.', hi: 'संतुलन, रंग व क्लॉक विधि से थाली पर भोजन सजाना।' },
    objectives: [
      { en: 'Explain why presentation matters', hi: 'समझाएं प्रस्तुति क्यों मायने रखती है' },
      { en: 'Use balance, colour and height on a plate', hi: 'थाली पर संतुलन, रंग व ऊंचाई उपयोग करें' },
      { en: 'Arrange a plate using the clock method', hi: 'क्लॉक विधि से थाली सजाएं' },
    ],
    keyTopics: [
      { en: 'Why presentation matters', hi: 'प्रस्तुति क्यों मायने रखती है' },
      { en: 'Balance of protein, starch and vegetables', hi: 'प्रोटीन, स्टार्च व सब्ज़ी का संतुलन' },
      { en: 'Colour, height and garnish', hi: 'रंग, ऊंचाई व गार्निश' },
      { en: 'The clock method of plating', hi: 'प्लेटिंग की क्लॉक विधि' },
    ],
    theory: {
      en: 'People eat first with their eyes, so how food looks on the plate matters almost as much as its taste. Good presentation makes a simple dish feel special and appetising.\n\nA well-plated dish has balance — a main item (protein), a starch and vegetables, in sensible portions. It uses colour, because a plate of only brown food looks dull, while fresh green or red adds life. It adds a little height so the plate is not flat, and finishes with a small, edible garnish that suits the dish — never a decoration that cannot be eaten.\n\nA simple way to arrange a plate is the clock method: imagine the plate as a clock face and place the protein at 6 o’clock (nearest the guest), the starch at about 10 o’clock and the vegetables at about 2 o’clock. This gives a clear, balanced look every time. Keep the plate rim clean and wipe away any drips before serving.',
      hi: 'लोग पहले आंखों से खाते हैं, इसलिए थाली पर भोजन कैसा दिखता है लगभग स्वाद जितना मायने रखता है। अच्छी प्रस्तुति सरल व्यंजन को विशेष बनाती है।\n\nअच्छी थाली में संतुलन होता है — मुख्य वस्तु (प्रोटीन), स्टार्च व सब्ज़ियां, उचित मात्रा में। रंग उपयोग करें, क्योंकि केवल भूरा भोजन फीका लगता है। थोड़ी ऊंचाई दें, व छोटा खाने योग्य गार्निश लगाएं जो व्यंजन से मेल खाए।\n\nथाली सजाने का सरल तरीका क्लॉक विधि है: थाली को घड़ी मानें व प्रोटीन 6 बजे (अतिथि के पास), स्टार्च लगभग 10 बजे व सब्ज़ी लगभग 2 बजे रखें। थाली किनारा साफ रखें व परोसने से पहले बूंदें पोंछें।',
    },
    terminology: [
      { term: { en: 'Presentation', hi: 'प्रस्तुति' }, def: { en: 'How food is arranged and made to look on the plate', hi: 'थाली पर भोजन कैसे सजाया व दिखाया जाता है' } },
      { term: { en: 'Garnish', hi: 'गार्निश' }, def: { en: 'A small edible decoration that suits the dish', hi: 'व्यंजन से मेल खाता छोटा खाने योग्य सजावट' } },
      { term: { en: 'Clock method', hi: 'क्लॉक विधि' }, def: { en: 'Placing items by clock positions: protein 6, starch 10, veg 2', hi: 'घड़ी स्थिति से रखना: प्रोटीन 6, स्टार्च 10, सब्ज़ी 2' } },
      { term: { en: 'Balance', hi: 'संतुलन' }, def: { en: 'A sensible mix of protein, starch and vegetables', hi: 'प्रोटीन, स्टार्च व सब्ज़ी का उचित मिश्रण' } },
    ],
    practice: [
      { en: 'Plate a main, a starch and a vegetable using the clock method.', hi: 'क्लॉक विधि से मुख्य, स्टार्च व सब्ज़ी सजाएं।' },
      { en: 'Improve a dull brown plate by adding colour and height.', hi: 'फीकी भूरी थाली में रंग व ऊंचाई जोड़कर सुधारें।' },
      { en: 'Choose a suitable edible garnish for three different dishes.', hi: 'तीन व्यंजनों हेतु उपयुक्त खाने योग्य गार्निश चुनें।' },
    ],
    mcqs: [
      { q: { en: 'In the clock method, where does the protein go?', hi: 'क्लॉक विधि में प्रोटीन कहां जाता है?' },
        options: [{ en: 'At 12 o’clock', hi: '12 बजे' }, { en: 'At 6 o’clock, nearest the guest', hi: '6 बजे, अतिथि के पास' }, { en: 'In the centre only', hi: 'केवल केंद्र में' }],
        correct: 1, explanation: { en: 'Protein sits at 6 o’clock, closest to the guest.', hi: 'प्रोटीन 6 बजे, अतिथि के सबसे पास।' } },
      { q: { en: 'A good garnish should always be:', hi: 'अच्छा गार्निश हमेशा कैसा हो?' },
        options: [{ en: 'Edible and suited to the dish', hi: 'खाने योग्य व व्यंजन से मेल खाता' }, { en: 'Large and colourful plastic', hi: 'बड़ा रंगीन प्लास्टिक' }, { en: 'Anything lying around', hi: 'जो भी पास पड़ा हो' }],
        correct: 0, explanation: { en: 'Garnish must be edible and match the dish — not just decoration.', hi: 'गार्निश खाने योग्य व व्यंजन से मेल खाता हो — केवल सजावट नहीं।' } },
    ],
    apply: [
      { en: 'A plate of rice, dal and curry looks flat and all one colour. How would you improve its presentation?', hi: 'चावल, दाल व करी की थाली सपाट व एक रंग दिखती है। प्रस्तुति कैसे सुधारें?' },
      { en: 'Using the clock method, describe where you would place a piece of fish, some rice and vegetables.', hi: 'क्लॉक विधि से बताएं मछली, चावल व सब्ज़ी कहां रखेंगे।' },
    ],
    review: { en: 'Because we eat with our eyes first, presentation turns a simple dish into an appealing one. Aim for balance of protein, starch and vegetables, add colour, height and a small edible garnish, and use the clock method — protein at 6, starch at 10, vegetables at 2 — with a clean plate rim.', hi: 'चूंकि हम पहले आंखों से खाते हैं, प्रस्तुति सरल व्यंजन को आकर्षक बनाती है। प्रोटीन, स्टार्च व सब्ज़ी का संतुलन, रंग, ऊंचाई व छोटा खाने योग्य गार्निश, व क्लॉक विधि — प्रोटीन 6, स्टार्च 10, सब्ज़ी 2 — साफ थाली किनारे के साथ।' },
    safety: [
      { en: 'Garnish only with clean, washed, edible items.', hi: 'केवल साफ, धुले, खाने योग्य गार्निश उपयोग करें।' },
      { en: 'Wipe plate rims with a clean cloth; serve hot food hot.', hi: 'थाली किनारे साफ कपड़े से पोंछें; गर्म भोजन गर्म परोसें।' },
    ],
    applications: [
      { en: 'Restaurant and banquet service', hi: 'रेस्तरां व बैंक्वेट सर्विस' },
      { en: 'Food photography and menus', hi: 'खाद्य फोटोग्राफी व मेन्यू' },
      { en: 'Culinary competitions', hi: 'पाक प्रतियोगिताएं' },
    ],
  },
];

export function getFoodModule(id: number): FoodModule | undefined {
  return FOOD_MODULES.find((m) => m.id === id);
}
