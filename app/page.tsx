import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import RegisterModal from "@/components/RegisterModal";
import SigninModal from "@/components/SigninModal";
import Table from "@/components/Table";
import Test from "@/components/Test";

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
