import React from "react";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "../components/Registration/AnimatedBackground";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <AnimatedBackground />
      <div className="z-10 w-full max-w-2xl mx-auto px-6 py-16 text-center bg-white/80 rounded-3xl shadow-2xl backdrop-blur-md">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 mb-4">
          Chatflix
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 font-medium mb-8">
          Connect, chat, and stream together. <br />
          <span className="text-green-600 font-semibold">Your social movie night starts here!</span>
        </p>
        <button
          onClick={() => {
            const token = localStorage.getItem('token');
            if(token)
            {
              navigate("/chat")
            }
            else
            {
              navigate("/register")
            }
          }}
          className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg hover:scale-105 transition transform duration-200"
        >
          Get Started
        </button>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <span className="text-4xl mb-2">🎬</span>
            <h3 className="font-bold text-lg text-gray-800 mb-1">Watch Together</h3>
            <p className="text-gray-600 text-sm">Sync up and enjoy movies with friends in real time.</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl mb-2">💬</span>
            <h3 className="font-bold text-lg text-gray-800 mb-1">Live Chat</h3>
            <p className="text-gray-600 text-sm">Chat, react, and share your thoughts instantly.</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl mb-2">🌟</span>
            <h3 className="font-bold text-lg text-gray-800 mb-1">Discover & Connect</h3>
            <p className="text-gray-600 text-sm">Find new friends and trending movies every day.</p>
          </div>
        </div>
        <div className="mt-10 text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} Chatflix. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Home;