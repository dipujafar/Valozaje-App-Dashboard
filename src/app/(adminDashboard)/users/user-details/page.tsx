import React from 'react'
import UserDetails from './_components/UserDetails'
import { Card } from 'antd'

export default function UserDetailsPage() {
    return (
        <Card className='shadow-[0_0_10px_0_rgba(0,0,0,0.2)]'>
            <UserDetails />
        </Card>
    )
}
