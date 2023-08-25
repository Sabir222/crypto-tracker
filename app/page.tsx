import Navbar from "@/components/Navbar";
import Table from "@/components/Table";
import SkeletonPlaceHolder from "@/components/Skeleton";
export default function Home() {
  return (
    <main className="">
      <Navbar />
      <div className="mt-[70px]">
        <Table />
      </div>
    </main>
  );
}
