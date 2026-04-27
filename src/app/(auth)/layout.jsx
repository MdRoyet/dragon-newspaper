import NavBar from "@/components/shared/NavBar";
import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <>
      <NavBar></NavBar>

      {children}
    </>
  );
};

export default AuthLayout;
