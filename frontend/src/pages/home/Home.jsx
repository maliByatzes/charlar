import { Separator } from "@/components/ui/separator";
import MessageContainer from "@/src/components/messages/MessageContainer";
import Sidebar from "@/src/components/sidebar/Sidebar";

const Home = () => {
  return (
    <div className="flex h-screen w-full mx-10 p-4 overflow-hidden">
      <Sidebar />
      <Separator orientation="vertical" className="mx-3" />
      <MessageContainer />
    </div>
  );
};

export default Home;
