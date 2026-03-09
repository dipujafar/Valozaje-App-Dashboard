"use client";
import React from 'react'
import { ProfileCard } from './_components/ProfileCard'
import { AccountSummary } from './_components/AccountSummary'
import RideHistoryTable from './_components/RideHistoryTable'
import { useGetCommissionDetailsQuery } from '@/redux/api/commissionApi'
import { useSearchParams } from 'next/navigation';
import { Spin } from 'antd';
import { imagePreview } from '@/utils/imagePreview';


export default function CommissionsPage() {
    const id = useSearchParams().get('driver');
    const { data, isLoading } = useGetCommissionDetailsQuery(id, { skip: !id });

    if(isLoading) return <div className='h-[calc(100vh-150px)] flex justify-center items-center'><Spin size="large" /></div>;
    return (
        <div className='space-y-5'>
            <div className="grid gap-6 md:grid-cols-[400px_1fr] lg:gap-8">
                <ProfileCard
                    name={data?.data?.driver?.fullName || "N/A"}
                    rating={data?.data?.driver?.averageRating || 0}
                    isActive={data?.data?.driver?.isActive || false}
                    phone={data?.data?.driver?.phone || "N/A"}
                    email={data?.data?.driver?.email || "N/A"}
                    location={data?.data?.driver?.address || "N/A"}
                    avatarUrl={imagePreview(data?.data?.driver?.image)}
                />
                <AccountSummary
                    totalNetEarnings={data?.data?.accountSummary?.totalNetEarnings || 0}
                    lifetimeCommissionPaid={data?.data?.accountSummary?.lifetimeCommissionPaid || 0}
                    commissionDue={data?.data?.accountSummary?.commissionDue || 0}
                    currentProgress={data?.data?.thresholdProgress?.current || 0}
                    targetProgress={data?.data?.thresholdProgress?.threshold || 0}
                />
            </div>
            <RideHistoryTable data={data?.data?.rideHistory} />
        </div>
    )
}
