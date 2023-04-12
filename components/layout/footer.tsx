import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-blue-500 py-4 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between">
          <div className="py-1.5 text-sm">
            &copy; {new Date().getFullYear()} My Personal Blog. All rights
            reserved.
          </div>
          <div className="space-x-4 py-1.5">
            <Link href="/privacy" className="hover:text-blue-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-blue-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
