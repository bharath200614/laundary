import React, { useState } from "react";

function LanguageSelector() {
  const [lang, setLang] = useState("en");

  return (
    <select className="language-selector" value={lang} onChange={(e) => setLang(e.target.value)}>
      <option value="en">English</option>
      <option value="hi">हिन्दी</option>
      <option value="te">తెలుగు</option>
    </select>
  );
}

export default LanguageSelector;
