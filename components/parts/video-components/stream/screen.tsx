"use client";

import Hint from "@/app/(browse)/_components/sidebar/hint";
import { Maximize, Minimize } from "lucide-react";

interface ScreenProps {
  isFullScreen: boolean;
  onToggle: () => void;
}
const Screen = ({ isFullScreen, onToggle }: ScreenProps) => {
  const Icon = isFullScreen ? Minimize : Maximize;
  const label = isFullScreen ? "Exit FullScreen" : "Enter FullScreen";
  return (
    <div className="flex items-center justify-center gap-4">
      <Hint label={label} asChild>
        <button
          onClick={onToggle}
          className="text-white p-1.5 hover:bg-white/10 rounded-lg"
        >
          <Icon className="h-5 w-5" />
        </button>
      </Hint>
    </div>
  );
};

export default Screen;
