import LoginForm from "@/components/LoginForm";
import Navbar from "@/components/Navbar";

const page = () => {
  return (
    <div className="h-[100vh] flex items-center justify-center">
      <Navbar />
      <LoginForm />
    </div>
  );
};

export default page;
