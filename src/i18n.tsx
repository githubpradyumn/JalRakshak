import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "en" | "hi";

type I18nContextValue = {
  lang: Language;
  setLang: (l: Language) => void;
  toggle: () => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    appName: "JalRakshak",
    smartRainwaterHarvesting: "Smart rainwater harvesting",
    subtitleApp: "Rainwater Harvesting Feasibility App",
    cleanMinimal: "Clean, minimal, and professional.",
    heroDescription:
      "Get rain alerts and insights to assess rainwater harvesting potential in your area. Empowering communities to conserve groundwater through smart rainwater harvesting.",
    rainAlerts: "Rain Alerts",
    locationInsights: "Location insights",
    communityImpact: "Community impact",
    governmentPolicies: "Government Policies",
    getStarted: "Get Started",
    learnMore: "Learn more",
    whyJalRakshak: "Why JalRakshak",
    featureWeatherTitle: "Real-time weather",
    featureWeatherText: "Get hyperlocal rain alerts and rainfall intensity.",
    featureFeasTitle: "Feasibility insights",
    featureFeasText: "Assess rooftop potential and storage estimates.",
    featureCommunityTitle: "Community impact",
    featureCommunityText: "Encourage sustainable water practices in your area.",
    sectionGetStarted: "Get Started",
    cardAnalysisTitle: "Analysis",
    cardAnalysisDesc: "Explore feasibility analysis for your location.",
    cardWeatherTitle: "Weather",
    cardWeatherDesc: "View current and upcoming rainfall insights.",
    cardStructureTitle: "Structure",
    cardStructureDesc: "Get details for your harvesting structure.",
    cardFaqsTitle: "FAQs",
    cardFaqsDesc: "Find answers to common questions about JalRakshak.",
    open: "Open",
    navHome: "Home",
    navAnalysis: "Analysis",
    navWeather: "Weather",
    navStructure: "Structure",
    navFaqs: "FAQs",
    navAbout: "About us",
    toggleToHindi: "हिंदी",
    toggleToEnglish: "English",
    weatherSubtitle: "Check conditions and rain alerts",
    enterLocation: "Enter your location",
    enterLocationPlaceholder: "Enter city, address, or location name",
    weatherHelp: "Get comprehensive weather data including current conditions, rain alerts, and annual rainfall analysis",
    loading: "Loading...",
    getAllWeatherData: "Get All Weather Data",
    currentConditions: "Current conditions",
    location: "Location",
    rainAlert24h: "Rain alert (24h)",
    rainExpected24h: "🌧 Rain expected in next 24 hours.",
    noRain24h: "No significant rain expected in next 24 hours.",
    fetchingAnnualRainfall: "Fetching annual rainfall data...",
    annualRainfallAnalysis: "Annual Rainfall Analysis",
    annualTotal: "Annual Total",
    waterHarvestingPotential: "Water Harvesting Potential",
    runoffCoefficient80: "80% runoff coefficient",
    monthlyRainfallDistribution: "Monthly Rainfall Distribution",
    structureSubtitle: "Rainwater harvesting structures",
    chooseStructure: "Choose or type a structure",
    enterStructurePlaceholder: "Enter structure name (e.g., RCC tank, Recharge pit, Rain barrel)",
    showInfo: "Show Info",
    overview: "Overview",
    structureNotFound: "Structure not found. Please check the name and try again.",
    suitability: "Suitability",
    typicalDimensions: "Typical dimensions",
    materialsInstallation: "Materials & installation",
    estimatedCost: "Estimated cost",
    costsVary: "Costs vary by region and specifications.",
    maintenance: "Maintenance",
    relatedResources: "Related resources",
    wikipediaSearchPrefix: "We searched Wikipedia for",
    helpfulLinksSuffix: "Here are some helpful links:",
    searchingResources: "Searching resources…",
    noRelatedLinks: "No related links found.",
    selectAStructure: "Select a Structure",
    enterStructureHelp: "Enter a structure name above and click \"Show Info\" to view detailed information about rainwater harvesting structures.",
    oopsNotFound: "Oops! Page not found",
    returnHome: "Return to Home",
    waterManagementTagline: "Water Management & Analysis System",
    welcomeBack: "Welcome Back",
    signInToContinue: "Sign in to your account to continue",
    email: "Email",
    enterEmail: "Enter your email",
    password: "Password",
    enterPassword: "Enter your password",
    signingIn: "Signing in...",
    signIn: "Sign In",
    demoCredentials: "Demo credentials:",
    allRightsReserved: "All rights reserved.",
  },
  hi: {
    appName: "जलरक्षक",
    smartRainwaterHarvesting: "स्मार्ट वर्षा जल संचयन",
    subtitleApp: "वर्षा जल संचयन व्यवहार्यता ऐप",
    cleanMinimal: "साफ़, न्यूनतम और पेशेवर।",
    heroDescription:
      "अपने क्षेत्र में वर्षा जल संचयन की क्षमता का आकलन करने के लिए वर्षा अलर्ट और अंतर्दृष्टि प्राप्त करें। स्मार्ट वर्षा जल संचयन के माध्यम से भूजल संरक्षण को सशक्त बनाना।",
    rainAlerts: "वर्षा अलर्ट",
    locationInsights: "स्थान अंतर्दृष्टि",
    communityImpact: "समुदाय प्रभाव",
    governmentPolicies: "सरकारी नीतियाँ",
    getStarted: "शुरू करें",
    learnMore: "और जानें",
    whyJalRakshak: "क्यों जलरक्षक",
    featureWeatherTitle: "रियल-टाइम मौसम",
    featureWeatherText: "हाइपरलोकल वर्षा अलर्ट और तीव्रता प्राप्त करें।",
    featureFeasTitle: "व्यवहार्यता अंतर्दृष्टि",
    featureFeasText: "छत की क्षमता और भंडारण अनुमान का आकलन करें।",
    featureCommunityTitle: "समुदाय प्रभाव",
    featureCommunityText: "अपने क्षेत्र में सतत जल प्रथाओं को प्रोत्साहित करें।",
    sectionGetStarted: "शुरू करें",
    cardAnalysisTitle: "विश्लेषण",
    cardAnalysisDesc: "अपने स्थान के लिए व्यवहार्यता विश्लेषण देखें।",
    cardWeatherTitle: "मौसम",
    cardWeatherDesc: "वर्तमान और आगामी वर्षा अंतर्दृष्टि देखें।",
    cardStructureTitle: "संरचना",
    cardStructureDesc: "अपने संचयन संरचना के विवरण प्राप्त करें।",
    cardFaqsTitle: "प्रश्नोत्तर",
    cardFaqsDesc: "जलरक्षक के बारे में सामान्य प्रश्नों के उत्तर पाएं।",
    open: "खोलें",
    navHome: "मुखपृष्ठ",
    navAnalysis: "विश्लेषण",
    navWeather: "मौसम",
    navStructure: "संरचना",
    navFaqs: "प्रश्नोत्तर",
    navAbout: "हमारे बारे में",
    toggleToHindi: "हिंदी",
    toggleToEnglish: "English",
    weatherSubtitle: "मौसम की स्थिति और वर्षा अलर्ट देखें",
    enterLocation: "अपना स्थान दर्ज करें",
    enterLocationPlaceholder: "शहर, पता, या स्थान का नाम दर्ज करें",
    weatherHelp: "वर्तमान स्थिति, वर्षा अलर्ट और वार्षिक वर्षा विश्लेषण सहित व्यापक मौसम डेटा प्राप्त करें",
    loading: "लोड हो रहा है...",
    getAllWeatherData: "सभी मौसम डेटा प्राप्त करें",
    currentConditions: "वर्तमान स्थिति",
    location: "स्थान",
    rainAlert24h: "वर्षा अलर्ट (24 घंटे)",
    rainExpected24h: "🌧 अगले 24 घंटों में वर्षा की संभावना।",
    noRain24h: "अगले 24 घंटों में महत्वपूर्ण वर्षा की संभावना नहीं।",
    fetchingAnnualRainfall: "वार्षिक वर्षा डेटा प्राप्त किया जा रहा है...",
    annualRainfallAnalysis: "वार्षिक वर्षा विश्लेषण",
    annualTotal: "वार्षिक कुल",
    waterHarvestingPotential: "जल संचयन क्षमता",
    runoffCoefficient80: "80% रनऑफ गुणांक",
    monthlyRainfallDistribution: "मासिक वर्षा वितरण",
    structureSubtitle: "वर्षा जल संचयन संरचनाएँ",
    chooseStructure: "एक संरचना चुनें या टाइप करें",
    enterStructurePlaceholder: "संरचना का नाम लिखें (जैसे, RCC टैंक, रिचार्ज पिट, रेन बैरल)",
    showInfo: "जानकारी दिखाएँ",
    overview: "परिचय",
    structureNotFound: "संरचना नहीं मिली। कृपया नाम जांचें और पुनः प्रयास करें।",
    suitability: "उपयुक्तता",
    typicalDimensions: "आम आयाम",
    materialsInstallation: "सामग्री और स्थापना",
    estimatedCost: "अनुमानित लागत",
    costsVary: "लागत क्षेत्र और विशिष्टताओं के अनुसार भिन्न हो सकती है।",
    maintenance: "रखरखाव",
    relatedResources: "संबंधित संसाधन",
    wikipediaSearchPrefix: "हमने विकिपीडिया पर खोजा",
    helpfulLinksSuffix: "यहाँ कुछ उपयोगी लिंक हैं:",
    searchingResources: "संसाधन खोजे जा रहे हैं…",
    noRelatedLinks: "कोई संबंधित लिंक नहीं मिला।",
    selectAStructure: "एक संरचना चुनें",
    enterStructureHelp: "ऊपर संरचना का नाम दर्ज करें और विस्तृत जानकारी देखने के लिए \"जानकारी दिखाएँ\" पर क्लिक करें।",
    oopsNotFound: "उफ़! पृष्ठ नहीं मिला",
    returnHome: "मुखपृष्ठ पर लौटें",
    waterManagementTagline: "जल प्रबंधन और विश्लेषण प्रणाली",
    welcomeBack: "वापसी पर स्वागत है",
    signInToContinue: "जारी रखने के लिए अपने खाते में साइन इन करें",
    email: "ईमेल",
    enterEmail: "अपना ईमेल दर्ज करें",
    password: "पासवर्ड",
    enterPassword: "अपना पासवर्ड दर्ज करें",
    signingIn: "साइन इन किया जा रहा है...",
    signIn: "साइन इन करें",
    demoCredentials: "डेमो क्रेडेंशियल्स:",
    allRightsReserved: "सर्वाधिकार सुरक्षित।",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
    return (saved as Language) || "en";
  });

  useEffect(() => {
    try {
      localStorage.setItem("lang", lang);
      document.documentElement.lang = lang === "hi" ? "hi" : "en";
    } catch {}
  }, [lang]);

  const t = useMemo(() => {
    const dict = translations[lang];
    return (key: string) => dict[key] ?? key;
  }, [lang]);

  const value: I18nContextValue = {
    lang,
    setLang,
    toggle: () => setLang((l) => (l === "en" ? "hi" : "en")),
    t,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}


