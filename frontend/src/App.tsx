import React from "react";
import { Toaster } from "react-hot-toast";
import Router from "routers/index";
function App() {
  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="bg-white text-base dark:bg-slate-900 text-slate-900 dark:text-slate-200">
        <Router />
      </div>
    </>
  );
}

export default App;
