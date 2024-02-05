import React from "react";
import { AppLogo } from "./_components/logo";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-6">
      <AppLogo />
      {children}
    </div>
  );
};

export default AuthLayout;
