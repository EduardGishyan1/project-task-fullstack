import { useState } from "react";
import Button from "./LoginRegisterBtn";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const LoginComponent = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:4021/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
                credentials: "include",
            });

            const data = await response.json();

            console.log(data)

            if (!response.ok) {
                setError(data.message || "Failed to login");
                return;
            }

            const { access_token, refresh_token } = data;

            console.log(access_token,refresh_token)

            Cookies.set('token', access_token, {
                expires: 1,
                path: '/', 
                sameSite: 'Strict'
            });

            Cookies.set('refresh-token', refresh_token, {
                expires: 7,
                path: '/',
                sameSite: 'Strict',
            });

            navigate("/profile");

        } catch (error) {
            setError("An error occurred during login.");
            console.error("Error:", error);
        }
    }

    return (
        <div className="h-screen w-full flex items-center justify-center bg-slate-100">
            <div className="w-96 p-2 bg-white rounded-xl shadow-xl w-100 place-items-center p-10">
                <h1 className="text-center text-2xl font-semibold">Login</h1>

                {error && <div className="text-red-500 text-center mb-4">{error}</div>}

                <form onSubmit={handleSubmit} className="grid place-items-center">
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border w-90 h-8 text-center rounded-2xl mt-6"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="border w-90 h-8 text-center rounded-2xl mt-6"
                    />
                    <Button value="Login" />
                </form>
            </div>
        </div>
    );
}

export default LoginComponent;
