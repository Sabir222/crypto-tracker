import LoginForm from "@/components/LoginForm";
import Navbar from "@/components/Navbar";
interface RegisterModalProps {
  setModalType: React.Dispatch<React.SetStateAction<string>>;
}
const page = ({ setModalType }: RegisterModalProps) => {
  return (
    <div className="h-[100vh] flex items-center justify-center">
      <Navbar />
      <LoginForm setModalType={setModalType} />
    </div>
  );
};

export default page;
