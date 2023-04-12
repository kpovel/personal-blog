import Link from "next/link";

export function Header() {
  return (
    <>
      <header className="bg-blue-500 py-4 text-white">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold">
              My Personal Blog
            </Link>
            <div className="space-x-4">
              <Link href="/categories" className="hover:text-blue-300">
                Categories
              </Link>
              <Link href="/about" className="hover:text-blue-300">
                About
              </Link>
              <Link href="/contact" className="hover:text-blue-300">
                Contact
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
