import { HiOutlineMail } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { InputField } from "../../ui/input-field";
import { PrimaryButton } from "../../ui/primary-button";

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
            <img
              src="/logo.png"
              alt="Logo"
            />
          </div>
        </div>

        <div className="flex flex-col items-center mb-6">
          <span className="text-xl text-[#FFFFFF] mb-2 font-bold">
            Continue on your previous device
          </span>
        </div>
        <div>
          <div className="flex items-center justify-center mb-4 relative">
            <InputField
              type="email"
              placeholder="Enter your email"
              icon={
                <HiOutlineMail
                  size={21}
                  className="text-[#FFFFFF]"
                />
              }
              className="bg-[#1E1E2A] border rounded-lg border-transparent"
              value={selectedEmail}
              readOnly
            />
          </div>

          <PrimaryButton
            text={`Continue to sign in into ${selectedEmail}`}
            onClick={() => handleCompleteAccount(selectedEmail)}
          />
        </div>
      </div>
    </div>
  );
}
