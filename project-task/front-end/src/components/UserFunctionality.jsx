import { useState } from "react";

const UserFunctionality = () => {
  const [activeForm, setActiveForm] = useState(null);
  const [name, setName] = useState(""); 
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [updatedName, setUpdatedName] = useState(""); 
  const [updatedSurname, setUpdatedSurname] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState(""); 
  const [updatedPassword, setUpdatedPassword] = useState(""); 

  const handleFormOpen = (formType) => {
    setActiveForm(formType);
  };

  const handleFormClose = () => {
    setActiveForm(null);
    setName("");
    setSurname("");
    setEmail("");
    setPassword("");
    setUserId("");
    setUpdatedName("");
    setUpdatedSurname("");
    setUpdatedEmail("");
    setUpdatedPassword("");
  };

  const handleDeleteUser = async () => {
    if (!userId) {
      alert("Please enter the user ID to delete.");
      return;
    }
    try {
      const response = await fetch(`http://127.0.0.1:4021/users/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("User deleted successfully!");
        handleFormClose();
      } else {
        alert("Failed to delete user.");
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  const handleUpdateUser = async () => {
    if (!userId || !updatedName || !updatedSurname || !updatedEmail || !updatedPassword) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      const response = await fetch(`http://127.0.0.1:4021/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: updatedName,
          surname: updatedSurname,
          email: updatedEmail,
          password: updatedPassword,
        }),
      });
      if (response.ok) {
        alert("User updated successfully!");
        handleFormClose();
      } else {
        alert("Failed to update user.");
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
          onClick={() => handleFormOpen("delete")}
        >
          Delete user
        </button>
        <button
          className="border rounded-3xl w-[150px] cursor-pointer p-2"
          onClick={() => handleFormOpen("update")}
        >
          Update user
        </button>
      </div>

      {/* Form for Deleting a User */}
      {activeForm === "delete" && (
        <div className="border p-4 w-[300px] rounded-lg shadow-lg">
          <h2 className="text-lg font-bold">Delete User</h2>
          <input
            type="text"
            placeholder="User ID"
            className="border p-2 w-full my-2"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <button className="bg-red-500 text-white p-2 rounded w-full" onClick={handleDeleteUser}>
            Delete
          </button>
          <button className="text-red-500 mt-2" onClick={handleFormClose}>
            Close
          </button>
        </div>
      )}

      {activeForm === "update" && (
        <div className="border p-4 w-[300px] rounded-lg shadow-lg">
          <h2 className="text-lg font-bold">Update User</h2>
          <input
            type="text"
            placeholder="User ID"
            className="border p-2 w-full my-2"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <input
            type="text"
            placeholder="New Name"
            className="border p-2 w-full my-2"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
          <input
            type="text"
            placeholder="New Surname"
            className="border p-2 w-full my-2"
            value={updatedSurname}
            onChange={(e) => setUpdatedSurname(e.target.value)}
          />
          <input
            type="email"
            placeholder="New Email"
            className="border p-2 w-full my-2"
            value={updatedEmail}
            onChange={(e) => setUpdatedEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            className="border p-2 w-full my-2"
            value={updatedPassword}
            onChange={(e) => setUpdatedPassword(e.target.value)}
          />
          <button className="bg-green-500 text-white p-2 rounded w-full" onClick={handleUpdateUser}>
            Update
          </button>
          <button className="text-red-500 mt-2" onClick={handleFormClose}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default UserFunctionality;
