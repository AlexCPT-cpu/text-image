import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ToasterProvider } from "@/components/toaster-provider";
import { ModalProvider } from "@/components/modal-provider";
import { CrispProvider } from "@/components/crisp-provider";
import { NextUIProvider } from "@nextui-org/react";

const font = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={font.className}>
      <NextUIProvider>
        <ClerkProvider {...pageProps}>
          <CrispProvider />
          <ToasterProvider />
          <ModalProvider />
          <Component {...pageProps} />
        </ClerkProvider>
      </NextUIProvider>
    </div>
  );
}
