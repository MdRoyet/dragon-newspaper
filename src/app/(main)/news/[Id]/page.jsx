import React from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import RightSidebar from "@/components/shared/RightSidebar";

// 1. FORCE DYNAMIC RENDERING (This stops Vercel from breaking the params)
export const dynamic = "force-dynamic";

export async function generateMetadata(props) {
  // Safely handle params for both Next 14 and Next 15
  const params = await props.params;
  const id = params?.id || props.params?.id;

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

// 2. Accept RAW props to guarantee we catch what Vercel sends
const NewsDetails = async (props) => {
  // Safely extract the ID regardless of Next.js version
  const params = await props.params;
  const id = params?.id || props.params?.id;

  // 3. Failsafe screen to see EXACTLY what is broken if it fails again
  if (!id) {
    return (
      <div className="p-20 text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">
          ID is completely missing!
        </h1>
        <p className="mb-4">Here is what Vercel is actually seeing:</p>
        <pre className="bg-gray-200 p-6 rounded text-left overflow-auto max-w-2xl mx-auto font-mono text-sm">
          {JSON.stringify(props, null, 2)}
        </pre>
        <Link href="/" className="text-blue-500 underline mt-8 inline-block">
          Back to Home
        </Link>
      </div>
    );
  }

  // 4. Fetch Data safely
  let news = null;
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/news/${id}`,
      {
        cache: "no-store", // Double protection against Vercel caching
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
};

export default NewsDetails;
