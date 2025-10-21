import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    // Common
    loading: 'Loading...',
    total: 'Total',
    completed: 'Completed',
    processing: 'Processing',

    // HomePage
    welcome: 'Welcome to LaundryApp',
    welcomeSubtitle: 'Your trusted partner for fresh and clean laundry',
    greeting: 'Hello! 👋 We\'re here to make your laundry experience seamless and hassle-free.',
    feature1: 'Free Pickup & Delivery',
    feature2: 'Fast Service',
    feature3: 'Quality Guaranteed',
    getStarted: 'Get Started',

    // PaymentPage
    laundryPayment: 'LAUNDRY PAYMENT',
    item: 'Item',
    rate: 'Rate (₹)',
    quantity: 'Quantity',
    subtotal: 'Subtotal (₹)',
    tag: 'Tag',
    paymentMethod: 'Payment Method',
    cash: 'CASH 💵',
    upi: 'UPI 📱',
    scan: 'SCAN',
    totalPrice: 'Total Price:',
    completePayment: 'Complete Payment',
    homepage: 'Homepage',
    paymentHistory: 'Payment History',

    // HistoryPage
    orderHistory: 'Order History',
    trackOrders: 'Track and manage all your laundry orders',
    totalOrders: 'Total Orders',
    totalRevenue: 'Total Revenue',
    searchOrder: 'Search order number...',
    all: 'All',
    noOrders: 'No orders found',
    order: 'Order',
    date: 'Date',
    amount: 'Amount',
  },
  hi: {
    // Common
    loading: 'लोड हो रहा है...',
    total: 'कुल',
    completed: 'पूर्ण',
    processing: 'प्रगति में',

    // HomePage
    welcome: 'लॉन्ड्री ऐप में आपका स्वागत है',
    welcomeSubtitle: 'स्वच्छ कपड़ों के लिए आपका विश्वसनीय साथी',
    greeting: 'नमस्ते! 👋 हम आपके लॉन्ड्री अनुभव को सरल बनाने के लिए यहाँ हैं।',
    feature1: 'मुफ्त पिकअप और डिलीवरी',
    feature2: 'तेज़ सेवा',
    feature3: 'गुणवत्ता की गारंटी',
    getStarted: 'शुरू करें',

    // PaymentPage
    laundryPayment: 'लॉन्ड्री भुगतान',
    item: 'वस्तु',
    rate: 'दर (₹)',
    quantity: 'मात्रा',
    subtotal: 'उप-योग (₹)',
    tag: 'टैग',
    paymentMethod: 'भुगतान विधि',
    cash: 'नकद 💵',
    upi: 'यूपीआई 📱',
    scan: 'स्कैन',
    totalPrice: 'कुल राशि:',
    completePayment: 'भुगतान पूरा करें',
    homepage: 'मुख्य पृष्ठ',
    paymentHistory: 'भुगतान इतिहास',

    // HistoryPage
    orderHistory: 'ऑर्डर इतिहास',
    trackOrders: 'अपने सभी लॉन्ड्री ऑर्डर को ट्रैक करें',
    totalOrders: 'कुल ऑर्डर',
    totalRevenue: 'कुल राजस्व',
    searchOrder: 'ऑर्डर नंबर खोजें...',
    all: 'सभी',
    noOrders: 'कोई ऑर्डर नहीं मिला',
    order: 'ऑर्डर',
    date: 'दिनांक',
    amount: 'राशि',
  },
  te: {
    // Common
    loading: 'లోడ్ అవుతోంది...',
    total: 'మొత్తం',
    completed: 'పూర్తయింది',
    processing: 'ప్రాసెస్ చేస్తున్నది',

    // HomePage
    welcome: 'లాండ్రీ యాప్‌కి స్వాగతం',
    welcomeSubtitle: 'శుభ్రమైన వస్త్రాలకు మీ విశ్వసనీయ భాగస్వామి',
    greeting: 'నమస్కారం! 👋 మీ లాండ్రీ అనుభవాన్ని సులభతరం చేయడానికి మేము ఇక్కడ ఉన్నాము.',
    feature1: 'ఉచిత పికప్ & డెలివరీ',
    feature2: 'వేగవంతమైన సేవ',
    feature3: 'నాణ్యత గ్యారంటీ',
    getStarted: 'ప్రారంభించండి',

    // PaymentPage
    laundryPayment: 'లాండ్రీ చెల్లింపు',
    item: 'వస్తువు',
    rate: 'రేటు (₹)',
    quantity: 'పరిమాణం',
    subtotal: 'సబ్ టోటల్ (₹)',
    tag: 'ట్యాగ్',
    paymentMethod: 'చెల్లింపు విధానం',
    cash: 'నగదు 💵',
    upi: 'యూపీఐ 📱',
    scan: 'స్కాన్',
    totalPrice: 'మొత్తం ధర:',
    completePayment: 'చెల్లింపు పూర్తి చేయండి',
    homepage: 'హోమ్ పేజీ',
    paymentHistory: 'చెల్లింపు చరిత్ర',

    // HistoryPage
    orderHistory: 'ఆర్డర్ చరిత్ర',
    trackOrders: 'మీ అన్ని లాండ్రీ ఆర్డర్లను ట్రాక్ చేయండి',
    totalOrders: 'మొత్తం ఆర్డర్లు',
    totalRevenue: 'మొత్తం ఆదాయం',
    searchOrder: 'ఆర్డర్ నంబర్ వెతకండి...',
    all: 'అన్నీ',
    noOrders: 'ఆర్డర్లు కనుగొనబడలేదు',
    order: 'ఆర్డర్',
    date: 'తేదీ',
    amount: 'మొత్తం',
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const value = {
    language,
    setLanguage,
    t: (key) => translations[language][key] || translations['en'][key] || key,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};