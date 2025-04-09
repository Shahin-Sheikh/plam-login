import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PreviousDevice } from "./components/auth/signin/previous-device";
import { Signin } from "./components/auth/signin/signin";
import { WithEmail } from "./components/auth/signin/with-email";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen w-full bg-custom">
        <div className="block md:hidden w-full">
          <Routes>
            <Route
              path="/"
              element={<Signin />}
            />
            <Route
              path="/with-email"
              element={<WithEmail />}
            />
            <Route
              path="/previous-device"
              element={<PreviousDevice />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
