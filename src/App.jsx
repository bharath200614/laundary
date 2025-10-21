import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage  from "./components/HomePage";
import HistoryPage from "./components/HistoryPage";
import PaymentPage from "./components/PaymentPage";
import FooterNav from "./components/FooterNav";
import LanguageSelector from "./components/LanguageSelector";
import { LanguageProvider } from "./contexts/LanguageContext";
import "./App.css";

function App() {
  return (
    <LanguageProvider>
      <Router basename="/laundary">
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-indigo-600">Laundry Service</h1>
              <LanguageSelector />
            </div>
          </header>
          <main className="pb-20">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/payment" element={<PaymentPage />} />
            </Routes>
          </main>
          <FooterNav />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;