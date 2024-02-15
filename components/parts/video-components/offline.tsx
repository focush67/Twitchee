import { WifiOff } from "lucide-react";
interface OfflineProps {
  username: string;
}
const Offline = ({ username }: OfflineProps) => {
  return (
    <div className="flex flex-col h-full space-y-4 justify-center items-center">
      <WifiOff className="text-muted-foreground h-10 w-10" />
      <p className="text-muted-foreground">{username} is Offline</p>
    </div>
  );
};

export default Offline;
