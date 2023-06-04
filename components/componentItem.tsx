"use client";
import * as React from "react";
import Button from "./Button";

export type Props = {
  name: string;
  desc?: string;
  onClick: () => void;
};

const ComponentItem = ({ name, desc, onClick }: Props) => {
  return (
    <section className="flex flex-row justify-between items-center py-10">
      <p>{name}</p>
      <p>{desc}</p>
      <Button
        buttonType="secondary"
        size="large"
        color="primary"
        onClick={onClick}
      >
        click
      </Button>
    </section>
  );
};

export default ComponentItem;
