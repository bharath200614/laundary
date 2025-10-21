import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, CreditCard, Home, Clock, DollarSign, QrCode } from 'lucide-react';
import './PaymentPage.css'; 
import { useLanguage } from "../contexts/LanguageContext";

const PaymentPage = () => {
  const { t } = useLanguage();
  // Initialize items with pricing
  const [items, setItems] = useState([
    { id: 1, name: 'Shirt', quantity: 0, price: 10, company: '' },
    { id: 2, name: 'Pant', quantity: 0, price: 10, company: '' },
    { id: 3, name: 'Kudra', quantity: 0, price: 10, company: '' },
    { id: 4, name: 'Saree', quantity: 0, price: 20, company: '' },
    { id: 5, name: 'Jeans', quantity: 0, price: 15, company: '' },
    { id: 6, name: 'Dupatta', quantity: 0, price: 10, company: '' },
  ]);

  const [paymentMethod, setPaymentMethod] = useState('cash');

  const updateQuantity = (id, change) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
    ));
  };

  const updateCompany = (id, company) => {
    setItems(items.map(item => item.id === id ? { ...item, company } : item));
  };

  const calculateTotal = () => items.reduce((sum, item) => sum + (item.quantity * item.price), 0);

  const handleScan = () => alert('Scanning feature - Connect to QR/Barcode scanner');

  const handleSubmit = () => {
    const itemList = items.filter(item => item.quantity > 0);
    if (itemList.length === 0) {
      alert('Please add items to your order');
      return;
    }

    // Create payment record
    const paymentRecord = {
      id: Date.now(),
      date: new Date().toISOString(),
      items: itemList,
      total: calculateTotal(),
      paymentMethod,
    };

    // Get existing history from localStorage
    const existingHistory = JSON.parse(localStorage.getItem('paymentHistory') || '[]');
    
    // Add new payment to history
    localStorage.setItem('paymentHistory', JSON.stringify([paymentRecord, ...existingHistory]));

    alert(`Order placed!\nTotal: ₹${calculateTotal()}\nPayment: ${paymentMethod.toUpperCase()}`);
    
    // Reset form
    setItems(items.map(item => ({ ...item, quantity: 0, company: '' })));
  };

  return (
    // Centering the entire page content
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 md:p-8">
      
      {/* Main Card Container */}
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl p-6 md:p-10 text-smooth">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          {t('laundryPayment')}
        </h1>

        {/* --- 1. Item List/Quantity Grid --- */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
          
          {/* Header Row */}
          <div className="grid grid-cols-4 md:grid-cols-5 gap-2 mb-3 font-semibold text-xs md:text-sm text-gray-600 border-b pb-2">
            <div className="text-left">{t('item')}</div>
            <div className="hidden md:block text-center">{t('rate')}</div>
            <div className="text-center">{t('quantity')}</div>
            <div className="text-center">{t('subtotal')}</div>
            <div className="text-center">{t('tag')}</div>
          </div>

          {/* Item Rows */}
          {items.map(item => (
            <div key={item.id} className="grid grid-cols-4 md:grid-cols-5 gap-2 items-center py-2 border-b last:border-b-0">
              <div className="font-medium text-gray-800 text-left capitalize">{item.name}</div>
              <div className="hidden md:block font-medium text-gray-600 text-center">₹{item.price}</div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-center gap-1">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="quantity-btn p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200 disabled:opacity-50 transition"
                  disabled={item.quantity === 0}
                >
                  <Minus className="w-3 h-3 md:w-4 md:h-4" />
                </button>
                <span className="w-6 text-center font-bold text-sm">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="quantity-btn p-1 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition"
                >
                  <Plus className="w-3 h-3 md:w-4 md:h-4" />
                </button>
              </div>
              
              <div className="font-bold text-gray-800 text-center text-sm">₹{item.quantity * item.price}</div>

              <input
                type="text"
                value={item.company}
                onChange={(e) => updateCompany(item.id, e.target.value)}
                placeholder="Tag"
                className="company-input w-full text-center border border-gray-300 rounded-lg px-1 py-1 text-xs"
              />
            </div>
          ))}
        </div>
        
        {/* --- 2 & 3. Payment/Total/Action Group (Flexbox below the list) --- */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
            
            {/* Payment Method and Scan (Matches the left/center focus of the sketch) */}
            <div className="md:w-1/2 bg-white rounded-xl shadow-md p-4 border border-gray-200 text-center">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">{t('paymentMethod')}</h3>
                <div className="flex gap-3 justify-center mb-4">
                  {/* Payment Buttons (Cash/UPI) */}
                  {['cash', 'upi'].map(method => (
                    <button
                      key={method}
                      onClick={() => setPaymentMethod(method)}
                      className={`payment-btn flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 
                        ${paymentMethod === method 
                          ? 'bg-indigo-600 text-white shadow-lg' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`
                      }
                    >
                      {method === 'cash' ? t('cash') : t('upi')} 
                    </button>
                  ))}
                </div>
                
                {/* Scan Button (Single action, centered below payment method) */}
                <button 
                  onClick={handleScan} 
                  className="action-btn scan-btn flex items-center justify-center w-full px-4 py-2 rounded-lg bg-yellow-400 text-gray-800 font-bold hover:bg-yellow-500 transition shadow-md"
                >
                  <QrCode className="w-5 h-5 mr-2" /> {t('scan')}
                </button>
            </div>

            {/* Total Section (Matches the right focus of the sketch) */}
            <div className="md:w-1/2 bg-indigo-50 rounded-xl shadow-md p-4 flex flex-col justify-center border border-indigo-200">
                <span className="text-lg font-semibold text-gray-700 text-center mb-1">{t('totalPrice')}</span>
                <span className="text-5xl font-extrabold text-indigo-700 text-center tracking-wider">₹{calculateTotal()}</span>
            </div>

        </div>

        {/* --- 4. Complete Payment Action --- */}
        <div className="flex justify-center mb-8">
        <button 
        onClick={handleSubmit} 
        className="action-btn pay-btn flex items-center justify-center w-full max-w-sm px-6 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition shadow-lg shadow-green-300"
      >
        <CreditCard className="w-5 h-5 mr-2" /> {t('completePayment')}
      </button>
        </div>

        {/* --- 5. Navigation --- */}
        <div className="mt-4 pt-4 border-t flex justify-center gap-12">
          <Link to="/" className="nav-btn flex flex-col items-center text-gray-600 hover:text-indigo-600 transition">
            <Home className="w-6 h-6 mb-1" />
            <span className="text-sm font-medium">Homepage</span>
          </Link>
          <Link to="/history" className="nav-btn flex flex-col items-center text-gray-600 hover:text-indigo-600 transition">
            <Clock className="w-6 h-6 mb-1" />
            <span className="text-sm font-medium">Payment History</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;