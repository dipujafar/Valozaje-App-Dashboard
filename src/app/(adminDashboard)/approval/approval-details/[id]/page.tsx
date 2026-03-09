"use client";
import React from "react";
import { ReviewApplication } from "../_components/ReviewApplication";
import { useParams, useRouter } from "next/navigation";
import { useGetVehicleByIdQuery } from "@/redux/api/vehicleApi";
import { imagePreview } from "@/utils/imagePreview";

export default function ApprovalDetails() {
  const params = useParams();
  const router = useRouter();
  const vehicleId = params.id as string;

  const {
    data: apiData,
    isLoading,
    isError,
  } = useGetVehicleByIdQuery(vehicleId);

  const handleCancel = () => {
    router.push("/approval");
  };

  const handleFinalize = (approvals: Record<string, boolean>) => {
    console.log("Application finalized with approvals:", approvals);
    // You can add approve/reject API calls here
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <div className="text-muted-foreground">Loading vehicle details...</div>
      </div>
    );
  }

  if (isError || !apiData?.data) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <div className="text-red-500">
          Failed to load vehicle details. Please try again.
        </div>
      </div>
    );
  }

  const vehicle = apiData.data;

  // Convert image paths to full URLs
  const imageUrls =
    vehicle.vehicleImages && vehicle.vehicleImages.length > 0
      ? vehicle.vehicleImages.map(
          (imagePath: string) => imagePreview(imagePath),
        )
      : ["/car_image.jpg"];

  const vehicleData = {
    vehicleId: vehicleId,
    imageUrls: imageUrls,
    vehicleType: vehicle.vehicleType || "N/A",
    year: vehicle.year?.toString() || "N/A",
    brand: vehicle.brand || "N/A",
    model: vehicle.vehicleModel || "N/A",
    licensePlate: vehicle.licensePlateNumber || "N/A",
    registration: vehicle.registration || "N/A",
    status: vehicle.status || "pending",
    submittedAt: vehicle.submittedAt
      ? new Date(vehicle.submittedAt).toLocaleDateString()
      : "N/A",
  };

  return (
    <>
      <ReviewApplication
        vehicleData={vehicleData}
        onCancel={handleCancel}
        onFinalize={handleFinalize}
      />
    </>
  );
}
