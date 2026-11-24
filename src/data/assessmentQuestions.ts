export interface Question {
  id: string;
  text: string;
  textHi: string;
  type: 'mcq' | 'multi' | 'numeric';
  options?: { id: string; text: string; textHi: string }[];
  correct: string | string[] | number;
  explanation: string;
  explanationHi: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
}

export const QUESTION_BANK: Question[] = [
  // 1. Kitchen Foundations
  {
    id: 'q1', topic: 'Kitchen', text: 'The French term "mise en place" means:', textHi: 'फ्रांसीसी शब्द "मीज़ ओं प्लास" का अर्थ है:', type: 'mcq',
    options: [
      { id: 'a', text: 'Everything in its place, ready before cooking', textHi: 'हर चीज़ अपनी जगह, पकाने से पहले तैयार' },
      { id: 'b', text: 'Cook on high heat', textHi: 'तेज़ आंच पर पकाएं' },
      { id: 'c', text: 'Clean the floor', textHi: 'फर्श साफ करें' },
      { id: 'd', text: 'Serve the guest', textHi: 'अतिथि को परोसें' },
    ],
    correct: 'a',
    explanation: 'Mise en place means having all ingredients weighed, cut and ready before cooking begins.',
    explanationHi: 'मीज़ ओं प्लास का अर्थ है पकाने से पहले सभी सामग्री तौली, कटी व तैयार रखना।',
    difficulty: 'easy',
  },
  // 2. Hygiene
  {
    id: 'q2', topic: 'Hygiene', text: 'When must a cook always wash their hands?', textHi: 'रसोइये को हमेशा हाथ कब धोने चाहिए?', type: 'mcq',
    options: [
      { id: 'a', text: 'Only at the end of the shift', textHi: 'केवल शिफ्ट के अंत में' },
      { id: 'b', text: 'After handling raw meat and after using the toilet', textHi: 'कच्चा मांस व शौचालय के बाद' },
      { id: 'c', text: 'Only if they look dirty', textHi: 'केवल जब गंदे दिखें' },
      { id: 'd', text: 'Once a day', textHi: 'दिन में एक बार' },
    ],
    correct: 'b',
    explanation: 'Germs are invisible, so wash at key moments — after raw meat, after the toilet, before handling food.',
    explanationHi: 'कीटाणु अदृश्य हैं, इसलिए मुख्य क्षणों पर धोएं।',
    difficulty: 'easy',
  },
  // 3. Uniform
  {
    id: 'q3', topic: 'Uniform', text: 'Why is a chef’s jacket double-breasted?', textHi: 'शेफ की जैकेट डबल-ब्रेस्टेड क्यों होती है?', type: 'mcq',
    options: [
      { id: 'a', text: 'To look fashionable', textHi: 'फैशनेबल दिखने हेतु' },
      { id: 'b', text: 'Two layers protect from heat and can hide stains', textHi: 'दो परतें गर्मी से बचाती व दाग छिपाती हैं' },
      { id: 'c', text: 'To hold tools', textHi: 'औज़ार रखने हेतु' },
      { id: 'd', text: 'It is warmer', textHi: 'अधिक गर्म होती है' },
    ],
    correct: 'b',
    explanation: 'The double layer shields the chest from heat and can be re-buttoned to hide stains.',
    explanationHi: 'दोहरी परत छाती बचाती व दोबारा बटन लगाकर दाग छिपाती है।',
    difficulty: 'medium',
  },
  // 4. Safety
  {
    id: 'q4', topic: 'Safety', text: 'A pan of hot oil catches fire. What should you do?', textHi: 'गर्म तेल के पैन में आग लगती है। आपको क्या करना चाहिए?', type: 'mcq',
    options: [
      { id: 'a', text: 'Throw water on it', textHi: 'पानी डालें' },
      { id: 'b', text: 'Cover it with a lid or fire blanket', textHi: 'ढक्कन या फायर ब्लैंकेट से ढकें' },
      { id: 'c', text: 'Carry it outside', textHi: 'बाहर ले जाएं' },
      { id: 'd', text: 'Fan the flames', textHi: 'आग को हवा दें' },
    ],
    correct: 'b',
    explanation: 'Smother the flames to cut off air. Water makes burning oil explode upward.',
    explanationHi: 'हवा रोकने हेतु आग ढकें। पानी जलते तेल को भड़काता है।',
    difficulty: 'easy',
  },
  // 5. Storage
  {
    id: 'q5', topic: 'Storage', text: 'What is the temperature danger zone where bacteria grow fastest?', textHi: 'जीवाणु सबसे तेज़ बढ़ने वाला डेंजर ज़ोन तापमान क्या है?', type: 'mcq',
    options: [
      { id: 'a', text: '5–63°C', textHi: '5–63°C' },
      { id: 'b', text: '−18 to 0°C', textHi: '−18 से 0°C' },
      { id: 'c', text: '100–150°C', textHi: '100–150°C' },
      { id: 'd', text: '63–100°C', textHi: '63–100°C' },
    ],
    correct: 'a',
    explanation: 'Bacteria multiply fastest between 5°C and 63°C, so food should not stand in this range.',
    explanationHi: 'जीवाणु 5°C व 63°C के बीच सबसे तेज़ बढ़ते हैं।',
    difficulty: 'easy',
  },
  // 6. Storage
  {
    id: 'q6', topic: 'Storage', text: 'Where should raw chicken be kept in the fridge?', textHi: 'फ्रिज में कच्चा चिकन कहां रखें?', type: 'mcq',
    options: [
      { id: 'a', text: 'Top shelf', textHi: 'ऊपरी शेल्फ' },
      { id: 'b', text: 'Bottom shelf, below ready-to-eat food', textHi: 'निचली शेल्फ, तैयार भोजन के नीचे' },
      { id: 'c', text: 'On the door', textHi: 'दरवाज़े पर' },
      { id: 'd', text: 'Next to the salad', textHi: 'सलाद के बगल' },
    ],
    correct: 'b',
    explanation: 'Raw meat goes at the bottom so its juices cannot drip onto food that will not be cooked again.',
    explanationHi: 'कच्चा मांस नीचे ताकि रस अन्य भोजन पर न टपके।',
    difficulty: 'medium',
  },
  // 7. Safety
  {
    id: 'q7', topic: 'Safety', text: 'Which colour chopping board is used for raw meat?', textHi: 'कच्चे मांस हेतु कौन सा रंग बोर्ड प्रयोग होता है?', type: 'mcq',
    options: [
      { id: 'a', text: 'Green', textHi: 'हरा' },
      { id: 'b', text: 'Red', textHi: 'लाल' },
      { id: 'c', text: 'Blue', textHi: 'नीला' },
      { id: 'd', text: 'Yellow', textHi: 'पीला' },
    ],
    correct: 'b',
    explanation: 'Red is for raw meat; green is for salad and fruit. Colour coding prevents cross-contamination.',
    explanationHi: 'लाल कच्चे मांस हेतु; हरा सलाद व फल हेतु। रंग-कोडिंग क्रॉस-संदूषण रोकती है।',
    difficulty: 'easy',
  },
  // 8. Commodities
  {
    id: 'q8', topic: 'Commodities', text: 'Which of these is an animal-origin commodity?', textHi: 'इनमें से कौन जंतु-मूल सामग्री है?', type: 'mcq',
    options: [
      { id: 'a', text: 'Wheat', textHi: 'गेहूं' },
      { id: 'b', text: 'Paneer (cheese)', textHi: 'पनीर' },
      { id: 'c', text: 'Potato', textHi: 'आलू' },
      { id: 'd', text: 'Rice', textHi: 'चावल' },
    ],
    correct: 'b',
    explanation: 'Paneer is a dairy product, so it is animal-origin. The others are plant-origin.',
    explanationHi: 'पनीर डेयरी उत्पाद है, इसलिए जंतु-मूल। अन्य पौधे मूल के हैं।',
    difficulty: 'easy',
  },
  // 9. Cooking
  {
    id: 'q9', topic: 'Cooking', text: 'Which of these is a moist-heat cooking method?', textHi: 'इनमें कौन नम-ऊष्मा पाक विधि है?', type: 'mcq',
    options: [
      { id: 'a', text: 'Grilling', textHi: 'ग्रिलिंग' },
      { id: 'b', text: 'Steaming', textHi: 'भाप' },
      { id: 'c', text: 'Roasting', textHi: 'रोस्टिंग' },
      { id: 'd', text: 'Baking', textHi: 'बेकिंग' },
    ],
    correct: 'b',
    explanation: 'Steaming uses water vapour, so it is a moist-heat method; the others use dry heat.',
    explanationHi: 'भाप जलवाष्प उपयोग करती है, इसलिए नम-ऊष्मा विधि।',
    difficulty: 'medium',
  },
  // 10. Bakery
  {
    id: 'q10', topic: 'Bakery', text: 'What does kneading develop in bread dough?', textHi: 'गूंधना ब्रेड आटे में क्या विकसित करता है?', type: 'mcq',
    options: [
      { id: 'a', text: 'Gluten', textHi: 'ग्लूटेन' },
      { id: 'b', text: 'Sugar', textHi: 'चीनी' },
      { id: 'c', text: 'Salt', textHi: 'नमक' },
      { id: 'd', text: 'Water', textHi: 'पानी' },
    ],
    correct: 'a',
    explanation: 'Kneading develops gluten, the stretchy network that traps gas so bread can rise.',
    explanationHi: 'गूंधना ग्लूटेन बनाता है जो गैस रोककर ब्रेड फुलाता है।',
    difficulty: 'medium',
  },
  // 11. Bakery
  {
    id: 'q11', topic: 'Bakery', text: 'Which baked product needs the hottest oven?', textHi: 'किस बेक उत्पाद को सबसे गर्म ओवन चाहिए?', type: 'mcq',
    options: [
      { id: 'a', text: 'Sponge cake', textHi: 'स्पंज केक' },
      { id: 'b', text: 'Puff pastry', textHi: 'पफ पेस्ट्री' },
      { id: 'c', text: 'Custard', textHi: 'कस्टर्ड' },
      { id: 'd', text: 'Biscuits', textHi: 'बिस्कुट' },
    ],
    correct: 'b',
    explanation: 'Puff pastry needs a very hot oven (~230°C) so its butter layers steam and puff up.',
    explanationHi: 'पफ पेस्ट्री को बहुत गर्म ओवन चाहिए ताकि मक्खन परतें भाप बनें व फूलें।',
    difficulty: 'hard',
  },
  // 12. Kitchen
  {
    id: 'q12', topic: 'Kitchen', text: 'Who is second-in-command in a kitchen brigade?', textHi: 'रसोई ब्रिगेड में दूसरा प्रमुख कौन है?', type: 'mcq',
    options: [
      { id: 'a', text: 'Commis', textHi: 'कॉमी' },
      { id: 'b', text: 'Sous chef', textHi: 'सू शेफ' },
      { id: 'c', text: 'Kitchen helper', textHi: 'रसोई सहायक' },
      { id: 'd', text: 'Chef de partie', textHi: 'शेफ द पार्टी' },
    ],
    correct: 'b',
    explanation: 'The sous chef is second-in-command and runs the kitchen when the head chef is away.',
    explanationHi: 'सू शेफ दूसरा प्रमुख है व हेड शेफ की अनुपस्थिति में रसोई चलाता है।',
    difficulty: 'medium',
  },
  // 13. Safety
  {
    id: 'q13', topic: 'Safety', text: 'What is the correct first-aid for a burn?', textHi: 'जलन का सही प्राथमिक उपचार क्या है?', type: 'mcq',
    options: [
      { id: 'a', text: 'Rub butter on it', textHi: 'मक्खन लगाएं' },
      { id: 'b', text: 'Cool it under running water for 10+ minutes', textHi: '10+ मिनट बहते पानी में ठंडा करें' },
      { id: 'c', text: 'Cover it with flour', textHi: 'आटा डालें' },
      { id: 'd', text: 'Burst any blisters', textHi: 'छाले फोड़ें' },
    ],
    correct: 'b',
    explanation: 'Cool a burn under running water for at least 10 minutes; never use butter or burst blisters.',
    explanationHi: 'जले को कम से कम 10 मिनट बहते पानी में ठंडा करें।',
    difficulty: 'easy',
  },
  // 14. Presentation
  {
    id: 'q14', topic: 'Presentation', text: 'In the clock method of plating, where does the protein go?', textHi: 'प्लेटिंग की क्लॉक विधि में प्रोटीन कहां जाता है?', type: 'mcq',
    options: [
      { id: 'a', text: 'At 12 o’clock', textHi: '12 बजे' },
      { id: 'b', text: 'At 6 o’clock, nearest the guest', textHi: '6 बजे, अतिथि के पास' },
      { id: 'c', text: 'In the centre', textHi: 'केंद्र में' },
      { id: 'd', text: 'At 9 o’clock', textHi: '9 बजे' },
    ],
    correct: 'b',
    explanation: 'Protein sits at 6 o’clock (nearest the guest), starch at 10 and vegetables at 2.',
    explanationHi: 'प्रोटीन 6 बजे (अतिथि के पास), स्टार्च 10 व सब्ज़ी 2 बजे।',
    difficulty: 'medium',
  },
  // 15. Equipment
  {
    id: 'q15', topic: 'Equipment', text: 'A deep fat fryer is used to:', textHi: 'डीप फैट फ्रायर का उपयोग किसलिए होता है?', type: 'mcq',
    options: [
      { id: 'a', text: 'Freeze food', textHi: 'भोजन जमाना' },
      { id: 'b', text: 'Hold hot oil for deep frying', textHi: 'डीप फ्राई हेतु गर्म तेल रखना' },
      { id: 'c', text: 'Bake bread', textHi: 'ब्रेड बेक करना' },
      { id: 'd', text: 'Wash dishes', textHi: 'बर्तन धोना' },
    ],
    correct: 'b',
    explanation: 'A deep fat fryer holds a bath of hot oil at a set temperature for deep frying.',
    explanationHi: 'डीप फैट फ्रायर डीप फ्राई हेतु निर्धारित तापमान पर गर्म तेल रखता है।',
    difficulty: 'easy',
  },
  // 16. Hygiene
  {
    id: 'q16', topic: 'Hygiene', text: 'How many steps are in the correct hand-washing method taught in this course?', textHi: 'इस कोर्स में सिखाई सही हाथ-धुलाई विधि में कितने चरण हैं?', type: 'numeric',
    correct: 7,
    explanation: 'The method has 7 steps: wet, soap, rub palms, between fingers, thumbs & nails, rinse, dry.',
    explanationHi: '7 चरण: गीला, साबुन, हथेली, उंगलियों के बीच, अंगूठे व नाखून, धोना, सुखाना।',
    difficulty: 'medium',
  },
  // 17. Cooking
  {
    id: 'q17', topic: 'Cooking', text: 'At what temperature (°C) does water boil at sea level?', textHi: 'समुद्र तल पर पानी कितने °C पर उबलता है?', type: 'numeric',
    correct: 100,
    explanation: 'Water boils at 100°C at sea level — the basis of boiling, steaming and poaching.',
    explanationHi: 'समुद्र तल पर पानी 100°C पर उबलता है।',
    difficulty: 'easy',
  },
  // 18. Kitchen
  {
    id: 'q18', topic: 'Kitchen', text: 'A recipe for 4 servings is scaled up to 8 servings. By what factor do you multiply each ingredient?', textHi: '4 सर्विंग की रेसिपी 8 सर्विंग तक बढ़ाई जाती है। प्रत्येक सामग्री को किस गुणक से गुणा करें?', type: 'numeric',
    correct: 2,
    explanation: 'Scaling factor = new ÷ old = 8 ÷ 4 = 2, so every ingredient is doubled.',
    explanationHi: 'गुणक = नया ÷ पुराना = 8 ÷ 4 = 2, अतः हर सामग्री दोगुनी।',
    difficulty: 'easy',
  },
  // 19. Sauces
  {
    id: 'q19', topic: 'Sauces', text: 'Which French mother sauce is prepared using a blond roux and a white stock (chicken, veal or fish)?', textHi: 'कौन सी फ्रांसीसी मुख्य सॉस ब्लॉन्ड रू और सफेद स्टॉक से बनाई जाती है?', type: 'mcq',
    options: [
      { id: 'a', text: 'Béchamel', textHi: 'बेशामेल' },
      { id: 'b', text: 'Velouté', textHi: 'वेलूते' },
      { id: 'c', text: 'Espagnole', textHi: 'एस्पैनोल' },
      { id: 'd', text: 'Hollandaise', textHi: 'हॉलैंडाइज़' },
    ],
    correct: 'b',
    explanation: 'Velouté uses a blond roux combined with light stock (veal, chicken, or fish). Béchamel uses milk.',
    explanationHi: 'वेलूते ब्लॉन्ड रू और हल्के स्टॉक (चिकन, मछली) से बनती है। बेशामेल दूध से बनती है।',
    difficulty: 'medium',
  },
  // 20. Storage
  {
    id: 'q20', topic: 'Storage', text: 'What is the minimum safe temperature (°C) for hot-holding cooked food on a buffet or pass?', textHi: 'बुफे या सर्विस पास पर पका भोजन गर्म रखने हेतु न्यूनतम सुरक्षित तापमान (°C) क्या है?', type: 'numeric',
    correct: 63,
    explanation: 'Food must be hot-held at 63°C or above to prevent bacteria from multiplying in the danger zone.',
    explanationHi: 'डेंजर ज़ोन में जीवाणु वृद्धि रोकने हेतु भोजन 63°C या अधिक पर रखा जाना चाहिए।',
    difficulty: 'medium',
  },
  // 21. Cuts
  {
    id: 'q21', topic: 'Cuts', text: 'What are the classical dimensions of a Julienne cut?', textHi: 'जूलियन कट के शास्त्रीय आयाम क्या हैं?', type: 'mcq',
    options: [
      { id: 'a', text: '2mm × 2mm × 4cm', textHi: '2 मिमी × 2 मिमी × 4 सेमी' },
      { id: 'b', text: '1cm × 1cm × 1cm', textHi: '1 सेमी × 1 सेमी × 1 सेमी' },
      { id: 'c', text: '5mm × 5mm × 5cm', textHi: '5 मिमी × 5 मिमी × 5 सेमी' },
      { id: 'd', text: '15mm × 15mm × 2mm', textHi: '15 मिमी × 15 मिमी × 2 मिमी' },
    ],
    correct: 'a',
    explanation: 'Julienne is a fine matchstick cut measuring approximately 2mm × 2mm × 4cm.',
    explanationHi: 'जूलियन एक पतली माचिस जैसी कटिंग है जिसके आयाम लगभग 2 मिमी × 2 मिमी × 4 सेमी होते हैं।',
    difficulty: 'easy',
  },
  // 22. Kitchen
  {
    id: 'q22', topic: 'Kitchen', text: 'In a classical French brigade, who manages cold food preparation, salads, and charcuterie?', textHi: 'शास्त्रीय फ्रांसीसी ब्रिगेड में ठंडे भोजन, सलाद व चारक्यूटरी का प्रबंधन कौन करता है?', type: 'mcq',
    options: [
      { id: 'a', text: 'Garde Manger (Pantry Chef)', textHi: 'गार्ड मांजे (पैंट्री शेफ)' },
      { id: 'b', text: 'Entremetier (Vegetable Chef)', textHi: 'ऑन्त्रमेतिए (सब्ज़ी शेफ)' },
      { id: 'c', text: 'Saucier (Sauce Chef)', textHi: 'सोसिए (सॉस शेफ)' },
      { id: 'd', text: 'Pâtissier (Pastry Chef)', textHi: 'पातिसिए (पेस्ट्री शेफ)' },
    ],
    correct: 'a',
    explanation: 'The Garde Manger is responsible for cold preparations, hors d’oeuvres, salads, p伟tés, and cold buffet displays.',
    explanationHi: 'गार्ड मांजे ठंडे व्यंजन, सलाद, ऐपेटाइज़र और कोल्ड बुफे प्रस्तुति हेतु जिम्मेदार होता है।',
    difficulty: 'medium',
  },
  // 23. Safety
  {
    id: 'q23', topic: 'Safety', text: 'What is the safe core internal temperature (°C) for thoroughly cooked poultry and chicken?', textHi: 'पूरी तरह पके पोल्ट्री व चिकन हेतु सुरक्षित आंतरिक कोर तापमान (°C) क्या है?', type: 'numeric',
    correct: 75,
    explanation: 'Poultry must reach an internal core temperature of 75°C (instant) or 70°C for 2 minutes to kill Salmonella.',
    explanationHi: 'साल्मोनेला नष्ट करने हेतु पोल्ट्री का आंतरिक तापमान कम से कम 75°C होना चाहिए।',
    difficulty: 'medium',
  },
  // 24. Cooking
  {
    id: 'q24', topic: 'Cooking', text: 'What is the classical proportion of vegetables in a standard French Mirepoix?', textHi: 'मानक फ्रांसीसी मिरपुआ (Mirepoix) में सब्जियों का शास्त्रीय अनुपात क्या है?', type: 'mcq',
    options: [
      { id: 'a', text: '50% Onion, 25% Carrot, 25% Celery', textHi: '50% प्याज, 25% गाजर, 25% सेलरी' },
      { id: 'b', text: '33% Onion, 33% Carrot, 33% Celery', textHi: '33% प्याज, 33% गाजर, 33% सेलरी' },
      { id: 'c', text: '70% Onion, 15% Garlic, 15% Ginger', textHi: '70% प्याज, 15% लहसुन, 15% अदरक' },
      { id: 'd', text: '50% Tomato, 25% Onion, 25% Pepper', textHi: '50% टमाटर, 25% प्याज, 25% शिमला मिर्च' },
    ],
    correct: 'a',
    explanation: 'Mirepoix is 2 parts onion, 1 part carrot, and 1 part celery (2:1:1), creating the foundational aromatic base.',
    explanationHi: 'मिरपुआ में 2 भाग प्याज, 1 भाग गाजर, और 1 भाग सेलरी (2:1:1) होता है।',
    difficulty: 'medium',
  },
  // 25. Bakery
  {
    id: 'q25', topic: 'Bakery', text: 'Which chemical leavening agent requires both an acid and moisture to produce carbon dioxide?', textHi: 'किस रासायनिक लीवनिंग एजेंट को कार्बन डाइऑक्साइड बनाने हेतु एसिड और नमी दोनों चाहिए?', type: 'mcq',
    options: [
      { id: 'a', text: 'Baking Soda (Sodium Bicarbonate)', textHi: 'बेकिंग सोडा (सोडियम बाइकार्बोनेट)' },
      { id: 'b', text: 'Baking Powder', textHi: 'बेकिंग पाउडर' },
      { id: 'c', text: 'Baker’s Yeast', textHi: 'बेकर्स यीस्ट' },
      { id: 'd', text: 'Cream of Tartar', textHi: 'क्रीम ऑफ टार्टर' },
    ],
    correct: 'a',
    explanation: 'Baking soda is a pure alkaline base; it requires an acidic ingredient (buttermilk, lemon, yogurt) plus liquid to release CO2.',
    explanationHi: 'बेकिंग सोडा केवल क्षार है; इसे गैस छोड़ने हेतु एसिड (छाछ, नींबू, दही) और तरल चाहिए।',
    difficulty: 'hard',
  },
  // 26. Cooking
  {
    id: 'q26', topic: 'Cooking', text: 'What is the culinary technique of plunging blanched vegetables into an ice bath called?', textHi: 'ब्लांच की गई सब्जियों को तुरंत बर्फ के पानी में डालने की प्रक्रिया क्या कहलाती है?', type: 'mcq',
    options: [
      { id: 'a', text: 'Shocking or Refreshing', textHi: 'शॉकिंग या रिफ्रेशिंग' },
      { id: 'b', text: 'Sweating', textHi: 'स्वेटिंग' },
      { id: 'c', text: 'Macerating', textHi: 'मैसरेटिंग' },
      { id: 'd', text: 'Tempering', textHi: 'टेम्परिंग' },
    ],
    correct: 'a',
    explanation: 'Shocking in ice water halts the residual carry-over cooking immediately, preserving vibrant green colour and crunch.',
    explanationHi: 'बर्फ पानी में शॉकिंग से पकना तुरंत रुक जाता है, जिससे हरा रंग व कुरकुरापन बना रहता है।',
    difficulty: 'easy',
  },
  // 27. Sauces
  {
    id: 'q27', topic: 'Sauces', text: 'Which mother sauce is a warm emulsion of clarified butter, egg yolks, and lemon juice or vinegar reduction?', textHi: 'कौन सी मुख्य सॉस स्पष्ट मक्खन, अंडे की जर्दी और नींबू रस का गर्म इमल्शन है?', type: 'mcq',
    options: [
      { id: 'a', text: 'Hollandaise', textHi: 'हॉलैंडाइज़' },
      { id: 'b', text: 'Mayonnaise', textHi: 'मेयोनेज़' },
      { id: 'c', text: 'Béchamel', textHi: 'बेशामेल' },
      { id: 'd', text: 'Béarnaise', textHi: 'बेयरनेज़' },
    ],
    correct: 'a',
    explanation: 'Hollandaise is one of the 5 French mother sauces, emulsifying warm butter and egg yolk.',
    explanationHi: 'हॉलैंडाइज़ 5 मुख्य सॉस में से एक है, जो गर्म मक्खन और अंडे की जर्दी का पायस (इमल्शन) है।',
    difficulty: 'medium',
  },
  // 28. Storage
  {
    id: 'q28', topic: 'Storage', text: 'In culinary inventory control, what does the principle "FIFO" stand for?', textHi: 'रसोई इन्वेंट्री नियंत्रण में "FIFO" सिद्धांत का क्या अर्थ है?', type: 'mcq',
    options: [
      { id: 'a', text: 'First In, First Out', textHi: 'फर्स्ट इन, फर्स्ट आउट (पहले आया, पहले इस्तेमाल)' },
      { id: 'b', text: 'Fast Ingredients, Fast Orders', textHi: 'फास्ट इंग्रीडिएंट्स, फास्ट ऑर्डर्स' },
      { id: 'c', text: 'Fresh Items For Organisation', textHi: 'फ्रेश आइटम्स फॉर ऑर्गनाइजेशन' },
      { id: 'd', text: 'Freeze Inside, Freeze Outside', textHi: 'फ्रीज़ इनसाइड, फ्रीज़ आउटसाइड' },
    ],
    correct: 'a',
    explanation: 'FIFO (First In, First Out) ensures older stock is used before newer shipments to eliminate spoilage and waste.',
    explanationHi: 'FIFO का अर्थ है पुराना सामान पहले इस्तेमाल करना ताकि भोजन खराब न हो और ताजगी बनी रहे।',
    difficulty: 'easy',
  },
  // 29. Safety
  {
    id: 'q29', topic: 'Safety', text: 'Which colour-coded chopping board is designated for raw fish and seafood?', textHi: 'कच्ची मछली व समुद्री भोजन हेतु किस रंग का कटिंग बोर्ड निर्धारित है?', type: 'mcq',
    options: [
      { id: 'a', text: 'Blue', textHi: 'नीला' },
      { id: 'b', text: 'Yellow', textHi: 'पीला' },
      { id: 'c', text: 'White', textHi: 'सफेद' },
      { id: 'd', text: 'Brown', textHi: 'भूरा' },
    ],
    correct: 'a',
    explanation: 'Blue is reserved for raw fish and seafood; yellow is for cooked meat, and white is for bakery and dairy.',
    explanationHi: 'नीला बोर्ड कच्ची मछली और समुद्री भोजन हेतु आरक्षित है; पीला पके मांस हेतु।',
    difficulty: 'easy',
  },
  // 30. Science
  {
    id: 'q30', topic: 'Cooking', text: 'What chemical browning reaction between amino acids and reducing sugars produces roasted flavours above 140°C?', textHi: 'अमीनो एसिड और शर्करा के बीच 140°C से ऊपर भूरापन व स्वादिष्ट खुशबू देने वाली अभिक्रिया क्या है?', type: 'mcq',
    options: [
      { id: 'a', text: 'Maillard Reaction', textHi: 'मेलार्ड अभिक्रिया (Maillard Reaction)' },
      { id: 'b', text: 'Caramelization', textHi: 'कैरामेलिज़ेशन' },
      { id: 'c', text: 'Fermentation', textHi: 'किण्वन (Fermentation)' },
      { id: 'd', text: 'Gelatinization', textHi: 'जिलेटिनाइज़ेशन' },
    ],
    correct: 'a',
    explanation: 'The Maillard reaction occurs between proteins (amino acids) and sugars under dry heat, creating savory roasted aromas.',
    explanationHi: 'मेलार्ड अभिक्रिया प्रोटीन और शर्करा के बीच सूखी गर्मी में होती है, जो भुनी हुई सुगंध देती है।',
    difficulty: 'hard',
  },
  // 31. Units
  {
    id: 'q31', topic: 'Kitchen', text: 'How many millilitres (ml) are in 1 standard culinary tablespoon (tbsp)?', textHi: '1 मानक चम्मच (टेबलस्पून) में कितने मिलीलीटर (ml) होते हैं?', type: 'numeric',
    correct: 15,
    explanation: '1 metric culinary tablespoon equals exactly 15 ml (3 teaspoons × 5 ml).',
    explanationHi: '1 मानक टेबलस्पून में ठीक 15 मिलीलीटर (3 टीस्पून × 5 मिली) होते हैं।',
    difficulty: 'easy',
  },
  // 32. Storage
  {
    id: 'q32', topic: 'Storage', text: 'What is the ideal operating temperature range for a commercial walk-in refrigerator (chiller)?', textHi: 'व्यावसायिक वॉक-इन रेफ्रिजरेटर (चिलर) हेतु आदर्श तापमान सीमा क्या है?', type: 'mcq',
    options: [
      { id: 'a', text: '1°C to 4°C', textHi: '1°C से 4°C' },
      { id: 'b', text: '−5°C to 0°C', textHi: '−5°C से 0°C' },
      { id: 'c', text: '10°C to 15°C', textHi: '10°C से 15°C' },
      { id: 'd', text: '18°C to 22°C', textHi: '18°C से 22°C' },
    ],
    correct: 'a',
    explanation: 'Refrigerators must run between 1°C and 4°C (never exceeding 5°C) to keep food out of the danger zone.',
    explanationHi: 'चिलर 1°C से 4°C के बीच चलना चाहिए (5°C से अधिक कभी नहीं) ताकि कीटाणु न पनपें।',
    difficulty: 'medium',
  },
  // 33. Equipment
  {
    id: 'q33', topic: 'Equipment', text: 'Which knife is designed with a serrated wavy edge to slice bread without tearing the crumb?', textHi: 'ब्रेड को बिना कुचले काटने हेतु दांतेदार धार वाला कौन सा चाकू प्रयोग होता है?', type: 'mcq',
    options: [
      { id: 'a', text: 'Serrated Bread Knife', textHi: 'सेरेटेड ब्रेड चाकू' },
      { id: 'b', text: 'Cleaver', textHi: 'क्लीवर' },
      { id: 'c', text: 'Boning Knife', textHi: 'बोनिंग चाकू' },
      { id: 'd', text: 'Tourné Knife', textHi: 'टूरने चाकू' },
    ],
    correct: 'a',
    explanation: 'A serrated bread knife saws through tough crusts cleanly without compressing the delicate soft interior crumb.',
    explanationHi: 'सेरेटेड ब्रेड चाकू सख्त क्रस्ट को बिना ब्रेड को दबाए आसानी से काटता है।',
    difficulty: 'easy',
  },
  // 34. Kitchen
  {
    id: 'q34', topic: 'Kitchen', text: 'In a classical brigade, what is the chef in charge of roasted and grilled meats called?', textHi: 'शास्त्रीय ब्रिगेड में रोस्ट व ग्रिल किए गए मांस के प्रभारी शेफ को क्या कहते हैं?', type: 'mcq',
    options: [
      { id: 'a', text: 'Rôtisseur', textHi: 'रोटिसिए (Rôtisseur)' },
      { id: 'b', text: 'Poissonnier', textHi: 'पॉइसोनिए (Poissonnier)' },
      { id: 'c', text: 'Boulanger', textHi: 'बुलान्जे (Boulanger)' },
      { id: 'd', text: 'Tournant', textHi: 'तूरनांत (Tournant)' },
    ],
    correct: 'a',
    explanation: 'The Rôtisseur manages roasted meats, poultry, and oven-braised dishes. The Poissonnier handles fish.',
    explanationHi: 'रोटिसिए रोस्टेड मांस, पोल्ट्री व बेक किए व्यंजनों का प्रबंधन करता है।',
    difficulty: 'medium',
  },
  // 35. Soups
  {
    id: 'q35', topic: 'Cooking', text: 'What is the mixture of egg whites, lean minced meat, and mirepoix used to clarify a consommé called?', textHi: 'कैनसोमे (Consommé) सूप को पारदर्शी साफ करने वाला अंडे की सफेदी व कीमे का मिश्रण क्या कहलाता है?', type: 'mcq',
    options: [
      { id: 'a', text: 'Raft (Clarification mixture)', textHi: 'राफ्ट (Raft)' },
      { id: 'b', text: 'Liaison', textHi: 'लिएसों (Liaison)' },
      { id: 'c', text: 'Slurry', textHi: 'स्लरी (Slurry)' },
      { id: 'd', text: 'Beurre Manié', textHi: 'ब्योर मानिए (Beurre Manié)' },
    ],
    correct: 'a',
    explanation: 'The protein "raft" floats on top of the simmering stock, trapping all impurities to leave the liquid crystal clear.',
    explanationHi: 'अंडे की सफेदी का "राफ्ट" उबलते स्टॉक पर तैरता है और अशुद्धियों को फंसाकर सूप को बिल्कुल पारदर्शी बनाता है।',
    difficulty: 'hard',
  },
  // 36. Bakery
  {
    id: 'q36', topic: 'Bakery', text: 'Which cooked dough is piped and baked to create hollow shells for éclairs and cream puffs?', textHi: 'एक्लेयर्स और क्रीम पफ के खोखले शैल बनाने हेतु कौन सा आटा प्रयोग होता है?', type: 'mcq',
    options: [
      { id: 'a', text: 'Choux Pastry (Pâte à Choux)', textHi: 'शू पेस्ट्री (Pâte à Choux)' },
      { id: 'b', text: 'Shortcrust Pastry', textHi: 'शॉर्टक्रस्ट पेस्ट्री' },
      { id: 'c', text: 'Filo Pastry', textHi: 'फिलो पेस्ट्री' },
      { id: 'd', text: 'Brioche Dough', textHi: 'ब्रियोश आटा' },
    ],
    correct: 'a',
    explanation: 'Choux pastry uses high moisture to create steam that puffs the dough into a hollow crispy shell during baking.',
    explanationHi: 'शू पेस्ट्री में उच्च नमी से भाप बनती है जो बेकिंग के दौरान आटे को खोखला व फूला हुआ बनाती है।',
    difficulty: 'medium',
  },
  // 37. Finance
  {
    id: 'q37', topic: 'Kitchen', text: 'If total raw ingredient cost for a dish is ₹90 and the selling price is ₹300, what is the Food Cost %?', textHi: 'यदि किसी व्यंजन की कच्ची सामग्री लागत ₹90 है और विक्रय मूल्य ₹300 है, तो फ़ूड कॉस्ट % क्या है?', type: 'numeric',
    correct: 30,
    explanation: 'Food Cost % = (Cost of Food ÷ Selling Price) × 100 = (90 ÷ 300) × 100 = 30%.',
    explanationHi: 'फ़ूड कॉस्ट % = (सामग्री लागत ÷ विक्रय मूल्य) × 100 = (90 ÷ 300) × 100 = 30%।',
    difficulty: 'medium',
  },
  // 38. Safety
  {
    id: 'q38', topic: 'Safety', text: 'Why must kitchen cleaning bleach never be mixed with ammonia or acidic de-limers?', textHi: 'रसोई में ब्लीच को कभी अमोनिया या एसिड क्लीनर के साथ क्यों नहीं मिलाना चाहिए?', type: 'mcq',
    options: [
      { id: 'a', text: 'It creates deadly toxic chlorine and chloramine gas', textHi: 'यह घातक जहरीली क्लोरीन व क्लोरामाइन गैस बनाता है' },
      { id: 'b', text: 'It loses all cleaning power', textHi: 'यह सफाई शक्ति खो देता है' },
      { id: 'c', text: 'It changes colour to brown', textHi: 'यह भूरे रंग में बदल जाता है' },
      { id: 'd', text: 'It stains stainless steel tables', textHi: 'यह स्टील पर दाग लगाता है' },
    ],
    correct: 'a',
    explanation: 'Mixing chlorine bleach with acid or ammonia releases deadly toxic chloramine/chlorine fumes causing lung damage.',
    explanationHi: 'ब्लीच को एसिड या अमोनिया से मिलाने पर घातक जहरीली गैस निकलती है जो फेफड़ों को भारी नुकसान पहुंचाती है।',
    difficulty: 'hard',
  },
  // 39. Cuts
  {
    id: 'q39', topic: 'Cuts', text: 'What is the classical fine dice cut measuring 2mm × 2mm × 2mm called?', textHi: '2 मिमी × 2 मिमी × 2 मिमी की बहुत बारीक डाइस कटिंग को क्या कहते हैं?', type: 'mcq',
    options: [
      { id: 'a', text: 'Brunoise', textHi: 'ब्रुनोइस (Brunoise)' },
      { id: 'b', text: 'Macedoine', textHi: 'मैसिडॉइन (Macedoine)' },
      { id: 'c', text: 'Paysanne', textHi: 'पेज़ैन (Paysanne)' },
      { id: 'd', text: 'Chiffonade', textHi: 'शिफोनेड (Chiffonade)' },
    ],
    correct: 'a',
    explanation: 'Brunoise is produced by cutting a julienne across into precise 2mm cubes.',
    explanationHi: 'ब्रुनोइस जूलियन स्ट्रिप्स को 2 मिमी के छोटे चौकोर घनों में काटकर बनाया जाता है।',
    difficulty: 'medium',
  },
  // 40. Sauces
  {
    id: 'q40', topic: 'Sauces', text: 'What is the primary liquid base used in a classical Béchamel sauce?', textHi: 'शास्त्रीय बेशामेल सॉस में मुख्य तरल क्या प्रयोग होता है?', type: 'mcq',
    options: [
      { id: 'a', text: 'Milk', textHi: 'दूध (Milk)' },
      { id: 'b', text: 'Chicken stock', textHi: 'चिकन स्टॉक' },
      { id: 'c', text: 'Beef broth', textHi: 'बीफ शोरबा' },
      { id: 'd', text: 'Tomato juice', textHi: 'टमाटर का रस' },
    ],
    correct: 'a',
    explanation: 'Béchamel is a white sauce made by stirring warm milk into a white roux (equal parts butter and flour).',
    explanationHi: 'बेशामेल सफेद सॉस है जो सफेद रू में गर्म दूध मिलाकर बनाई जाती है।',
    difficulty: 'easy',
  },
  // 41. Hygiene
  {
    id: 'q41', topic: 'Hygiene', text: 'What is the minimum final rinse temperature (°C) required in commercial dishwashers for thermal sanitisation?', textHi: 'व्यावसायिक डिशवॉशर में थर्मल सैनिटाइजेशन हेतु न्यूनतम रिंस तापमान (°C) क्या चाहिए?', type: 'numeric',
    correct: 82,
    explanation: 'Commercial sanitising dishwashers require a hot water rinse of at least 82°C (180°F) to kill pathogens.',
    explanationHi: 'बर्तनों से कीटाणु नष्ट करने हेतु अंतिम गर्म पानी का रिंस कम से कम 82°C होना चाहिए।',
    difficulty: 'hard',
  },
  // 42. Bakery
  {
    id: 'q42', topic: 'Bakery', text: 'What does "blind baking" a tart shell mean?', textHi: 'टार्ट शैल को "ब्लाइंड बेक" (Blind baking) करने का क्या अर्थ है?', type: 'mcq',
    options: [
      { id: 'a', text: 'Baking the empty pastry crust with baking weights before adding a moist filling', textHi: 'गीली फिलिंग भरने से पहले खाली क्रस्ट को बेकिंग वेट्स के साथ बेक करना' },
      { id: 'b', text: 'Baking without watching the timer', textHi: 'टाइमर देखे बिना बेक करना' },
      { id: 'c', text: 'Baking in a dark oven without light', textHi: 'अंधेरे ओवन में बेक करना' },
      { id: 'd', text: 'Covering the oven door with foil', textHi: 'ओवन का दरवाज़ा ढकना' },
    ],
    correct: 'a',
    explanation: 'Blind baking crisps the raw pastry base and prevents it from turning soggy when wet fillings are added later.',
    explanationHi: 'ब्लाइंड बेकिंग से पेस्ट्री क्रस्ट कुरकुरा बनता है और बाद में गीली सामग्री डालने पर भी गीला नहीं होता।',
    difficulty: 'medium',
  },
  // 43. Kitchen
  {
    id: 'q43', topic: 'Kitchen', text: 'What is the role of the "Aboyeur" during busy restaurant dinner service?', textHi: 'व्यस्त रेस्तरां डिनर सर्विस में "अबुआयूर" (Aboyeur) की क्या भूमिका होती है?', type: 'mcq',
    options: [
      { id: 'a', text: 'The expediter who calls out orders to the kitchen stations and checks plated food', textHi: 'ऑर्डर कॉल करने वाला और तैयार प्लेट्स जांचने वाला एक्सपेडाइटर' },
      { id: 'b', text: 'The chief vegetable peeler', textHi: 'सब्ज़ी छीलने का प्रभारी' },
      { id: 'c', text: 'The wine cellar keeper', textHi: 'वाइन सेलर कीपर' },
      { id: 'd', text: 'The morning kitchen cleaner', textHi: 'सुबह का किचन क्लीनर' },
    ],
    correct: 'a',
    explanation: 'The Aboyeur (barker/expediter) coordinates orders from front-of-house tickets and ensures perfect table timing.',
    explanationHi: 'अबुआयूर किचन स्टेशन्स को ऑर्डर पुकारता है और खाने की गुणवत्ता व समय की जांच करता है।',
    difficulty: 'hard',
  },
  // 44. Cooking
  {
    id: 'q44', topic: 'Cooking', text: 'What does "sweating" vegetables in butter mean?', textHi: 'मक्खन में सब्जियों को "स्वेट" (Sweating) करने का क्या अर्थ है?', type: 'mcq',
    options: [
      { id: 'a', text: 'Cooking gently over low heat in fat without browning, to soften and release juices', textHi: 'धीमी आंच पर बिना भूरा किए पकाना ताकि वे नरम हों व रस छोड़ें' },
      { id: 'b', text: 'Frying at smoking hot temperature', textHi: 'धुआं उठते तापमान पर फ्राई करना' },
      { id: 'c', text: 'Boiling in salted water', textHi: 'नमकीन पानी में उबालना' },
      { id: 'd', text: 'Charring over open charcoal', textHi: 'कोयले पर जलाना' },
    ],
    correct: 'a',
    explanation: 'Sweating softens vegetables in fat over gentle heat under a parchment lid without any caramelisation or browning.',
    explanationHi: 'स्वेटिंग से सब्जियां बिना भूरी हुए कोमल हो जाती हैं और उनका प्राकृतिक स्वाद बाहर आता है।',
    difficulty: 'medium',
  },
  // 45. Storage
  {
    id: 'q45', topic: 'Storage', text: 'What is the international standard storage temperature (°C) for a commercial deep freezer?', textHi: 'व्यावसायिक डीप फ्रीज़र हेतु अंतरराष्ट्रीय मानक भंडारण तापमान (°C) क्या है?', type: 'numeric',
    correct: -18,
    explanation: 'Commercial freezers must run at −18°C (0°F) or below to maintain frozen food quality and halt bacterial activity.',
    explanationHi: 'डीप फ्रीज़र का तापमान −18°C या उससे कम होना चाहिए।',
    difficulty: 'easy',
  },
  // 46. Allergens
  {
    id: 'q46', topic: 'Hygiene', text: 'Which major dietary protein responsible for celiac disease is found in wheat, rye, and barley?', textHi: 'सीलिएक रोग हेतु जिम्मेदार गेहूं, राई व जौ में पाया जाने वाला प्रमुख प्रोटीन कौन सा है?', type: 'mcq',
    options: [
      { id: 'a', text: 'Gluten', textHi: 'ग्लूटेन (Gluten)' },
      { id: 'b', text: 'Casein', textHi: 'केसीन (Casein)' },
      { id: 'c', text: 'Albumin', textHi: 'एल्ब्यूमिन' },
      { id: 'd', text: 'Lactose', textHi: 'लैक्टोज़' },
    ],
    correct: 'a',
    explanation: 'Gluten is the structural grain protein that triggers celiac autoimmune reactions and must be declared as a priority allergen.',
    explanationHi: 'ग्लूटेन वह अनाज प्रोटीन है जिससे एलर्जी होती है, अतः इसे प्रमुख एलर्जेन के रूप में घोषित करना अनिवार्य है।',
    difficulty: 'easy',
  },
  // 47. Cuts
  {
    id: 'q47', topic: 'Cuts', text: 'What classical stick cut measures 5mm × 5mm × 5cm (larger than a julienne)?', textHi: '5 मिमी × 5 मिमी × 5 सेमी की शास्त्रीय स्टिक कटिंग (जूलियन से बड़ी) क्या कहलाती है?', type: 'mcq',
    options: [
      { id: 'a', text: 'Batonnet / Jardinière', textHi: 'बैटोनेट / जार्डिनियर' },
      { id: 'b', text: 'Brunoise', textHi: 'ब्रुनोइस' },
      { id: 'c', text: 'Chiffonade', textHi: 'शिफोनेड' },
      { id: 'd', text: 'Macedoine', textHi: 'मैसिडॉइन' },
    ],
    correct: 'a',
    explanation: 'Batonnet means "little stick" and measures 5mm × 5mm × 5cm; cutting it across yields medium dice (Macédoine).',
    explanationHi: 'बैटोनेट 5 मिमी × 5 मिमी × 5 सेमी की छड़ी जैसी कटिंग है।',
    difficulty: 'medium',
  },
  // 48. Safety
  {
    id: 'q48', topic: 'Safety', text: 'Which type of fire extinguisher should NEVER be used on an electrical equipment fire?', textHi: 'बिजली के उपकरणों में लगी आग पर कौन सा अग्निशामक यंत्र कभी प्रयोग नहीं करना चाहिए?', type: 'mcq',
    options: [
      { id: 'a', text: 'Water (APW) Extinguisher', textHi: 'पानी (Water) का अग्निशामक' },
      { id: 'b', text: 'CO2 (Carbon Dioxide) Extinguisher', textHi: 'CO2 एक्सटिंग्विशर' },
      { id: 'c', text: 'Dry Chemical Powder (ABC) Extinguisher', textHi: 'ड्राई पाउडर (ABC) एक्सटिंग्विशर' },
      { id: 'd', text: 'Clean Agent Extinguisher', textHi: 'क्लीन एजेंट एक्सटिंग्विशर' },
    ],
    correct: 'a',
    explanation: 'Water conducts electrical currents directly back to the firefighter, posing an immediate electrocution hazard.',
    explanationHi: 'पानी बिजली का सुचालक है, जिससे गंभीर करंट लग सकता है। CO2 या ड्राई पाउडर का उपयोग करें।',
    difficulty: 'easy',
  },
  // 49. Units
  {
    id: 'q49', topic: 'Kitchen', text: 'How many grams (g) are in 1 kilogram (kg)?', textHi: '1 किलोग्राम (kg) में कितने ग्राम (g) होते हैं?', type: 'numeric',
    correct: 1000,
    explanation: '1 kilogram equals 1000 grams — the fundamental weight metric in culinary batching and recipes.',
    explanationHi: '1 किलोग्राम में 1000 ग्राम होते हैं — यह रसोई मापन का मूल आधार है।',
    difficulty: 'easy',
  },
  // 50. Sauces
  {
    id: 'q50', topic: 'Sauces', text: 'Which rich brown mother sauce is created by simmering roasted brown veal stock with a brown roux and aromatics?', textHi: 'ब्राउन रू और भुने हुए वील स्टॉक से बनने वाली गाढ़ी भूरी मुख्य सॉस कौन सी है?', type: 'mcq',
    options: [
      { id: 'a', text: 'Espagnole (Brown Sauce)', textHi: 'एस्पैनोल (ब्राउन सॉस)' },
      { id: 'b', text: 'Tomato Sauce', textHi: 'टोमैटो सॉस' },
      { id: 'c', text: 'Béchamel', textHi: 'बेशामेल' },
      { id: 'd', text: 'Velouté', textHi: 'वेलूते' },
    ],
    correct: 'a',
    explanation: 'Espagnole is the classic brown mother sauce, which is further reduced with stock to make demi-glace.',
    explanationHi: 'एस्पैनोल क्लासिक ब्राउन मदर सॉस है, जिसे और गाढ़ा करके डेमी-ग्लास बनाया जाता है।',
    difficulty: 'medium',
  },
];
