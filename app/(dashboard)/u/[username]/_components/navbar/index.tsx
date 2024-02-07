import { AppLogo } from "../logo";
import React from "react";
import Actions from "./actions";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full h-20 z-[49] bg-[#252731] px-2 lg:px-4 flex justify-between items-center shadow-sm">
      <AppLogo />
      <Actions />
    </nav>
  );
};

export default Navbar;