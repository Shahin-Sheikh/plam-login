import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ChooseAccount } from "./choose-account";

export function Signin() {
  const [emails, setEmails] = useState([]);
  const navigate = useNavigate();

  /* document.cookie = "email_1=user1@example.com; path=/";
  document.cookie = "email_2=user2@example.com; path=/"; */

  const getEmailsFromCookies = () => {
    const cookieString = document.cookie;

    if (!cookieString) return [];

    const cookieArray = cookieString.split(";");
    const emailList = [];

    cookieArray.forEach((cookie) => {
      const trimmedCookie = cookie.trim();
      if (trimmedCookie) {
        const [name, value] = trimmedCookie.split("=");
        if (name.startsWith("email_")) {
          emailList.push(decodeURIComponent(value));
        }
      }
    });

    return emailList;
  };

  const handlePreviousDevice = (selectedEmail) => {
    navigate("/previous-device", {
      state: { selectedEmail },
    });
  };

  useEffect(() => {
    const emailList = getEmailsFromCookies();
    setEmails(emailList);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-b text-white px-4">
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
            <img src="/logo.png" alt="Logo" />
          </div>
        </div>

        <div className="flex flex-col items-center mb-6">
          <span className="text-2xl text-[#FFFFFF] mb-2 font-bold">
            Choose an account to continue to{" "}
          </span>
          <span className="text-2xl text-[#2979FF] font-bold">eBay.com</span>
        </div>

        <ChooseAccount
          emails={emails}
          onUseAnotherAccount={() => navigate("/with-email")}
          onPreviousDevice={handlePreviousDevice}
        />
      </div>
    </div>
  );
}
