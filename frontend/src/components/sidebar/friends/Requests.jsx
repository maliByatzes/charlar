import { ScrollArea } from "@/components/ui/scroll-area";
import RequestCard from "./RequestCard";

const Requests = ({ requests }) => {
    
  return (
    <ScrollArea className="flex flex-col gap-2 min-w-md h-[250px]">
      {requests.map((r) => (
        <RequestCard
          key={r._id}
          request={r}  
        />
      ))}
    </ScrollArea>
  );
};

export default Requests;
