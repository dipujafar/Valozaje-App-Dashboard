import { Card } from 'antd'
import React from 'react'
import UsersTable from './_components/UsersTable'

export default function UserPage() {
    return (
        <Card className='shadow-[0_0_10px_0_rgba(0,0,0,0.2)]'>
            <div className='space-y-2'>
                <h1 className='lg:text-3xl text-xl font-medium'>User List</h1>
                <p className='lg:text-2xl text-base'>Search and manage user accounts</p>
                <UsersTable />
            </div>
        </Card>
    )
}
