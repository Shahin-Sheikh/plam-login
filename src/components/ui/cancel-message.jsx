import React from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "./primary-button";

const CancelledPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#1E1E2A] rounded-lg shadow-lg p-6 text-center">
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

        <h1 className="text-2xl font-bold text-[#FFFFFF] mb-2">
          Operation Cancelled
        </h1>

        <p className="text-white/40 mb-6">
          The operation has been cancelled. If this was unexpected, please try
          again or contact support.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <PrimaryButton text="Return Home" onClick={() => navigate("/")} />
        </div>

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
