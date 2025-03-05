import { useState, useEffect } from "react";
import "../index.css";
import UserSearch from "./UserSearch";
import UserFunctionality from "./UserFunctionality";
import { fetchWithAuth } from "../utils/api";

const BACK_END_URL = import.meta.env.VITE_BACK_END_URL

const UsersComponent = () => {
    const [users, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetchWithAuth(`${BACK_END_URL}/users`, {
                    method: "GET",
                    credentials: "include", 
                });
                if (!response.ok) {
                    throw new Error("You have not permisson for see users");
                }

                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError("You have not permission");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <div>Loading products...</div>;
    }

    if (error) {
        return <div>Message: {error}</div>;
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <UserFunctionality />
                
                <div className="mt-10">
                    <UserSearch />
                </div>

                <div className="flex flex-wrap justify-center gap-8 bg-gray-200 p-8 mx-auto">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px] xl:w-[350px] xl:h-[350px] bg-white rounded-2xl p-12"
                        >
                            <h3 className="text-center mt-2 font-semibold">Name {user.name}</h3>
                            <p className="text-center">ID {user._id}</p>
                            <p className="text-center">surname {user.surname}</p>
                            <p className="text-center">email {user.email}</p>
                            <p className="text-center">role: {user.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default UsersComponent;
