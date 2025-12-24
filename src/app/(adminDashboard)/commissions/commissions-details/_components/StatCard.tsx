import { cn } from "@/lib/utils"

interface StatCardProps {
  label: string
  value: number
  variant?: "neutral" | "success" | "danger"
}

export function StatCard({ label, value, variant = "neutral" }: StatCardProps) {
  const formattedValue = `$${value.toFixed(2)}`

  return (
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p
        className={cn(
          "text-2xl font-bold",
          variant === "neutral" && "text-foreground",
          variant === "success" && "text-emerald-600",
          variant === "danger" && "text-red-500",
        )}
      >
        {formattedValue}
      </p>
    </div>
  )
}
