import React from "react";
import { Signin } from "./components/auth/signin/sigin";

function App() {
  return (
    <div className="min-h-screen w-full bg-custom">
      <div className="block md:hidden w-full">
        <Signin />
      </div>
    </div>
  );
}

export default App;
