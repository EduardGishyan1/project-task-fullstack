import { useState, useEffect } from "react";
import "../index.css";
import ProductSearch from "./ProductByID";
import ProductFunctionality from "./ProductFunctionality";

const API_BASE_URL = "http://127.0.0.1:4021";  

const ProductsComponent = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/products`, {
                    method: "GET",
                    credentials: "include", 
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading products...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
        <div className="flex flex-col items-center justify-center">
            <ProductFunctionality />
            <div className="mt-10">
            <ProductSearch />
            </div>
            <div className="flex flex-wrap justify-center gap-8 bg-gray-200 p-8 mx-auto">
                {products.map((product) => (
                    <div key={product.id} className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px] xl:w-[350px] xl:h-[350px] bg-white rounded-2xl p-12">
                        <h3 className="text-center mt-2 font-semibold">Name {product.name}</h3>
                        <p className="text-center">Price ${product.price}</p>
                        <p className="text-center">Stock {product.stock}</p>
                        <p className="text-center">Category {product.category}</p>
                        <p className="text-center">Description {product.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </>
);
};

export default ProductsComponent;
