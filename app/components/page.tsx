"use client";

import { useRouter } from "next/navigation";
import { ComponentItem, ComponentItemType } from "@components";
import { LoginModal, Button } from "@components";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import { useModal } from "@providers";
import { useEffect, useState } from "react";
import { BuiltInProviderType } from "next-auth/providers";

const Components = () => {
  const { openModal } = useModal();
  const { data: session, status } = useSession();
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  const router = useRouter();

  const componentList: Array<ComponentItemType> = [
    {
      name: "Modal",
      desc: "Modal component",
      onClick: () => openModal(<LoginModal />, "Login Modal"),
    },
    {
      name: "Google login",
      desc: "Google auth",
      onClick: () => signIn(providers?.google.id),
    },
    {
      name: "normal login",
      desc: "normal auth",
      onClick: () => signIn(),
    },
    {
      name: "signUp",
      desc: "normal auth signup",
      onClick: () => signIn(),
    },
    {
      name: "add book",
      desc: "Add book into DB",
      onClick: () => router.push("/book"),
    },
  ];

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <section className="h-full pb-20">
      <div className="flex flex-col justify-center items-center gap-20">
        <section className="flex flex-row items-center pt-10 gap-4">
          <h1>Login user: {session?.user?.name || status}</h1>{" "}
          {session?.user != null && (
            <button
              className="border boder-gray p-1 rounded-lg"
              onClick={() => signOut()}
            >
              signOut
            </button>
          )}
        </section>
        <section>
          {componentList.map((item, idx) => {
            return <ComponentItem key={item.desc} {...item} />;
          })}
        </section>
      </div>
    </section>
  );
};

export default Components;
