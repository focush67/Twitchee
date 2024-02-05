import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const AppLogo = () => {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <div className="bg-white rounded-full p-1">
        <Image src={"/icon.svg"} alt="LiveIt" height={40} width={40} />
      </div>
      <div className={cn("flex flex-col items-center", font.className)}>
        <p className={"text-xl font-semibold"}>LiveIt</p>
        <p className={"text-sm text-muted-foreground"}>Go Live , Now</p>
      </div>
    </div>
  );
};
