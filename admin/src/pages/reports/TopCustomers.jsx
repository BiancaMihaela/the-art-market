import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../../App';

const TopCustomers = ({ token }) => {
  const [topUsers, setTopUsers] = useState([]);

 useEffect(() => {
  const fetchTopCustomers = async () => {
    try {
      const res = await axios.post(backendUrl + '/api/order/topCustomers', {}, { headers: {  token: token.token  } })
      if (res.data.success) {
        setTopUsers(res.data.customers);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error('Failed to fetch top customers');
      console.error(err);
    }
  };

  fetchTopCustomers();
}, [token]);


  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Top Customers</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {topUsers.map((user, idx) => (
          <div key={idx} className="bg-white border shadow-md rounded-md p-4">
            <p className="font-medium text-gray-600 mb-2">#{idx + 1}</p>
            <p><b>Name:</b> {user.fullName}</p>
            <p><b>Orders:</b> {user.orderCount}</p>
            <p><b>Total Spent:</b> ${user.totalAmount.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCustomers;
