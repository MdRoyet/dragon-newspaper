"use client";
import React from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";

const NavBar = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  return (
    <nav className="flex justify-between items-center py-5 container mx-auto px-4">
      <div className="w-1/3"></div>

      <div className="flex gap-6 text-[#706F6F] font-semibold">
        <Link href="/" className="hover:text-black">
          Home
        </Link>
        <Link href="/about" className="hover:text-black">
          About
        </Link>
        <Link href="/career" className="hover:text-black">
          Career
        </Link>
      </div>

      <div className="flex items-center gap-3 w-1/3 justify-end">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-[#403F3F] leading-none">
                {user.name}
              </p>
              <p className="text-[10px] text-gray-400 mt-1">
                Active Session:{" "}
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            {user.image ? (
              <img
                src={user.image}
                className="w-10 h-10 rounded-full border border-gray-200"
                alt="Profile"
              />
            ) : (
              <FaUserCircle className="text-4xl text-gray-700" />
            )}
            <button
              onClick={handleLogout}
              className="bg-[#403F3F] text-white px-7 py-2 rounded-none font-semibold hover:bg-black transition-all"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <FaUserCircle className="text-4xl text-gray-700" />
            <Link
              href="/login"
              className="bg-[#403F3F] text-white px-9 py-2 rounded-none font-semibold hover:bg-black transition-all"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
