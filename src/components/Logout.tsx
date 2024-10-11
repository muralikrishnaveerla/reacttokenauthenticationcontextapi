// Logout.tsx
import React from "react";
import { UseAuth } from "./ContextApi";

const Logout = () => {
  const { logout }: any = UseAuth();

  return (
    <div>
      <button className="btn btn-danger" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
