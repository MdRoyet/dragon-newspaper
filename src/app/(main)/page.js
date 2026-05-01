"use client";
import { useState } from "react";
import AllNewsCategory from "@/components/shared/AllNewsCategory";
import MainNewsSection from "@/components/shared/MainNewsSection";

export default function Home() {
  // Default to "0" (All News) or "01" (Breaking News)
  const [selectedCategory, setSelectedCategory] = useState("01");

  return (
    <main className="container mx-auto my-6 px-4">
      <div className="grid grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <aside className="col-span-3">
          <AllNewsCategory
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </aside>

        {/* Middle Main Content */}
        <section className="col-span-6">
          <MainNewsSection categoryId={selectedCategory} />
        </section>

        {/* Right Sidebar */}
        <aside className="col-span-3">
          <h2 className="font-bold text-xl mb-4">Login With</h2>
          {/* Your Login Components */}
        </aside>
      </div>
    </main>
  );
}
