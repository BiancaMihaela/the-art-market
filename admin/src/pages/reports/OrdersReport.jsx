import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../../App';

const statusList = [
  'Order Placed',
  'Packing',
  'Shipped',
  'Out for delivery',
  'Delivered'
];

const OrdersReport = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [statusCounts, setStatusCounts] = useState({});

  const fetchOrders = async () => {
    try {
      const res = await axios.post(backendUrl + '/api/order/list', {}, { headers: {  token: token.token  } })
      if (res.data.success) {
        setOrders(res.data.orders);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error('Failed to fetch orders');
      console.error(err);
    }
  };

  const computeStatusCounts = () => {
    const counts = {};
    statusList.forEach(status => {
      counts[status] = orders.filter(order => order.status === status).length;
    });
    setStatusCounts(counts);
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  useEffect(() => {
    if (orders.length > 0) {
      computeStatusCounts();
    }
  }, [orders]);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Orders by Status</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {statusList.map((status, idx) => (
          <div key={idx} className="bg-white border shadow-sm rounded-md p-4">
            <p className="font-medium text-gray-700 mb-1">{status}</p>
            <p className="text-2xl font-bold text-black">{statusCounts[status] || 0}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersReport;
