import { ReactNode } from "react";
import { Footer } from "./footer";
import { Header } from "./header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto flex w-full grow p-4 md:max-w-2xl">
        {children}
      </main>
      <Footer />
    </div>
  );
}
