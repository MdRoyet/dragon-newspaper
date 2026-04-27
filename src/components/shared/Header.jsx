import React from "react";
import moment from "moment"; // Optional: npm install moment
import logo from "@/assets/logo.png";
import Image from "next/image";

const Header = () => {
  // Option 1: Using native JS for the dynamic date
  const currentDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <header className="flex flex-col items-center justify-center py-8 font-serif">
      {/* Newspaper Logo */}
      <div className="mb-2">
        <Image
          src={logo}
          alt="The Dragon News"
          className="h-24 object-contain"
        />
      </div>

      {/* Tagline */}
      <p className="text-gray-500 text-lg italic">
        Journalism Without Fear or Favour
      </p>

      {/* Dynamic Date */}
      <p className="text-xl font-medium mt-2">{currentDate}</p>
    </header>
  );
};

export default Header;
