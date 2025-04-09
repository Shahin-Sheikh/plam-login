import { GoArrowRight } from "react-icons/go";
import { HiOutlineMail } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";

export function Signin() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-b text-white px-4">
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
          {/* Placeholder for the logo - replace with your actual logo */}
          <div className="w-35 h-25 flex items-center justify-center relative">
            <img
              src="/public/signin_logo.png"
              alt="eBay Logo"
            />
          </div>
        </div>

        <div className="flex flex-col items-center mb-6">
          <span className="text-xl text-[#FFFFFF] mb-2 font-bold">
            Choose an account to continue to{" "}
          </span>
          <span className="text-xl text-[#2979FF] font-bold">eBay.com</span>
        </div>

        <div className="w-full max-w-sm space-y-3">
          {/* Account 1 */}
          <button className="w-full flex items-center justify-between bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition">
            <div className="flex items-center">
              <HiOutlineMail className="w-5 h-5 mr-3 text-gray-400" />
              <span>abcde@gmail.com</span>
            </div>
            <GoArrowRight className="w-5 h-5 text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition">
            <div className="flex items-center">
              <HiOutlineMail className="w-5 h-5 mr-3 text-gray-400" />
              <span>1234@yahoo.com</span>
            </div>
            <GoArrowRight className="w-5 h-5 text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition">
            <span>Use another account</span>
            <GoArrowRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="mt-6 flex space-x-4 text-md text-[#2979FF]">
          <a
            href="#"
            className="underline decoration-[#2979FF]"
          >
            Privacy policy
          </a>
          <a
            href="#"
            className="underline decoration-[#2979FF]"
          >
            Terms of service
          </a>
        </div>
      </div>
    </div>
  );
}
