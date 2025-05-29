import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const backendUrl = import.meta.env.VITE_BACKEND_URL

const periods = [
  { label: 'Last 1 month', months: 1 },
  { label: 'Last 3 months', months: 3 },
  { label: 'Last 6 months', months: 6 },
  { label: 'Last 12 months', months: 12 },
];

const Sales = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState([]);

  const fetchOrders = async () => {

     if (!token) {
      return null;
    }

    try {
      const res = await axios.post(backendUrl + '/api/order/list', {}, { headers: {  token: token.token  } })
      if (res.data.success) {
        setOrders(res.data.orders);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch orders');
    }
  };

  const computeStats = () => {
  const results = periods.map(({ label, months }) => {
    const cutoff = new Date();
    cutoff.setMonth(cutoff.getMonth() - months);

    const filteredOrders = orders.filter((o) => new Date(o.date) >= cutoff);

    const totalProducts = filteredOrders.reduce((sum, order) => {
      return sum + order.items.reduce((count, item) => count + item.quantity, 0);
    }, 0);

    const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.amount, 0);

    return {
      label,
      orders: filteredOrders.length,
      productsSold: totalProducts,
      revenue: totalRevenue,
    };
  });

  setStats(results);
};


  useEffect(() => {
    fetchOrders();
  }, [token]);

  useEffect(() => {
    if (orders.length > 0) {
      computeStats();
    }
  }, [orders]);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Sales Overview</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((entry, idx) => (
          <div key={idx} className="bg-white border shadow-md rounded-md p-4">
            <p className="font-medium text-gray-600 mb-1">{entry.label}</p>
            <p className="text-lg">Products Sold: <b>{entry.productsSold}</b></p>
            <p className="text-lg">Orders: <b>{entry.orders}</b></p>
              <p className="text-lg">Revenue: <b>${entry.revenue.toFixed(2)}</b></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sales;
