import { Loader } from "lucide-react";
interface LoadingProps {
  label: string;
}
const LoadingVideo = ({ label }: LoadingProps) => {
  return (
    <div className="flex flex-col h-full space-y-4 justify-center items-center">
      <Loader className="animate-spin text-muted-foreground h-10 w-10" />
      <p className="text-muted-foreground capitalize">{label}</p>
    </div>
  );
};

export default LoadingVideo;
