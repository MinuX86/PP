"use client";

import { useModal } from "@providers";
import { useState } from "react";

const LoginModal = (): JSX.Element => {
  const { closeModal } = useModal();
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  return (
    <section className="flex relative flex-col justfiy-center items-center bg-white w-[480px] h-full p-20 border border-gray">
      <button className="absolute top-8 right-8 " onClick={closeModal}>
        Close
      </button>
      <div className="py-4">
        <h1>Login Modal</h1>
      </div>
      <div className="flex flex-col gap-5">
        <input
          className="border border-gray"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className="border border-gray"
          value={pass}
          placeholder="password"
          onChange={(e) => {
            setPass(e.target.value);
          }}
        />
      </div>
    </section>
  );
};

export default LoginModal;
