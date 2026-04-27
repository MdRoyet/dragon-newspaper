import Header from "@/components/shared/Header";
import NavBar from "@/components/shared/NavBar";
import React, { Children } from "react";

const MainLayout = ({ Children }) => {
  return (
    <>
      <Header></Header>
      <NavBar></NavBar>
      {Children}
    </>
  );
};

export default MainLayout;
