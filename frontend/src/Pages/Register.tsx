import React, { useState } from 'react';
import axios from 'axios';

const Register: React.FC = () => {
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/register/', form);
            setSuccess(true);
        } catch {
            alert('Registration failed');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded-xl">
            <h2 className="text-2xl text-green-600 font-bold mb-4 text-center">Create WhatsApp Account</h2>
            <form onSubmit={handleRegister} className="space-y-4">
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md"
                >
                    Register
                </button>
                {success && <p className="text-green-500 text-center">Registration successful!</p>}
            </form>
        </div>
    );
};

export default Register;
