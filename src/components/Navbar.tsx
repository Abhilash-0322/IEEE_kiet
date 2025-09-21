"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Cpu, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/projects", label: "Projects" },
  { href: "/team", label: "Team" },
  { href: "/articles", label: "Articles" },
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
        ? "bg-white/95 backdrop-blur-lg border-b border-slate-200/50 shadow-lg shadow-slate-900/5" 
        : "bg-white/100"
    )}>
      <nav className="ieee-container py-2 lg:py-6">
        <div className="flex place-items-start justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="group">
              <div className="flex items-center space-x-3 transition-transform duration-300 group-hover:scale-105">
                <div className="relative">
                  <Image 
                    src="/Ieee_blue.png" 
                    alt="IEEE Logo" 
                    width={106} 
                    height={106} 
                    className="object-contain drop-shadow-sm"
                  />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white animate-pulse shadow-sm"></div>
                </div>
                <div className="flex flex-col">
                  <div className="text-slate-900 font-bold text-xl lg:text-2xl tracking-tight">
                    IEEE <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">KIET</span>
                  </div>
                  <div className="text-xs text-slate-500 font-medium tracking-wider uppercase">
                    Student Branch
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <ul className="flex space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="no-underline"
                >
                  <li className="relative">
                    <div className={cn(
                      "text-sm font-semibold py-3 px-6 rounded-2xl transition-all duration-300 relative",
                      pathname === link.href 
                        ? "text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-md shadow-blue-500/25" 
                        : "text-slate-700 hover:text-blue-700 hover:bg-slate-50/80"
                    )}>
                      {link.label}
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="p-3 text-slate-600 hover:text-blue-700 hover:bg-slate-50 rounded-2xl transition-all duration-200"
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
          <div className="pt-6 pb-4">
            <ul className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="no-underline"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <li>
                    <div className={cn(
                      "transition-all duration-200 py-4 px-6 rounded-2xl font-semibold",
                      pathname === link.href
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-500/25"
                        : "text-slate-700 hover:bg-slate-50 hover:text-blue-700"
                    )}>
                      {link.label}
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


// "use client";

// import Link from "next/link";

// export default function MetaNavbar() {
//   return (
//     <div className="bg-black text-white w-full text-sm">
//       <div className="ieee-container flex flex-wrap justify-between items-center py-2">
//         {/* Left Links */}
//         <p className="flex flex-wrap space-x-4">
//           <Link
//             href="https://www.ieee.org/index.html"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="hover:underline"
//           >
//             IEEE.org
//           </Link>
//           <Link
//             href="https://www.ieeexplore.ieee.org/Xplore/guesthome.jsp"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="hover:underline"
//           >
//             IEEE <em>Xplore</em><sup>®</sup>
//           </Link>
//           <Link
//             href="https://standards.ieee.org/"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="hover:underline"
//           >
//             IEEE Standards
//           </Link>
//           <Link
//             href="https://spectrum.ieee.org/"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="hover:underline"
//           >
//             IEEE Spectrum
//           </Link>
//           <Link
//             href="https://www.ieee.org/sitemap.html"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="hover:underline"
//           >
//             More Sites
//           </Link>
//         </p>

//         {/* Right Links */}
//         <p className="flex flex-wrap space-x-4">
//           <Link
//             href="https://www.ieee.org/membership/join/index.html?WT.mc_id=hc_join"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="hover:underline"
//           >
//             Join IEEE
//           </Link>
//           <Link
//             href="https://www.ieee.org/give"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="hover:underline"
//           >
//             Donate
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
