import Link from "next/link";
import { company, navLinks } from "@/lib/company";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <p className="footer-brand">{company.name}</p>
          <p className="footer-text">{company.tagline}</p>
        </div>

        <nav className="footer-links">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <p className="footer-copy">
        &copy; 2026 {company.name} | All rights reserved.
      </p>
    </footer>
  );
}
