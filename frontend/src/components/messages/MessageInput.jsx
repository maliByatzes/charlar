import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MessageInput = () => {
  return (
    <form className="px-4 my-3">
      <div className="w-full relative">
        <Input
          type="text"
          className=""
          placeholder="Send a message"
        />
        <Button className="absolute inset-y-0 end-0">Send</Button>
      </div>
    </form>
  );
};

export default MessageInput;
