import type { OfficialResource } from '../types';


export const officialResources: OfficialResource[] = [
  {
    id: "res-112",
    name: {
      en: "National Emergency Response System (NERS 112)",
      hi: "राष्ट्रीय आपातकालीन प्रतिक्रिया प्रणाली (112)"
    },
    category: "emergency",
    categoryLabel: { en: "National Emergency", hi: "राष्ट्रीय आपातकालीन" },
    purpose: {
      en: "Single unified emergency number for Police, Fire, Ambulance, and Rescue services across India.",
      hi: "पूरे भारत में पुलिस, फायर, एम्बुलेंस और रेस्क्यू के लिए एकीकृत राष्ट्रीय आपातकालीन सेवा।"
    },
    whoCanUse: {
      en: "Any citizen in distress anywhere in India (Works even without SIM or network balance).",
      hi: "भारत में कहीं भी संकट में पड़ा कोई भी नागरिक (बिना सिम या बैलेंस के भी काम करता है)।"
    },
    phone: "112",
    website: "https://112.gov.in",
    availability: "24/7 Toll-Free All-India",
    verifiedDate: "October 2026",
    source: "Ministry of Home Affairs (MHA), Govt of India",
    isNationalEmergency: true
  },
  {
    id: "res-cyber-1930",
    name: {
      en: "National Cyber Crime Helpline (1930)",
      hi: "राष्ट्रीय साइबर अपराध हेल्पलाइन (1930)"
    },
    category: "cyber",
    categoryLabel: { en: "Cyber Crime", hi: "साइबर अपराध" },
    purpose: {
      en: "Immediate financial fraud reporting, bank account freezing, and online scam complaint registration.",
      hi: "तुरंत वित्तीय साइबर फ्रॉड रिपोर्ट करने, बैंक खाता फ्रीज कराने और ऑनलाइन धोखाधड़ी की शिकायत के लिए।"
    },
    whoCanUse: {
      en: "Victims of online banking fraud, UPI scams, OTP theft, or phishing.",
      hi: "ऑनलाइन बैंकिंग फ्रॉड, UPI धोखाधड़ी, OTP चोरी या फ़िशिंग के शिकार नागरिक।"
    },
    phone: "1930",
    website: "https://cybercrime.gov.in",
    availability: "24/7 Toll-Free",
    verifiedDate: "October 2026",
    source: "Indian Cyber Crime Coordination Centre (I4C), MHA",
    isNationalEmergency: true
  },
  {
    id: "res-women-1091",
    name: {
      en: "National Women Helpline (1091 / 181)",
      hi: "राष्ट्रीय महिला हेल्पलाइन (1091 / 181)"
    },
    category: "women-child",
    categoryLabel: { en: "Women & Child", hi: "महिला एवं बाल सुरक्षा" },
    purpose: {
      en: "Emergency protection, counseling, shelter, and legal guidance for women in distress or domestic threat.",
      hi: "संकटग्रस्त या असुरक्षित महसूस कर रही महिलाओं के लिए आपातकालीन सुरक्षा, परामर्श और कानूनी मार्गदर्शन।"
    },
    whoCanUse: {
      en: "Women and girls facing harassment, abuse, domestic violence, or stalking.",
      hi: "प्रताड़ना, घरेलू हिंसा, पीछा करने या हिंसा का सामना कर रही महिलाएं एवं युवतियां।"
    },
    phone: "1091",
    alternatePhone: "181",
    website: "https://wcd.nic.in",
    availability: "24/7 Toll-Free",
    verifiedDate: "October 2026",
    source: "Ministry of Women and Child Development (MWCD)",
    isNationalEmergency: true
  },
  {
    id: "res-child-1098",
    name: {
      en: "Childline India (1098)",
      hi: "चाइल्डलाइन इंडिया (1098)"
    },
    category: "women-child",
    categoryLabel: { en: "Women & Child", hi: "महिला एवं बाल सुरक्षा" },
    purpose: {
      en: "Emergency rescue, protection, medical care, and rehabilitation for children in need.",
      hi: "मुसीबत में फंसे बच्चों के लिए आपातकालीन बचाव, सुरक्षा, चिकित्सा और पुनर्वास।"
    },
    whoCanUse: {
      en: "Any child under 18 years or adults reporting child abuse, child labor, or lost children.",
      hi: "18 वर्ष से कम उम्र के बच्चे या बाल श्रम/बाल शोषण की रिपोर्ट करने वाले नागरिक।"
    },
    phone: "1098",
    website: "https://wcd.nic.in/childline",
    availability: "24/7 Toll-Free",
    verifiedDate: "October 2026",
    source: "Ministry of Women and Child Development",
    isNationalEmergency: false
  },
  {
    id: "res-medical-108",
    name: {
      en: "National Ambulance Service (108)",
      hi: "राष्ट्रीय एम्बुलेंस सेवा (108)"
    },
    category: "medical",
    categoryLabel: { en: "Medical Service", hi: "चिकित्सा सेवा" },
    purpose: {
      en: "Free emergency ambulance dispatch with trained EMT staff and life-support equipment.",
      hi: "प्रशिक्षित डॉक्टरों/पैरामेडिक्स और जीवनरक्षक उपकरणों के साथ मुफ़्त आपातकालीन एम्बुलेंस सेवा।"
    },
    whoCanUse: {
      en: "Anyone experiencing critical illness, accident injuries, pregnancy emergencies, or trauma.",
      hi: "गंभीर बीमारी, दुर्घटना की चोट, गर्भावस्था की आपात स्थिति या आघात का सामना करने वाला कोई भी व्यक्ति।"
    },
    phone: "108",
    alternatePhone: "102",
    website: "https://nhm.gov.in",
    availability: "24/7 Toll-Free All-India",
    verifiedDate: "October 2026",
    source: "National Health Mission (NHM), Govt of India",
    isNationalEmergency: true
  },
  {
    id: "res-fire-101",
    name: {
      en: "Fire Emergency Services (101)",
      hi: "फायर ब्रिगेड आपातकालीन सेवा (101)"
    },
    category: "disaster",
    categoryLabel: { en: "Fire & Disaster", hi: "आग एवं आपदा" },
    purpose: {
      en: "Firefighting, building collapse rescue, hazardous gas leakage containment, and disaster extraction.",
      hi: "आग बुझाने, इमारत ढहने पर रेस्क्यू, गैस रिसाव नियंत्रण और आपदा राहत।"
    },
    whoCanUse: {
      en: "Anyone witnessing or experiencing fire outbreaks or structural trapment.",
      hi: "इमारत, घर या वाहन में आग लगने की घटना देखने या फंसने वाला कोई भी नागरिक।"
    },
    phone: "101",
    availability: "24/7 Toll-Free",
    verifiedDate: "October 2026",
    source: "Directorate General Fire Services, Civil Defence & Home Guards",
    isNationalEmergency: true
  },
  {
    id: "res-telemanas-14416",
    name: {
      en: "Tele-MANAS Mental Health Helpline (14416)",
      hi: "टेली-मानस मानसिक स्वास्थ्य हेल्पलाइन (14416)"
    },
    category: "mental-health",
    categoryLabel: { en: "Mental Health", hi: "मानसिक स्वास्थ्य" },
    purpose: {
      en: "Free confidential mental health support, crisis intervention, and psychological counseling in 20+ Indian languages.",
      hi: "20 से अधिक भारतीय भाषाओं में मुफ़्त, गोपनीय मानसिक स्वास्थ्य परामर्श और तनाव निवारण।"
    },
    whoCanUse: {
      en: "Anyone suffering from panic, severe depression, anxiety, trauma, or emotional crisis.",
      hi: "गंभीर अवसाद, चिंता, घबराहट, सदमे या मानसिक तनाव का सामना कर रहा कोई भी व्यक्ति।"
    },
    phone: "14416",
    alternatePhone: "1800 891 4416",
    website: "https://telemanas.mohfw.gov.in",
    availability: "24/7 Toll-Free Confidential",
    verifiedDate: "October 2026",
    source: "Ministry of Health and Family Welfare (MoHFW) & NIMHANS",
    isNationalEmergency: false
  },
  {
    id: "res-ndma-1078",
    name: {
      en: "NDMA Disaster Helpline (1078)",
      hi: "राष्ट्रीय आपदा प्रबंधन हेल्पलाइन (1078)"
    },
    category: "disaster",
    categoryLabel: { en: "Fire & Disaster", hi: "आग एवं आपदा" },
    purpose: {
      en: "National disaster relief coordination during floods, cyclones, earthquakes, and landslides.",
      hi: "बाढ़, चक्रवात, भूकंप और भूस्खलन के दौरान राष्ट्रीय आपदा राहत एवं बचाव सहायता।"
    },
    whoCanUse: {
      en: "Citizens affected by natural or man-made disasters requiring NDRF rescue.",
      hi: "प्राकृतिक या मानव निर्मित आपदाओं से प्रभावित नागरिक जिन्हें NDRF सहायता की आवश्यकता है।"
    },
    phone: "1078",
    alternatePhone: "1070",
    website: "https://ndma.gov.in",
    availability: "24/7 Toll-Free Control Room",
    verifiedDate: "October 2026",
    source: "National Disaster Management Authority (NDMA)",
    isNationalEmergency: false
  },
  {
    id: "res-railway-139",
    name: {
      en: "Indian Railways Rail Madad Helpline (139)",
      hi: "भारतीय रेलवे रेल मदद हेल्पलाइन (139)"
    },
    category: "transport",
    categoryLabel: { en: "Road & Transport", hi: "सड़क एवं परिवहन" },
    purpose: {
      en: "Integrated train passenger safety, medical assistance on train/station, RPF security, and complaints.",
      hi: "ट्रेन यात्रा के दौरान सुरक्षा, आरपीएफ सहायता, चिकित्सा आपात स्थिति और यात्री सुरक्षा।"
    },
    whoCanUse: {
      en: "Railway passengers traveling on trains or present at railway stations across India.",
      hi: "ट्रेन में या रेलवे स्टेशन पर यात्रा कर रहे यात्री।"
    },
    phone: "139",
    website: "https://railmadad.indianrailways.gov.in",
    availability: "24/7 Toll-Free",
    verifiedDate: "October 2026",
    source: "Ministry of Railways, Govt of India",
    isNationalEmergency: false
  },
  {
    id: "res-elderline-14567",
    name: {
      en: "Elderline Senior Citizen Helpline (14567)",
      hi: "एल्डरलाइन वरिष्ठ नागरिक हेल्पलाइन (14567)"
    },
    category: "emergency",
    categoryLabel: { en: "Senior Support", hi: "वरिष्ठ नागरिक सहायता" },
    purpose: {
      en: "Free national helpline for senior citizens providing emotional support, abuse intervention, and rescue.",
      hi: "वरिष्ठ नागरिकों के लिए मुफ़्त राष्ट्रीय सहायता, दुर्व्यवहार निवारण, आश्रय एवं भावनात्मक सहारा।"
    },
    whoCanUse: {
      en: "Senior citizens aged 60+ or caregivers seeking help or reporting elder neglect.",
      hi: "60 वर्ष या उससे अधिक आयु के वरिष्ठ नागरिक अथवा उनकी देखरेख करने वाले।"
    },
    phone: "14567",
    website: "https://socialjustice.gov.in",
    availability: "8 AM to 8 PM Daily Toll-Free",
    verifiedDate: "October 2026",
    source: "Ministry of Social Justice and Empowerment",
    isNationalEmergency: false
  },
  {
    id: "res-lpg-1906",
    name: {
      en: "LPG Gas Leakage Emergency (1906)",
      hi: "LPG गैस रिसाव आपातकालीन नंबर (1906)"
    },
    category: "emergency",
    categoryLabel: { en: "Gas Safety", hi: "गैस सुरक्षा" },
    purpose: {
      en: "Immediate emergency technician dispatch for cooking gas leakage and cylinder fire threats.",
      hi: "रसोई गैस रिसाव या सिलेंडर में आग के खतरे के लिए तुरंत तकनीशियन सहायता।"
    },
    whoCanUse: {
      en: "LPG consumers of IOCL (Indane), BPCL (Bharat Gas), and HPCL (HP Gas).",
      hi: "इन्डेन, भारत गैस या एचपी गैस के सभी एलपीजी उपभोक्ता।"
    },
    phone: "1906",
    availability: "24/7 Toll-Free All-India",
    verifiedDate: "October 2026",
    source: "Indian Oil, Bharat Petroleum & HPCL Emergency Network",
    isNationalEmergency: false
  }
];
