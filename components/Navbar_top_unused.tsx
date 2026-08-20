"use client"; // Required for interactivity (dropdowns and mobile menu)

import { useState } from "react";
import Link from "next/link";

// Scalable data structure: Easily add "subMenu" items later!
const navLinks = [
  { 
    label: "My Athlete", 
    href: "#",
    subMenu: [
      { label: "My Stats", href: "/myStats" },
      { label: "Nutrition", href: "/nutrition" },
      { label: "Training & Recovery", href: "/trainingRecovery" },
    ]
  },
  { label: "Teams", href: "/teams"},
  { label: "Settings", href: "/settings"},
  { label: "Profile", href: "/profile" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <nav className="bg-slate-900 text-white relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="text-xl font-bold"><a href="/">Omnicoach</a></div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4 items-center">
            {navLinks.map((link) => (
              <div key={link.label} className="relative">
                {link.subMenu ? (
                  // Trigger for items with sub-menus
                  <button 
                    onClick={() => toggleDropdown(link.label)}
                    className="hover:text-blue-400 px-3 py-2 text-sm font-medium flex items-center gap-1"
                  >
                    {link.label} ▾
                  </button>
                ) : (
                  // Standard Link
                  <Link href={link.href} className="hover:text-blue-400 px-3 py-2 text-sm font-medium">
                    {link.label}
                  </Link>
                )}

                {/* Desktop Dropdown Sub-Menu */}
                {link.subMenu && openDropdown === link.label && (
                  <div className="absolute left-0 mt-2 w-48 bg-white text-slate-800 rounded-md shadow-lg py-1 border">
                    {link.subMenu.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm hover:bg-slate-100"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-400 hover:text-white focus:outline-none text-2xl"
            >
              {isMobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-800 px-2 pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <div key={link.label}>
              {link.subMenu ? (
                <>
                  <button
                    onClick={() => toggleDropdown(link.label)}
                    className="w-full text-left text-gray-300 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    {link.label} {openDropdown === link.label ? "▴" : "▾"}
                  </button>
                  {openDropdown === link.label && (
                    <div className="pl-4 bg-slate-850">
                      {link.subMenu.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="text-gray-400 hover:text-white block px-3 py-2 rounded-md text-sm"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={link.href}
                  className="text-gray-300 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
