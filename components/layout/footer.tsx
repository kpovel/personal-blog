import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-blue-500 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between flex-wrap">
          <div className="text-sm py-1.5">
            &copy; {new Date().getFullYear()} My Personal Blog. All rights reserved.
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
