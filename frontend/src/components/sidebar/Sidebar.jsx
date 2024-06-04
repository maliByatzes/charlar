import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Chats from "./chats/Chats";
import Friend from "./friends/Friend";

const Sidebar = () => {
  return (
    <Tabs defaultValue="chats" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="chats">Chats</TabsTrigger>
        <TabsTrigger value="friends">Friends</TabsTrigger>
      </TabsList>

      <TabsContent value="chats">
        <Chats />
      </TabsContent>

      <TabsContent value="friends">
        <Friend />
      </TabsContent>
    </Tabs>
  );
};

export default Sidebar;
