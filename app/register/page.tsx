import Navbar from "@/components/Navbar";
import RegisterForm from "@/components/RegisterForm";

const page = () => {
  return (
    <div className="h-[100vh] flex items-center justify-center">
      <Navbar />
      <RegisterForm />
    </div>
  );
};

export default page;
