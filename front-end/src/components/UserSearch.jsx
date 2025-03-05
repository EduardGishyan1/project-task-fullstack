import React, { useState } from 'react';
import Cookies from "js-cookie"
import { fetchWithAuth } from '../utils/api';

const BACK_END_URL = import.meta.env.VITE_BACK_END_URL

const UserSearch = () => {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setUserId(event.target.value);
  };

  const token = Cookies.get("token")

  const handleSearch = async () => {
    if (!userId.trim()) {
      setError('Please enter a valid User ID.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetchWithAuth(`${BACK_END_URL}/users/${userId}`, {
        method: 'GET',
        credentials: 'include'
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('User not found');
        } else {
          throw new Error('Failed to fetch user details');
        }
      }

      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError(err.message);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setUserData(null);
    setUserId('');
    setError('');
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div>
        <input
          className="border rounded-3xl text-center p-2"
          type="text"
          placeholder="Enter user ID"
          value={userId}
          onChange={handleInputChange}
        />
        <button
          className="cursor-pointer ml-2 w-[100px] h-[35px] rounded-2xl border bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {userData && (
        <div className="border border-black bg-white p-4 rounded-lg shadow-md w-[300px] relative">
          <button
            className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm hover:bg-red-600"
            onClick={handleClose}
          >
            ✕
          </button>
          <h3 className="text-lg font-bold">User Details</h3>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Surname:</strong> {userData.surname}</p>
          <p><strong>Email:</strong> {userData.email}</p>
        </div>
      )}
    </div>
  );
};

export default UserSearch;