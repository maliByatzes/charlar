import RequestCard from "./RequestCard";

const Requests = () => {
  return (
    <div className="flex flex-col gap-2 min-w-md h-[250px] overflow-auto">
      <RequestCard />
      <RequestCard />
      <RequestCard />
      <RequestCard />
    </div>
  );
};

export default Requests;
