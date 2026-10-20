"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { company, navLinks } from "@/lib/company";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: string): boolean {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link href="/" className="navbar-brand" onClick={() => setOpen(false)}>
          <Image
            src="/images/logo-diamond.png"
            alt={company.name}
            width={828}
            height={468}
            className="navbar-logo"
            priority
          />
        </Link>

        <button
          type="button"
          className="navbar-toggle"
          aria-label="Buka menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "\u2715" : "\u2630"}
        </button>

        <nav className={`navbar-links ${open ? "open" : ""}`}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={isActive(link.href) ? "nav-link active" : "nav-link"}
              aria-current={isActive(link.href) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
