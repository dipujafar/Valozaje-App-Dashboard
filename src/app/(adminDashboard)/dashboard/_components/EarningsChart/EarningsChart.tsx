"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PeriodToggle } from "./PeriodToggle";
import { useGetEarningsDataQuery } from "@/redux/api/dashboardApi";

export function EarningsChart() {
  const [period, setPeriod] = React.useState("weekly");
  const { data: apiData, isLoading, isError } = useGetEarningsDataQuery(period);

  // Transform API data to chart format
  const data = React.useMemo(() => {
    if (!apiData?.data?.data) return [];
    return apiData.data.data.map((item: any) => ({
      label: item.label,
      value: item.amount,
    }));
  }, [apiData]);

  return (
    <Card className="shadow-[0_0_10px_0_rgba(0,0,0,0.2)]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">Earnings</CardTitle>
        <div>
          <PeriodToggle
            value={period}
            onValueChange={setPeriod}
            options={[
              { value: "weekly", label: "Weekly" },
              { value: "monthly", label: "Monthly" },
            ]}
          />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-[240px] w-full flex items-center justify-center">
            <div className="text-muted-foreground">
              Loading earnings data...
            </div>
          </div>
        ) : isError ? (
          <div className="h-[240px] w-full flex items-center justify-center">
            <div className="text-red-500">Failed to load earnings data</div>
          </div>
        ) : data.length === 0 ? (
          <div className="h-[240px] w-full flex items-center justify-center">
            <div className="text-muted-foreground">No data available</div>
          </div>
        ) : (
          <ChartContainer
            config={{
              value: {
                label: "Earnings",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[240px] w-full"
          >
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="earningsGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="rgb(52, 211, 153)"
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="50%"
                    stopColor="rgb(147, 197, 253)"
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="100%"
                    stopColor="rgb(196, 181, 253)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="rgb(52, 211, 153)"
                strokeWidth={2}
                fill="url(#earningsGradient)"
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
