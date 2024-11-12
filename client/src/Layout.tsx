import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./component/navbar/Navbar";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet /> {/* This will render the child components based on the route */}
    </div>
  );
};

export default Layout;