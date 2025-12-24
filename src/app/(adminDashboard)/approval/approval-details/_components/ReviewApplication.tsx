"use client";
import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VehicleImageCard } from "./VehicleImageCard";
import { ReviewFieldCard } from "./ReviewFieldCard";

interface VehicleData {
  imageUrl: string;
  vehicleType: string;
  year: string;
  brand: string;
  model: string;
  licensePlate: string;
}

interface ReviewApplicationProps {
  vehicleData: VehicleData;
  onCancel: () => void;
  onFinalize: (approvals: Record<string, boolean>) => void;
}

export const ReviewApplication = ({
  vehicleData,
  onCancel,
  onFinalize,
}: ReviewApplicationProps) => {
  const [approvals, setApprovals] = useState<Record<string, boolean | null>>({
    image: null,
    vehicleType: null,
    year: null,
    brand: null,
    model: null,
    licensePlate: null,
  });

  const handleApprove = (field: string) => {
    setApprovals((prev) => ({ ...prev, [field]: true }));
  };

  const handleReject = (field: string) => {
    setApprovals((prev) => ({ ...prev, [field]: false }));
  };

  const handleFinalize = () => {
    const allReviewed = Object.values(approvals).every((v) => v !== null);
    if (!allReviewed) {
      return;
    }

    const finalApprovals: Record<string, boolean> = {};
    Object.entries(approvals).forEach(([key, value]) => {
      finalApprovals[key] = value === true;
    });

    onFinalize(finalApprovals);
   
  };

  return (
    <div className="w-full">
      <h1 className="text-xl font-semibold  mb-6">
        Review Application
      </h1>

      <div className="space-y-4">
        {/* Main Vehicle Image */}
        <VehicleImageCard
          imageUrl={vehicleData.imageUrl}
          isApproved={approvals.image}
          onApprove={() => handleApprove("image")}
          onReject={() => handleReject("image")}
        />

        {/* Vehicle Type and Year Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ReviewFieldCard
            label="Vehicle Type"
            value={vehicleData.vehicleType}
            isApproved={approvals.vehicleType}
            onApprove={() => handleApprove("vehicleType")}
            onReject={() => handleReject("vehicleType")}
          />
          <ReviewFieldCard
            label="Year"
            value={vehicleData.year}
            isApproved={approvals.year}
            onApprove={() => handleApprove("year")}
            onReject={() => handleReject("year")}
          />
        </div>

        {/* Brand and Model Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ReviewFieldCard
            label="Brand"
            value={vehicleData.brand}
            isApproved={approvals.brand}
            onApprove={() => handleApprove("brand")}
            onReject={() => handleReject("brand")}
          />
          <ReviewFieldCard
            label="Model"
            value={vehicleData.model}
            isApproved={approvals.model}
            onApprove={() => handleApprove("model")}
            onReject={() => handleReject("model")}
          />
        </div>

        {/* License Plate - Full Width with Yellow Background */}
        <div className="shadow-[0_0_10px_0_rgba(0,0,0,0.2)] rounded-md p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
                License Plate Number
              </p>
              <p className="text-base font-semibold text-foreground">
                {vehicleData.licensePlate}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleReject("licensePlate")}
                className={
                  approvals.licensePlate === false
                    ? "bg-destructive text-destructive-foreground"
                    : ""
                }
              >
                <span className="sr-only">Reject</span>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleApprove("licensePlate")}
                className={approvals.licensePlate !== true ? "bg-success/80" : ""}
              >
                <span className="sr-only">Approve</span>
                <Check className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-border">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button className="bg-[#28A745] shadow-[0_0_10px_0_rgba(0,0,0,0.2)]" onClick={handleFinalize}>
          <Check className="h-4 w-4 mr-1" />
          Finalize Approval
        </Button>
      </div>
    </div>
  );
};
