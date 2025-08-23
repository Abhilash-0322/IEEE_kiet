"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Cpu, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/projects", label: "Projects" },
  { href: "/team", label: "Team" },
  { href: "/blogs", label: "Blogs" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out",
      scrolled 
        ? "bg-white/90 backdrop-blur-md border-b border-slate-200/50 shadow-lg shadow-slate-900/5" 
        : "bg-white/100"
    )}>
      <nav className="ieee-container py-6">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="group">
              <div className="flex items-center space-x-3 transition-transform duration-300 group-hover:scale-105">
                <div className="relative">
                  <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 border border-blue-500/20">
                    <Terminal className="text-white h-6 w-6" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex flex-col">
                  <div className="text-slate-900 font-bold text-xl tracking-tight">
                    Geek <span className="text-blue-600">Room</span>
                  </div>
                  <div className="text-xs text-slate-500 font-medium tracking-wide uppercase">
                    KIET
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <ul className="flex space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="no-underline"
                >
                  <li className="relative">
                    <div className={cn(
                      "text-sm font-medium py-3 px-4 rounded-lg transition-all duration-200 relative",
                      pathname === link.href 
                        ? "text-blue-700 bg-blue-50 shadow-sm" 
                        : "text-slate-600 hover:text-blue-700 hover:bg-slate-50"
                    )}>
                      {link.label}
                      {pathname === link.href && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="p-2 text-slate-600 hover:text-blue-700 hover:bg-slate-50 rounded-lg transition-all duration-200"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                {mobileMenuOpen ? (
                  <X className="h-6 w-6 transition-all duration-300" />
                ) : (
                  <Menu className="h-6 w-6 transition-all duration-300" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="pt-4 pb-2">
            <ul className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="no-underline"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <li>
                    <div className={cn(
                      "transition-all duration-200 py-3 px-4 rounded-lg",
                      pathname === link.href
                        ? "bg-blue-600 text-white font-semibold shadow-md"
                        : "text-slate-600 hover:bg-slate-50 hover:text-blue-700"
                    )}>
                      <span className="font-medium">
                        {link.label}
                      </span>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
