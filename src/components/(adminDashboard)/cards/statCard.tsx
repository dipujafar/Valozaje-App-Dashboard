import { cn } from "@/lib/utils";
import React from "react";

type TProps = {
  title: string;
  amount: string;
  increase?: boolean;
  growth?: string;
  tagline?: React.ReactNode
};

export default function StatCard({
  title,
  amount,
  increase,
  growth,
  tagline
}: TProps) {
  return (
    <div className="flex flex-col xl:gap-y-2 gap-y-1  justify-center p-6  flex-1 bg-section-bg rounded-xl shadow-[0_0_10px_0_rgba(0,0,0,0.2)]">
      <div className="flex justify-between items-center">
        <h3 className=" xl:text-lg text-base text-[#71717A] truncate font-medium">{title}</h3>
      </div>
      <p className="lg:text-2xl text-xl font-medium">{amount}</p>
      <div>
        { growth && <div>
          <span className={cn("text-green-600", !increase && "text-red-600")}>{!increase ? "+" : "-"}{growth}%</span>
          <span> from last month</span>
        </div>}
        {tagline && tagline}
      </div>
    </div>
  );
}
