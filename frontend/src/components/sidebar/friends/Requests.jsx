import { ScrollArea } from "@/components/ui/scroll-area";
import RequestCard from "./RequestCard";

const Requests = () => {
  return (
    <ScrollArea className="flex flex-col gap-2 min-w-md h-[250px]">
      <RequestCard />
      <RequestCard />
      <RequestCard />
      <RequestCard />
    </ScrollArea>
  );
};

export default Requests;
