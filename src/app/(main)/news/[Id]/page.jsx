import React from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

// 1. Mark as async to handle Next.js 15 params Promise
const NewsDetails = async ({ params }) => {
  // 2. Resolve params safely
  const resolvedParams = await params;
  const newsId = resolvedParams?.id;

  // 3. Fallback if ID is missing to prevent Invariant Error
  if (!newsId) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-bold">Error: Invalid News ID</p>
      </div>
    );
  }

  // 4. Fetch the data (using no-store to ensure fresh results)
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/${newsId}`,
    {
      cache: "no-store",
    },
  );
  const result = await res.json();

  // The API returns an array in data.data
  const news = result?.data?.[0];

  // 5. If API returns success but no news found
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
      <div className="grid grid-cols-12 gap-8">
        {/* Left Side: Detailed News Content */}
        <section className="col-span-12 lg:col-span-9">
          <h2 className="text-xl font-bold mb-6 text-gray-900">Dragon News</h2>

          <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-10 shadow-sm">
            {/* Main Article Image */}
            <div className="mb-8 overflow-hidden rounded-lg">
              <img
                src={news.image_url}
                alt={news.title}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* News Title */}
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6 leading-tight">
              {news.title}
            </h1>

            {/* News Body Text */}
            <p className="text-gray-600 text-lg leading-8 mb-10 text-justify whitespace-pre-line">
              {news.details}
            </p>

            {/* Red Back Button */}
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

        {/* Right Side: Sidebar */}
        <aside className="col-span-12 lg:col-span-3">
          <div className="space-y-8">
            <h2 className="font-bold text-xl text-gray-900">Login With</h2>
            {/* Placeholder for Social Login Components */}
            <div className="border-2 border-dashed border-gray-200 rounded-lg h-40 flex items-center justify-center text-gray-400 font-medium">
              Sidebar Content
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default NewsDetails;
