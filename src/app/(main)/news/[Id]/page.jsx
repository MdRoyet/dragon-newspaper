import React from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import RightSidebar from "@/components/shared/RightSidebar";

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
      openGraph: { images: [news?.image_url] },
    };
  } catch (err) {
    return { title: "Dragon News" };
  }
}

const NewsDetails = async ({ params }) => {
  // 1. Await params properly
  const { id } = await params;

  // 2. Fetch with error handling
  let news = null;
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/news/${id}`,
      {
        cache: "no-store",
      },
    );
    const result = await res.json();
    news = result?.data?.[0] || null;
  } catch (error) {
    console.error("Fetch error on Vercel:", error);
  }

  // 3. Fallback UI
  if (!news) {
    return (
      <div className="text-center p-20">
        <h2 className="text-2xl font-bold">Article not found.</h2>
        <p className="text-gray-500 mt-2">ID: {id}</p>
        <Link href="/" className="text-blue-500 underline mt-4 inline-block">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <main className="container mx-auto my-10 px-4">
      <div className="grid grid-cols-12 gap-8">
        <section className="col-span-12 lg:col-span-9">
          <h2 className="text-xl font-bold mb-4 text-[#403F3F]">Dragon News</h2>
          <div className="bg-white border border-gray-200 p-8 rounded-md shadow-sm">
            <img
              src={news.image_url}
              alt={news.title}
              className="w-full h-auto mb-6 rounded-md"
            />
            <h1 className="text-3xl font-bold mb-5 text-[#403F3F] leading-tight">
              {news.title}
            </h1>
            <p className="text-[#706F6F] leading-8 mb-10 text-justify whitespace-pre-line">
              {news.details}
            </p>
            <Link
              href={`/category/${news.category_id || "01"}`}
              className="bg-[#D72050] text-white px-7 py-3 flex items-center gap-2 w-fit font-semibold hover:bg-red-700 transition-colors"
            >
              <FaArrowLeft /> All news in this category
            </Link>
          </div>
        </section>

        <aside className="col-span-12 lg:col-span-3">
          <RightSidebar />
        </aside>
      </div>
    </main>
  );
};

export default NewsDetails;
