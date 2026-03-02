"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetPendingActionsDataQuery } from "@/redux/api/dashboardApi";

export interface PendingAction {
  label: string;
  count: number;
  sensitive?: boolean;
}

export function PendingActions() {
  const {
    data: apiData,
    isLoading,
    isError,
  } = useGetPendingActionsDataQuery({});

  const actions: PendingAction[] = [
    {
      label: "Driver verifications pending",
      count: apiData?.data?.driverVerificationsPending || 0,
    },
    {
      label: "Reported Issues",
      count: apiData?.data?.reportedIssues || 0,
    },
  ];
  return (
    <Card className="shadow-[0_0_10px_0_rgba(0,0,0,0.2)]">
      <CardHeader>
        <CardTitle>Pending Actions</CardTitle>
        <CardDescription>
          Items that require your immediate attention
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-[120px] w-full flex items-center justify-center">
            <div className="text-muted-foreground">
              Loading pending actions...
            </div>
          </div>
        ) : isError ? (
          <div className="h-[120px] w-full flex items-center justify-center">
            <div className="text-red-500">Failed to load pending actions</div>
          </div>
        ) : (
          <div className="bg-muted/50">
            {actions.map((action, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg  px-4 py-3"
              >
                <span className="text-sm font-medium">{action.label}</span>
                <span className="text-sm font-semibold">{action.count}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
