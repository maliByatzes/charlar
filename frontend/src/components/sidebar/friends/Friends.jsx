import FriendCard from "./FriendCard";

const Friends = () => {
  return (
    <div className="flex flex-col gap-2 min-w-md h-[250px] overflow-auto">
      <FriendCard />
      <FriendCard />
      <FriendCard />
    </div>
  );
};

export default Friends;
