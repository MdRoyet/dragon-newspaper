import React from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import RightSidebar from "@/components/shared/RightSidebar";

// 1. Metadata must ALSO await params
export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/news/${id}`,
    );
    const result = await res.json();
    const news = result.data?.[0];
    return {
      title: news ? `${news.title} | Dragon News` : "News Detail",
    };
  } catch (error) {
    return { title: "Dragon News" };
  }
}

const NewsDetails = async ({ params }) => {
  // 2. THIS IS THE KEY: You must await params before using id
  const resolvedParams = await params;
  const id = resolvedParams.id;

  // 3. Fetching news
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/${id}`,
    { cache: "no-store" },
  );
  const result = await res.json();
  const news = result?.data?.[0];

  // 4. Improved Error Handling
  if (!news) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-20">
        <h2 className="text-4xl font-bold mb-4">Article not found.</h2>
        <p className="text-gray-500 mb-6 font-mono">
          Attempted ID: {id || "undefined"}
        </p>
        <Link href="/" className="text-blue-500 underline text-lg">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <main className="container mx-auto my-10 px-4">
      <div className="grid grid-cols-12 gap-8">
        {/* Main Content Area */}
        <section className="col-span-12 lg:col-span-9">
          <h2 className="text-xl font-bold mb-4 text-[#403F3F]">Dragon News</h2>
          <div className="bg-white border border-gray-200 p-8 rounded-md shadow-sm">
            <img
              src={news.image_url}
              alt={news.title}
              className="w-full h-auto mb-6 rounded-md"
            />
            <h1 className="text-3xl font-bold mb-5 text-[#403F3F]">
              {news.title}
            </h1>
            <p className="text-[#706F6F] leading-8 mb-10 text-justify whitespace-pre-line">
              {news.details}
            </p>
            <Link
              href={`/category/${news.category_id || "01"}`}
              className="bg-[#D72050] text-white px-7 py-3 flex items-center gap-2 w-fit font-semibold"
            >
              <FaArrowLeft /> All news in this category
            </Link>
          </div>
        </section>

        {/* Sidebar Area */}
        <aside className="col-span-12 lg:col-span-3">
          <RightSidebar />
        </aside>
      </div>
    </main>
  );
};

export default NewsDetails;
