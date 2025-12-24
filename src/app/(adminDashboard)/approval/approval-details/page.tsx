"use client";
import React from 'react'
import { ReviewApplication } from './_components/ReviewApplication'

const vehicleImage = "/car_image.jpg";

const vehicleData = {
    imageUrl: vehicleImage,
    vehicleType: "Sedan",
    year: "2020",
    brand: "TOYOTA",
    model: "Camry",
    licensePlate: "ABC-987-X",
};

const handleCancel = () => {
    console.log("Application cancelled");
};

const handleFinalize = (approvals: Record<string, boolean>) => {
    console.log("Application finalized with approvals:", approvals);
};

export default function ApprovalDetails() {
    return (
        <>
            <ReviewApplication
                vehicleData={vehicleData}
                onCancel={handleCancel}
                onFinalize={handleFinalize}
            />
        </>
    )
}
