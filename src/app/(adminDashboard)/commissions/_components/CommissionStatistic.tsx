"use client"
import StatCard from "@/components/(adminDashboard)/cards/statCard";
import { useGetCommissionStateQuery } from "@/redux/api/commissionApi";
import React from "react";
import CommissionStatisticSkeleton from "./CommissionStatisticSkeleton";



export default function CommissionStatistic() {
  const { data, isLoading } = useGetCommissionStateQuery(undefined);

  if (isLoading) return <CommissionStatisticSkeleton />

  const statData = [
    {
      id: 1,
      title: "Total Driver Earnings",
      amount: `$${data?.data?.totalDriverEarnings || 0}`,
      increase: data?.data?.percentageChange?.earnings < 0 ? false : true,
      growth: data?.data?.percentageChange?.earnings || 0
    },
    {
      id: 2,
      title: "Total  Commission Due",
      amount: `$${data?.data?.totalCommissionDue || 0}`,
      increase: data?.data?.percentageChange?.commissionDue < 0 ? false : true,
      growth: data?.data?.percentageChange?.commissionDue
    },
    {
      id: 3,
      title: "Total Collected",
      amount: `$${data?.data?.totalCollected || 0}`,
      increase: data?.data?.percentageChange?.collected < 0 ? false : true,
      growth: data?.data?.percentageChange?.collected
    },
    {
      id: 4,
      title: "High Risk Drivers",
      amount: data?.data?.highRiskDrivers,
      tagline: <p>Crossed <span className="text-[#28A745]">{data?.data?.highRiskThreshold}</span> Limit</p>
    },
  ];



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
