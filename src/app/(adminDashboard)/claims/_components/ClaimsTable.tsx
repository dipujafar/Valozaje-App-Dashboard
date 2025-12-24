"use client";
import { Input } from 'antd'
import { Search } from 'lucide-react'
import React, { useState } from 'react'
import DataTable from '@/utils/DataTable'
import { Image as AntImage, TableProps } from "antd";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from '@/lib/utils';
import ClaimDetailsModal from '@/components/(adminDashboard)/modals/ClaimDetailsModal';

type TDataType = {
    key?: number;
    serial: number;
    name: string;
    against: string;
    role: string;
    date: string;
};

const data: TDataType[] = Array.from({ length: 5 }).map((_, inx) => ({
    key: inx,
    serial: inx + 1,
    name: "Gloirepaluku",
    against: "Mr. Nasiru Gloirepaluku",
    role: inx % 2 === 0 ? "Driver" : "Passenger",
    date: "15-12/2025",
}));

export default function ClaimsTable() {
    const [open, setOpen] = useState(false);
    const columns: TableProps<TDataType>["columns"] = [
        {
            title: "Driver",
            dataIndex: "name",
            render: (text) => <div className="flex  items-center gap-x-2">
                <AntImage src={"/client_dummy_image.png"} alt="e-book_image" width={50} height={50} className="object-cover rounded-full" />
                <p>{text}</p>
            </div>
        },
        {
            title: "Against",
            dataIndex: "against",
            render: (text) => <div className="flex  items-center gap-x-2">
                <AntImage src={"/client_dummy_image.png"} alt="e-book_image" width={50} height={50} className="object-cover rounded-full" />
                <p>{text}</p>
            </div>
        },
        {
            title: "Role",
            dataIndex: "role",
            render: (text) => <div className={cn("text-[#003D8C] w-fit px-3 py-1 bg-[#E6F3FF] rounded-md", text === "Passenger" && "text-[#8C0079] bg-[#FEE6FF] ")}>{text}</div>,
        },
        {
            title: "Date",
            dataIndex: "date",
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (_, record) => (
                <div onClick={() => setOpen(true)} className='bg-[#EAF6EC] px-2 py-1 rounded-lg w-fit flex gap-x-2 items-center text-[#24983F]'>
                    <Eye size={20} color="#24983F" className="cursor-pointer" />
                    <span>View</span>
                </div>
            ),
        },
    ];
    return (
        <>
            <div className='space-y-10'>
                <Input prefix={<Search color='#686868' size={18} />} type='text' placeholder='Search passengers by name,email, or phone....' className='!border-[#B9B9B9] h-[40px]' />
                <DataTable columns={columns} data={data} pageSize={40}></DataTable>
            </div>
            <ClaimDetailsModal open={open} setOpen={setOpen} />
        </>
    )
}
