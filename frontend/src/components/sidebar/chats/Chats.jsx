import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Conversations from "./Conversations";

const Chats = () => {
  return (
    <Card className="h-[550px] p-0 overflow-auto">
      <CardHeader>
        <CardTitle className="mb-3">Chats</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="space-y-2">
        <Conversations />
      </CardContent>
    </Card>
  );
};

export default Chats;
