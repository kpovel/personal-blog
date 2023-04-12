import { ReactNode } from "react";
import { Footer } from "./footer";
import { Header } from "./header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="grow md:max-lg:bg-sky-700">{children}</main>
      <Footer />
    </div>
  );
}
