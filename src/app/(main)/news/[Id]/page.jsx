import React from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import RightSidebar from "@/components/shared/RightSidebar";

/**
 * 1. Metadata Function (Must also await params in Next.js 15)
 */
export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/news/${id}`,
    );
    const result = await res.json();
    const news = result.data?.[0];

    return {
      title: news ? `${news.title} | Dragon News` : "News Details",
    };
  } catch (error) {
    return { title: "Dragon News" };
  }
}

/**
 * 2. Main Page Component
 */
const NewsDetails = async ({ params }) => {
  // CRITICAL: Await params to avoid 'undefined' error in Next.js 15
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  // 1. Check if ID exists before fetching
  if (!id) {
    return (
      <div className="text-center p-20">
        <h2 className="text-2xl font-bold">Invalid Article ID</h2>
        <Link href="/" className="text-blue-500 underline mt-4 inline-block">
          Back to Home
        </Link>
      </div>
    );
  }

  // 2. Fetch the specific news article
  let news = null;
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/news/${id}`,
      {
        cache: "no-store",
      },
    );
    const result = await res.json();
    news = result.data && result.data.length > 0 ? result.data[0] : null;
  } catch (err) {
    console.error("Fetch error:", err);
  }

  // 3. Handle Case: News Not Found
  if (!news) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-20">
        <h1 className="text-5xl font-extrabold text-[#403F3F] mb-4">
          Article not found.
        </h1>
        <p className="text-gray-500 mb-8 text-lg">
          Attempted ID:{" "}
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

  return (
    <main className="container mx-auto my-10 px-4">
      {/* 12-Column Grid Layout */}
      <div className="grid grid-cols-12 gap-8">
        {/* Left Side: Article Content (9 Columns) */}
        <section className="col-span-12 lg:col-span-9">
          <h2 className="text-xl font-bold mb-6 text-[#403F3F]">Dragon News</h2>

          <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-10 shadow-sm">
            {/* Main News Image */}
            <div className="mb-8 overflow-hidden rounded-lg">
              <img
                src={news.image_url}
                alt={news.title}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* News Headline */}
            <h1 className="text-3xl font-extrabold text-[#403F3F] mb-6 leading-tight">
              {news.title}
            </h1>

            {/* News Full Details */}
            <p className="text-[#706F6F] text-lg leading-8 mb-10 text-justify whitespace-pre-line">
              {news.details}
            </p>

            {/* Back Button */}
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

        {/* Right Side: Sidebar (3 Columns) */}
        <aside className="col-span-12 lg:col-span-3">
          <RightSidebar />
        </aside>
      </div>
    </main>
  );
};

export default NewsDetails;
