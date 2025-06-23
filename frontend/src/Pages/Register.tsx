import React, { useState } from "react";
import AnimatedBackground from "../components/Registration/AnimatedBackground";
import GoogleSignUpButton from "../components/Registration/GoogleSignUpButton";
import PasswordValidation, {
    passwordChecks
} from "../components/Registration/passwordCheck";

interface FormState {
    username: string;
    email: string;
    password: string;
}

const Register: React.FC = () => {
    const [form, setForm] = useState<FormState>({ username: "", email: "", password: "" });
    const [success, setSuccess] = useState(false);
    const [showPasswordChecks, setShowPasswordChecks] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (e.target.name === "password") setShowPasswordChecks(true);
    };

    const isPasswordValid = passwordChecks.every((check: { regex: RegExp }) =>
        check.regex.test(form.password)
    );

    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isPasswordValid) {
            alert("Password does not meet requirements.");
            return;
        }
        setSuccess(true);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <AnimatedBackground />
            <div className="max-w-md w-full mx-auto p-8 bg-white/80 shadow-2xl rounded-2xl backdrop-blur-md">
                <h2 className="text-3xl font-extrabold text-center text-green-600 mb-6">
                    Create Your Account
                </h2>
                <GoogleSignUpButton />
                <div className="flex items-center my-4">
                    <div className="flex-grow h-px bg-gray-300" />
                    <span className="mx-2 text-gray-400 text-sm">or</span>
                    <div className="flex-grow h-px bg-gray-300" />
                </div>
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
                        onFocus={() => setShowPasswordChecks(true)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        required
                    />
                    <PasswordValidation
                        password={form.password}
                        show={showPasswordChecks}
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition"
                    >
                        Register
                    </button>
                    {success && (
                        <p className="text-green-500 text-center">
                            Registration successful!
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Register;