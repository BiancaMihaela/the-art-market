import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProfileSettings = () => {
  const { backendUrl, token } = useContext(ShopContext);
  const [user, setUser] = useState({
    fullName: '',
    birthDate: '',
    phoneNumber: '',
    email: '',
  });
  const [editing, setEditing] = useState({ field: null, value: '' });

  // Fetch user profile on mount or token change
  useEffect(() => {
    if (token) fetchProfile();
  }, [token]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/user/profile`, {
        headers: { token },
      });
      if (res.data.success) {
        setUser(res.data.user);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEdit = (field) => {
    setEditing({ field, value: user[field] || '' });
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(
        backendUrl+'/api/user/profile',
        { field: editing.field, value: editing.value },
        { headers: { token } }
      );
      if (res.data.success) {
        setUser((prev) => ({ ...prev, [editing.field]: editing.value }));
        toast.success('Changes saved successfully!');
        setEditing({ field: null, value: '' });
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

    // Helper to display date as YYYY-MM-DD
    const formatDate = (isoString) => {
      try {
        return new Date(isoString).toISOString().split('T')[0];
      } catch {
        return isoString;
      }
    };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-6">Profile Settings</h2>

        {/* Personal Information */}
        <div className="space-y-6">
          <h3 className="text-xl font-medium">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-b border-gray-200 py-4">
            {['fullName', 'birthDate', 'phoneNumber'].map((field) => (
              <div key={field} className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">
                    {field === 'fullName' && 'Full Name'}
                    {field === 'birthDate' && 'Date of Birth'}
                    {field === 'phoneNumber' && 'Phone Number'}
                  </p>
                  {editing.field === field ? (
                    <input
                      type={field === 'birthDate' ? 'date' : 'text'}
                      className="mt-1 border border-gray-300 rounded px-2 py-1"
                      value={editing.value}
                      onChange={(e) => setEditing((prev) => ({ ...prev, value: e.target.value }))}
                    />
                  ) : (
                    <p className="mt-1 text-gray-900 font-medium">
                        {field === 'birthDate' && user.birthDate
                        ? formatDate(user.birthDate)
                        : user[field] || '—'}
                    </p>
                  )}
                </div>
                {editing.field === field ? (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="text-green-600 hover:underline text-sm"
                    >
                      Salvează
                    </button>
                    <button
                      onClick={() => setEditing({ field: null, value: '' })}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Anulează
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEdit(field)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    {user[field] ? 'Change' : 'Add'}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Login & Security */}
        <div className="mt-8 space-y-6">
          <h3 className="text-xl font-medium">Login credentials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-b border-gray-200 py-4">
            {['email', 'password'].map((field) => (
              <div key={field} className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">
                    {field === 'email' ? 'E-mail' : 'Password'}
                  </p>
                  {editing.field === field ? (
                    <input
                      type={field === 'email' ? 'email' : 'password'}
                      className="mt-1 border border-gray-300 rounded px-2 py-1"
                      value={editing.value}
                      onChange={(e) => setEditing((prev) => ({ ...prev, value: e.target.value }))}
                    />
                  ) : (
                    <p className="mt-1 text-gray-900 font-medium">
                      {field === 'password' ? '••••••••' : user.email}
                    </p>
                  )}
                </div>
                {editing.field === field ? (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="text-green-600 hover:underline text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditing({ field: null, value: '' })}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEdit(field)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Change
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
