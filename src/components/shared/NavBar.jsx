"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();

  const getLinkClassName = (href) => {
    const isActive = pathname === href;

    return `relative py-1 transition-all duration-300 font-medium text-lg border-b-2 ${
      isActive
        ? "text-gray-900 border-gray-900"
        : "text-gray-500 border-transparent hover:text-gray-900 hover:border-gray-400"
    }`;
  };

  return (
    <nav className="w-full bg-white py-6 border-b border-gray-100">
      <div className="container mx-auto flex items-center px-4">
        {/* 1. Left Spacer */}
        <div className="flex-1" />

        {/* 2. Center: Navigation Links */}
        <div className="flex flex-1 justify-center space-x-10">
          <Link href="/" className={getLinkClassName("/")}>
            Home
          </Link>
          <Link href="/about" className={getLinkClassName("/about")}>
            About
          </Link>
          <Link href="/career" className={getLinkClassName("/career")}>
            Career
          </Link>
        </div>

        {/* 3. Right side: Profile and Login */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 text-black mt-2"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>

          <Link
            href="/login"
            className="bg-[#444444] text-white px-9 py-2 font-semibold hover:bg-gray-700 transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
