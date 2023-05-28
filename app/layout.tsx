import "@styles/globals.css";
import { PropsWithChildren } from "react";
import { Layout } from "@components";
import Providers from "@providers";

export const metadata = {
  title: "Front end developer profile project",
  descripton: "This websit is for front end developer profile website",
};

//TODO: update auth session and UI
export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <Providers session={undefined}>
          <Layout>{children}</Layout>
        </Providers>
        <div id="modal-portal-root" />
        <div id="drawer-portal-root" />
        <div id="loading-overlay-portal-root" />
      </body>
    </html>
  );
}
