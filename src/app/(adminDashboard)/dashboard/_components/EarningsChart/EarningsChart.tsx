"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PeriodToggle } from "./PeriodToggle"

const weeklyData = [
  { label: "Mon", value: 25000 },
  { label: "Tue", value: 35000 },
  { label: "Wed", value: 42000 },
  { label: "Thu", value: 38000 },
  { label: "Fri", value: 52000 },
  { label: "Sat", value: 48000 },
  { label: "Sun", value: 45000 },
]

const monthlyData = [
  { label: "Jan", value: 35000 },
  { label: "Feb", value: 45000 },
  { label: "Mar", value: 52000 },
  { label: "Apr", value: 48000 },
  { label: "May", value: 42000 },
  { label: "Jun", value: 38000 },
  { label: "Jul", value: 45000 },
  { label: "Aug", value: 52000 },
  { label: "Sep", value: 48000 },
  { label: "Oct", value: 42000 },
  { label: "Nov", value: 38000 },
  { label: "Dec", value: 45000 },
]

export function EarningsChart() {
  const [period, setPeriod] = React.useState("weekly")

  const data = period === "weekly" ? weeklyData : monthlyData

  return (
    <Card className="shadow-[0_0_10px_0_rgba(0,0,0,0.2)]">
      <CardHeader className="flex flex-row items-center justify-between" >
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
        <ChartContainer
          config={{
            value: {
              label: "Earnings",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[240px] w-full"
        >
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgb(52, 211, 153)" stopOpacity={0.4} />
                <stop offset="50%" stopColor="rgb(147, 197, 253)" stopOpacity={0.2} />
                <stop offset="100%" stopColor="rgb(196, 181, 253)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
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
      </CardContent>
    </Card>
  )
}
