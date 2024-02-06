import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import icon from "../../../public/icon.svg";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const AppLogo = () => {
  return (
    <Link href={"/"}>
      <div className="flex items-center gap-x-4 hover:opacity-75 transition">
        <div className="p-1 rounded-full bg-white mr-10 shrink-0 lg:mr-0 lg:shrink">
          <Image
            src={icon}
            alt="LiveIt"
            height={30}
            width={30}
            className="rounded-full"
          />
        </div>
        <div className={cn("hidden lg:block", font.className)}>
          <p className="text-lg font-semibold">LiveIt</p>
          <p className="text-muted-foreground text-xs">Go Live, Now</p>
        </div>
      </div>
    </Link>
  );
};
