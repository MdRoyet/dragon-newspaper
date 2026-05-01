import React from "react";
import Image from "next/image";
import {
  FaGoogle,
  FaGithub,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

// Import images from src/assets
import qZone1 from "@/assets/playground.png";
import qZone2 from "@/assets/swimming.png";
import qZone3 from "@/assets/class.png";

const RightSidebar = () => {
  return (
    <div className="space-y-8">
      {/* 1. Login With Section */}
      <section>
        <h2 className="font-bold text-xl mb-4 text-gray-800">Login With</h2>
        <div className="flex flex-col gap-2">
          <button className="flex items-center justify-center gap-2 w-full py-2.5 border-2 border-blue-400 rounded-lg text-blue-500 font-medium hover:bg-blue-50 transition-colors">
            <FaGoogle /> Login with Google
          </button>
          <button className="flex items-center justify-center gap-2 w-full py-2.5 border-2 border-gray-800 rounded-lg text-gray-800 font-medium hover:bg-gray-100 transition-colors">
            <FaGithub /> Login with Github
          </button>
        </div>
      </section>

      {/* 2. Find Us On Section */}
      <section>
        <h2 className="font-bold text-xl mb-4 text-gray-800">Find Us On</h2>
        <div className="flex flex-col border border-gray-200 rounded-lg overflow-hidden">
          <a
            href="#"
            className="flex items-center gap-3 p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-blue-600">
              <FaFacebookF />
            </div>
            <span className="text-gray-600 font-medium">Facebook</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-sky-400">
              <FaTwitter />
            </div>
            <span className="text-gray-600 font-medium">Twitter</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-pink-500">
              <FaInstagram />
            </div>
            <span className="text-gray-600 font-medium">Instagram</span>
          </a>
        </div>
      </section>

      {/* 3. Q-Zone Section (Using Next.js Image Component) */}
      <section className="bg-[#F3F3F3] p-4 rounded-lg">
        <h2 className="font-bold text-xl mb-4 text-gray-800">Q-Zone</h2>
        <div className="flex flex-col gap-4">
          <Image
            src={qZone1}
            alt="Swimming"
            className="w-full h-auto rounded-md"
          />
          <Image
            src={qZone2}
            alt="Class"
            className="w-full h-auto rounded-md"
          />
          <Image
            src={qZone3}
            alt="Playground"
            className="w-full h-auto rounded-md"
          />
        </div>
      </section>
    </div>
  );
};

export default RightSidebar;
