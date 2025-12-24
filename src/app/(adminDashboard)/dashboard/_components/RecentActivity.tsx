"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, DollarSign, Clock } from "lucide-react"

export interface Activity {
  type: "success" | "payment" | "info"
  title: string
  description: string
}

interface RecentActivityProps {
  activities?: Activity[]
}

const defaultActivities: Activity[] = [
  {
    type: "success",
    title: "New driver approved",
    description: "John Smith - 2 minutes ago",
  },
  {
    type: "payment",
    title: "Payment Processed",
    description: "$45.20 - 5 minutes ago",
  },
  {
    type: "info",
    title: "Ride Completed",
    description: "Premium ride #R-257 - 5 minutes ago",
  },
]

function ActivityIcon({ type }: { type: Activity["type"] }) {
  const iconClasses = "h-10 w-10 rounded-full flex items-center justify-center"

  switch (type) {
    case "success":
      return (
        <div className={`${iconClasses} bg-emerald-100 text-emerald-600`}>
          <CheckCircle2 className="h-5 w-5" />
        </div>
      )
    case "payment":
      return (
        <div className={`${iconClasses} bg-emerald-100 text-emerald-600`}>
          <DollarSign className="h-5 w-5" />
        </div>
      )
    case "info":
      return (
        <div className={`${iconClasses} bg-muted text-muted-foreground`}>
          <Clock className="h-5 w-5" />
        </div>
      )
  }
}

export function RecentActivity({ activities = defaultActivities }: RecentActivityProps) {
  return (
     <Card className="shadow-[0_0_10px_0_rgba(0,0,0,0.2)]">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest platform activities and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-4">
              <ActivityIcon type={activity.type} />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-semibold leading-none">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
