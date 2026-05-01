"use client";
import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";

const MainNewsSection = ({ categoryId }) => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // This runs every time categoryId changes
    fetch(
      `https://openapi.programming-hero.com/api/news/category/${categoryId}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setNewsList(data.data);
        setLoading(false);
      });
  }, [categoryId]); // Important: dependency array includes categoryId

  return (
    <div>
      <h2 className="text-xl font-bold mb-5 text-gray-800">Dragon News Home</h2>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : newsList.length > 0 ? (
        newsList.map((news) => <NewsCard key={news._id} news={news} />)
      ) : (
        <p className="text-center py-10 text-gray-500">
          No news found in this category.
        </p>
      )}
    </div>
  );
};

export default MainNewsSection;
