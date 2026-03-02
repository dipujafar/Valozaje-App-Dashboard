"use client";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useGetUserByIdQuery } from "@/redux/api/usersApi";
import { getUserImageUrl } from "@/utils/userTransformers";

interface VehicleFieldProps {
  label: string;
  value: string;
  onClear?: () => void;
}

const VehicleField = ({ label, value, onClear }: VehicleFieldProps) => (
  <div className="space-y-2">
    <Label className="text-sm text-muted-foreground font-normal">{label}</Label>
    <div className="relative">
      <Input
        value={value}
        readOnly
        className="pr-10 bg-muted/30 border-border text-foreground"
      />
      <button
        onClick={onClear}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-destructive flex items-center justify-center hover:bg-destructive/80 transition-colors"
      >
        <X className="w-3 h-3 text-destructive-foreground" />
      </button>
    </div>
  </div>
);

interface DocumentsTabProps {
  userId: string;
}

const DocumentsTab = ({ userId }: DocumentsTabProps) => {
  const {
    data: apiData,
    isLoading,
    isError,
  } = useGetUserByIdQuery({
    id: userId,
    includeVehicle: true,
  });

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
        <div className="text-red-500">Failed to load vehicle details.</div>
      </div>
    );
  }

  const vehicle = apiData.data.vehicle;

  if (!vehicle) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <div className="text-muted-foreground">
          No vehicle information available.
        </div>
      </div>
    );
  }

  const vehicleData = {
    registration: vehicle.registration || "N/A",
    yearOfVehicle: vehicle.year?.toString() || "N/A",
    brand: vehicle.brand || "N/A",
    model: vehicle.vehicleModel || "N/A",
    licensePlate: vehicle.licensePlateNumber || "N/A",
    vehicleType: vehicle.vehicleType || "N/A",
  };

  const vehicleImage = vehicle.vehicleImages?.[0]
    ? getUserImageUrl(vehicle.vehicleImages[0])
    : "/car_image.jpg";

  return (
    <div className="space-y-6">
      {/* Vehicle Image */}
      <div className="flex justify-center py-4">
        <Image
          width={1200}
          height={1200}
          src={vehicleImage}
          alt="Vehicle"
          className="w-52 h-auto object-contain rounded-lg"
        />
      </div>

      {/* Vehicle Details Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        <VehicleField label="Registration" value={vehicleData.registration} />
        <VehicleField
          label="Year of Vehicle"
          value={vehicleData.yearOfVehicle}
        />
        <VehicleField label="Brand" value={vehicleData.brand} />
        <VehicleField label="Model" value={vehicleData.model} />
        <VehicleField
          label="Car License Plate Number"
          value={vehicleData.licensePlate}
        />
        <VehicleField label="Vehicle Type" value={vehicleData.vehicleType} />
      </div>
    </div>
  );
};

export default DocumentsTab;
