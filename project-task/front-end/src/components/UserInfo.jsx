import { useState, useEffect } from "react";
import "../index.css";

const UserInfo = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {

        const response = await fetch("http://127.0.0.1:4021/users/profile/me", {
          method: 'GET',
          credentials: 'include',
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] bg-white rounded-2xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-center">User Profile</h2>
      <p className="text-gray-600 text-center mt-2">{userData.name} {userData.surname}</p>
      <p className="text-gray-600 text-center">{userData.email}</p>
    </div>
  );
};

export default UserInfo;