import type { EmergencyScenario } from '../types';


export const emergencyScenarios: EmergencyScenario[] = [
  // --- PERSONAL SAFETY ---
  {
    id: "someone-following",
    category: "personal-safety",
    categoryLabel: { en: "Personal Safety", hi: "व्यक्तिगत सुरक्षा" },
    iconName: "UserX",
    title: {
      en: "Someone is following me",
      hi: "कोई मेरा पीछा कर रहा है"
    },
    urgency: "high",
    immediateCallNumber: "112",
    immediateActionText: {
      en: "If you feel in imminent danger, dial 112 or 1091 (Women Helpline) immediately.",
      hi: "यदि आप गंभीर खतरे में महसूस कर रहे हैं, तो तुरंत 112 या 1091 पर कॉल करें।"
    },
    doNow: {
      en: [
        "Head immediately toward a well-lit, populated area, open store, metro station, or security post.",
        "Change your walking pace or cross the street to confirm if the person is actively tracking your path.",
        "Call a trusted friend or family member on speakerphone and state your exact live location clearly.",
        "Enter a public establishment (restaurant, hotel lobby, shop) and inform staff or security.",
        "Share your live location via WhatsApp/location-sharing app with at least two trusted contacts."
      ],
      hi: [
        "तुरंत किसी रोशनी वाले, भीड़भाड़ वाले स्थान, खुली दुकान, मेट्रो स्टेशन या सुरक्षा चौकी की ओर बढ़ें।",
        "अपनी चलने की गति बदलें या सड़क पार करके यह पक्का करें कि क्या वह व्यक्ति वास्तव में आपका पीछा कर रहा है।",
        "किसी विश्वसनीय दोस्त या परिवार के सदस्य को स्पीकर पर कॉल करें और अपनी सही लाइव लोकेशन जोर से बताएं।",
        "किसी सार्वजनिक स्थान (रेस्तरां, दुकान, पेट्रोल पंप) के अंदर जाएं और वहां के कर्मचारियों या सुरक्षाकर्मी को सूचित करें।",
        "व्हाट्सएप या मैप्स के ज़रिए अपने 2-3 परिजनों को तुरंत लाइव लोकेशन भेजें।"
      ]
    },
    dont: {
      en: [
        "Don't head toward your home or isolated alleys where you could be trapped.",
        "Don't confront or aggressively challenge the person if you are alone.",
        "Don't prioritize recording video or taking photos over getting to a safe place.",
        "Don't wear earphones or look down continuously at your phone display."
      ],
      hi: [
        "गलती से भी अपने घर या सूनी गलियों की तरफ न जाएं जहां आप अकेले फंस सकते हैं।",
        "यदि आप अकेले हैं तो व्यक्ति से बहस या हाथापाई न करें।",
        "सुरक्षित स्थान पर पहुँचने से पहले फोटो या वीडियो रिकॉर्ड करने में समय बर्बाद न करें।",
        "कानों में इयरफोन न लगाएं और न ही लगातार फोन की स्क्रीन में देखकर चलें।"
      ]
    },
    afterDanger: {
      en: [
        "Remain inside a safe public place until an emergency contact or official assistance arrives.",
        "Note down physical characteristics (clothing, vehicle registration number, height, distinctive features).",
        "Report the incident to the nearest police station or via official state police safety apps (e.g. Himmat, Delhi Police, Citizen App)."
      ],
      hi: [
        "जब तक सहायता या परिजन न आ जाएं, तब तक सुरक्षित सार्वजनिक स्थान के अंदर ही रहें।",
        "व्यक्ति या गाड़ी का विवरण नोट करें (कपड़े, वाहन नंबर, हुलिया)।",
        "निकटतम पुलिस स्टेशन में या राज्य पुलिस की सुरक्षा ऐप पर घटना की रिपोर्ट करें।"
      ]
    },
    resources: [
      { name: "National Emergency Response", phone: "112", purpose: "All-in-one Emergency Assistance across India" },
      { name: "National Women Helpline", phone: "1091", purpose: "24/7 Helpline for Women in distress" },
      { name: "Emergency Women Safety (WCD)", phone: "181", purpose: "Women Safety and Support Services" }
    ],
    source: {
      name: "Ministry of Home Affairs & National Crime Records Bureau (NCRB)",
      url: "https://112.gov.in",
      lastReviewed: "October 2026",
      authorityType: "Government"
    },
    searchKeywords: ["following", "stalker", "someone following me", "unsafe", "chasing", "peecha", "pecha", "woman safety"]
  },
  {
    id: "unsafe-cab",
    category: "personal-safety",
    categoryLabel: { en: "Personal Safety", hi: "व्यक्तिगत सुरक्षा" },
    iconName: "Car",
    title: {
      en: "Unsafe cab, auto, or ride-share situation",
      hi: "कैब, ऑटो या राइड-शेयर में असुरक्षित महसूस होना"
    },
    urgency: "high",
    immediateCallNumber: "112",
    immediateActionText: {
      en: "Driver off-route or acting suspiciously? Use app SOS + dial 112.",
      hi: "ड्राइवर गलत रास्ते पर जा रहा है या संदिग्ध व्यवहार कर रहा है? ऐप में SOS दबाएं + 112 पर कॉल करें।"
    },
    doNow: {
      en: [
        "Tap the in-app Safety / SOS button in Uber, Ola, or Rapido immediately.",
        "Dial 112 or call a contact, loud enough for the driver to hear: 'I am sharing my live GPS route with you right now.'",
        "Check vehicle door child-locks before or during the ride; ensure window can roll down.",
        "If the driver stops unexpectedly or refuses to follow route, demand to stop at a petrol pump or traffic signal and step out."
      ],
      hi: [
        "ओला/उबर/रैपिडो ऐप में तुरंत SOS या सुरक्षा बटन दबाएं।",
        "112 या परिवार को जोर से कॉल करके कहें: 'मैने आपकी लाइव GPS लोकेशन शेयर कर दी है।'",
        "यदि ड्राइवर गाड़ी रोकता है या गलत दिशा में मुड़ता है, तो पेट्रोल पंप या ट्रैफिक सिग्नल पर गाड़ी रुकवाकर तुरंत बाहर निकलें।",
        "खिड़की थोड़ी खुली रखें ताकि आप जरूरत पड़ने पर मदद के लिए चिल्ला सकें।"
      ]
    },
    dont: {
      en: [
        "Don't accept drinks or food offered by the driver.",
        "Don't stay silent hoping the driver will automatically turn back to the right route.",
        "Don't sleep or lose awareness of your live route navigation on your phone."
      ],
      hi: [
        "चालक द्वारा दी गई कोई भी खाने-पीने की चीज़ स्वीकार न करें।",
        "यह सोचकर चुप न रहें कि ड्राइवर खुद सही रास्ते पर आ जाएगा।",
        "सफर के दौरान सोएं नहीं और फोन पर अपने मैप पर नज़र बनाए रखें।"
      ]
    },
    afterDanger: {
      en: [
        "Report the driver ID and vehicle registration to both the ride aggregator app and local police.",
        "Save screenshots of your ride history and GPS route."
      ],
      hi: [
        "राइड ऐप और स्थानीय पुलिस दोनों को ड्राइवर का विवरण और वाहन नंबर दर्ज कराएं।",
        "अपनी राइड हिस्ट्री और GPS रूट का स्क्रीनशॉट संभालकर रखें।"
      ]
    },
    resources: [
      { name: "Emergency Helpline", phone: "112", purpose: "National Emergency Response System" },
      { name: "Women Helpline", phone: "1091", purpose: "24/7 Distress Assistance" }
    ],
    source: {
      name: "Ministry of Road Transport and Highways (MoRTH)",
      lastReviewed: "October 2026",
      authorityType: "Government"
    },
    searchKeywords: ["cab", "uber", "ola", "auto", "taxi", "driver", "route", "kidnap"]
  },

  // --- MEDICAL ---
  {
    id: "unconscious-person",
    category: "medical",
    categoryLabel: { en: "Medical Emergency", hi: "चिकित्सा आपात स्थिति" },
    iconName: "Activity",
    title: {
      en: "Someone is unconscious or unresponsive",
      hi: "कोई व्यक्ति बेहोश या बेसुध है"
    },
    urgency: "critical",
    immediateCallNumber: "108",
    immediateActionText: {
      en: "Call 108 or 112 immediately for an Ambulance. Check for breathing.",
      hi: "एंबुलेंस के लिए तुरंत 108 या 112 डायल करें। सांस की जांच करें।"
    },
    doNow: {
      en: [
        "Call 108 (or 112) for emergency medical dispatch; state your exact landmark clearly.",
        "Check responsiveness: Tap their shoulders firmly and ask loudly 'Are you okay?'",
        "Check breathing: Look at chest for movement for 5-10 seconds.",
        "If breathing normally: Carefully turn them onto their side in the Recovery Position to keep airway clear.",
        "If NOT breathing: Begin CPR compressions if trained (push hard and fast in center of chest, 100-120 compressions/minute)."
      ],
      hi: [
        "तुरंत 108 या 112 पर एम्बुलेंस के लिए कॉल करें और अपना सही लैंडमार्क बताएं।",
        "जांचें: व्यक्ति के कंधों को थपथपाएं और ज़ोर से पूछें 'क्या आप ठीक हैं?'",
        "सांस जांचें: 5-10 सेकंड तक देखें कि क्या सीना ऊपर-नीचे हो रहा है।",
        "यदि सांस चल रही है: व्यक्ति को करवट दिलाकर (रिकवरी पोजीशन) लिटाएं ताकि सांस की नली खुली रहे।",
        "यदि सांस नहीं चल रही: यदि आप सीपीआर (CPR) जानते हैं तो सीने के बीचों-बीच तेजी से दबाव देना शुरू करें।"
      ]
    },
    dont: {
      en: [
        "Don't give water, food, or liquids to an unconscious person.",
        "Don't slap or shake the person violently, especially around the neck/spine.",
        "Don't leave the person unattended unless you must call for help."
      ],
      hi: [
        "बेहोश व्यक्ति के मुंह में पानी, खाना या कोई भी तरल पदार्थ बिल्कुल न डालें।",
        "व्यक्ति को जोर-जोर से न हिलाएं, खासकर गर्दन या रीढ़ की हड्डी को झटका न दें।",
        "जब तक एम्बुलेंस न आ जाए, व्यक्ति को अकेला न छोड़ें।"
      ]
    },
    afterDanger: {
      en: [
        "Keep the casualty warm with a blanket or jacket until medical help arrives.",
        "Inform arriving paramedics if the person experienced trauma, seizures, or ingested substances."
      ],
      hi: [
        "पैरामेडिक्स के आने तक मरीज को कंबल या चादर से ढककर रखें।",
        "डॉक्टरों को बताएं कि क्या व्यक्ति को चोट लगी थी या कोई दौरा पड़ा था।"
      ]
    },
    resources: [
      { name: "National Ambulance Service", phone: "108", purpose: "Free Medical Emergency Response" },
      { name: "Emergency Dispatch", phone: "112", purpose: "National Integrated Emergency" }
    ],
    source: {
      name: "Indian Red Cross Society & AIIMS Emergency Medicine",
      lastReviewed: "October 2026",
      authorityType: "Medical Authority"
    },
    searchKeywords: ["unconscious", "fainted", "behosh", "breathing", "cpr", "ambulance", "108"]
  },
  {
    id: "severe-bleeding",
    category: "medical",
    categoryLabel: { en: "Medical Emergency", hi: "चिकित्सा आपात स्थिति" },
    iconName: "Droplet",
    title: {
      en: "Someone is bleeding heavily",
      hi: "बहुत अधिक खून बह रहा है"
    },
    urgency: "critical",
    immediateCallNumber: "108",
    immediateActionText: {
      en: "Apply direct firm pressure on the wound with a clean cloth immediately.",
      hi: "साफ कपड़े से घाव पर तुरंत सीधा और मजबूत दबाव बनाएं।"
    },
    doNow: {
      en: [
        "Dial 108 or 112 for medical emergency dispatch.",
        "Apply direct, firm pressure on the wound using a clean cloth, towel, or sterile bandage.",
        "Keep pressure applied continuously without lifting the cloth to check.",
        "If blood seeps through, add another cloth on top; DO NOT remove the original layer.",
        "Elevate the injured limb above heart level if no bone fracture is suspected."
      ],
      hi: [
        "108 या 112 पर एम्बुलेंस के लिए कॉल करें।",
        "घाव पर साफ कपड़े या तौलिए से सीधे और लगातार दबाव बनाएं।",
        "दबाव बनाए रखें, बार-बार कपड़ा उठाकर घाव न देखें।",
        "यदि कपड़ा खून से भीग जाए, तो उसके ऊपर दूसरा कपड़ा रखें, पुराना न हटाएं।",
        "यदि हड्डी न टूटी हो तो घायल हिस्से को दिल के स्तर से थोड़ा ऊपर उठाएं।"
      ]
    },
    dont: {
      en: [
        "Don't remove embedded objects (knives, glass fragments) from wounds; press around them.",
        "Don't use dirty rags, dirt, or turmeric on deep arterial gushing wounds.",
        "Don't tie tight tourniquets unless trained and faced with severe extremity amputation."
      ],
      hi: [
        "घाव में धंसी हुई चीजों (कांच, चाकू) को बाहर न निकालें; उनके चारों ओर दबाव दें।",
        "गहरे घाव पर गंदे कपड़े, मिट्टी या हल्दी न लगाएं।",
        "बिना प्रशिक्षण के अत्यधिक कड़ा कमानी/रस्सी न बांधें।"
      ]
    },
    afterDanger: {
      en: [
        "Keep the person lying down, calm, and warm to prevent medical shock."
      ],
      hi: [
        "मरीज को लेटाकर रखें और शांत रखें ताकि वह सदमे (Shock) में न जाए।"
      ]
    },
    resources: [
      { name: "Medical Emergency Ambulance", phone: "108", purpose: "24/7 Ambulance Dispatch" },
      { name: "Emergency Center", phone: "112", purpose: "National Emergency Response" }
    ],
    source: {
      name: "Directorate General of Health Services (DGHS India)",
      lastReviewed: "October 2026",
      authorityType: "Medical Authority"
    },
    searchKeywords: ["bleeding", "blood", "cut", "wound", "khoon", "hemorrhage", "accident wound"]
  },

  // --- FIRE & DISASTER ---
  {
    id: "building-fire",
    category: "fire-disaster",
    categoryLabel: { en: "Fire & Disaster", hi: "आग एवं आपदा" },
    iconName: "Flame",
    title: {
      en: "Fire in a building or home",
      hi: "इमारत या घर में आग लगना"
    },
    urgency: "critical",
    immediateCallNumber: "101",
    immediateActionText: {
      en: "Get out immediately! Stay low under smoke. Dial 101 or 112.",
      hi: "तुरंत बाहर निकलें! धुएं से बचने के लिए झुककर चलें। 101 या 112 डायल करें।"
    },
    doNow: {
      en: [
        "Alert everyone loudly: 'FIRE! FIRE!' and evacuate immediately.",
        "Stay LOW to the floor where air is cleaner if smoke is present.",
        "Feel closed door handles with the back of your hand; if HOT, do NOT open.",
        "Use stairs ONLY. Never use elevators during a fire emergency.",
        "Close doors behind you as you exit to contain smoke and oxygen supply to the fire.",
        "Call Fire Brigade 101 or 112 once safely outside."
      ],
      hi: [
        "सबको जोर से चिल्लाकर सचेत करें: 'आग! आग!' और तुरंत बाहर भागें।",
        "यदि धुआं भरा है तो जमीन के पास झुककर/रेंगकर चलें क्योंकि साफ हवा नीचे रहती है।",
        "बंद दरवाजों के हैंडल को हाथ के पीछे से छुएं; अगर गर्म है तो दरवाजा न खोलें।",
        "केवल सीढ़ियों का उपयोग करें। लिफ्ट (Elevator) का प्रयोग कभी न करें।",
        "बाहर निकलते समय पीछे के दरवाजे बंद करते जाएं ताकि आग और धुआं न फैले।",
        "बाहर सुरक्षित पहुँचकर तुरंत 101 या 112 पर फायर ब्रिगेड को कॉल करें।"
      ]
    },
    dont: {
      en: [
        "Don't go back inside for clothes, documents, pets, or valuables.",
        "Don't use elevators under any circumstances.",
        "Don't open hot doors which could trigger an explosive backdraft."
      ],
      hi: [
        "सामान, दस्तावेज या कपड़ों के लिए वापस अंदर न जाएं।",
        "किसी भी स्थिति में लिफ्ट का प्रयोग न करें।",
        "गर्म महसूस होने वाले दरवाजे न खोलें।"
      ]
    },
    afterDanger: {
      en: [
        "Gather at your designated building assembly point outside.",
        "Inform fire fighters immediately if anyone is missing or trapped inside."
      ],
      hi: [
        "इमारत के बाहर सुरक्षित असेंबली प्वाइंट पर इकट्ठा हों।",
        "फायर ब्रिगेड को तुरंत बताएं यदि कोई अंदर फंसा रह गया है।"
      ]
    },
    resources: [
      { name: "Fire Services Helpline", phone: "101", purpose: "National Fire Emergency Services" },
      { name: "National Disaster Response", phone: "112", purpose: "Integrated Emergency Helpline" }
    ],
    source: {
      name: "National Disaster Management Authority (NDMA)",
      url: "https://ndma.gov.in",
      lastReviewed: "October 2026",
      authorityType: "Disaster Authority"
    },
    searchKeywords: ["fire", "aag", "smoke", "building fire", "extinguisher", "101"]
  },
  {
    id: "lpg-gas-leak",
    category: "fire-disaster",
    categoryLabel: { en: "Fire & Disaster", hi: "आग एवं आपदा" },
    iconName: "Wind",
    title: {
      en: "LPG Gas Leakage in kitchen or home",
      hi: "रसोई में LPG गैस लीक होना"
    },
    urgency: "high",
    immediateCallNumber: "1906",
    immediateActionText: {
      en: "Do NOT touch any electric switches! Open windows & close regulator.",
      hi: "कोई भी बिजली का स्विच न छुएं! खिड़कियां खोलें और रेगुलेटर बंद करें।"
    },
    doNow: {
      en: [
        "Close the LPG cylinder main regulator valve immediately (turn knob clockwise).",
        "Open all windows and doors fully to disperse gas concentration.",
        "Call LPG Emergency Helpline 1906 from OUTSIDE your home.",
        "Evacuate all members and pets outside to open air."
      ],
      hi: [
        "गैस सिलेंडर का मेन रेगुलेटर वाल्व तुरंत बंद करें।",
        "कमरे और रसोई की सभी खिड़कियां-दरवाजे खोल दें ताकि गैस बाहर निकल सके।",
        "घर के बाहर जाकर LPG आपातकालीन हेल्पलाइन 1906 पर कॉल करें।",
        "परिवार के सभी सदस्यों और पालतू जानवरों को बाहर खुली हवा में ले जाएं।"
      ]
    },
    dont: {
      en: [
        "Don't turn ON or turn OFF any electrical switches, light buttons, or exhaust fans.",
        "Don't light matches, candles, or use gas stoves.",
        "Don't use mobile phones or flashlights inside the gas-filled room."
      ],
      hi: [
        "रसोई या घर का कोई भी स्विच (लाइट, पंखा, एग्जॉस्ट) चालू या बंद न करें।",
        "माचिस, मोमबत्ती या आग बिल्कुल न जलाएं।",
        "गैस से भरे कमरे में मोबाइल फोन या टॉर्च का प्रयोग न करें।"
      ]
    },
    afterDanger: {
      en: [
        "Wait for an official technician from Indane, Bharatgas, or HP Gas to inspect the hose and valve before reusing."
      ],
      hi: [
        "गैस एजेंसी (Indane/Bharatgas/HP) के तकनीशियन द्वारा पाइप जांचने के बाद ही दोबारा इस्तेमाल करें।"
      ]
    },
    resources: [
      { name: "LPG Emergency Leak Helpline", phone: "1906", purpose: "24x7 All-India LPG Emergency Call Center" },
      { name: "Fire Services", phone: "101", purpose: "Fire Department Dispatch" }
    ],
    source: {
      name: "Ministry of Petroleum and Natural Gas (MoPNG)",
      lastReviewed: "October 2026",
      authorityType: "Government"
    },
    searchKeywords: ["gas leak", "lpg", "cylinder", "cylinder leak", "kitchen gas", "1906"]
  },

  // --- ROAD & TRANSPORT ---
  {
    id: "road-accident",
    category: "road-transport",
    categoryLabel: { en: "Road & Transport", hi: "सड़क एवं परिवहन" },
    iconName: "ShieldAlert",
    title: {
      en: "Road Traffic Accident / Witnessed Crash",
      hi: "सड़क दुर्घटना / एक्सीडेंट देखना"
    },
    urgency: "critical",
    immediateCallNumber: "112",
    immediateActionText: {
      en: "Protection under Good Samaritan Law! Call 112 & 108 immediately.",
      hi: "गुड सेमारेटन कानून के तहत मदद करने वाले को सुरक्षा! 112 और 108 पर कॉल करें।"
    },
    doNow: {
      en: [
        "Park your vehicle safely and turn on hazard warning lights to protect the crash scene.",
        "Call 112 (Police) and 108 (Ambulance) immediately; give exact highway/road landmark.",
        "Check if victims are conscious. DO NOT move severely injured victims unless there is immediate risk of fire or explosion.",
        "If minor bleeding, apply clean pressure. Keep victims calm until paramedics arrive.",
        "Remember: Supreme Court Good Samaritan Law protects you from police harassment or compulsory hospital deposits."
      ],
      hi: [
        "अपनी गाड़ी सुरक्षित खड़ी करके हैज़र्ड लाइट (इंडिकेटर) चालू करें ताकि पीछे से गाड़ियां न टकराएं।",
        "112 (पुलिस) और 108 (एम्बुलेंस) पर तुरंत कॉल करके सही सड़क या हाईवे का लैंडमार्क दें।",
        "जांचें कि घायल होश में हैं या नहीं। रीढ़ या गर्दन की चोट वाले व्यक्ति को बिना एम्बुलेंस के न हिलाएं (जब तक आग का खतरा न हो)।",
        "सुप्रीम कोर्ट के 'गुड सेमारेटन' नियम के अनुसार मदद करने वाले नागरिक से पुलिस कोई बेवजह पूछताछ नहीं कर सकती।"
      ]
    },
    dont: {
      en: [
        "Don't move spinal-injury victims recklessly, which can cause paralysis.",
        "Don't give water to unconscious crash victims.",
        "Don't crowd around victims blocking fresh air."
      ],
      hi: [
        "गंभीर घायल को बिना स्ट्रेचर के जबरन न उठाएं।",
        "बेहोश या गंभीर रूप से घायल व्यक्ति के मुंह में पानी न डालें।",
        "घायल व्यक्ति के चारों ओर भीड़ बनाकर हवा न रोकें।"
      ]
    },
    afterDanger: {
      en: [
        "Provide clear eyewitness location information to arriving traffic police and ambulance."
      ],
      hi: [
        "आने वाली ट्रैफिक पुलिस और डॉक्टरों को दुर्घटना का विवरण दें।"
      ]
    },
    resources: [
      { name: "National Emergency Service", phone: "112", purpose: "Immediate Police & Rescue Dispatch" },
      { name: "Ambulance Helpline", phone: "108", purpose: "National Highway Medical Emergency" }
    ],
    source: {
      name: "Ministry of Road Transport and Highways (Good Samaritan Guidelines)",
      url: "https://morth.nic.in",
      lastReviewed: "October 2026",
      authorityType: "Government"
    },
    searchKeywords: ["accident", "road crash", "highway", "good samaritan", "108", "112", "car crash"]
  },

  // --- DIGITAL EMERGENCY ---
  {
    id: "upi-bank-fraud",
    category: "digital-emergency",
    categoryLabel: { en: "Digital Emergency", hi: "डिजिटल एवं साइबर आपात स्थिति" },
    iconName: "CreditCard",
    title: {
      en: "UPI Fraud, Bank Scam, or Unauthorized Money Transfer",
      hi: "UPI फ्रॉड, बैंक खाता धोखाधड़ी या बिना इजाज़त पैसे कटना"
    },
    urgency: "critical",
    immediateCallNumber: "1930",
    immediateActionText: {
      en: "Golden Hour! Dial 1930 Cyber Fraud Helpline within 2 hours to freeze funds.",
      hi: "गोल्डन आवर! पैसे वापस पाने के लिए 2 घंटे के भीतर साइबर हेल्पलाइन 1930 पर कॉल करें।"
    },
    doNow: {
      en: [
        "DIAL 1930 IMMEDIATELY (National Cyber Crime Helpline) to report financial fraud and initiate bank account freeze.",
        "Block your debit/credit card and mobile banking app via bank helpline or net banking.",
        "Take screenshot of transaction SMS, UTR number, UPI transaction ID, and fraudster's phone number.",
        "File an official online complaint at cybercrime.gov.in within 24 hours.",
        "Notify your bank branch manager in writing within 3 days for RBI Zero Liability protection."
      ],
      hi: [
        "तुरंत 1930 (राष्ट्रीय साइबर अपराध हेल्पलाइन) पर कॉल करके ट्रांजेक्शन फ्रीज करवाएं।",
        "अपने बैंक की कस्टमर केयर पर कॉल करके अपना डेबिट/क्रेडिट कार्ड और UPI ब्लॉक करें।",
        "ट्रांजैक्शन का SMS, UTR नंबर, UPI ID और फ्रॉड करने वाले का नंबर संभालकर स्क्रीनशॉट लें।",
        "cybercrime.gov.in पोर्टल पर आधिकारिक साइबर शिकायत दर्ज करें।",
        "RBI के नियमों के अनुसार 3 दिनों के भीतर अपने बैंक में लिखित शिकायत दें।"
      ]
    },
    dont: {
      en: [
        "Don't share OTP, PIN, or password with anyone claiming to be bank customer care, UPI support, or police.",
        "Don't download remote access apps like AnyDesk, TeamViewer, or RustDesk on instructions from callers.",
        "Don't delay reporting beyond 2 hours if money has just been deducted."
      ],
      hi: [
        "बैंक अधिकारी, कस्टमर केयर या पुलिस बनकर आए किसी भी व्यक्ति को OTP या UPI पिन न बताएं।",
        "कॉल करने वाले के कहने पर AnyDesk, TeamViewer या QuickSupport ऐप इंस्टॉल न करें।",
        "पैसे कटने के बाद 1930 पर कॉल करने में बिल्कुल देरी न करें।"
      ]
    },
    afterDanger: {
      en: [
        "Change all mobile banking passwords, UPI PINs, and email login credentials from a safe device.",
        "Obtain a police FIR copy / cyber complaint acknowledgement."
      ],
      hi: [
        "अपने सभी बैंक पासवर्ड, UPI पिन और ईमेल पासवर्ड तुरंत बदलें।",
        "साइबर पोर्टल से मिली शिकायत की पावती (Acknowledgement copy) सुरक्षित रखें।"
      ]
    },
    resources: [
      { name: "National Cyber Crime Helpline", phone: "1930", purpose: "Financial Cyber Fraud Reporting & Fund Freeze" },
      { name: "Official Cyber Crime Portal", phone: "cybercrime.gov.in", purpose: "Ministry of Home Affairs Cyber Portal" }
    ],
    source: {
      name: "Indian Cyber Crime Coordination Centre (I4C), MHA",
      url: "https://cybercrime.gov.in",
      lastReviewed: "October 2026",
      authorityType: "Government"
    },
    searchKeywords: ["upi", "fraud", "bank", "scam", "otp", "1930", "money deducted", "cybercrime", "phishing"]
  },
  {
    id: "phone-stolen",
    category: "digital-emergency",
    categoryLabel: { en: "Digital Emergency", hi: "डिजिटल एवं साइबर आपात स्थिति" },
    iconName: "Smartphone",
    title: {
      en: "Phone Stolen or Lost",
      hi: "मोबाइल फोन चोरी होना या खो जाना"
    },
    urgency: "high",
    immediateCallNumber: "14422",
    immediateActionText: {
      en: "Block your SIM immediately & use CEIR Portal (ceir.gov.in) to render phone useless.",
      hi: "तुरंत सिम ब्लॉक करें और CEIR पोर्टल (ceir.gov.in) से फोन का IMEI ब्लॉक करें।"
    },
    doNow: {
      en: [
        "Call your telecom operator (Jio, Airtel, Vi, BSNL) to BLOCK your SIM card immediately.",
        "Use another device to log into Google Find My Device (Android) or iCloud Find My (iPhone) to erase data remotely.",
        "File an online police lost report / e-FIR with your state police portal to get a report copy.",
        "Visit CEIR Portal (ceir.gov.in) operated by DoT to block the device IMEI across all Indian telecom networks.",
        "Revoke access to WhatsApp, Google Account, UPI apps, and Netbanking."
      ],
      hi: [
        "अपनी टेलीकॉम कंपनी (Airtel/Jio/Vi/BSNL) को कॉल करके अपना सिम कार्ड तुरंत ब्लॉक करवाएं।",
        "दूसरे फोन या लैपटॉप से Google Find My Device या iCloud में लॉगिन करके डेटा मिटाएं।",
        "राज्य पुलिस के पोर्टल पर फोन खोने की e-FIR या शिकायत दर्ज करके कॉपी प्राप्त करें।",
        "भारत सरकार के CEIR पोर्टल (ceir.gov.in) पर जाकर अपना IMEI ब्लॉक करें ताकि चोर फोन का उपयोग न कर सके।",
        "अपने बैंक खातों, व्हाट्सएप और गूगल अकाउंट से खोए हुए फोन का एक्सेस हटाएं।"
      ]
    },
    dont: {
      en: [
        "Don't wait hoping the thief will return the phone before blocking SIM and banking apps.",
        "Don't click on suspicious recovery links sent via SMS to your alternate numbers."
      ],
      hi: [
        "यह सोचकर इंतजार न करें कि चोर फोन लौटा देगा; तुरंत सिम और बैंकिंग ब्लॉक करें।",
        "फोन मिलने का दावा करने वाले संदिग्ध मैसेज लिंक पर क्लिक न करें।"
      ]
    },
    afterDanger: {
      en: [
        "Re-issue a duplicate SIM from your telecom service store with valid Govt ID proof."
      ],
      hi: [
        "पहचान पत्र दिखाकर अपनी टेलीकॉम कंपनी के स्टोर से नया डुप्लीकेट सिम निकलवाएं।"
      ]
    },
    resources: [
      { name: "CEIR Portal DoT", phone: "ceir.gov.in", purpose: "Central Equipment Identity Register (Block Lost Mobile)" },
      { name: "National Cyber Helpline", phone: "1930", purpose: "Cyber Security Assistance" }
    ],
    source: {
      name: "Department of Telecommunications (DoT) & Sanchar Saathi",
      url: "https://ceir.gov.in",
      lastReviewed: "October 2026",
      authorityType: "Government"
    },
    searchKeywords: ["phone stolen", "mobile lost", "imei", "ceir", "sim block", "stolen phone"]
  },

  // --- ANIMAL RELATED ---
  {
    id: "snake-bite",
    category: "animal",
    categoryLabel: { en: "Animal Emergency", hi: "पशु एवं वन्यजीव आपात स्थिति" },
    iconName: "Shield",
    title: {
      en: "Snake Encounter or Snake Bite",
      hi: "सांप का काटना या सांप दिखना"
    },
    urgency: "critical",
    immediateCallNumber: "108",
    immediateActionText: {
      en: "Keep the person STILL. Do NOT suck venom or cut wound. Call 108.",
      hi: "व्यक्ति को बिल्कुल शांत और स्थिर रखें। घाव को न काटें न जहर चूसें! 108 पर कॉल करें।"
    },
    doNow: {
      en: [
        "Call 108 / 112 immediately for emergency hospital transport with Polyvalent Anti-Snake Venom (ASV).",
        "Keep the victim calm and completely STILL; movement accelerates venom spread through lymphatics.",
        "Immobilize the bitten limb below heart level using a splint or firm bandage (Do NOT cut off arterial pulse).",
        "Remove tight rings, watches, anklets, or footwear from the bitten limb before swelling starts.",
        "Note snake features (color, pattern, head shape) from a SAFE distance if possible."
      ],
      hi: [
        "एंबुलेंस के लिए 108/112 पर तुरंत कॉल करें (एंटी-स्नेक वेनम अस्पताल ले जाने के लिए)।",
        "मरीज को पूरी तरह शांत और स्थिर रखें; हिलने-डुलने से ज़हर शरीर में तेजी से फैलता है।",
        "काटे गए अंग (हाथ/पैर) को दिल के स्तर से नीचे रखें और स्थिर बांधें।",
        "सूजन शुरू होने से पहले अंगूठी, घड़ी या पायल तुरंत उतार दें।",
        "सुरक्षित दूरी से सांप का रंग या हुलिया याद रखने की कोशिश करें।"
      ]
    },
    dont: {
      en: [
        "Don't suck venom with your mouth, cut the wound with blades, or apply ice/chemicals.",
        "Don't tie tight tourniquets or ropes that starve limbs of blood flow.",
        "Don't give alcohol, caffeinated drinks, or painkiller pills to the victim.",
        "Don't attempt to catch or kill the snake."
      ],
      hi: [
        "मुंह से जहर चूसने की कोशिश न करें, न ही ब्लेड से घाव काटें।",
        "कड़ा तागा या रस्सी इतनी कसकर न बांधें कि खून की नसें बंद हो जाएं।",
        "मरीज को शराब, चाय, कॉफी या दर्द निवारक गोलियां न दें।",
        "सांप को पकड़ने या मारने की कोशिश न करें।"
      ]
    },
    afterDanger: {
      en: [
        "Rush to a District Govt Hospital / Medical College where Polyvalent ASV is stocked free of cost."
      ],
      hi: [
        "सीधे जिला सरकारी अस्पताल या मेडिकल कॉलेज जाएं जहां एंटी-वेनम मुफ़्त उपलब्ध रहता है।"
      ]
    },
    resources: [
      { name: "Ambulance Transport", phone: "108", purpose: "Medical Dispatch to ASV Hospital" },
      { name: "Forest Department / Rescue", phone: "112", purpose: "Wildlife & Snake Rescuers" }
    ],
    source: {
      name: "Indian Council of Medical Research (ICMR) Snakebite Protocol",
      lastReviewed: "October 2026",
      authorityType: "Medical Authority"
    },
    searchKeywords: ["snake", "snakebite", "samp", "venom", "anti venom", "saap", "108"]
  },
  {
    id: "dog-attack",
    category: "animal",
    categoryLabel: { en: "Animal Emergency", hi: "पशु एवं वन्यजीव आपात स्थिति" },
    iconName: "AlertTriangle",
    title: {
      en: "Dog Attack or Rabies Bite Risk",
      hi: "कुत्ते का हमला या रेबीज काटने का खतरा"
    },
    urgency: "high",
    immediateCallNumber: "108",
    immediateActionText: {
      en: "Wash bite wound with running water & soap for 15 MINUTES continuously!",
      hi: "घाव को बहते पानी और साबुन से लगातार 15 मिनट तक अच्छी तरह धोएं!"
    },
    doNow: {
      en: [
        "WASH the bite or scratch wound under running tap water with soap for AT LEAST 15 MINUTES immediately (this destroys rabies virus envelope).",
        "Apply antiseptic liquid (Betadine / Povidone Iodine) after washing.",
        "Visit a primary health center or government hospital immediately for Anti-Rabies Vaccine (ARV) Day 0 dose.",
        "If bite is deep/bleeding (Category III), ask doctor for Rabies Immunoglobulin (RIG).",
        "Observe the biting dog for 10 days if domestic or stray."
      ],
      hi: [
        "काटे गए या खरोंच वाले घाव को साबुन और बहते पानी के नीचे कम से कम 15 मिनट तक धोएं (यह रेबीज वायरस को खत्म करता है)।",
        "धोने के बाद पोविडोन आयोडीन / डिटॉल लगाएं।",
        "रेबीज का पहला टीका (Anti-Rabies Vaccine - Day 0) लगवाने के लिए तुरंत नजदीकी अस्पताल जाएं।",
        "यदि घाव गहरा है या खून बहा है, तो डॉक्टर से एंटी-रेबीज इम्युनोग्लोबुलिन (RIG) के बारे में पूछें।",
        "काटने वाले कुत्ते पर 10 दिनों तक नजर रखें।"
      ]
    },
    dont: {
      en: [
        "Don't apply chilli powder, turmeric, lime, or bandage tightly over rabies wounds.",
        "Don't delay the Rabies vaccine dose; Rabies is 100% fatal once symptoms appear, but 100% preventable with timely vaccination."
      ],
      hi: [
        "घाव पर मिर्च, हल्दी, चूना या मिट्टी न लगाएं, न ही घाव को कसकर पट्टी से ढकें।",
        "टीका लगवाने में एक दिन की भी देरी न करें; लक्षण दिखने के बाद रेबीज 100% जानलेवा है, लेकिन समय पर टीके से 100% बचाव संभव है।"
      ]
    },
    afterDanger: {
      en: [
        "Complete all 4 or 5 recommended anti-rabies vaccine doses (Day 0, 3, 7, 14, 28) without skipping."
      ],
      hi: [
        "डॉक्टर द्वारा बताए गए सभी 4 या 5 टीकों का कोर्स (दिन 0, 3, 7, 14, 28) पूरा करें।"
      ]
    },
    resources: [
      { name: "Government Hospital Helpline", phone: "108", purpose: "Rabies Vaccine Centre Information" },
      { name: "Emergency Center", phone: "112", purpose: "Public Safety Helpline" }
    ],
    source: {
      name: "National Rabies Control Programme (NRCP), NCDC India",
      lastReviewed: "October 2026",
      authorityType: "Government"
    },
    searchKeywords: ["dog", "dog bite", "rabies", "kutta", "vaccine", "anti rabies", "animal bite"]
  }
];
