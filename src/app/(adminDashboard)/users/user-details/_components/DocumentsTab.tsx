import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

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

const DocumentsTab = () => {
  const vehicleData = {
    registration: "Alex Johnson",
    yearOfVehicle: "2022",
    brand: "Honda",
    model: "Civic",
    licensePlate: "ABC123",
    vehicleType: "Sedan",
  };

  return (
    <div className="space-y-6">
      {/* Vehicle Image */}
      <div className="flex justify-center py-4">
        <Image
          width={1200}
          height={1200} 
          src="/car_image.jpg" 
          alt="Vehicle" 
          className="w-52 h-auto object-contain rounded-lg"
        />
      </div>

      {/* Vehicle Details Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        <VehicleField 
          label="Registration" 
          value={vehicleData.registration} 
        />
        <VehicleField 
          label="Year of Vehicle" 
          value={vehicleData.yearOfVehicle} 
        />
        <VehicleField 
          label="Brand" 
          value={vehicleData.brand} 
        />
        <VehicleField 
          label="Model" 
          value={vehicleData.model} 
        />
        <VehicleField 
          label="Car License Plate Number" 
          value={vehicleData.licensePlate} 
        />
        <VehicleField 
          label="Vehicle Type" 
          value={vehicleData.vehicleType} 
        />
      </div>
    </div>
  );
};

export default DocumentsTab;