import React from "react";
import Marquee from "react-fast-marquee";

const news = [
  { id: 1, title: "Global Markets Rally as Inflation Shows Signs of Cooling" },
  {
    id: 2,
    title: "Breakthrough in AI Technology Promises Faster Medical Diagnosis",
  },
  { id: 3, title: "Historic Peace Talks Resume Between Neighboring Nations" },
  { id: 4, title: "Climate Change Report Warns of Rising Sea Levels by 2050" },
  { id: 5, title: "Underdog Team Wins Championship in Stunning Final Match" },
];

const BreakingNews = () => {
  return (
    <div className="flex justify-between gap-4 items-center bg-gray-200 p-4 container mx-auto">
      <button className="btn bg-pink-500 text-white">Latest News</button>
      <Marquee pauseOnHover={true}>
        {news.map((n) => (
          <span key={n.id}>{n.title}</span>
        ))}
      </Marquee>
    </div>
  );
};

export default BreakingNews;
