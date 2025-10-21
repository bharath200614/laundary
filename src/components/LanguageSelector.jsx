import React from "react";
import { Globe } from 'lucide-react';
import { useLanguage } from "../contexts/LanguageContext";

function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-5 h-5 text-gray-600" />
      <select 
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-2.5"
        value={language} 
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
        <option value="te">తెలుగు</option>
      </select>
    </div>
  );
}

export default LanguageSelector;