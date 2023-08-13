import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import RegisterModal from "@/components/RegisterModal";
import Table from "@/components/Table";

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
