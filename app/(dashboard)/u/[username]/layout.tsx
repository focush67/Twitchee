import { getSpecificUser } from "@/services/auth-services";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import Navbar from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import Container from "./_components/container";

interface CreatorLayoutProps {
  params: {
    username: string;
  };
  children: ReactNode;
}
const CreatorLayout = async ({ params, children }: CreatorLayoutProps) => {
  const self = await getSpecificUser(params.username);
  if (!self) {
    redirect("/");
  }
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default CreatorLayout;
