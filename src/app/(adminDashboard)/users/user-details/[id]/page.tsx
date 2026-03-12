"use client";
import React from "react";
import { Card } from "antd";
import { useParams } from "next/navigation";
import { useGetUserByIdQuery } from "@/redux/api/usersApi";
import UserProfileCard from "../_components/UserProfileCard";
import UserDetailsTabs from "../_components/UserDetailsTabs";
import { transformUserForDetails } from "@/utils/userTransformers";

export default function UserDetailsPage() {
  const params = useParams();
  const userId = params.id as string;

  const {
    data: apiData,
    isLoading,
    isError,
  } = useGetUserByIdQuery({
    id: userId,
    includeVehicle: false,
  });

  if (isLoading) {
    return (
      <Card className="shadow-[0_0_10px_0_rgba(0,0,0,0.2)]">
        <div className="flex justify-center items-center h-[400px]">
          <div className="text-muted-foreground">Loading user details...</div>
        </div>
      </Card>
    );
  }

  if (isError || !apiData?.data) {
    return (
      <Card className="shadow-[0_0_10px_0_rgba(0,0,0,0.2)]">
        <div className="flex justify-center items-center h-[400px]">
          <div className="text-red-500">
            Failed to load user details. Please try again.
          </div>
        </div>
      </Card>
    );
  }

  const user = apiData.data;

  console.log(user);

  // Transform API data using utility function
  const userData = transformUserForDetails(user);

  return (
    <Card className="shadow-[0_0_10px_0_rgba(0,0,0,0.2)]">
      <div className="min-h-[calc(100vh-200px)]">
        <h1 className="text-2xl font-semibold text-foreground mb-8">
          User Details
        </h1>

        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
          {/* Left Side - Profile Card */}
          <div className="lg:w-1/4 border-r-2 h-full">
            <UserProfileCard
              name={userData.name}
              balance={userData.balance}
              rating={userData.rating}
              avatarUrl={userData.avatarUrl}
              stats={userData.stats}
            />
          </div>

          {/* Right Side - Tabs */}
          <div className="flex-1 min-w-0">
            <UserDetailsTabs
              userId={userId}
              userData={{
                fullName: userData.fullName,
                email: userData.email,
                phone: userData.phone,
                address: userData.address,
                dob: userData.dob,
                due: userData.due,
                about: userData.about,
              }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
