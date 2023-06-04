"use client";

import { PropsWithChildren, useEffect } from "react";
import { useLoadingOverlay, useModal } from "@providers";
import Footer from "./Footer";
import Header from "./Header";
import Modal from "./Modal/Modal";
import LoadingOverlay from "./LoadingOverlay/LoadingOverlay";
import { useSession } from "next-auth/react";

const Layout = ({ children }: PropsWithChildren) => {
  const { isModalOpen } = useModal();
  const { isLoading } = useLoadingOverlay();

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
