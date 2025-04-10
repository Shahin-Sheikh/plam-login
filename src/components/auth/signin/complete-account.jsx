import { HiOutlineMail } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { InputField } from "../../ui/input-field";
import { SecondaryButton } from "../../ui/secondary-button";

export function CompleteAccount() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedEmail = location.state?.selectedEmail || "";

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-b text-white px-4">
      <div></div>

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
            You have created a PalmID account with
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
              value={selectedEmail}
              readOnly
              className="bg-[#1E1E2A] border rounded-lg border-transparent"
            />
          </div>

          <SecondaryButton text="Settings" />
          <SecondaryButton text="Delete Account" />
          <SecondaryButton
            text="Sign Out"
            onClick={() => {
              navigate("/");
            }}
            className="text-[#F44336]"
          />
        </div>
      </div>
    </div>
  );
}
