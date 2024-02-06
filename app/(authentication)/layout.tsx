import React from "react";
import { AppLogo } from "./_components/logo";
import { LayoutProps } from "@/types/layout";

const AuthLayout = ({ children }: LayoutProps) => {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-6">
      <AppLogo />
      {children}
    </div>
  );
};

export default AuthLayout;
