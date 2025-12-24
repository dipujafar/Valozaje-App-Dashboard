import { Card } from 'antd'
import React from 'react'
import CommissionTable from './_components/CommissionTable'
import CommissionStatistic from './_components/CommissionStatistic'

export default function CommissionPage() {
    return (
        <div className='space-y-8'>
            <CommissionStatistic />
            <Card  className='shadow-[0_0_10px_0_rgba(0,0,0,0.2)]'>
                <div className='space-y-2'>
                    <div className='flex gap-x-5 items-center'>
                        <h1 className='lg:text-3xl text-xl font-medium'>User Payment List</h1>
                        <p className='text-sm bg-[#EAF6EC] text-[#1C7731] w-fit px-2 py-1 rounded-md'>Commission Rate 10%</p>
                    </div>
                    <CommissionTable />
                </div>
            </Card>
        </div>
    )
}
