import React from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import RightSidebar from "@/components/shared/RightSidebar";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/${id}`,
  );
  const result = await res.json();
  const news = result.data?.[0];
  return {
    title: news ? `${news.title} | Dragon News` : "News Detail",
    openGraph: { images: [news?.image_url] },
  };
}

const NewsDetails = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/${id}`,
    { cache: "no-store" },
  );
  const result = await res.json();
  const news = result?.data?.[0];

  if (!news) return <div className="text-center p-20">Article not found.</div>;

  return (
    <main className="container mx-auto my-10 px-4">
      <div className="grid grid-cols-12 gap-8">
        <section className="col-span-12 lg:col-span-9">
          <h2 className="text-xl font-bold mb-4">Dragon News</h2>
          <div className="bg-white border p-8 rounded-md">
            <img
              src={news.image_url}
              alt=""
              className="w-full h-auto mb-6 rounded-md"
            />
            <h1 className="text-3xl font-bold mb-5">{news.title}</h1>
            <p className="text-[#706F6F] leading-8 mb-10 text-justify whitespace-pre-line">
              {news.details}
            </p>
            <Link
              href={`/category/${news.category_id}`}
              className="bg-[#D72050] text-white px-7 py-3 flex items-center gap-2 w-fit font-semibold"
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
