import { HiOutlineMail } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { SecondaryButton } from "../../ui/secondary-button";

export function CompleteAccount() {
  const location = useLocation();
  const selectedEmail = location.state?.selectedEmail || "";

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-b text-white px-4">
      <div></div>

      <div className="flex flex-col justify-center items-center w-full m-16">
        <div className="mb-6">
          <div className="w-35 h-25 flex items-center justify-center relative">
            <img src="/logo.png" alt="Logo" />
          </div>
        </div>

        <div className="flex flex-col items-center mb-6">
          <span className="text-xl text-[#FFFFFF] mb-2 font-bold">
            You have created a PalmID account with
          </span>
        </div>
        <div>
          <div className="flex items-center justify-center mb-4 relative">
            <HiOutlineMail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-[336.3px] h-[56.5px] pl-12 p-[14px] bg-black/30 text-white rounded-[16px] 
                border border-white/12 flex items-center 
                box-border flex-none order-2 self-stretch grow-0"
              value={selectedEmail}
              readOnly
            />
          </div>

          <SecondaryButton text="Settings" />
          <SecondaryButton text="Delete Account" />
          <SecondaryButton text="Sign Out" textColor="#F44336" />
        </div>
      </div>
    </div>
  );
}
