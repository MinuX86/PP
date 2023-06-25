"use client";
import { PropsWithChildren } from "react";
import { ModalProvider, useModal } from "./Modal";
import { DrawerProvider, useDrawer } from "./Drawer";
import { LoadingOverlayProvider, useLoadingOverlay } from "./LoadingOverlay";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { ApolloProvider } from "@apollo/client";
import { InMemoryCache } from "@apollo/client/cache";
import { ApolloClient } from "@apollo/client/core";

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache,
});

type Props = PropsWithChildren & {
  session: Session;
};

const Providers = ({ children, session }: Props) => {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <LoadingOverlayProvider>
          <ModalProvider>
            <DrawerProvider>{children}</DrawerProvider>
          </ModalProvider>
        </LoadingOverlayProvider>
      </SessionProvider>
    </ApolloProvider>
  );
};

export default Providers;
export { useModal, useDrawer, useLoadingOverlay };
