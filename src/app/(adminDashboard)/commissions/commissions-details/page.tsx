import React from 'react'
import { ProfileCard } from './_components/ProfileCard'
import { AccountSummary } from './_components/AccountSummary'
import RideHistoryTable from './_components/RideHistoryTable'

export default function CommissionsPage() {
    return (
        <div className='space-y-5'>
            <div className="grid gap-6 md:grid-cols-[400px_1fr] lg:gap-8">
                <ProfileCard
                    name="Alex Johnson"
                    rating={4.5}
                    status="Active"
                    phone="+12222222"
                    email="Alex@gmail.com"
                    location="California"
                    avatarUrl="/images/image.png"
                />
                <AccountSummary
                    totalNetEarnings={583.0}
                    lifetimeCommissionPaid={583.0}
                    commissionDue={583.0}
                    currentProgress={65}
                    targetProgress={200}
                />
            </div>
            <RideHistoryTable />
        </div>
    )
}
