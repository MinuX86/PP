"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = async () => {
    const res = await signIn("credentials", {
      username,
      password,
      redirect: true,
      callbackUrl: "/components",
    });
  };

  return (
    <section className="flex flex-col justify-center items-center gap-5 my-10">
      <h1>Login</h1>
      <input
        className="border border-gray rounded-sm p-1"
        placeholder="user name"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input
        className="border border-gray rounded-sm p-1"
        placeholder="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button className="border border-gray rounded-lg p-4" onClick={onSubmit}>
        submit
      </button>
    </section>
  );
};

export default Login;
