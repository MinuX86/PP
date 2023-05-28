import type { AppProps } from "next/app";
import { Layout } from "../components";
import { ModalProvider } from "@providers";
import "./globals.css";
import { DrawerProvider } from "../providers/Drawer";
import { LoadingOverlayProvider } from "../providers/LoadingOverlay";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LoadingOverlayProvider>
      <ModalProvider>
        <DrawerProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </DrawerProvider>
      </ModalProvider>
    </LoadingOverlayProvider>
  );
}
