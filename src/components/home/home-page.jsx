import React from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../ui/primary-button";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md bg-[#1E1E2A] rounded-lg shadow-lg p-6 sm:p-8 text-center">
        <h1 className="text-xl sm:text-2xl font-bold text-[#FFFFFF] mb-4 sm:mb-6">
          Welcome, anonymous
        </h1>

        <div className="flex justify-center">
          <PrimaryButton
            text="Sign in using the local OIDC server"
            onClick={() => navigate("/account/palm-scan")}
            className="w-full sm:w-auto"
          />
        </div>

        <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500">
          © Your Company 2014
        </p>
      </div>
    </div>
  );
};

export default HomePage;
