import React from "react";

const dotColors = ["bg-red-500", "bg-green-500", "bg-blue-500", "bg-yellow-400"];

const FourDotsLoader: React.FC = () => (
  <div className="flex justify-center items-center space-x-2 h-8">
    {dotColors.map((color, i) => (
      <span
        key={i}
        className={`w-3 h-3 rounded-full ${color} animate-bounce`}
        style={{ animationDelay: `${i * 0.15}s` }}
      />
    ))}
  </div>
);

export default FourDotsLoader;