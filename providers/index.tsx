"use client";
import { PropsWithChildren } from "react";
import { ModalProvider, useModal } from "./Modal";
import { DrawerProvider, useDrawer } from "./Drawer";
import { LoadingOverlayProvider, useLoadingOverlay } from "./LoadingOverlay";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
export { useModal, useDrawer, useLoadingOverlay };

type Props = PropsWithChildren & {
  session: Session;
};

const Providers = ({ children, session }: Props) => {
  return (
    <SessionProvider session={session}>
      <LoadingOverlayProvider>
        <ModalProvider>
          <DrawerProvider>{children}</DrawerProvider>
        </ModalProvider>
      </LoadingOverlayProvider>
    </SessionProvider>
  );
};

export default Providers;
