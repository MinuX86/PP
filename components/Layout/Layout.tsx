import { PropsWithChildren } from "react";
import { useModal } from "@providers";
import Footer from "./Footer";
import Header from "./Header";
import Modal from "./Modal/Modal";

const Layout = ({ children }: PropsWithChildren) => {
  const { isModalOpen, componentToRender } = useModal();
  console.log("i am here ??", isModalOpen, componentToRender);
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      {isModalOpen && <Modal />}
    </>
  );
};

export default Layout;
