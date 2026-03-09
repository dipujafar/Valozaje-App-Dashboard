
import { Card } from 'antd'
import React from 'react'
import ClaimsTable from './_components/ClaimsTable'
import ManageClaimSubjects from './_components/ManageClaimSubjects'
export default function ClaimsPage() {
   
    return (
        <div className='space-y-7'>
            <Card className='shadow-[0_0_10px_0_rgba(0,0,0,0.2)]'>
                <div className='space-y-2'>
                    <h1 className='lg:text-3xl text-xl font-medium'>Claim Report</h1>
                    <ClaimsTable />
                </div>
            </Card>
            <Card className='shadow-[0_0_10px_0_rgba(0,0,0,0.2)]'>
                <ManageClaimSubjects />
            </Card>
        </div>

    )
}
