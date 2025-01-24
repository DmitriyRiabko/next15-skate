import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import React from "react";

interface Props {
  children?: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
