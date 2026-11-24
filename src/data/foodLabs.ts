/* Standalone "Kitchen Labs" — each maps to a food simulation component.
   Used by the Labs listing page and the individual FoodLab page. */
export interface FoodLab {
  simId: string;
  themeKey: string;
  title: { en: string; hi: string };
  desc: { en: string; hi: string };
  tag: { en: string; hi: string };
}

export const FOOD_LABS: FoodLab[] = [
  { simId: 'virtualKitchen', themeKey: 'kitchen',
    title: { en: 'Virtual Kitchen Layout', hi: 'वर्चुअल रसोई लेआउट' },
    desc: { en: 'Match each kitchen section to its job and arrange a smooth workflow from receiving to service.', hi: 'प्रत्येक रसोई अनुभाग को उसके कार्य से मिलाएं व प्राप्ति से सर्विस तक सुचारू प्रवाह बनाएं।' },
    tag: { en: 'Layout', hi: 'लेआउट' } },
  { simId: 'chefUniform', themeKey: 'uniform',
    title: { en: 'Chef Uniform Studio', hi: 'शेफ वर्दी स्टूडियो' },
    desc: { en: 'Dress the chef piece by piece and learn why every part of the uniform protects the cook and the food.', hi: 'शेफ को भाग-दर-भाग तैयार करें व जानें हर भाग क्यों रक्षा करता है।' },
    tag: { en: 'Interactive', hi: 'इंटरैक्टिव' } },
  { simId: 'kitchenHygiene', themeKey: 'hygiene',
    title: { en: 'Hand-Washing Lab', hi: 'हाथ-धुलाई लैब' },
    desc: { en: 'Order the seven hand-washing steps correctly and watch the germ level drop to zero.', hi: 'सात हाथ-धुलाई चरण सही क्रम में रखें व कीटाणु स्तर शून्य होते देखें।' },
    tag: { en: 'Hygiene', hi: 'स्वच्छता' } },
  { simId: 'equipmentId', themeKey: 'equipment',
    title: { en: 'Equipment Identification', hi: 'उपकरण पहचान' },
    desc: { en: 'Identify large kitchen equipment and match each machine to the job it does.', hi: 'बड़े रसोई उपकरण पहचानें व प्रत्येक मशीन को उसके कार्य से मिलाएं।' },
    tag: { en: 'Identify', hi: 'पहचानें' } },
  { simId: 'toolsCuts', themeKey: 'cuts',
    title: { en: 'Knife Cuts Lab', hi: 'चाकू कट्स लैब' },
    desc: { en: 'Recognise the classical vegetable cuts — julienne, brunoise, baton and chiffonade — from their shapes.', hi: 'शास्त्रीय सब्ज़ी कट्स उनके आकार से पहचानें।' },
    tag: { en: 'Skills', hi: 'कौशल' } },
  { simId: 'commodityId', themeKey: 'commodity',
    title: { en: 'Commodity Sorting', hi: 'सामग्री छंटाई' },
    desc: { en: 'Sort foods into their correct groups by plant and animal origin.', hi: 'भोजन को पौधा व जंतु मूल अनुसार सही समूहों में छांटें।' },
    tag: { en: 'Sorting', hi: 'छंटाई' } },
  { simId: 'foodStorage', themeKey: 'storage',
    title: { en: 'Food Storage Lab', hi: 'खाद्य भंडारण लैब' },
    desc: { en: 'Place each food in the right storage zone and keep raw meat below ready-to-eat food.', hi: 'प्रत्येक भोजन सही भंडारण क्षेत्र में रखें व कच्चा मांस तैयार भोजन के नीचे।' },
    tag: { en: 'Storage', hi: 'भंडारण' } },
  { simId: 'cookingMethods', themeKey: 'cooking',
    title: { en: 'Cooking Methods Lab', hi: 'पाक विधि लैब' },
    desc: { en: 'Choose the right cooking method for each dish and see how the result changes.', hi: 'प्रत्येक व्यंजन हेतु सही पाक विधि चुनें व परिणाम देखें।' },
    tag: { en: 'Cooking', hi: 'पाक' } },
  { simId: 'bakery', themeKey: 'bakery',
    title: { en: 'Bakery Oven Lab', hi: 'बेकरी ओवन लैब' },
    desc: { en: 'Bake each product at the right oven temperature and watch it turn pale, golden or burnt.', hi: 'प्रत्येक उत्पाद सही ओवन तापमान पर बेक करें व परिणाम देखें।' },
    tag: { en: 'Baking', hi: 'बेकिंग' } },
  { simId: 'doughPrep', themeKey: 'dough',
    title: { en: 'Dough Preparation Lab', hi: 'आटा तैयारी लैब' },
    desc: { en: 'Order the dough-making steps, then prove the dough for the right time so it rises perfectly.', hi: 'आटा बनाने के चरण क्रम में रखें, फिर सही समय तक प्रूव करें।' },
    tag: { en: 'Bakery', hi: 'बेकरी' } },
  { simId: 'kitchenSafety', themeKey: 'firstaid',
    title: { en: 'Kitchen Safety & First-Aid', hi: 'रसोई सुरक्षा व प्राथमिक उपचार' },
    desc: { en: 'Respond correctly to kitchen emergencies — oil fires, burns, cuts, spills and electrical fires.', hi: 'रसोई आपात — तेल आग, जलन, कट, फिसलन व बिजली आग — का सही जवाब दें।' },
    tag: { en: 'Safety', hi: 'सुरक्षा' } },
  { simId: 'foodSafety', themeKey: 'safety',
    title: { en: 'Food Safety Inspector', hi: 'खाद्य सुरक्षा निरीक्षक' },
    desc: { en: 'Inspect a kitchen scene and find every hygiene and cross-contamination hazard.', hi: 'रसोई दृश्य जांचें व हर स्वच्छता व क्रॉस-संदूषण खतरा खोजें।' },
    tag: { en: 'Inspection', hi: 'निरीक्षण' } },
  { simId: 'plating', themeKey: 'plating',
    title: { en: 'Food Plating Studio', hi: 'फूड प्लेटिंग स्टूडियो' },
    desc: { en: 'Arrange a plate using the clock method and score your balance, colour and composition.', hi: 'क्लॉक विधि से थाली सजाएं व अपना संतुलन स्कोर करें।' },
    tag: { en: 'Presentation', hi: 'प्रस्तुति' } },
];

export function getFoodLab(simId: string): FoodLab | undefined {
  return FOOD_LABS.find((l) => l.simId === simId);
}
