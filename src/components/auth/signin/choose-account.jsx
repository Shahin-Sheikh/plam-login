import { GoArrowRight } from "react-icons/go";
import { HiOutlineMail } from "react-icons/hi";

export function ChooseAccount({
  emails,
  onUseAnotherAccount,
  onPreviousDevice,
}) {
  return (
    <>
      <div className="w-full max-w-sm space-y-3">
        <div
          className="max-h-[12rem] overflow-y-auto space-y-3"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#888 #1f2937",
          }}
        >
          {emails.map((email, index) => (
            <button
              key={index}
              className="w-full flex items-center justify-between bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition"
              onClick={() => onPreviousDevice(email)}
            >
              <div className="flex items-center">
                <HiOutlineMail className="w-5 h-5 mr-3 text-gray-400" />
                <span>{email}</span>
              </div>
              <GoArrowRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>

        <button
          className="w-full flex items-center justify-between bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition"
          onClick={onUseAnotherAccount}
        >
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
    </>
  );
}
