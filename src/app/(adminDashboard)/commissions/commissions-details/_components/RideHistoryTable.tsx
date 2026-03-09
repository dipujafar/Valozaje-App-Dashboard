"use client";
import DataTable from '@/utils/DataTable'
import { Card } from 'antd'
import { ArrowRight } from 'lucide-react'
import React from 'react'
import { Image as AntImage, TableProps } from "antd";
import { cn } from '@/lib/utils';
import moment from 'moment'
import { imagePreview } from '@/utils/imagePreview';


type TDataType = {
    key?: number;
    serial: number;
    passengerName: string;
    passengerImage: string;
    date: string;
    fare: string;
    commission: string;
    status: string;
    route: {
        from: string;
        to: string;
    }
};



export default function RideHistoryTable({ data }: any) {
    console.log(data)
    const columns: TableProps<TDataType>["columns"] = [
        {
            title: "Name",
            dataIndex: "passengerName",
            render: (text, record) => <div className="flex  items-center gap-x-2 max-w-md">
                {record.passengerImage ? <AntImage src={imagePreview(record?.passengerImage)} alt="e-book_image" width={50} height={50} className="object-cover rounded-full" /> : <div className='size-[50px] bg-gray-200 rounded-full flex items-center justify-center font-medium text-xl'>{text?.charAt(0) || "N"}</div>}
                <p>{text || "N/A"}</p>
            </div>
        },
        {
            title: "Date",
            dataIndex: "date",
            render: (text) => <p>{moment(text).format("ll")}</p>,
        },
        {
            title: "Route",
            render: (text, record) => <p className='flex gap-x-5 max-w-[400px] items-center '>{record?.route?.from}  <ArrowRight size={20} /> {record?.route?.to}</p>,
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
            dataIndex: "status",
            render: (text, record) => (
                <div className={cn("text-[#24983F] w-fit px-3 py-1 bg-[#EAF6EC] rounded-md capitalize", text != "completed" && "text-[#8C7000] bg-[#FFFAE6] ")}>{text}</div>
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
