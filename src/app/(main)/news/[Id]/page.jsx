import React from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import RightSidebar from "@/components/shared/RightSidebar";

// 1. Destructure exactly { params } so Vercel's compiler recognizes it
export async function generateMetadata({ params }) {
  // Await the promise directly
  const resolvedParams = await params;
  const id = resolvedParams.id;

  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/news/${id}`,
    );
    const result = await res.json();
    const news = result.data?.[0];
    return { title: news ? `${news.title} | Dragon News` : "News Details" };
  } catch (error) {
    return { title: "Dragon News" };
  }
}

// 2. Same here: explicitly request { params }
export default async function NewsDetails({ params }) {
  // 3. Await the params promise to extract the ID
  const resolvedParams = await params;
  const id = resolvedParams.id;

  // Failsafe
  if (!id) {
    return (
      <div className="p-20 text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Routing Error</h1>
        <p>The ID failed to load. Please try returning to the home page.</p>
        <Link href="/" className="text-blue-500 underline mt-4 inline-block">
          Back to Home
        </Link>
      </div>
    );
  }

  // 4. Fetch the News securely
  let news = null;
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/news/${id}`,
      {
        cache: "no-store", // Ensures fresh data
      },
    );
    const result = await res.json();
    news = result.data && result.data.length > 0 ? result.data[0] : null;
  } catch (err) {
    console.error("Fetch error:", err);
  }

  // 5. Normal Not Found Screen
  if (!news) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-20">
        <h1 className="text-5xl font-extrabold text-[#403F3F] mb-4">
          Article not found.
        </h1>
        <p className="text-gray-500 mb-8 text-lg">
          The API returned no data for ID:{" "}
          <span className="font-mono bg-gray-100 px-2 py-1 rounded">{id}</span>
        </p>
        <Link
          href="/"
          className="text-white bg-[#403F3F] px-10 py-3 font-semibold hover:bg-black transition-all"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  // 6. Main UI
  return (
    <main className="container mx-auto my-10 px-4">
      <div className="grid grid-cols-12 gap-8">
        <section className="col-span-12 lg:col-span-9">
          <h2 className="text-xl font-bold mb-6 text-[#403F3F]">Dragon News</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-10 shadow-sm">
            <img
              src={news.image_url}
              alt={news.title}
              className="w-full h-auto mb-6 rounded-md"
            />
            <h1 className="text-3xl font-extrabold text-[#403F3F] mb-6 leading-tight">
              {news.title}
            </h1>
            <p className="text-[#706F6F] text-lg leading-8 mb-10 text-justify whitespace-pre-line">
              {news.details}
            </p>
            <div className="border-t pt-8">
              <Link
                href={`/category/${news.category_id || "01"}`}
                className="bg-[#D72050] text-white px-8 py-4 font-bold flex items-center gap-3 w-fit hover:bg-red-700 transition-all"
              >
                <FaArrowLeft /> All news in this category
              </Link>
            </div>
          </div>
        </section>

        <aside className="col-span-12 lg:col-span-3">
          <RightSidebar />
        </aside>
      </div>
    </main>
  );
}
