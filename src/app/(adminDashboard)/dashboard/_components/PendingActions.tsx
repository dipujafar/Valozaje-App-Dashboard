"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export interface PendingAction {
  label: string
  count: number
  sensitive?: boolean
}

interface PendingActionsProps {
  actions?: PendingAction[]
}

const defaultActions: PendingAction[] = [
  { label: "Driver verifications pending", count: 23 },
  { label: "Reported Issues", count: 23 },
  { label: "•••••••••", count: 23, sensitive: true },
]

export function PendingActions({ actions = defaultActions }: PendingActionsProps) {
  return (
     <Card className="shadow-[0_0_10px_0_rgba(0,0,0,0.2)]">
      <CardHeader>
        <CardTitle>Pending Actions</CardTitle>
        <CardDescription>Items that require your immediate attention</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/50">
          {actions.map((action, index) => (
            <div key={index} className="flex items-center justify-between rounded-lg  px-4 py-3">
              <span className="text-sm font-medium">{action.label}</span>
              <span className="text-sm font-semibold">{action.count}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
