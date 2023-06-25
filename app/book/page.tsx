"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as React from "react";

type Props = {
  item: string;
};

const Page = ({ item }: Props): JSX.Element => {
  const [book, setbook] = React.useState<string>("");

  const { data: session, status } = useSession();
  const router = useRouter();

  //TODO: hook function
  const onClick = React.useCallback(() => {}, []);

  if (session == null) {
    router.push("/components");
  }

  async function createBook() {
    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ book, email: session?.user?.email }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("res =>", data);
      } else {
        throw new Error("Failed to create a new book");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create a new book");
    }
  }

  return (
    <section className="h-full w-full pb-20">
      <div className="flex flex-col justify-center items-center gap-10">
        <h1> Book</h1>
        <div className="flex flex-row gap-4">
          <input
            className="border border-gray rounded-sm p-1"
            placeholder="book name"
            type="text"
            value={book}
            onChange={(e) => {
              setbook(e.currentTarget.value);
            }}
          />
        </div>
        <button
          className="border border-gray rounded-sm py-2 px-4"
          onClick={createBook}
        >
          Add Book
        </button>
      </div>
    </section>
  );
};

export default Page;
