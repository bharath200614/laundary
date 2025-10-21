import React from 'react';
import { Link } from 'react-router-dom';
import { Shirt, ArrowRight } from 'lucide-react';
import { useLanguage } from "../contexts/LanguageContext";

const HomePage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
        <div className="bg-blue-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Shirt className="w-10 h-10 text-white" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          {t('welcome')}
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          {t('welcomeSubtitle')}
        </p>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
          <p className="text-lg text-gray-700">
            {t('greeting')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl mb-2">🚚</div>
            <p className="text-sm font-semibold">{t('feature1')}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl mb-2">⚡</div>
            <p className="text-sm font-semibold">{t('feature2')}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl mb-2">✨</div>
            <p className="text-sm font-semibold">{t('feature3')}</p>
          </div>
        </div>

        <Link 
          to="/payment" 
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors flex items-center justify-center mx-auto gap-2"
        >
          {t('getStarted')}
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default HomePage;