import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage  from "./components/HomePage";
import HistoryPage from "./components/HistoryPage";
import PaymentPage from "./components/PaymentPage";
import FooterNav from "./components/FooterNav";
import LanguageSelector from "./components/LanguageSelector";
import "./App.css";
function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Header */}
        <header className="app-header">
          <h1 className="logo">Laundry Service</h1>
          <LanguageSelector />
        </header>

        {/* Routes */}
        <main className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/payment" element={<PaymentPage />} />
          </Routes>
        </main>

        {/* Footer Navigation */}
        <FooterNav />
      </div>
    </Router>
  );
}

export default App;
