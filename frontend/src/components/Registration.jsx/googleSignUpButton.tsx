import React from "react";

const GoogleSignUpButton: React.FC = () => (
  <button
    type="button"
    className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-md mb-6 shadow transition"
    onClick={() => alert("Google signup not implemented.")}
  >
    <svg width="20" height="20" viewBox="0 0 48 48" className="inline-block">
      <g>
        <path
          fill="#4285F4"
          d="M44.5 20H24v8.5h11.7C34.7 33.1 30.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 2.9l6.1-6.1C34.5 6.5 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z"
        />
        <path
          fill="#34A853"
          d="M6.3 14.7l7 5.1C15.5 16.1 19.4 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.1-6.1C34.5 6.5 29.6 4 24 4c-7.2 0-13.4 4.1-16.7 10.7z"
        />
        <path
          fill="#FBBC05"
          d="M24 44c5.6 0 10.5-1.9 14.3-5.1l-6.6-5.4C29.8 35.6 27 36.5 24 36.5c-6.1 0-10.7-2.9-13.7-7.1l-7 5.4C6.6 39.9 14.1 44 24 44z"
        />
        <path
          fill="#EA4335"
          d="M44.5 20H24v8.5h11.7c-1.1 3.1-4.1 5.5-7.7 5.5-4.7 0-8.5-3.8-8.5-8.5s3.8-8.5 8.5-8.5c2.1 0 4 .7 5.5 2.1l6.1-6.1C34.5 6.5 29.6 4 24 4c-7.2 0-13.4 4.1-16.7 10.7z"
        />
      </g>
    </svg>
    Sign up with Google
  </button>
);

export default GoogleSignUpButton;