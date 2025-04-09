import { HiOutlineMail } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { InputField } from "../../ui/input-field";

export function WithEmail() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b text-white px-4">
      <div className="flex items-center w-full max-w-sm m-8">
        <div className="flex flex-col justify-center items-center p-0 gap-2 absolute w-9 h-9 left-7 top-11 bg-white/5 rounded-full">
          <IoCloseOutline size={20} />
        </div>
        <div className="mt-2 ml-12">
          <h1 className="text-xl font-semibold m-2 ml-16">
            Sign in with PalmID
          </h1>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full m-16">
        <div className="mb-6">
          <div className="w-35 h-25 flex items-center justify-center relative">
            <img src="/logo.png" alt="Logo" />
          </div>
        </div>

        <div className="flex flex-col items-center mb-6">
          <span className="text-xl text-[#FFFFFF] mb-2 font-bold">
            Enter account email to continue to
          </span>
          <span className="text-xl text-[#2979FF] font-bold">eBay.com</span>
        </div>
        <div>
          <InputField
            type="email"
            placeholder="Enter your email"
            icon={<HiOutlineMail size={23} />}
          />

          <button className="w-full max-w-sm p-4 bg-[#2979FF] text-white rounded-lg mt-4">
            Continue
          </button>

          <div className="mt-6 flex space-x-4 text-md justify-center">
            <p>
              New User?{" "}
              <span className="text-[#2979FF]" onClick={() => navigate("/")}>
                Create an account
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
