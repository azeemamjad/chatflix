import React from "react";

const AnimatedBackground: React.FC = () => (
  <div className="absolute inset-0 -z-10">
    <div className="absolute w-[60vw] h-[60vw] bg-gradient-to-tr from-green-400 via-blue-500 to-purple-500 opacity-30 rounded-full blur-3xl top-[-20%] left-[-20%] animate-pulse" />
    <div className="absolute w-[40vw] h-[40vw] bg-gradient-to-br from-pink-400 via-yellow-300 to-green-400 opacity-20 rounded-full blur-2xl bottom-[-10%] right-[-10%] animate-pulse" />
  </div>
);

export default AnimatedBackground;