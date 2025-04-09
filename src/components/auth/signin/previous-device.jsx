import { HiOutlineMail } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

export function PreviousDevice() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedEmail = location.state?.selectedEmail || "";

  const handleCompleteAccount = (email) => {
    navigate("/complete-account", {
      state: { selectedEmail: email },
    });
  };

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
            Continue on your previous device
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

          <button
            className="w-full max-w-sm p-4 bg-[#2979FF] text-white rounded-lg mt-4"
            onClick={() => handleCompleteAccount(selectedEmail)}
          >
            Continue to sign in {selectedEmail}
          </button>
        </div>
      </div>
    </div>
  );
}
