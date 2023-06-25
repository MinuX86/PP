"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSignup, setIsSignup] = useState<boolean>(false);

  const onSubmit = async () => {
    await signIn("credentials", {
      email,
      username,
      password,
      isSignup,
      redirect: true,
      callbackUrl: "/components",
    });
  };

  return (
    <section className="flex flex-col justify-center items-center gap-5 my-10">
      <h1>{isSignup ? "Signup" : "Signin"}</h1>
      <button onClick={() => setIsSignup((state) => !state)}>
        {isSignup ? "Signin" : "Signup"}
      </button>
      <input
        className="border border-gray rounded-sm p-1"
        placeholder="user name"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      {isSignup && (
        <input
          className="border border-gray rounded-sm p-1"
          placeholder="user email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      )}
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
