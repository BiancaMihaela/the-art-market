import React, { useState } from 'react'
import Sales from './reports/Sales'
import OrdersReport from './reports/OrdersReport';

const Reports = (token) => {
  const [activeTab, setActiveTab] = useState('sales');

  const renderContent = () => {
    switch (activeTab) {
      case 'sales': return <Sales token={token} />;
      case 'orders': return <OrdersReport token={token} />;
      case 'stocks':
        return <div>Stocks Report Content</div>;
      default:
        return null;
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Admin Reports</h2>
      <div className="flex gap-4 border-b mb-6">
        <button
          className={`py-2 px-4 ${activeTab === 'sales' ? 'border-b-2 border-black font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('sales')}
        >
          Sales
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'orders' ? 'border-b-2 border-black font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'stocks' ? 'border-b-2 border-black font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('stocks')}
        >
          Stocks
        </button>
      </div>

      <div>
        {renderContent()}
      </div>
    </div>
  )
}

export default Reports
