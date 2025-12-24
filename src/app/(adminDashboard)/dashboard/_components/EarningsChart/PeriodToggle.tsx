"use client"
import { cn } from "@/lib/utils"

interface PeriodToggleProps {
  value: string
  onValueChange: (value: string) => void
  options: { value: string; label: string }[]
}

export function PeriodToggle({ value, onValueChange, options }: PeriodToggleProps) {
  return (
    <div className="inline-flex items-center gap-3">
      {options.map((option) => (
        <label key={option.value} className="flex items-center gap-2 cursor-pointer text-sm">
          <div className="relative flex items-center">
            <input
              type="radio"
              name="period"
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onValueChange(e.target.value)}
              className="peer sr-only"
            />
            <div
              className={cn(
                "h-4 w-4 rounded-full border-2 flex items-center justify-center transition-colors",
                value === option.value ? "border-main-color" : "border-muted-foreground/40",
              )}
            >
              {value === option.value && <div className="h-2 w-2 rounded-full bg-main-color" />}
            </div>
          </div>
          <span
            className={cn(
              "transition-colors",
              value === option.value ? "text-main-color font-medium" : "text-muted-foreground",
            )}
          >
            {option.label}
          </span>
        </label>
      ))}
    </div>
  )
}
