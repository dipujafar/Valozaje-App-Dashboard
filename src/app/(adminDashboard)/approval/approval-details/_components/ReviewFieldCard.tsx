import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ReviewFieldCardProps {
  label: string;
  value: string;
  isApproved?: boolean | null;
  onApprove: () => void;
  onReject: () => void;
  className?: string;
}

export const ReviewFieldCard = ({
  label,
  value,
  isApproved,
  onApprove,
  onReject,
  className,
}: ReviewFieldCardProps) => {
  return (
    <div
      className={cn(
        "bg-card rounded-lg border border-border p-4 shadow-[0_0_10px_0_rgba(0,0,0,0.2)] transition-shadow hover:shadow-card-hover",
        isApproved === true && "border-success/50 bg-accent/30",
        isApproved === false && "border-destructive/30 bg-destructive/5",
        className
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
            {label}
          </p>
          <p className="text-base font-semibold text-foreground truncate">
            {value}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            variant="destructive"
            size="sm"
            onClick={onReject}
            className={cn(
              "rounded-md bg-destructive text-destructive-foreground shadow-[0_0_10px_0_rgba(0,0,0,0.2)]"
            )}
          >
            <X className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            onClick={onApprove}
            className={cn(
              "rounded-md bg-[#28A745] shadow-[0_0_10px_0_rgba(0,0,0,0.2)]"
            )}
          >
            <Check className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
