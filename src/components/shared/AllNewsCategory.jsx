"use client";
import React, { useEffect, useState } from "react";

const AllNewsCategory = ({ selectedCategory, setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://openapi.programming-hero.com/api/news/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.data.news_category));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">All Category</h2>
      <div className="flex flex-col">
        {categories.map((category) => (
          <button
            key={category.category_id}
            onClick={() => setSelectedCategory(category.category_id)}
            className={`w-full text-left px-8 py-4 rounded-lg text-lg font-semibold transition-all ${
              selectedCategory === category.category_id
                ? "bg-[#E7E7E7] text-gray-900"
                : "bg-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            {category.category_name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllNewsCategory;
