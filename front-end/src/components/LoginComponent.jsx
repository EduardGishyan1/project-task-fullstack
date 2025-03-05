import { useState } from "react";
import Button from "./LoginRegisterBtn";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const BACK_END_URL = import.meta.env.VITE_BACK_END_URL
const tokenExpireTime = import.meta.env.VITE_TOKEN_EXPIRE_TIME;
const refreshTokenExpireTime = parseInt(import.meta.env.VITE_REFRESH_TOKEN_EXPIRE_TIME);

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
            const response = await fetch(`${BACK_END_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
                credentials: "include",
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Failed to login");
                return;
            }

            const { access_token, unique_id } = data;

            const expireTime = new Date();
            expireTime.setMinutes(expireTime.getMinutes() + parseInt(tokenExpireTime));

            const refreshExpireTime = new Date();
            refreshExpireTime.setMinutes(refreshExpireTime.getMinutes() + parseInt(refreshTokenExpireTime));

            Cookies.set('token', access_token, {
                expires: expireTime,
                path: '/'
            });

            Cookies.set('refresh-token', unique_id, {
                expires: refreshExpireTime,
                path: '/',
            });

            navigate("/profile");

        } catch (error) {
            setError("An error occurred during login.");
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
                    <a className="mt-2" href="/">Register</a>
                    <Button value="Login" />
                </form>
            </div>
        </div>
    );
}

export default LoginComponent;
