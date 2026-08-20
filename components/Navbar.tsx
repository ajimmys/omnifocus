"use client"; // Required for state tracking and animations

import { useState } from "react";
import Link from "next/link";

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
    { label: "Teams", href: "/teams" },
    { label: "Settings", href: "/settings" },
    { label: "Profile", href: "/profile" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const toggleDropdown = (label: string) => {
        setOpenDropdown(openDropdown === label ? null : label);
    };

    return (
        <>
            {/* Top Header Bar */}
            <nav className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 relative z-40 shadow-md">

                {/* Left Side Nav Header */}
                <div className="flex items-end">

                    {/* Logo */}
                    <div className="border text-2xl font-bold"><a href="/">Omnicoach</a></div>
                    
                    <button
                        onClick={() => setIsOpen(true)}
                        className="border hover:bg-violet-100 hover:italic focus:outline-none gap-2 font-medium"
                    >
                        <span>☰ Menu</span>
                    </button>

                </div>


                {/* Right Side Nav Header */}
                <div>
                    <span>P</span>
                </div>

            </nav>

            {/* Dimmed Background Overlay (Backdrop) */}
            <div
                className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setIsOpen(false)} // Close if user clicks outside the panel
            />

            {/* Slide-in Left Navigation Sidebar */}
            <div
                className={`fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-slate-900 text-white z-50 p-6 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Header inside the Sidebar */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                    <div className="text-xl font-bold"><a href="/">Omnicoach</a></div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-400 hover:text-white text-xl p-1"
                    >
                        ✕
                    </button>
                </div>

                {/* Sidebar Nav Links Container */}
                <div className="mt-6 space-y-2 overflow-y-auto max-h-[calc(100vh-120px)]">
                    {navLinks.map((link) => (
                        <div key={link.label} className="border-b border-slate-800/40 last:border-0 pb-2">
                            {link.subMenu ? (
                                <>
                                    {/* Dropdown Header Link */}
                                    <button
                                        onClick={() => toggleDropdown(link.label)}
                                        className="w-full text-left text-gray-300 hover:bg-slate-800 hover:text-white block px-3 py-2.5 rounded-md text-base font-medium flex justify-between items-center transition-colors"
                                    >
                                        <span>{link.label}</span>
                                        <span className="text-xs">{openDropdown === link.label ? "▲" : "▼"}</span>
                                    </button>

                                    {/* Nested Dropdown Links */}
                                    {openDropdown === link.label && (
                                        <div className="pl-4 mt-1 bg-slate-950/40 rounded-md border-l-2 border-slate-700">
                                            {link.subMenu.map((subItem) => (
                                                <Link
                                                    key={subItem.label}
                                                    href={subItem.href}
                                                    className="text-gray-400 hover:text-white block px-3 py-2 rounded-md text-sm transition-colors"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    {subItem.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                /* Standard Navigation Link */
                                <Link
                                    href={link.href}
                                    className="text-gray-300 hover:bg-slate-800 hover:text-white block px-3 py-2.5 rounded-md text-base font-medium transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
