"use client"
import AddClaimSubjectModal from '@/components/(adminDashboard)/modals/AddClaimSubjectModal'
import { useDeleteReportMutation, useGetReportSubjectQuery } from '@/redux/api/reportsApi'
import { Button, Popconfirm, Spin } from 'antd'
import { Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'


export default function ManageClaimSubjects() {
    const [title, setTitle] = useState("");
    const [open, setOpen] = useState(false);
    const { data, isLoading } = useGetReportSubjectQuery(undefined);
    const [deleteSubject] = useDeleteReportMutation();

    const confirm = async (id: string) => {
        try {
            await deleteSubject(id).unwrap();
            toast.success("Claim subject deleted successfully");
        } catch (error) {
            toast.error("Failed to delete claim subject");
        }
    };


    return (
        <div>
            <div className='flex justify-between items-center'>
                <h1 className='lg:text-3xl text-xl font-medium'>Manage Claim Subjects</h1>
                <Button onClick={() => { setOpen(true); setTitle("Add Claim Subject") }} icon={<Plus />} type='primary'>Add Subject</Button>
            </div>
            <div className='space-y-4 mt-5'>
                {isLoading ? <div className='flex justify-center items-center'><Spin /></div> :
                    data?.data?.map((subject: any) => (
                        <div className='flex justify-between items-center shadow-[0_0_5px_0_rgba(0,0,0,0.2)] rounded-md py-5 px-5'>
                            <p className='font-medium'>{subject?.title}</p>
                            <div className='flex items-center gap-x-2'>
                                {/* <Button onClick={() => { setOpen(true); setTitle("Edit Claim Subject") }} type='primary'><SquarePen /></Button> */}

                                <Popconfirm
                                    title="Delete the subject"
                                    description="Are you sure to delete this claim subject?"
                                    onConfirm={() => confirm(subject?._id)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button type='primary' danger>
                                        <Trash2 />
                                    </Button>
                                </Popconfirm>

                            </div>
                        </div>
                    ))
                }
            </div>
            <AddClaimSubjectModal open={open} setOpen={setOpen} title={title} />
        </div>
    )
}
