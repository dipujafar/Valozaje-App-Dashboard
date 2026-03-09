"use client";
import DataTable from '@/utils/DataTable'
import { Input } from 'antd'
import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { Image as AntImage, TableProps } from "antd";
import { Eye } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import ThresholdProgress from '@/components/shared/ThresholdProgress';
import { useGetCommissionQuery } from '@/redux/api/commissionApi';
import { imagePreview } from '@/utils/imagePreview';
import { useDebounce } from "use-debounce";
import Link from 'next/link';


type TDataType = {
    key?: number;
    serial: number;
    driverName: string;
    driverEmail: string;
    earned: string;
    commission: string;
    driverImage: string;
    thresholdProgress:{
        current: number;
        percentage: number;
        threshold: number;
    }
};

export default function CommissionTable() {
    const page = useSearchParams().get("page") || "1";
    const limit = useSearchParams().get("limit") || "10";
    const [searchText, setSearchText] = useState("");
    const [searchValue] = useDebounce(searchText, 500);

    //  set queries
    const queries: Record<string, string> = {};
    if (page) queries.page = page;
    if (limit) queries.limit = limit;
    if (searchValue) queries.search = searchValue;
    const { data: commissionData, isLoading } = useGetCommissionQuery(queries);
    
    const columns: TableProps<TDataType>["columns"] = [
        {
            title: "Name",
            dataIndex: "driverName",
            render: (text, record) => <div className="flex  items-center gap-x-2 max-w-md">
                {record.driverImage ? <AntImage src={imagePreview(record?.driverImage)} alt="e-book_image" width={50} height={50} className="object-cover rounded-full" /> : <div className='size-[50px] bg-gray-200 rounded-full flex items-center justify-center font-medium text-xl'>{text?.charAt(0) || "N"}</div>}
                <p>{text || "N/A"}</p>
            </div>
        },
        {
            title: "Email",
            dataIndex: "driverEmail",
            render: (text) => <p>{text || "N/A"}</p>,
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
            render: (_,rec) => <div>
                <ThresholdProgress current={rec?.thresholdProgress?.current} total={rec?.thresholdProgress?.threshold} />
            </div>,
        },
        {
            title: "Action",
            dataIndex: "driver",
            render: (driver) => (
                <Link href={`/commissions/commissions-details?driver=${driver}`}  className='bg-[#EAF6EC] px-2 py-1 rounded-lg w-fit flex gap-x-2 items-center text-[#24983F] cursor-pointer'>
                    <Eye size={22} color="#24983F" className="cursor-pointer" />
                    <span>View</span>
                </Link>
            ),
        },
    ];
    return (
        <div className='space-y-5'>
            <Input value={searchText} onChange={(e) => setSearchText(e.target.value)} prefix={<Search color='#686868' size={18} />} type='text' placeholder='Search here....' className='!border-[#B9B9B9] h-[40px]' />
            <DataTable columns={columns} data={commissionData?.data?.drivers} isLoading={isLoading} pageSize={Number(limit)} total={commissionData?.data?.pagination?.total}></DataTable>
        </div>
    )
}
