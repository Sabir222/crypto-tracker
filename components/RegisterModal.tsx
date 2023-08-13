import { X } from "lucide-react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
interface RegisterModalProps {
  showRegisterModal: boolean;
  setShowRegisterModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalType: String;
  setModalType: React.Dispatch<React.SetStateAction<string>>;
}

const RegisterModal = ({
  showRegisterModal,
  setShowRegisterModal,
  modalType,
  setModalType,
}: RegisterModalProps) => {
  const handleVisible = () => {
    setShowRegisterModal(false);
  };

  return (
    <main
      className={`fixed top-0 ${
        showRegisterModal ? "flex" : "hidden"
      } bottom-0 left-0 right-0 flex items-center justify-center bg-black/70`}
    >
      <div className="relative">
        <button
          className="absolute text-white top-8 right-10"
          onClick={handleVisible}
        >
          <X />
        </button>
        <div>
          {modalType === "signin" && <LoginForm setModalType={setModalType} />}
          {modalType === "register" && (
            <RegisterForm setModalType={setModalType} />
          )}
        </div>
      </div>
    </main>
  );
};

export default RegisterModal;
