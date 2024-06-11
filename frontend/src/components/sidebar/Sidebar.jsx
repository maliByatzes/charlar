import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Chats from "./chats/Chats";
import Friend from "./friends/Friend";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LogOut,
  Settings,
  User
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area";
import useLogout from "@/src/hooks/useLogout";
import { Loader } from "lucide-react";
import { useAuthContext } from "@/src/context/AuthContext";

const Sidebar = () => {
  const { loading, logout } = useLogout();
  const { authUser } = useAuthContext();

  return (
    <div className="flex flex-col gap-4 w-[350px]">
      <Tabs defaultValue="chats" className="">
        <div className="flex items-center justify-between">
          <TabsList className="grid grid-cols-2 w-[150px]">
            <TabsTrigger value="chats">Chats</TabsTrigger>
            <TabsTrigger value="friends">Friends</TabsTrigger>
          </TabsList>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="w-10 h-10 cursor-pointer mr-3">
                <AvatarImage src={authUser.profilePic} />
                <AvatarFallback>{authUser.username[0]}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem disabled>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onSelect={logout}>
                {loading ? <Loader className="h-4 w-4 animate-spin" /> : (
                  <>
                    <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <TabsContent value="chats">
          <ScrollArea className="w-full h-[550px]">
            <Chats />
          </ScrollArea>
        </TabsContent>

        <TabsContent value="friends">
          <Friend />
        </TabsContent>
      </Tabs >
    </div >
  );
};

export default Sidebar;
