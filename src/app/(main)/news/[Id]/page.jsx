import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import RightSidebar from "@/components/shared/RightSidebar";

/**
 * 1. Dynamic Metadata Generation
 * This ensures social media previews (Facebook, X, etc.) show the correct news title and image.
 */
export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/news/${id}`,
    );
    const result = await res.json();
    const news = result.data?.[0];

    if (!news) return { title: "News Not Found | Dragon News" };

    return {
      title: `${news.title} | Dragon News`,
      description: news.details.slice(0, 150) + "...",
      openGraph: {
        images: [news.image_url],
      },
    };
  } catch (error) {
    return { title: "Dragon News" };
  }
}

/**
 * 2. Main Page Component
 */
const NewsDetails = async ({ params }) => {
  // Await params for Next.js 15
  const { id } = await params;

  // Fetch the specific news article
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/${id}`,
    {
      cache: "no-store",
    },
  );
  const result = await res.json();
  const news = result.data && result.data.length > 0 ? result.data[0] : null;

  // Handle Case: News Not Found
  if (!news) {
    return (
      <div className="container mx-auto my-20 text-center">
        <h2 className="text-2xl font-bold text-gray-700">Article Not Found</h2>
        <Link href="/" className="text-blue-500 underline mt-4 inline-block">
          Return to Home
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
          <h2 className="text-xl font-bold mb-6 text-gray-900">Dragon News</h2>

          <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-10 shadow-sm">
            {/* Main News Image */}
            <div className="mb-8 overflow-hidden rounded-lg">
              {/* Using standard img for API URL images, or <Image /> if you prefer */}
              <img
                src={news.image_url}
                alt={news.title}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* News Headline */}
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6 leading-tight">
              {news.title}
            </h1>

            {/* News Full Details */}
            <p className="text-gray-600 text-lg leading-8 mb-10 text-justify whitespace-pre-line">
              {news.details}
            </p>

            {/* "All news in this category" Red Button */}
            <div className="border-t pt-8">
              <Link
                href={`/category/${news.category_id || "01"}`}
                className="bg-[#D72050] text-white px-8 py-4 font-bold rounded-sm flex items-center gap-3 w-fit hover:bg-red-700 transition-all active:scale-95"
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
