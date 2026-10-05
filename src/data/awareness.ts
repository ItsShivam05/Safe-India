import type { AwarenessGuide } from '../types';


export const awarenessGuides: AwarenessGuide[] = [
  {
    id: "personal-situational-awareness",
    category: "personal",
    categoryLabel: { en: "Personal Safety", hi: "व्यक्तिगत सुरक्षा" },
    iconName: "Eye",
    title: {
      en: "Situational Awareness & Night Travel Safety",
      hi: "परिस्थिति के प्रति जागरूकता एवं रात के सफर की सुरक्षा"
    },
    summary: {
      en: "Essential habits to stay alert, avoid vulnerable spots, and intervene safely in public environments.",
      hi: "सार्वजनिक स्थानों पर सतर्क रहने, असुरक्षित स्थानों से बचने और स्वयं को सुरक्षित रखने की ज़रूरी आदतें।"
    },
    doList: {
      en: [
        "Keep your phone charged with speed-dial contacts set to 112 and trusted family.",
        "When traveling late in public transport, sit near the driver, conductor, or in women's designated coaches.",
        "Inform someone of your ETA whenever taking a cab or auto at night.",
        "Trust your instincts: If an elevator or street feels wrong, wait or walk away."
      ],
      hi: [
        "अपना फोन हमेशा चार्ज रखें और 112 तथा परिजनों को स्पीड-डायल में रखें।",
        "रात में सार्वजनिक वाहन में यात्रा करते समय ड्राइवर/कंडक्टर के पास या महिला कोच में बैठें।",
        "कैब या ऑटो में बैठते समय अपने पहुंचने का समय (ETA) घर पर ज़रूर बताएं।",
        "अपनी अंतरात्मा (Gut feeling) पर भरोसा करें: यदि कोई रास्ता या लिफ्ट असुरक्षित लगे तो दूर हट जाएं।"
      ]
    },
    dontList: {
      en: [
        "Don't walk with both earphones plugged in at high volume in unfamiliar places.",
        "Don't share real-time social media location check-ins until after leaving the place.",
        "Don't accept open drinks or unsealed water bottles from strangers."
      ],
      hi: [
        "अरिचित स्थानों पर दोनों कानों में तेज़ आवाज़ में इयरफोन लगाकर न चलें।",
        "स्थान छोड़ने से पहले सोशल मीडिया पर रियल-टाइम चेक-इन पोस्ट न करें।",
        "अपरिचितों से खुली ड्रिंक या बिना सील बंद पानी की बोतल स्वीकार न करें।"
      ]
    },
    checklist: {
      en: [
        "Emergency SOS setup on phone (Power button 3-press shortcut)",
        "Power bank and charged phone",
        "Live location sharing enabled with trusted family",
        "Know nearest police station and hospital landmarks"
      ],
      hi: [
        "फोन में इमरजेंसी SOS सेटअप (पावर बटन 3 बार दबाने वाला फीचर)",
        "पावर बैंक और चार्ज्ड मोबाइल",
        "परिजनों के साथ लाइव लोकेशन शेयरिंग सक्षम करना",
        "नज़दीकी पुलिस स्टेशन का रास्ता जानना"
      ]
    },
    source: {
      name: "Bureau of Police Research and Development (BPR&D)",
      lastReviewed: "October 2026",
      authorityType: "Government"
    }
  },
  {
    id: "digital-scam-prevention",
    category: "digital",
    categoryLabel: { en: "Digital Safety", hi: "डिजिटल एवं साइबर सुरक्षा" },
    iconName: "Lock",
    title: {
      en: "Protecting Yourself from UPI, OTP & Job Scams",
      hi: "UPI, OTP और पार्ट-टाइम जॉब फ्रॉड से बचाव"
    },
    summary: {
      en: "Understanding how fraudsters exploit trust and how to safeguard your money and personal data.",
      hi: "जानिए जालसाज कैसे धोखा देते हैं और अपने पैसे तथा बैंक खातों को कैसे सुरक्षित रखें।"
    },
    doList: {
      en: [
        "Remember: UPI PIN is required ONLY to SEND money, never to RECEIVE money.",
        "Enable Two-Factor Authentication (2FA) on WhatsApp, Gmail, and social media.",
        "Verify unknown calls offering work-from-home or part-time Telegram review jobs.",
        "Report suspicious SMS or phishing links to 1906 / Chakshu portal (sancharsaathi.gov.in)."
      ],
      hi: [
        "याद रखें: UPI PIN केवल पैसे भेजने के लिए चाहिए होता है, पैसे प्राप्त (Receive) करने के लिए नहीं!",
        "व्हाट्सएप, जीमेल और सोशल मीडिया पर टू-फैक्टर ऑथेंटिकेशन (2FA) चालू करें।",
        "टेलीग्राम या व्हाट्सएप पर 'घर बैठे कमाई' या रिव्यू देने वाली पार्ट-टाइम जॉब्स से सावधान रहें।",
        "संदिग्ध लिंक या कॉल की शिकायत चक्षु पोर्टल (sancharsaathi.gov.in) पर करें।"
      ]
    },
    dontList: {
      en: [
        "Don't enter UPI PIN to claim lottery, cashbacks, or QR code rewards.",
        "Don't share OTP or screen-sharing passwords with anyone claiming to be electricity/telecom care.",
        "Don't click links asking you to update APK files outside Google Play Store / Apple App Store."
      ],
      hi: [
        "कैशबैक या लॉटरी का दावा करने वाले किसी भी QR कोड पर UPI PIN दर्ज न करें।",
        "बिजली बिल कटने या केवाईसी (KYC) अपडेट का झांसा देने वालों को OTP न बताएं।",
        "प्ले स्टोर के बाहर किसी अज्ञात मैसेज से मिली APK फाइल डाउनलोड न करें।"
      ]
    },
    checklist: {
      en: [
        "UPI PIN memorized and not written in phone notes",
        "Biometric app lock enabled on GPay/PhonePe/Paytm",
        "Sanchar Saathi Chakshu portal bookmarked",
        "Sim binding active on banking applications"
      ],
      hi: [
        "UPI PIN किसी नोट्स ऐप में लिखकर न रखें",
        "GPay/PhonePe/Paytm पर फिंगरप्रिंट लॉक लगाएं",
        "संचार साथी (Sanchar Saathi) पोर्टल बुकमार्क करें",
        "बैंकिंग ऐप्स में सिम बाइंडिंग सक्रिय रखें"
      ]
    },
    source: {
      name: "Indian Cyber Crime Coordination Centre (I4C) & NPCI",
      url: "https://cybercrime.gov.in",
      lastReviewed: "October 2026",
      authorityType: "Government"
    }
  },
  {
    id: "home-fire-gas-safety",
    category: "home",
    categoryLabel: { en: "Home Safety", hi: "गृह सुरक्षा एवं आग नियंत्रण" },
    iconName: "Home",
    title: {
      en: "Home Electrical, LPG & Emergency Preparedness",
      hi: "घर में बिजली, LPG गैस सुरक्षा एवं आपातकालीन तैयारी"
    },
    summary: {
      en: "Prevent residential fires, gas leaks, and electrical short circuits before accidents happen.",
      hi: "हादसा होने से पहले रसोई गैस लीक, शॉर्ट सर्किट और घर की आग से बचाव के नियम।"
    },
    doList: {
      en: [
        "Replace LPG rubber hose pipe (Suraksha hose) every 2 years.",
        "Keep a fire blanket or ABC dry powder fire extinguisher near the kitchen exit.",
        "Ensure MCB (Miniature Circuit Breaker) and RCCB are installed in main electric DB box.",
        "Keep household emergency kit ready with first aid, torch, and emergency numbers list."
      ],
      hi: [
        "रसोई गैस के रबर पाइप (सुरक्षा होस) को हर 2 साल में बदलें।",
        "रसोई के निकास के पास एक अग्निशामक (Fire Extinguisher) या फायर ब्लैंकेट रखें।",
        "बिजली के मुख्य बोर्ड में MCB और RCCB कट-ऑफ स्विच ज़रूर लगवाएं।",
        "घर में फर्स्ट एड बॉक्स, टॉर्च और जरूरी नंबरों की लिस्ट वाला इमरजेंसी किट तैयार रखें।"
      ]
    },
    dontList: {
      en: [
        "Don't overload single power sockets with heavy appliances (Geyser, AC, Microwave).",
        "Don't leave mobile phones charging on beds or pillows overnight.",
        "Don't store flammable chemicals or excess petrol inside living areas."
      ],
      hi: [
        "एक ही सॉकेट में कई भारी उपकरण (गीजर, एसी, ओवन) न चलाएं।",
        "रातभर फोन को बिस्तर या तकिए के नीचे रखकर चार्ज न करें।",
        "घर के अंदर ज्वलनशील रसायन या पेट्रोल का स्टॉक न रखें।"
      ]
    },
    checklist: {
      en: [
        "Suraksha LPG hose checked for cracks",
        "First aid box stocked (antiseptic, bandage, burn ointment, ORS)",
        "Main electric MCB switch location known to all family members",
        "Working LED torch and extra batteries"
      ],
      hi: [
        "LPG गैस पाइप में दरार की जांच करें",
        "फर्स्ट एड बॉक्स में बर्न क्रीम, डिटॉल, पट्टी, ओआरएस रखें",
        "घर के सभी सदस्यों को मुख्य बिजली MCB बोर्ड की जानकारी हो",
        "काम करती हुई एलईडी टॉर्च और सेल रखें"
      ]
    },
    source: {
      name: "National Disaster Management Authority (NDMA)",
      lastReviewed: "October 2026",
      authorityType: "Disaster Authority"
    }
  },
  {
    id: "disaster-kit-earthquake-flood",
    category: "disaster",
    categoryLabel: { en: "Disaster Preparedness", hi: "आपदा प्रबंधन एवं तैयारी" },
    iconName: "ShieldAlert",
    title: {
      en: "Earthquake & Flood Survival Preparation",
      hi: "भूकंप एवं बाढ़ से बचाव और इमरजेंसी किट"
    },
    summary: {
      en: "What to do during earthquake tremors, heavy local flooding, and building evacuation.",
      hi: "भूकंप के झटके आने या भारी बाढ़/जलभराव के दौरान क्या करें और जीवन कैसे बचाएं।"
    },
    doList: {
      en: [
        "During Earthquake: Drop, Cover, and Hold On! Take cover under a sturdy desk or table.",
        "If outdoors during quake: Move away from buildings, streetlights, overhead power lines, and bridges.",
        "During Flood: Move to higher ground immediately; turn off main gas line and electrical breaker.",
        "Prepare a Go-Bag with 3 days of non-perishable food, water, ID copies, medicine, and torch."
      ],
      hi: [
        "भूकंप के दौरान: झुको, ढको और पकड़ो (Drop, Cover, Hold On)! मजबूत मेज़ के नीचे शरण लें।",
        "यदि भूकंप के समय बाहर हैं: इमारतों, बिजली के खंभों और ओवरब्रिज से दूर खुले मैदान में जाएं।",
        "बाढ़ की स्थिति में: तुरंत ऊंचे स्थानों पर जाएं; घर का मेन बिजली बोर्ड और गैस बंद कर दें।",
        "एक 'गो-बैग' तैयार रखें जिसमें 3 दिन का सूखा राशन, पानी, टॉर्च, फर्स्ट एड और पहचान पत्र हों।"
      ]
    },
    dontList: {
      en: [
        "Don't use elevators during or immediately after earthquake tremors.",
        "Don't walk or drive through moving flood waters (just 6 inches of moving water can knock a person down).",
        "Don't touch fallen electric wires or submerged electric poles."
      ],
      hi: [
        "भूकंप के दौरान या तुरंत बाद लिफ्ट का उपयोग कभी न करें।",
        "बहते हुए बाढ़ के पानी में पैदल चलने या गाड़ी चलाने की कोशिश न करें।",
        "टूटे हुए बिजली के तारों या पानी में डूबे खंभों को न छुएं।"
      ]
    },
    checklist: {
      en: [
        "Go-Bag with water bottles & dry snacks (chana, biscuits)",
        "Waterproof pouch for Aadhaar, PAN, and insurance papers",
        "Battery powered radio / mobile power bank",
        "Whistle to signal rescuers if trapped"
      ],
      hi: [
        "इमरजेंसी बैकपैक (पानी की बोतलें, बिस्कुट, चना)",
        "आधार, पैन और बीमा कागजात के लिए वाटरप्रूफ बैग",
        "पावर बैंक और बैटरी वाला छोटा रेडियो",
        "मुसीबत में सीटी (Whistle) ताकि रेस्क्यू टीम आपकी आवाज़ सुन सके"
      ]
    },
    source: {
      name: "NDMA India & National Disaster Response Force (NDRF)",
      url: "https://ndma.gov.in",
      lastReviewed: "October 2026",
      authorityType: "Disaster Authority"
    }
  }
];
