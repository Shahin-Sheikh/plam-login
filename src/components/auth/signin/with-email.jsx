import { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../helper/validation/validation";
import { InputField } from "../../ui/input-field";
import { PrimaryButton } from "../../ui/primary-button";

export function WithEmail() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (touched) {
      if (!value) {
        setError("Email is required");
      } else if (!validateEmail(value)) {
        setError("Please enter a valid email address");
      } else {
        setError("");
      }
    }
  };

  const handleBlur = () => {
    setTouched(true);
    if (!email) {
      setError("Email is required");
    } else if (!validateEmail(email)) {
      setError("Please enter a valid email address");
    } else {
      setError("");
    }
  };

  const handleContinue = () => {
    setTouched(true);
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b text-white px-4">
      <div className="flex items-center w-full max-w-sm m-8">
        <div className="flex flex-col justify-center items-center p-0 gap-2 absolute w-9 h-9 left-7 top-11 bg-white/5 rounded-full">
          <IoCloseOutline
            size={20}
            className="text-[#FFFFFF]"
            onClick={() => navigate("/cancelled")}
          />
        </div>
        <div className="mt-2 ml-12">
          <h1 className="text-[#FFFFFF] text-xl font-semibold m-2 ml-16">
            Sign in with PalmID
          </h1>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full m-16">
        <div className="mb-6">
          <div className="w-35 h-25 flex items-center justify-center relative">
            <img
              src="/logo.png"
              alt="Logo"
            />
          </div>
        </div>

        <div className="flex flex-col items-center mb-6">
          <span className="text-2xl text-[#FFFFFF] mb-2 font-bold">
            Enter account email to continue
          </span>
          <span className="text-2xl text-[#2979FF] font-bold">eBay.com</span>
        </div>
        <div>
          <InputField
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleBlur}
            icon={
              <HiOutlineMail
                size={21}
                className="text-[#FFFFFF]"
              />
            }
          />

          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

          <PrimaryButton
            text="Continue"
            onClick={handleContinue}
          />

          <div className="text-lg mt-6 flex space-x-4 text-md justify-center">
            <p>
              New User?{" "}
              <span
                className="text-[#2979FF]"
                onClick={() => navigate("/")}
              >
                Create an account
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
