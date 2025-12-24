"use client";
import { Input } from 'antd'
import { Search, Star } from 'lucide-react'
import React from 'react'
import DataTable from '@/utils/DataTable'
import { Image as AntImage, TableProps } from "antd";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from '@/lib/utils';

type TDataType = {
    key?: number;
    serial: number;
    name: string;
    submittedOn: string;
    number: string;
    email: string;
    status: string;
    trip: string;
    travel: string;
};

const data: TDataType[] = Array.from({ length: 8 }).map((_, inx) => ({
    key: inx,
    serial: inx + 1,
    name: "Gloirepaluku",
    submittedOn: "15-12/2025",
    number: "+01222222",
    email: "you@gmail.com",
    status: inx % 2 === 0 ? "Pending" : "Approved",
    trip: "12",
    travel: "225.55",
}));

export default function ApprovalTable() {
    const router = useRouter();
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
            title: "Submitted On",
            dataIndex: "submittedOn",
            align: "center",
        },
        {
            title: "Number",
            dataIndex: "number",
            align: "center",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (text) => <div className={cn("text-[#24983F] w-fit px-3 py-1 bg-[#EAF6EC] rounded-md", text === "Pending" && "text-[#8C7000] bg-[#FFFAE6] ")}>{text}</div>,
        },

        {
            title: "Action",
            dataIndex: "action",
            render: (_, record) => (
                <div onClick={() => router.push(`/approval/approval-details`)} className='bg-[#EAF6EC] px-2 py-1 rounded-lg w-fit flex gap-x-2 items-center text-[#24983F] cursor-pointer'>
                    <Eye size={20} color="#24983F"  className="cursor-pointer" />
                    <span>View</span>
                </div>
            ),
        },
    ];
    return (
        <div className='space-y-10'>
            <Input prefix={<Search color='#686868' size={18} />} type='text' placeholder='Search passengers by name,email, or phone....' className='!border-[#B9B9B9] h-[40px]' />
            <DataTable columns={columns} data={data} pageSize={40}></DataTable>
        </div>
    )
}
