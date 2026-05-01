import React from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import RightSidebar from "@/components/shared/RightSidebar";

// 1. Force dynamic rendering so Vercel doesn't cache an empty page
export const dynamic = "force-dynamic";

// 2. Generate Metadata for SEO and Social Sharing
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  // Safely extract the ID, checking for both capital 'I' and lowercase 'i'
  const id = resolvedParams?.Id || resolvedParams?.id;

  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/news/${id}`,
    );
    const result = await res.json();
    const news = result.data?.[0];

    return {
      title: news ? `${news.title} | Dragon News` : "News Details",
      openGraph: {
        images: [news?.image_url],
      },
    };
  } catch (error) {
    return { title: "Dragon News" };
  }
}

// 3. Main Page Component
export default async function NewsDetails({ params }) {
  // Await the params object explicitly first (Next.js 15 requirement)
  const resolvedParams = await params;

  // Safely extract the ID, checking for both capital 'I' and lowercase 'i'
  const id = resolvedParams?.Id || resolvedParams?.id;

  // Failsafe: If ID is still somehow missing
  if (!id) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-20">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Routing Error</h1>
        <p className="text-gray-600 mb-6">The Article ID could not be found.</p>
        <Link
          href="/"
          className="text-white bg-[#403F3F] px-8 py-3 font-semibold hover:bg-black transition-all"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  // Fetch the News securely
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

  // Normal Not Found Screen if API returns nothing for that ID
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

  // Main UI
  return (
    <main className="container mx-auto my-10 px-4">
      <div className="grid grid-cols-12 gap-8">
        {/* Left Side: Article Content */}
        <section className="col-span-12 lg:col-span-9">
          <h2 className="text-xl font-bold mb-6 text-[#403F3F]">Dragon News</h2>

          <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-10 shadow-sm">
            <img
              src={news.image_url}
              alt={news.title}
              className="w-full h-auto mb-6 rounded-md object-cover"
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
                className="bg-[#D72050] text-white px-8 py-4 font-bold flex items-center gap-3 w-fit hover:bg-red-700 transition-all rounded-sm"
              >
                <FaArrowLeft /> All news in this category
              </Link>
            </div>
          </div>
        </section>

        {/* Right Side: Sidebar */}
        <aside className="col-span-12 lg:col-span-3">
          <RightSidebar />
        </aside>
      </div>
    </main>
  );
}
