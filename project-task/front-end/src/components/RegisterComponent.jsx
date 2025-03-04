import { useState } from "react";
import Button from "./LoginRegisterBtn";

const RegisterComponent = () => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password) {
            console.error("Please fill all required fields");
            return; 
        }

        try {
            const response = await fetch("http://127.0.0.1:4021/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log(data);


        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <div className="h-screen w-full flex items-center justify-center bg-slate-100">
            <div className="w-96 p-4 bg-white rounded-xl shadow-xl w-100 place-items-center p-10">
                <h1 className="text-center text-2xl font-semibold">Register</h1>
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
                    <Button value="Register" type="submit" />
                </form>
            </div>
        </div>
    );
}

export default RegisterComponent;
