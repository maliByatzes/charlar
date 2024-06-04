import MessageContainer from "@/src/components/messages/MessageContainer";
import Sidebar from "@/src/components/sidebar/Sidebar";

const Home = () => {
  return (
    <div className="flex h-screen w-full border border-white mx-10 p-4">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
