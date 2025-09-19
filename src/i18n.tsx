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


