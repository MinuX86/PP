"use client";
import { useModal } from "@providers";

const LoginModal = (): JSX.Element => {
  const { closeModal } = useModal();
  return (
    <div className="flex flex-col bg-white w-[480px] h-full">
      <button onClick={closeModal}>Close</button>
      <p>Login Modal</p>
      <div>Contents</div>
    </div>
  );
};

export default LoginModal;
