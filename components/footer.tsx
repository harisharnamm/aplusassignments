import Link from "next/link"
import { Pencil, Instagram, Linkedin, MessageSquare } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600">
                <Pencil className="h-4 w-4 text-white" />
              </div>
              <span className="font-poppins text-lg font-bold">
                <span className="text-indigo-600">A+</span>
                Assignments
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">
              Your assignment deadline lifesaver. Professional help for any subject, any complexity.
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between gap-8">
            <div>
              <h3 className="font-poppins text-lg font-medium mb-4">Pages</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-sm text-muted-foreground hover:text-indigo-600 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/upload"
                    className="text-sm text-muted-foreground hover:text-indigo-600 transition-colors"
                  >
                    Upload
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-muted-foreground hover:text-indigo-600 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-poppins text-lg font-medium mb-4">Connect</h3>
              <div className="flex gap-4">
                <Link href="#" className="text-muted-foreground hover:text-indigo-600 transition-colors">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-indigo-600 transition-colors">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-indigo-600 transition-colors">
                  <MessageSquare className="h-5 w-5" />
                  <span className="sr-only">Discord</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} A+ Assignments. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
              <span className="text-xs">Secure & Encrypted</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
              <span className="text-xs">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
