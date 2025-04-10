// src/components/CancelledPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom"; // If using React Router

const CancelledPage = () => {
  const navigate = useNavigate(); // Optional: for navigation

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
        {/* Cancel Icon */}
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <svg
            className="h-6 w-6 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Operation Cancelled
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          The operation has been cancelled. If this was unexpected, please try
          again or contact support.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/")} // Replace with your home route
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Return Home
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>

        {/* Optional Support Link */}
        <p className="mt-4 text-sm text-gray-500">
          Need help?{" "}
          <a
            onClick={() => navigate("/")}
            className="text-blue-600 hover:underline"
          >
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
};

export default CancelledPage;
