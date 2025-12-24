"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CommissionData {
  paid: number
  pending: number
  total: number
  percentage: number
}

const commissionData: CommissionData = {
  paid: 42000,
  pending: 12000,
  total: 52000,
  percentage: 78,
}

export function CommissionRadialChart() {
  const radius = 85
  const strokeWidth = 12
  const normalizedRadius = radius - strokeWidth / 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (commissionData.percentage / 100) * circumference

  return (
    <Card className="shadow-[0_0_10px_0_rgba(0,0,0,0.2)]">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Commission Pull</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center gap-8 xl:gap-20">
          {/* Radial Chart */}
          <div className="relative">
            <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
              {/* Background circle */}
              <circle
                stroke="hsl(var(--muted))"
                fill="transparent"
                strokeWidth={strokeWidth}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
              {/* Progress circle */}
              <circle
                stroke="#28A745"
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                className="transition-all duration-500 ease-in-out shadow-[0_0_10px_0_rgba(0,0,0,0.2)]"
              />
            </svg>
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-foreground">{commissionData.percentage}%</span>
              <span className="text-sm text-muted-foreground">Collected</span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-8">
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-[#28A745]" />
                <span>Paid</span>
              </div>
              <span className=" font-semibold text-foreground">${commissionData.paid.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between gap-8">
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-muted" />
                <span>Pending</span>
              </div>
              <span className=" font-semibold text-foreground">${commissionData.pending.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between gap-8 pt-2 border-t border-border">
              <span className=" font-medium text-foreground">Total</span>
              <span className=" font-bold text-foreground">${commissionData.total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
