"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const Error = () => {
  return (
    <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
      <h1 className="text-4xl">Some Error Occured</h1>
      <Button variant={"secondary"} asChild>
        <Link href={"/"}>Back to Home</Link>
      </Button>
    </div>
  );
};

export default Error;
