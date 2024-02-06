import React, { Suspense } from "react";
import { LayoutProps } from "@/types/layout";
import Navbar from "./_components/navbar";
import Sidebar, { SidebarSkeleton } from "./_components/sidebar";
import Container from "./_components/container/container";

const BrowseLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>

        <Container>{children}</Container>
      </div>
    </>
  );
};

export default BrowseLayout;
