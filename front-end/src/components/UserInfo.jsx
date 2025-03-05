import { useState, useEffect } from "react";
import "../index.css";
import SettingsComponent from "./ProfileFunctionality";
import { fetchWithAuth } from "../utils/api";

const BACK_END_URL = import.meta.env.VITE_BACK_END_URL

const UserInfo = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetchWithAuth(`${BACK_END_URL}/users/profile/me`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data. Please log in again.");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <SettingsComponent userData={userData} />

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-center">User Profile</h2>
        <p className="text-gray-600 text-center mt-2">
          {userData.name} {userData.surname}
        </p>
        <p className="text-gray-600 text-center">email: {userData.email}</p>
        <p className="text-gray-600 text-center">role: {userData.role}</p>
      </div>
    </div>
  );
};

export default UserInfo;