"use client";
import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VehicleImageCard } from "./VehicleImageCard";
import { ReviewFieldCard } from "./ReviewFieldCard";
import {
  useApproveVehicleMutation,
  useRejectVehicleMutation,
} from "@/redux/api/vehicleApi";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface VehicleData {
  vehicleId: string;
  imageUrls: string[];
  vehicleType: string;
  year: string;
  brand: string;
  model: string;
  licensePlate: string;
  registration?: string;
  status?: string;
  submittedAt?: string;
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
  const [approveVehicle, { isLoading: isApproving }] =
    useApproveVehicleMutation();
  const [rejectVehicle, { isLoading: isRejecting }] =
    useRejectVehicleMutation();

  // Initialize approvals state dynamically based on number of images
  const initialApprovals: Record<string, boolean | null> = {
    vehicleType: null,
    year: null,
    brand: null,
    model: null,
    licensePlate: null,
  };

  // Add approval state for each image
  vehicleData.imageUrls.forEach((_, index) => {
    initialApprovals[`image_${index}`] = null;
  });

  const [approvals, setApprovals] =
    useState<Record<string, boolean | null>>(initialApprovals);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const handleApprove = (field: string) => {
    setApprovals((prev) => ({ ...prev, [field]: true }));
  };

  const handleReject = (field: string) => {
    setApprovals((prev) => ({ ...prev, [field]: false }));
  };

  const handleCancelClick = () => {
    setIsRejectDialogOpen(true);
  };

  const handleRejectSubmit = async () => {
    const trimmedReason = rejectionReason.trim();

    if (!trimmedReason) {
      toast.error("Please provide a rejection reason");
      return;
    }

    if (trimmedReason.length < 10) {
      toast.error("Rejection reason must be at least 10 characters");
      return;
    }

    if (trimmedReason.length > 500) {
      toast.error("Rejection reason must not exceed 500 characters");
      return;
    }

    try {
      const response = await rejectVehicle({
        id: vehicleData.vehicleId,
        rejectionReason: trimmedReason,
      }).unwrap();
      toast.success(response?.message || "Vehicle rejected successfully");
      setIsRejectDialogOpen(false);
      setRejectionReason("");
      onCancel();
    } catch (error: any) {
      console.error("Rejection error:", error);
      toast.error(error?.data?.message || "Failed to reject vehicle");
    }
  };

  const handleFinalize = async () => {
    const finalApprovals: Record<string, boolean> = {};
    Object.entries(approvals).forEach(([key, value]) => {
      finalApprovals[key] = value === true;
    });

    try {
      const response = await approveVehicle(vehicleData.vehicleId).unwrap();
      toast.success(
        response?.message || "Vehicle has been approved successfully",
      );
      onFinalize(finalApprovals);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to process vehicle approval");
    }
  };

  const isLoading = isApproving || isRejecting;

  // Check if vehicle is already processed
  const isPending = vehicleData.status === "pending";
  const isApproved = vehicleData.status === "approved";
  const isRejected = vehicleData.status === "rejected";
  const isProcessed = isApproved || isRejected;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Review Application</h1>
        {isProcessed && (
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              isApproved
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            }`}
          >
            {isApproved ? "✓ Approved" : "✗ Rejected"}
          </div>
        )}
      </div>

      {isProcessed && (
        <div
          className={`mb-4 p-3 rounded-md border ${
            isApproved
              ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300"
              : "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300"
          }`}
        >
          <p className="text-sm">
            This vehicle has already been {isApproved ? "approved" : "rejected"}
            . No further actions can be taken.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {/* Vehicle Images */}
        {vehicleData.imageUrls.map((imageUrl, index) => (
          <VehicleImageCard
            key={index}
            imageUrl={imageUrl}
            isApproved={approvals[`image_${index}`]}
            onApprove={() => handleApprove(`image_${index}`)}
            onReject={() => handleReject(`image_${index}`)}
            imageLabel={
              vehicleData.imageUrls.length > 1
                ? `Vehicle Image ${index + 1}`
                : "Main Vehicle Image"
            }
          />
        ))}

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
            {/* <div className="flex items-center gap-2 flex-shrink-0">
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
                className={
                  approvals.licensePlate !== true ? "bg-success/80" : ""
                }
              >
                <span className="sr-only">Approve</span>
                <Check className="h-4 w-4" />
              </Button>
            </div> */}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-border">
        <Button
          variant="outline"
          onClick={handleCancelClick}
          disabled={isLoading || isProcessed}
          title={isProcessed ? "Vehicle already processed" : "Reject vehicle"}
        >
          Reject
        </Button>
        <Button
          className="bg-[#28A745] shadow-[0_0_10px_0_rgba(0,0,0,0.2)]"
          onClick={handleFinalize}
          disabled={isLoading || isProcessed}
          title={isProcessed ? "Vehicle already processed" : "Approve vehicle"}
        >
          <Check className="h-4 w-4 mr-1" />
          {isLoading ? "Processing..." : "Finalize Approval"}
        </Button>
      </div>

      {/* Rejection Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Vehicle</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this vehicle application.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="rejectionReason">
                  Rejection Reason (10-500 characters)
                </Label>
                <span
                  className={`text-xs ${rejectionReason.length < 10 ? "text-muted-foreground" : rejectionReason.length > 500 ? "text-red-500" : "text-green-600"}`}
                >
                  {rejectionReason.length}/500
                </span>
              </div>
              <Textarea
                id="rejectionReason"
                placeholder="Enter at least 10 characters explaining why this vehicle is being rejected..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={4}
                className="resize-none"
                maxLength={500}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsRejectDialogOpen(false);
                setRejectionReason("");
              }}
              disabled={isRejecting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleRejectSubmit}
              disabled={isRejecting}
            >
              {isRejecting ? "Rejecting..." : "Reject Vehicle"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
