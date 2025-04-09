export function Signin() {
  return (
    <div className="relative max-w-full mx-auto rounded-2xl border border-[#1E1E2E] bg-[#0B0B0F] overflow-hidden shadow-lg">
      <button className="absolute top-4 left-4 text-gray-400">
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-x"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div className="flex flex-col items-center justify-center pt-12 pb-6 px-4">
        <h2 className="text-lg font-medium">Sign in with PalmID</h2>
        <img src="/logo.svg" alt="PalmID Logo" className="w-24 mt-6 mb-2" />
        <p className="text-sm text-center">Choose an account to continue to</p>
        <a href="#" className="text-blue-400 text-sm font-medium mt-1">
          eBay.com
        </a>

        <div className="w-full mt-6 space-y-3">
          <button className="w-full flex items-center justify-between bg-[#1A1A26] rounded-xl px-4 py-3">
            <div className="flex items-center space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.75a.75.75 0 01-.75.75H3.75a.75.75 0 01-.75-.75v-.75"
                />
              </svg>
              <span>abcde@gmail.com</span>
            </div>
            <span>&rarr;</span>
          </button>

          <button className="w-full flex items-center justify-between bg-[#1A1A26] rounded-xl px-4 py-3">
            <div className="flex items-center space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.75a.75.75 0 01-.75.75H3.75a.75.75 0 01-.75-.75v-.75"
                />
              </svg>
              <span>1234@yahoo.com</span>
            </div>
            <span>&rarr;</span>
          </button>

          <button className="w-full flex items-center justify-between bg-[#1A1A26] rounded-xl px-4 py-3">
            <span>Use another account</span>
            <span>&rarr;</span>
          </button>
        </div>

        <div className="flex justify-center space-x-4 text-xs text-gray-400 mt-6">
          <a href="#" className="hover:underline">
            Privacy policy
          </a>
          <a href="#" className="hover:underline">
            Terms of service
          </a>
        </div>
      </div>
    </div>
  );
}
