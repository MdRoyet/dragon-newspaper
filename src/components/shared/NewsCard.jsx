import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaRegBookmark, FaShareAlt, FaRegEye, FaStar } from "react-icons/fa";

const NewsCard = ({ news }) => {
  const { _id, title, author, image_url, details, rating, total_view } = news;

  return (
    <div className="card bg-white border rounded-md overflow-hidden mb-8 shadow-sm">
      {/* 1. Author and Social Header */}
      <div className="bg-[#F3F3F3] p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={author?.img}
            alt={author?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <p className="font-bold text-gray-800 leading-none mb-1">
              {author?.name || "Unknown Author"}
            </p>
            <p className="text-sm text-gray-500">
              {author?.published_date
                ? author.published_date.split(" ")[0]
                : "No Date"}
            </p>
          </div>
        </div>
        <div className="flex gap-4 text-gray-500 text-xl">
          <FaRegBookmark className="cursor-pointer hover:text-gray-900 transition-colors" />
          <FaShareAlt className="cursor-pointer hover:text-gray-900 transition-colors" />
        </div>
      </div>

      {/* 2. Content Body */}
      <div className="p-4 space-y-4">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 leading-tight hover:text-gray-600 transition-colors">
          <Link href={`/news/${_id}`}>{title}</Link>
        </h2>

        {/* Feature Image */}
        <div className="relative w-full h-[400px]">
          <img
            src={image_url}
            alt={title}
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        {/* Snippet Detail */}
        <p className="text-gray-600 text-sm leading-relaxed">
          {details.length > 250 ? (
            <>
              {details.slice(0, 250)}...{" "}
              <Link
                href={`/news/${_id}`}
                className="text-[#FF8C47] font-bold hover:underline block mt-2"
              >
                Read More
              </Link>
            </>
          ) : (
            details
          )}
        </p>

        <hr className="border-gray-200 mt-4" />

        {/* 3. Footer: Ratings and Views */}
        <div className="flex items-center justify-between pt-2">
          {/* Star Rating Section */}
          <div className="flex items-center gap-3 text-[#FF8C47]">
            <div className="flex gap-1">
              {/* Rendering 5 stars for the newspaper look */}
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <span className="text-gray-600 font-semibold text-lg">
              {rating?.number}
            </span>
          </div>

          {/* View Count Section */}
          <div className="flex items-center gap-3 text-gray-500">
            <FaRegEye className="text-2xl" />
            <span className="font-semibold text-lg">{total_view || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
