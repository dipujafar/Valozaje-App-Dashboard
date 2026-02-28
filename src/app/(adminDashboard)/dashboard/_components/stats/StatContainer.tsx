"use client";

import StatCard from "@/components/(adminDashboard)/cards/statCard";
import React from "react";
import { useGetStatsDataQuery } from "@/redux/api/dashboardApi";

export default function StatContainer() {
  const { data, isLoading, isError } = useGetStatsDataQuery({});

  console.log("Stats Data:", data);

  const statsData = data?.data;

  const statData = [
    {
      id: 1,
      title: "Total Users",
      amount: statsData?.totalUsers?.count?.toLocaleString() || "0",
      increase: (statsData?.totalUsers?.percentageChange || 0) >= 0,
      growth: Math.abs(statsData?.totalUsers?.percentageChange || 0).toString(),
    },
    {
      id: 2,
      title: "Active Trips",
      amount: statsData?.activeTrips?.count?.toLocaleString() || "0",
      increase: (statsData?.activeTrips?.percentageChange || 0) >= 0,
      growth: Math.abs(
        statsData?.activeTrips?.percentageChange || 0,
      ).toString(),
    },
    {
      id: 3,
      title: "Packages in Transit",
      amount: statsData?.packagesInTransit?.count?.toLocaleString() || "0",
      increase: (statsData?.packagesInTransit?.percentageChange || 0) >= 0,
      growth: Math.abs(
        statsData?.packagesInTransit?.percentageChange || 0,
      ).toString(),
    },
    {
      id: 4,
      title: "Commissions Due",
      amount: "$" + (statsData?.commissionDue?.amount?.toLocaleString() || "0"),
      increase: undefined,
      growth: undefined,
    },
  ];

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 xl:gap-5 gap-3">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="flex flex-col xl:gap-y-2 gap-y-1 justify-center p-6 flex-1 bg-section-bg rounded-xl shadow-[0_0_10px_0_rgba(0,0,0,0.2)] animate-pulse"
          >
            <div className="h-5 bg-gray-300 rounded w-3/4"></div>
            <div className="h-7 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 xl:gap-5 gap-3">
        <div className="col-span-full p-6 bg-red-50 border border-red-200 rounded-xl text-red-600">
          Failed to load dashboard statistics. Please try again.
        </div>
      </div>
    );
  }

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
