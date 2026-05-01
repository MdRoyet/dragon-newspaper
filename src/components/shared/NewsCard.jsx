import React from "react";
import { FaRegBookmark, FaShareAlt, FaRegEye, FaStar } from "react-icons/fa";

const NewsCard = ({ news }) => {
  const { title, author, image_url, details, rating, total_view } = news;

  return (
    <div className="card bg-base-100 border rounded-none mb-8">
      {/* 1. Author Header */}
      <div className="bg-[#F3F3F3] p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={author?.img}
            alt="author"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold text-gray-900">
              {author?.name || "Unknown Author"}
            </p>
            <p className="text-sm text-gray-500">
              {author?.published_date || "No Date"}
            </p>
          </div>
        </div>
        <div className="flex gap-3 text-gray-500 text-xl">
          <FaRegBookmark className="cursor-pointer hover:text-gray-900" />
          <FaShareAlt className="cursor-pointer hover:text-gray-900" />
        </div>
      </div>

      {/* 2. Content Body */}
      <div className="p-4 space-y-4">
        <h2 className="text-xl font-bold text-gray-800 leading-7">{title}</h2>
        <img
          src={image_url}
          alt="news"
          className="w-full h-80 object-cover rounded-md"
        />
        <p className="text-gray-600 text-sm">
          {details.length > 250 ? details.slice(0, 250) + "..." : details}
        </p>
        <button className="text-[#FF8C47] font-semibold hover:underline">
          Read More
        </button>

        <hr className="border-gray-200" />

        {/* 3. Footer: Rating and Views */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2 text-[#FF8C47]">
            <div className="flex text-lg">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <span className="text-gray-600 font-medium">{rating?.number}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <FaRegEye className="text-xl" />
            <span className="font-medium">{total_view || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
