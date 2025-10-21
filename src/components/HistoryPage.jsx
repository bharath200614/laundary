import React, { useState } from 'react';
import { Calendar, Package, IndianRupee, Filter, Search } from 'lucide-react';

const HistoryPage = () => {
  const [orders] = useState([
    {
      id: 'ORD001',
      date: '2025-09-28',
      items: [
        { name: 'Shirt', quantity: 3, price: 10 },
        { name: 'Pant', quantity: 2, price: 10 }
      ],
      total: 50,
      status: 'completed',
      paymentMethod: 'UPI'
    },
    {
      id: 'ORD002',
      date: '2025-09-25',
      items: [
        { name: 'Saree', quantity: 1, price: 20 },
        { name: 'Dupatta', quantity: 2, price: 10 }
      ],
      total: 40,
      status: 'processing',
      paymentMethod: 'Cash'
    },
    {
      id: 'ORD003',
      date: '2025-09-20',
      items: [
        { name: 'Jeans', quantity: 2, price: 15 },
        { name: 'Shirt', quantity: 4, price: 10 }
      ],
      total: 70,
      status: 'completed',
      paymentMethod: 'UPI'
    },
    {
      id: 'ORD004',
      date: '2025-09-15',
      items: [
        { name: 'Kudra', quantity: 1, price: 10 },
        { name: 'Pant', quantity: 3, price: 10 }
      ],
      total: 40,
      status: 'completed',
      paymentMethod: 'Cash'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'processing':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalRevenue = orders
    .filter(o => o.status === 'completed')
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Order History</h1>
          <p className="text-gray-600">Track and manage all your laundry orders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Orders</p>
                <p className="text-3xl font-bold text-gray-800">{orders.length}</p>
              </div>
              <Package className="w-12 h-12 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Completed</p>
                <p className="text-3xl font-bold text-green-600">
                  {orders.filter(o => o.status === 'completed').length}
                </p>
              </div>
              <Calendar className="w-12 h-12 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Revenue</p>
                <p className="text-3xl font-bold text-blue-600">₹{totalRevenue}</p>
              </div>
              <IndianRupee className="w-12 h-12 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by Order ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterStatus === 'all'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus('completed')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterStatus === 'completed'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => setFilterStatus('processing')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterStatus === 'processing'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Processing
              </button>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No orders found</p>
            </div>
          ) : (
            filteredOrders.map(order => (
              <div key={order.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Order {order.id}</h3>
                    <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                      <Calendar className="w-4 h-4" />
                      <span>{order.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-3 md:mt-0">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                      {order.paymentMethod}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="grid grid-cols-3 gap-2 text-sm font-semibold text-gray-600 mb-2">
                    <div>Item</div>
                    <div className="text-center">Qty</div>
                    <div className="text-right">Price</div>
                  </div>
                  {order.items.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-3 gap-2 text-sm py-2 border-b last:border-b-0">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-center">{item.quantity}</div>
                      <div className="text-right font-semibold">₹{item.quantity * item.price}</div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                  <span className="text-gray-600 font-medium">Total Amount</span>
                  <span className="text-2xl font-bold text-blue-600">₹{order.total}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;