import { useState } from "react";
import Cookies from "js-cookie";
import { fetchWithAuth } from "../utils/api";

const BACK_END_URL = import.meta.env.VITE_BACK_END_URL

const ProductFunctionality = () => {
  const [activeForm, setActiveForm] = useState(null);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(""); 
  const [description, setDescription] = useState(""); 
  const [category, setCategory] = useState(""); 
  const [productId, setProductId] = useState(""); 
  const [updatedName, setUpdatedName] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState(""); 
  const [updatedStock, setUpdatedStock] = useState(""); 
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedCategory, setUpdatedCategory] = useState("");

  const handleFormOpen = (formType) => {
    setActiveForm(formType);
  };

  const handleFormClose = () => {
    setActiveForm(null);
    setProductName("");
    setPrice("");
    setStock("");
    setDescription("");
    setCategory("");
    setProductId("");
    setUpdatedName("");
    setUpdatedPrice("");
    setUpdatedStock("");
    setUpdatedDescription("");
    setUpdatedCategory("");
  };

  const handleAddProduct = async () => {
    if (!productName || !price || !stock || !description || !category) {
      alert("Please fill in all fields.");
      return;
    }
    const token = Cookies.get("token");
    if (!token) {
      alert("Authentication token is missing.");
      return;
    }
    try {
      const response = await fetchWithAuth(`${BACK_END_URL}/products`, {
        method: "POST",
        body: JSON.stringify({
          name: productName,
          price: parseFloat(price),
          stock: parseInt(stock),
          description: description,
          category: category,
        }),
      });

      if (response.ok) {
        alert("Product added successfully!");
        handleFormClose();
      } else {
        alert("Failed to add product.");
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  const handleDeleteProduct = async () => {
    if (!productId) {
      alert("Please enter the product ID to delete.");
      return;
    }

    const token = Cookies.get("token");
    if (!token) {
      alert("Authentication token is missing.");
      return;
    }

    try {
      const response = await fetchWithAuth(`${BACK_END_URL}/products/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Product deleted successfully!");
        handleFormClose();
      } else {
        alert("Failed to delete product.");
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  const handleUpdateProduct = async () => {
    if (!productId || !updatedPrice || !updatedStock || !updatedDescription || !updatedCategory) {
      alert("Please fill in all fields.");
      return;
    }

    const token = Cookies.get("token");
    if (!token) {
      alert("Authentication token is missing.");
      return;
    }

    try {
      const response = await fetchWithAuth(`${BACK_END_URL}/products/${productId}`, {
        method: "PUT",
        body: JSON.stringify({
          price: parseFloat(updatedPrice),
          stock: parseInt(updatedStock),
          description: updatedDescription,
          category: updatedCategory,
        }),
      });

      if (response.ok) {
        alert("Product updated successfully!");
        handleFormClose();
      } else {
        alert("Failed to update product.");
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
          onClick={() => handleFormOpen("add")}
        >
          Add product
        </button>
        <button
          className="border rounded-3xl w-[150px] cursor-pointer p-2"
          onClick={() => handleFormOpen("delete")}
        >
          Delete product
        </button>
        <button
          className="border rounded-3xl w-[150px] cursor-pointer p-2"
          onClick={() => handleFormOpen("update")}
        >
          Update product
        </button>
      </div>

      {activeForm === "add" && (
        <div className="border p-4 w-[300px] rounded-lg shadow-lg">
          <h2 className="text-lg font-bold">Add Product</h2>
          <input
            type="text"
            placeholder="Product Name"
            className="border p-2 w-full my-2"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            className="border p-2 w-full my-2"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Stock"
            className="border p-2 w-full my-2"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="border p-2 w-full my-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Category"
            className="border p-2 w-full my-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <button className="bg-blue-500 text-white p-2 rounded w-full" onClick={handleAddProduct}>
            Submit
          </button>
          <button className="text-red-500 mt-2" onClick={handleFormClose}>
            Close
          </button>
        </div>
      )}

      {activeForm === "delete" && (
        <div className="border p-4 w-[300px] rounded-lg shadow-lg">
          <h2 className="text-lg font-bold">Delete Product</h2>
          <input
            type="text"
            placeholder="Product ID"
            className="border p-2 w-full my-2"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
          <button className="bg-red-500 text-white p-2 rounded w-full" onClick={handleDeleteProduct}>
            Delete
          </button>
          <button className="text-red-500 mt-2" onClick={handleFormClose}>
            Close
          </button>
        </div>
      )}

      {activeForm === "update" && (
        <div className="border p-4 w-[300px] rounded-lg shadow-lg">
          <h2 className="text-lg font-bold">Update Product</h2>
          <input
            type="text"
            placeholder="Product ID"
            className="border p-2 w-full my-2"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
          <input
            type="number"
            placeholder="New Price"
            className="border p-2 w-full my-2"
            value={updatedPrice}
            onChange={(e) => setUpdatedPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="New Stock"
            className="border p-2 w-full my-2"
            value={updatedStock}
            onChange={(e) => setUpdatedStock(e.target.value)}
          />
          <textarea
            placeholder="New Description"
            className="border p-2 w-full my-2"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="New Category"
            className="border p-2 w-full my-2"
            value={updatedCategory}
            onChange={(e) => setUpdatedCategory(e.target.value)}
          />
          <button className="bg-green-500 text-white p-2 rounded w-full" onClick={handleUpdateProduct}>
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

export default ProductFunctionality;
