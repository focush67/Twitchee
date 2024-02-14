import { Input } from "@/components/ui/input";
import Copy from "./copy";

interface URLCardProps {
  value: string | null;
}

const URLCard = ({ value }: URLCardProps) => {
  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center gap-x-10">
        <p className="font-semibold shrink-0">Server URL</p>
        <div className="space-y-2 w-full">
          <div className="w-full flex items-center gap-x-2">
            <Input value={value || ""} disabled placeholder="Server URL" />
            <Copy value={value || ""} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default URLCard;
