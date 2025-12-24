"use client";
import DataTable from '@/utils/DataTable'
import { Card, Input } from 'antd'
import { ArrowRight, Search } from 'lucide-react'
import React from 'react'
import { Image as AntImage, TableProps } from "antd";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import ThresholdProgress from '@/components/shared/ThresholdProgress';
import { cn } from '@/lib/utils';


type TDataType = {
    key?: number;
    serial: number;
    name: string;
    date: string;
    location: string;
    destination: string;
    fare: string;
    commission: string;
    payment: string;
};

const data: TDataType[] = Array.from({ length: 8 }).map((_, inx) => ({
    key: inx,
    serial: inx + 1,
    name: "Gloirepaluku",
    date: "22-08-2025",
    commission: "150",
    location: "City 1",
    destination: "City 2",
    fare: "500",
    payment: inx % 2 === 0 ? "Paid" : "Due",
}));



export default function RideHistoryTable() {
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
            title: "Date",
            dataIndex: "date",
        },
        {
            title: "Route",
            dataIndex: "commission",
            render: (text, record) => <p className='flex gap-x-5'>{record.location}  <ArrowRight size={20} /> {record.destination}</p>,
        },
        {
            title: "Fare",
            dataIndex: "fare",
            render: (text) => <p>${text}</p>,
        },
        {
            title: "Commission",
            dataIndex: "commission",
            render: (text) => <p>${text}</p>,
        },
        {
            title: "Payment",
            dataIndex: "payment",
            render: (text, record) => (
                <div className={cn("text-[#24983F] w-fit px-3 py-1 bg-[#EAF6EC] rounded-md", text === "Due" && "text-[#8C7000] bg-[#FFFAE6] ")}>{text}</div>
            ),
        },
    ];
    return (
        <Card className='space-y-5 shadow-[0_0_10px_0_rgba(0,0,0,0.2)]'>
            <h5 className='lg:text-3xl text-2xl font-medium text-text-color mb-5'>Ride History</h5>
            <DataTable columns={columns} data={data} pageSize={40}></DataTable>
        </Card>
    )
}
