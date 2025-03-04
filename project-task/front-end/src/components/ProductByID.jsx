import React, { useState } from 'react';

const ProductSearch = () => {
  const [productId, setProductId] = useState('');
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setProductId(event.target.value);
  };

  const handleSearch = async () => {
    if (!productId.trim()) {
      setError('Please enter a valid Product ID.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:4021/products/${productId}`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Product not found');
        } else {
          throw new Error('Failed to fetch product details');
        }
      }

      const data = await response.json();
      setProductData(data);
    } catch (err) {
      setError(err.message);
      setProductData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setProductData(null);
    setProductId('');
    setError('');
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div>
        <input
          className="border rounded-3xl text-center p-2"
          type="text"
          placeholder="Enter product ID"
          value={productId}
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

      {productData && (
        <div className="border border-black bg-white p-4 rounded-lg shadow-md w-[300px] relative">
          <button
            className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm hover:bg-red-600"
            onClick={handleClose}
          >
            ✕
          </button>
          <h3 className="text-lg font-bold">Product Details</h3>
          <p><strong>Name:</strong> {productData.name}</p>
          <p><strong>Price:</strong> ${productData.price}</p>
          <p><strong>Description:</strong> {productData.description}</p>
          <p><strong>Category:</strong> {productData.category}</p>
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
