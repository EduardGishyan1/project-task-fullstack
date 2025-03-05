import { useState } from "react";
import Button from "./LoginRegisterBtn";

const BACK_END_URL = import.meta.env.VITE_BACK_END_URL;

const RegisterComponent = () => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(null);
        setSuccess(null);

        if (!formData.name || !formData.email || !formData.password) {
            setError("Please fill all required fields");
            return;
        }

        try {
            const response = await fetch(`${BACK_END_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Registration failed");
                return;
            }

            setSuccess("success log in");
            setFormData({ name: '', surname: '', email: '', password: '' });

        } catch (error) {
            setError("Try again later");
            console.error("Error:", error);
        }
    };

    return (
        <div className="h-screen w-full flex items-center justify-center bg-slate-100">
            <div className="w-96 p-4 bg-white rounded-xl shadow-xl w-100 place-items-center p-10">
                <h1 className="text-center text-2xl font-semibold">Register</h1>

                {error && <div className="text-red-500 text-center mb-4">{error}</div>}

                {success && <div className="text-green-500 text-center mb-4">{success}</div>}

                <form onSubmit={handleSubmit} className="grid place-items-center">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border w-90 h-8 text-center rounded-2xl mt-6"
                        required
                    />
                    <input
                        type="text"
                        name="surname"
                        placeholder="Surname"
                        value={formData.surname}
                        onChange={handleChange}
                        className="border w-90 h-8 text-center rounded-2xl mt-6"
                    />
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
                    <a className="mt-2" href="/login">Log In</a>
                    <Button value="Register" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default RegisterComponent;
