"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle2,
  DollarSign,
  Clock,
  UserPlus,
  AlertCircle,
} from "lucide-react";
import { useGetRecentActivityDataQuery } from "@/redux/api/dashboardApi";
import { useMemo } from "react";

export interface Activity {
  type: "success" | "payment" | "info" | "user_registered" | "report_submitted";
  title: string;
  description: string;
}

// Helper function to format relative time
function getRelativeTime(timestamp: string): string {
  const now = new Date();
  const past = new Date(timestamp);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
}

function ActivityIcon({ type }: { type: Activity["type"] }) {
  const iconClasses = "h-10 w-10 rounded-full flex items-center justify-center";

  switch (type) {
    case "user_registered":
      return (
        <div className={`${iconClasses} bg-blue-100 text-blue-600`}>
          <UserPlus className="h-5 w-5" />
        </div>
      );
    case "report_submitted":
      return (
        <div className={`${iconClasses} bg-red-100 text-red-600`}>
          <AlertCircle className="h-5 w-5" />
        </div>
      );
    case "success":
      return (
        <div className={`${iconClasses} bg-emerald-100 text-emerald-600`}>
          <CheckCircle2 className="h-5 w-5" />
        </div>
      );
    case "payment":
      return (
        <div className={`${iconClasses} bg-emerald-100 text-emerald-600`}>
          <DollarSign className="h-5 w-5" />
        </div>
      );
    case "info":
    default:
      return (
        <div className={`${iconClasses} bg-muted text-muted-foreground`}>
          <Clock className="h-5 w-5" />
        </div>
      );
  }
}

export function RecentActivity() {
  const {
    data: apiData,
    isLoading,
    isError,
  } = useGetRecentActivityDataQuery({});

  const activities = useMemo(() => {
    if (!apiData?.data) return [];
    return apiData.data.slice(0, 5).map((activity: any) => ({
      type: activity.type,
      title: activity.title,
      description: `${activity.description} - ${getRelativeTime(activity.timestamp)}`,
    }));
  }, [apiData]);
  return (
    <Card className="shadow-[0_0_10px_0_rgba(0,0,0,0.2)]">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Latest platform activities and updates
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-[240px] w-full flex items-center justify-center">
            <div className="text-muted-foreground">
              Loading recent activity...
            </div>
          </div>
        ) : isError ? (
          <div className="h-[240px] w-full flex items-center justify-center">
            <div className="text-red-500">Failed to load recent activity</div>
          </div>
        ) : activities.length === 0 ? (
          <div className="h-[240px] w-full flex items-center justify-center">
            <div className="text-muted-foreground">No recent activity</div>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity: Activity, index: number) => (
              <div key={index} className="flex items-start gap-4">
                <ActivityIcon type={activity.type} />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-semibold leading-none">
                    {activity.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
