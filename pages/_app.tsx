import type { AppProps } from "next/app";
import { Layout } from "../components";
import { ModalProvider } from "@providers";
import "./globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ModalProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ModalProvider>
  );
}
