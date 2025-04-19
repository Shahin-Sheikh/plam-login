import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CompleteAccount } from "./components/auth/signin/complete-account";
import { PreviousDevice } from "./components/auth/signin/previous-device";
import { Signin } from "./components/auth/signin/signin";
import { WithEmail } from "./components/auth/signin/with-email";
import CancelledPage from "./components/ui/cancel-message";
import PalmAuth from "./components/auth/signin/palmauth";
import HomePage from "./components/home/home-page";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen w-full bg-custom">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="*"
            element={
              <div className="block md:hidden w-full">
                <Routes>
                  <Route path="/account/palm-scan" element={<Signin />} />
                  <Route path="/with-email" element={<WithEmail />} />
                  <Route path="/previous-device" element={<PreviousDevice />} />
                  <Route
                    path="/complete-account"
                    element={<CompleteAccount />}
                  />
                  <Route path="/cancelled" element={<CancelledPage />} />
                  <Route path="/palm-auth" element={<PalmAuth />} />
                </Routes>
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
