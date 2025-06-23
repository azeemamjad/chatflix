import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "../components/Registration/AnimatedBackground";
import GoogleSignUpButton from "../components/Registration/googleSignUpButton";

interface FormData {
  email: string;
  otp: string;
  username: string;
  bio: string;
  profilePicture: File | null;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<'email' | 'otp' | 'details'>('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState<FormData>({
    email: "",
    otp: "",
    username: "",
    bio: "",
    profilePicture: null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
    setError(""); // Clear error when user starts typing
  };

  const handleRequestOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8000/api/users/request-otp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("OTP sent to your email!");
        setCurrentStep('otp');
      } else {
        setError(data.error || "Failed to send OTP");
      }
    } catch (err) {
      console.error("OTP request error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8000/api/users/verify-otp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.message.includes("Login successful")) {
          // User already registered, redirect to home
          localStorage.setItem('user_id', data.user_id);
          navigate('/home');
        } else {
          // New user, proceed to registration details
          setSuccess("OTP verified! Please complete your registration.");
          setCurrentStep('details');
        }
      } else {
        setError(data.error || "Invalid OTP");
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.username.trim()) {
      setError("Username is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('email', formData.email);
      formDataToSend.append('otp', formData.otp);
      formDataToSend.append('username', formData.username);
      formDataToSend.append('bio', formData.bio);
      if (formData.profilePicture) {
        formDataToSend.append('profile_picture', formData.profilePicture);
      }

      const response = await fetch("http://localhost:8000/api/users/register/", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user_id', data.user_id);
        setSuccess("Registration successful! Redirecting...");
        setTimeout(() => navigate('/home'), 2000);
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = (userData: any) => {
    localStorage.setItem('user_id', userData.user_id);
    navigate('/home');
  };

  const renderEmailStep = () => (
    <form onSubmit={handleRequestOTP} className="space-y-4">
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleInputChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        required
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-md transition"
      >
        {loading ? "Sending..." : "Send OTP"}
      </button>
    </form>
  );

  const renderOTPStep = () => (
    <form onSubmit={handleVerifyOTP} className="space-y-4">
      <div className="text-center mb-4">
        <p className="text-sm text-gray-600">
          Enter the 6-digit code sent to {formData.email}
        </p>
      </div>
      <input
        type="text"
        name="otp"
        placeholder="Enter 6-digit OTP"
        value={formData.otp}
        onChange={handleInputChange}
        maxLength={6}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 text-center text-lg tracking-widest"
        required
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-md transition"
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
      <button
        type="button"
        onClick={() => setCurrentStep('email')}
        className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-md transition"
      >
        Back to Email
      </button>
    </form>
  );

  const renderDetailsStep = () => (
    <form onSubmit={handleCompleteRegistration} className="space-y-4">
      <input
        type="text"
        name="username"
        placeholder="Choose a username"
        value={formData.username}
        onChange={handleInputChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        required
        disabled={loading}
      />
      <textarea
        name="bio"
        placeholder="Tell us about yourself (optional)"
        value={formData.bio}
        onChange={handleInputChange}
        rows={3}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
        disabled={loading}
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Profile Picture (optional)
        </label>
        <input
          type="file"
          name="profilePicture"
          accept="image/*"
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-md transition"
      >
        {loading ? "Creating Account..." : "Complete Registration"}
      </button>
    </form>
  );

  const getStepTitle = () => {
    switch (currentStep) {
      case 'email': return 'Create Your Account';
      case 'otp': return 'Verify Your Email';
      case 'details': return 'Complete Your Profile';
      default: return 'Create Your Account';
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBackground />
      <div className="max-w-md w-full mx-auto p-8 bg-white/80 shadow-2xl rounded-2xl backdrop-blur-md z-10">
        <h2 className="text-3xl font-extrabold text-center text-green-600 mb-6">
          {getStepTitle()}
        </h2>

        {currentStep === 'email' && (
          <>
            <GoogleSignUpButton onSuccess={handleGoogleSuccess} />
            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-300" />
              <span className="mx-2 text-gray-400 text-sm">or</span>
              <div className="flex-grow h-px bg-gray-300" />
            </div>
          </>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md text-sm">
            {success}
          </div>
        )}

        {currentStep === 'email' && renderEmailStep()}
        {currentStep === 'otp' && renderOTPStep()}
        {currentStep === 'details' && renderDetailsStep()}

        {currentStep === 'email' && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-green-600 hover:text-green-800 font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;