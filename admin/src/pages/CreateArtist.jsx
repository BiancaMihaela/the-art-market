import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';

const CreateArtist = ({ token }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        backendUrl + '/api/user/registerArtist',
        form,
        { headers: { token: `${token}` } }
      );
      if (res.data.success) {
        toast.success('Artist created successfully');
        setForm({ name: '', email: '', password: '' });
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error('Failed to create artist');
      console.error(err);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Create Artist Account</h3>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-black text-white px-6 py-2 rounded">
          Create Artist
        </button>
      </form>
    </div>
  );
};

export default CreateArtist;
