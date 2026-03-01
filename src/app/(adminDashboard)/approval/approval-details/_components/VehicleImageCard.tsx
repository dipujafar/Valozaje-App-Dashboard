import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VehicleImageCardProps {
  imageUrl: string;
  isApproved?: boolean | null;
  onApprove: () => void;
  onReject: () => void;
  imageLabel?: string;
}

export const VehicleImageCard = ({
  imageUrl,
  isApproved,
  onApprove,
  onReject,
  imageLabel = "Main Vehicle Image",
}: VehicleImageCardProps) => {
  return (
    <div
      className={cn(
        "bg-card rounded-lg border border-border p-6 shadow-[0_0_10px_0_rgba(0,0,0,0.2)] transition-shadow ",
        isApproved === true && "border-success/50 bg-accent/30",
        isApproved === false && "border-destructive/30 bg-destructive/5",
      )}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">
        {imageLabel}
      </p>
      <div className="flex items-center justify-between gap-6">
        <div className="flex-1 flex justify-center">
          <img
            src={imageUrl}
            alt="Vehicle"
            className="max-h-32 w-auto object-contain"
          />
        </div>
        {/* <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            variant="destructive"
            size="sm"
            onClick={onReject}
            className={cn(
              "rounded-md shadow-[0_0_10px_0_rgba(0,0,0,0.2)] bg-destructive text-destructive-foreground ",
            )}
          >
            <X className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            onClick={onApprove}
            className={cn(
              "rounded-md bg-[#28A745] shadow-[0_0_10px_0_rgba(0,0,0,0.2)]",
            )}
          >
            <Check className="h-4 w-4" />
          </Button>
        </div> */}
      </div>
    </div>
  );
};
