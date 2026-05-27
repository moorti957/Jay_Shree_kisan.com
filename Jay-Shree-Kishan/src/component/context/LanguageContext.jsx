import React, { createContext, useContext, useState } from "react";

// 1. Context banao
const LanguageContext = createContext();

// 2. Provider Component — App.js mein wrap karo
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("English"); // Default language

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
export const useLanguage = () => useContext(LanguageContext);