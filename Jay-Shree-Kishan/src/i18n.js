import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Translation resources
const resources = {
  en: {
    translation: {
      home: "Home",
      specials: "Specials",
      contact: "Contact",
      sitemap: "Sitemap",
      brand: "Brand",
      festivalGift: "Festival Gift Offers",
      buyers: "Buyers",
      sellers: "Sellers",
      language: "Language",
    },
  },
  hi: {
    translation: {
      home: "होम",
      specials: "स्पेशल्स",
      contact: "संपर्क करें",
      sitemap: "साइटमैप",
      brand: "ब्रांड",
      festivalGift: "त्योहारी उपहार ऑफर",
      buyers: "खरीदार",
      sellers: "विक्रेता",
      language: "भाषा",
    },
  },
  gu: {
    translation: {
      home: "હોમ",
      specials: "સ્પેશિયલ્સ",
      contact: "સંપર્ક",
      sitemap: "સાઇટમેપ",
      brand: "બ્રાન્ડ",
      festivalGift: "ઉત્સવની ભેટ ઓફર્સ",
      buyers: "ખરીદનાર",
      sellers: "વિક્રેતાઓ",
      language: "ભાષા",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
