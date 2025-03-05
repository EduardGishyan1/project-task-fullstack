import { useState } from "react";
import { fetchWithAuth } from "../utils/api";

const BACK_END_URL = import.meta.env.VITE_BACK_END_URL

const UserFunctionality = () => {
  const [activeForm, setActiveForm] = useState(null);
  const [userId, setUserId] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedPhone, setUpdatedPhone] = useState("");

  const handleFormOpen = (formType) => {
    setActiveForm(formType);
  };

  const handleFormClose = () => {
    setActiveForm(null);
    setUserId("");
    setUpdatedName("");
    setUpdatedEmail("");
    setUpdatedPhone("");
  };

  const handleUpdateProfile = async () => {
    if (!userId || !updatedName || !updatedEmail) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      const response = await fetchWithAuth(`${BACK_END_URL}/users/${userId}`, {
        method: "PUT",
        body: JSON.stringify({
          name: updatedName,
          email: updatedEmail,
        }),
      });

      if (response.ok) {
        alert("Profile updated successfully!");
        handleFormClose();
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  const handleDeleteProfile = async () => {
    if (!userId) {
      alert("Please enter a user ID.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this account?")) return;

    try {
      const response = await fetchWithAuth(`${BACK_END_URL}/users/${userId}`, {
        method: "DELETE"
      });

      if (response.ok) {
        alert("Account deleted!");
      } else {
        alert("Failed to delete account.");
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex justify-around items-center gap-2">
        <button
          className="border rounded-3xl w-[150px] cursor-pointer p-2"
          onClick={() => handleFormOpen("update")}
        >
          Update Profile
        </button>
        <button
          className="border rounded-3xl w-[150px] cursor-pointer p-2 bg-red-500 text-white"
          onClick={() => handleFormOpen("delete")}
        >
          Delete Account
        </button>
      </div>

      {activeForm && (
        <div className="border p-4 w-[300px] rounded-lg shadow-lg">
          <h2 className="text-lg font-bold">{activeForm === "update" ? "Update Profile" : "Delete Account"}</h2>
          <input
            type="text"
            placeholder="Enter User ID"
            className="border p-2 w-full my-2"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          {activeForm === "update" && (
            <>
              <input
                type="text"
                placeholder="New Name"
                className="border p-2 w-full my-2"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
              <input
                type="email"
                placeholder="New Email"
                className="border p-2 w-full my-2"
                value={updatedEmail}
                onChange={(e) => setUpdatedEmail(e.target.value)}
              />
              <button className="bg-green-500 text-white p-2 rounded w-full" onClick={handleUpdateProfile}>
                Update
              </button>
            </>
          )}

          {activeForm === "delete" && (
            <>
              <p className="text-red-500">This action is irreversible!</p>
              <button className="bg-red-500 text-white p-2 rounded w-full" onClick={handleDeleteProfile}>
                Delete
              </button>
            </>
          )}

          <button className="text-red-500 mt-2" onClick={handleFormClose}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default UserFunctionality;
