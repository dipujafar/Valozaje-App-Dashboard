"use client";
import DataTable from '@/utils/DataTable'
import { Input } from 'antd'
import { Search } from 'lucide-react'
import React from 'react'
import { Image as AntImage, TableProps } from "antd";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import ThresholdProgress from '@/components/shared/ThresholdProgress';


type TDataType = {
    key?: number;
    serial: number;
    name: string;
    earned: string;
    commission: string;

};

const data: TDataType[] = Array.from({ length: 8 }).map((_, inx) => ({
    key: inx,
    serial: inx + 1,
    name: "Gloirepaluku",
    earned: "2666",
    commission: "150",

}));



export default function CommissionTable() {
    const router = useRouter();
    const columns: TableProps<TDataType>["columns"] = [
        {
            title: "Name",
            dataIndex: "name",
            render: (text) => <div className="flex  items-center gap-x-2">
                <AntImage src={"/client_dummy_image.png"} alt="e-book_image" width={50} height={50} className="object-cover rounded-full" />
                <p>{text}</p>
            </div>
        },
        {
            title: "Earned",
            dataIndex: "earned",
            render: (text) => <p>${text}</p>,
        },
        {
            title: "Commission",
            dataIndex: "commission",
            render: (text) => <p>${text}</p>,
        },
        {
            title: "Threshold Progress",
            render: (_) => <div>
                <ThresholdProgress current={65} total={200} />
            </div>,
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (_, record) => (
                <div onClick={() => router.push(`/commissions/commissions-details`)} className='bg-[#EAF6EC] px-2 py-1 rounded-lg w-fit flex gap-x-2 items-center text-[#24983F] cursor-pointer'>
                    <Eye size={22} color="#24983F" className="cursor-pointer" />
                    <span>View</span>
                </div>
            ),
        },
    ];
    return (
        <div className='space-y-5'>
            <Input prefix={<Search color='#686868' size={18} />} type='text' placeholder='Search passengers by name,email, or phone....' className='!border-[#B9B9B9] h-[40px]' />
            <DataTable columns={columns} data={data} pageSize={40}></DataTable>
        </div>
    )
}
