"use client";
import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";

const MainNewsSection = ({ categoryId }) => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) return;

    setLoading(true);
    // Double check this URL string
    fetch(
      `https://openapi.programming-hero.com/api/news/category/${categoryId}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setNewsList(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [categoryId]);

  if (loading) return <p className="text-center py-10">Loading News...</p>;

  return (
    <div className="space-y-6">
      {newsList.length > 0 ? (
        newsList.map((news) => <NewsCard key={news._id} news={news} />)
      ) : (
        <p className="text-center py-20 border-2 border-dashed">
          No news in this category.
        </p>
      )}
    </div>
  );
};

export default MainNewsSection;
