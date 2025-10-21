import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Clock, CreditCard } from 'lucide-react';
import { useLanguage } from "../contexts/LanguageContext";

function FooterNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const navItems = [
    { to: "/", icon: Home, label: t('homepage') },
    { to: "/payment", icon: CreditCard, label: t('laundryPayment') },
    { to: "/history", icon: Clock, label: t('paymentHistory') }
  ];

  return (
    <footer className="fixed bottom-0 w-full bg-white border-t border-gray-200 shadow-lg z-50">
      <nav className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {navItems.map(({ to, icon: Icon, label }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex flex-col items-center px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs mt-1 font-medium">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </footer>
  );
}

export default FooterNav;
