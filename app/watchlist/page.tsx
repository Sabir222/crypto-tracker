import EmptyList from "@/components/EmptyList";
import Navbar from "@/components/Navbar";
import WatchListTable from "@/components/WatchListTable";

const page = () => {
  return (
    <>
      <Navbar />
      {/* <WatchListTable /> */}
      <EmptyList />
      <WatchListTable/>
    </>
  );
};

export default page;
