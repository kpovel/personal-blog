import { ReactNode } from "react";
import { Footer } from "./footer";
import { Header } from "./header";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const isHomePage = router.pathname === "/";

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto flex w-full grow flex-col p-4 md:max-w-2xl">
        {children}
        {!isHomePage && (
          <div>
            <Link
              href="/"
              className="my-2 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
            >
              <span className="mr-2">←</span>Return to the home page
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
