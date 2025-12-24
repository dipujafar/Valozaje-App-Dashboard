import StatCard from "@/components/(adminDashboard)/cards/statCard";
import React from "react";

const statData = [
  {
    id: 1,
    title: "Total Users",
    amount: "12,426",
    increase: true,
    growth: "12"
  },
  {
    id: 2,
    title: "Active Trips",
    amount: "2,426",
    increase: false,
    growth: "8"
  },
  {
    id: 3,
    title: "Packages in Transit",
    amount: "2,426",
    increase: true,
    growth: "23"
  },
   {
    id: 4,
    title: "Commissions Due",
    amount: "24,429",
    increase: false,
    growth: "8"
  },
];

export default function StatContainer() {
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
