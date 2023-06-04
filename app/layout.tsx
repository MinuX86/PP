import "@styles/globals.css";
import { PropsWithChildren } from "react";
import { Layout } from "@components";
import Providers from "@providers";
import { Inter } from "next/font/google";
import { Session } from "next-auth";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Front end developer profile project",
  descripton: "This websit is for front end developer profile website",
};

//TODO: update auth session and UI
export default function RootLayout({
  children,
  session,
}: PropsWithChildren & { session: Session }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Providers session={session}>
          <Layout>{children}</Layout>
          <div id="modal-portal-root" />
          <div id="drawer-portal-root" />
          <div id="loading-overlay-portal-root" />
        </Providers>
      </body>
    </html>
  );
}
