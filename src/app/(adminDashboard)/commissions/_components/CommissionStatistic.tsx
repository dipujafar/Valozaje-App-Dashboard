import StatCard from "@/components/(adminDashboard)/cards/statCard";
import React from "react";

const statData = [
  {
    id: 1,
    title: "Total Driver Earnings",
    amount: "$12,847",
    increase: true,
    growth: "12"
  },
  {
    id: 2,
    title: "Total  Commission Due",
    amount: "$2,341",
    increase: false,
    growth: "8"
  },
  {
    id: 3,
    title: "Total Collected",
    amount: "$1,429",
    increase: true,
    growth: "23"
  },
   {
    id: 4,
    title: "High Risk Drivers",
    amount: "3",
    tagline: <p>Crossed <span className="text-[#28A745]">$200</span> Limit</p>
  },
];

export default function CommissionStatistic() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 xl:gap-5 gap-3">
      {statData?.map((item) => (
        <div key={item.id}>
          <StatCard {...item} />
        </div>
      ))}
    </div>
  );
}
