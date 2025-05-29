import React, { useState } from 'react'
import Sales from './reports/Sales'
import OrdersReport from './reports/OrdersReport';
import TopCustomers from './reports/TopCustomers'

const Reports = (token) => {
  const [activeTab, setActiveTab] = useState('sales');

  const renderContent = () => {
    switch (activeTab) {
      case 'sales': return <Sales token={token} />;
      case 'orders': return <OrdersReport token={token} />;
      case 'topCustomers': return <TopCustomers token={token} />;
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
          className={`py-2 px-4 ${activeTab === 'topCustomers' ? 'border-b-2 border-black font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('topCustomers')}
        >
          Top Customers
        </button>
      </div>

      <div>
        {renderContent()}
      </div>
    </div>
  )
}

export default Reports
