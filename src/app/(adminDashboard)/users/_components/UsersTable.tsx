"use client";
import DataTable from '@/utils/DataTable'
import { Input } from 'antd'
import { Search, Star } from 'lucide-react'
import React from 'react'
import { Image as AntImage, TableProps } from "antd";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from 'next/link';

type TDataType = {
    key?: number;
    serial: number;
    name: string;
    earned: string;
    commission: string;
    vehicle: string;
    due: string;
    trip: string;
    travel: string;
    rating: string;
};

const data: TDataType[] = Array.from({ length: 8 }).map((_, inx) => ({
    key: inx,
    serial: inx + 1,
    name: "Gloirepaluku",
    earned: "2666",
    commission: "150",
    vehicle: "Toyota Camry 2022",
    due: "66",
    trip: "12",
    travel: "225.55",
    rating: "4.8",
}));


export default function UsersTable() {
    const router = useRouter();
    const columns: TableProps<TDataType>["columns"] = [
        {
            title: "Name",
            dataIndex: "name",
            render: (text) => <div className="flex  items-center gap-x-2">
                <AntImage src={"/user_image.png"} alt="e-book_image" width={50} height={50} className="object-cover rounded-full" />
                <p>{text}</p>
            </div>
        },
        {
            title: "Vehicle",
            dataIndex: "vehicle",
        },
        {
            title: "Due",
            dataIndex: "due",
            render: (text) => <p>${text}</p>,
        },
        {
            title: "Trip",
            dataIndex: "trip",
        },
        {
            title: "Travel",
            dataIndex: "travel",
            render: (text) => <p className='text-main-color'>${text}</p>,
        },
        {
            title: "Rating",
            dataIndex: "rating",
            render: (text) => <div className='flex items-center gap-x-0.5'>
                <span>{text}</span>
                <Star size={18} fill="#FFCC00" className="text-[#FFCC00]" />
            </div>
        },


        {
            title: "Action",
            dataIndex: "action",
            render: (_, record) => (
                <Link href={"/users/user-details"} className='bg-[#EAF6EC] px-2 py-1 rounded-lg w-fit flex gap-x-2 items-center text-[#24983F]'>
                    <Eye size={20} color="#24983F" onClick={() => router.push(`/book-management/add-book`)} className="cursor-pointer" />
                    <span>View</span>
                </Link>
            ),
        },
    ];
    return (
        <div className='space-y-5'>
            <Input prefix={<Search color='#686868' size={18} />} type='text' placeholder='Search by name,email, or phone....' className='!border-[#B9B9B9] h-[40px]' />
            <DataTable columns={columns} data={data} pageSize={40}></DataTable>
        </div>
    )
}
