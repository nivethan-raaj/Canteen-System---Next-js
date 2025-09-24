import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">SC</span>
              </div>
              <span className="font-bold">Smart Canteen</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Modern canteen management system with real-time ordering and load balancing.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-foreground transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="hover:text-foreground transition-colors">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/help" className="hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-foreground transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border/40 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© 2025 Smart Canteen Management System. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms & Conditions
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
