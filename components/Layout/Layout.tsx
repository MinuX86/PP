"use client";
import { PropsWithChildren } from "react";
import { useLoadingOverlay, useModal } from "@providers";
import Footer from "./Footer";
import Header from "./Header";
import Modal from "./Modal/Modal";
import LoadingOverlay from "./LoadingOverlay/LoadingOverlay";

const Layout = ({ children }: PropsWithChildren) => {
  const { isModalOpen, componentToRender } = useModal();
  const { isLoading } = useLoadingOverlay();
  console.log("i am here ??", isModalOpen, componentToRender);
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      {isModalOpen && <Modal />}
      {isLoading && <LoadingOverlay />}
    </>
  );
};

export default Layout;
