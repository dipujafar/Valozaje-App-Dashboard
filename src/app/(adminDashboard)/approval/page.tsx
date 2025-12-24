import { Card } from 'antd'
import ApprovalTable from './_components/ApprovalTable'


export default function ApprovalPage() {
    return (
        <Card className='shadow-[0_0_10px_0_rgba(0,0,0,0.2)]'>
            <div className='space-y-3'>
                <h1 className='lg:text-3xl text-xl font-medium'>Approval Queue</h1>
                <ApprovalTable />
            </div>
        </Card>
    )
}
