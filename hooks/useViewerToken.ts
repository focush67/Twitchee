"use client";

import { toast } from "sonner";
import { useState, useEffect } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { createViewerToken } from "@/server_actions/token";

export const useViewerToken = (host: string) => {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");

  useEffect(() => {
    const createToken = async () => {
      try {
        const token = await createViewerToken(host);
        setToken(token);

        const decodedToken = jwtDecode(token) as JwtPayload & {
          name?: string;
        };

        const name = decodedToken.name;
        const identity = decodedToken.sub;

        if (identity) {
          setIdentity(identity);
        }

        if (name) {
          setName(name);
        }
      } catch {
        toast.error("Something went wrong");
      }
    };

    createToken();
  }, [host]);

  return {
    token,
    name,
    identity,
  };
};
