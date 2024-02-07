"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Fullscreen, KeyRound, MessageSquare, Users } from "lucide-react";
import NavItem, { NavSkeleton } from "./nav-item";

const Navigation = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const pathsTo = [
    {
      label: "Stream",
      href: `/u/${user?.username}`,
      icon: Fullscreen,
    },
    {
      label: "Keys",
      href: `/u/${user?.username}/keys`,
      icon: KeyRound,
    },
    {
      label: "Chat",
      href: `/u/${user?.username}/chat`,
      icon: MessageSquare,
    },
    {
      label: "Community",
      href: `/u/${user?.username}/community`,
      icon: Users,
    },
  ];

  if (!user || !user.username) {
    return (
      <ul className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <NavSkeleton key={i} />
        ))}
      </ul>
    );
  }
  return (
    <ul className="space-y-2 px-2 pt-4 lg:pt-0">
      {pathsTo.map((r) => (
        <NavItem
          key={r.href}
          label={r.label}
          href={r.href}
          icon={r.icon}
          isActive={pathname === r.href}
        />
      ))}
    </ul>
  );
};

export default Navigation;
