import { ScrollArea } from "@/components/ui/scroll-area";
import Message from "./Message";

const Messages = () => {
  return (
    <ScrollArea className="px-4 flex-1 overflow-auto flex flex-grow overflow-y-auto flex-col gap-3">
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </ScrollArea>
  );
}

export default Messages;
