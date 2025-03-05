import { useState } from "react";
import Cookies from "js-cookie"
import { fetchWithAuth } from "../utils/api";

const BACK_END_URL = import.meta.env.VITE_BACK_END_URL

const SettingsComponent = () => {
  const [activeForm, setActiveForm] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedPhone, setUpdatedPhone] = useState("");

  const handleFormOpen = (formType) => {
    setActiveForm(formType);
  };

  const handleFormClose = () => {
    setActiveForm(null);
    setUpdatedName("");
    setUpdatedEmail("");
    setUpdatedPhone("");
  };

  const handleUpdateProfile = async () => {
    if (!updatedName || !updatedEmail) {
      alert("Please fill all fild");
      return;
    }
    try {
      const response = await fetchWithAuth(`${BACK_END_URL}/users/profile/me`, {
        method: "PUT",
        body: JSON.stringify({
          name: updatedName,
          email: updatedEmail
        }),
      });

      if (response.ok) {
        alert("Profile updated");
        handleFormClose();
      } else {
        alert("Failed to update");
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  const handleDeleteProfile = async () => {
    if (!window.confirm("do you want to delete this acount")) return;

    try {
      const response = await fetchWithAuth(`${BACK_END_URL}/users/profile/me`, {
        method: "DELETE"
      });
      if (response.ok) {
        alert("your account deleted");
        Cookies.remove("token");
        Cookies.remove("refresh-token");
        window.location.href = "/";
      } else {
        alert("Failed to delete your account");
      }
    } catch (error) {
      alert("something went wrong");
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

      {activeForm === "update" && (
        <div className="border p-4 w-[300px] rounded-lg shadow-lg">
          <h2 className="text-lg font-bold">Update Profile</h2>
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
          <button className="text-red-500 mt-2" onClick={handleFormClose}>
            Close
          </button>
        </div>
      )}

      {activeForm === "delete" && (
        <div className="border p-4 w-[300px] rounded-lg shadow-lg">
          <h2 className="text-lg font-bold">Delete Account</h2>
          <p className="text-red-500">This action is irreversible!</p>
          <button className="bg-red-500 text-white p-2 rounded w-full" onClick={handleDeleteProfile}>
            Delete
          </button>
          <button className="text-red-500 mt-2" onClick={handleFormClose}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default SettingsComponent;
