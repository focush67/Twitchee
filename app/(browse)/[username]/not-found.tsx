"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const NotFound = () => {
  return (
    <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
      <h1 className="text-4xl">404 NOT FOUND</h1>
      <p>Oops, we could not find the requested user</p>
      <Button variant={"secondary"} asChild>
        <Link href={"/"}>Back to Home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
