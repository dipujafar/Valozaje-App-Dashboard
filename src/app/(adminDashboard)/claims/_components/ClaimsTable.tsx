"use client";
import { Input } from 'antd'
import { Search } from 'lucide-react'
import React, { useState } from 'react'
import DataTable from '@/utils/DataTable'
import { Image as AntImage, TableProps } from "antd";
import { Eye } from "lucide-react";
import { useSearchParams } from "next/navigation";
import ClaimDetailsModal from '@/components/(adminDashboard)/modals/ClaimDetailsModal';
import { useGetReportsQuery } from '@/redux/api/reportsApi';
import { imagePreview } from '@/utils/imagePreview';
import moment from 'moment';
import { useDebounce } from "use-debounce";


type TDataType = {
    key?: number;
    reporter: {
        fullName: string;
        image: string;
    }
    reportedUser: {
        fullName: string;
        image: string;
    }
    createdAt: string;
};



export default function ClaimsTable() {
    const [open, setOpen] = useState(false);
    const [currentData, setCurrentData] = useState<TDataType | null>(null);

    const page = useSearchParams().get("page") || "1";
    const limit = useSearchParams().get("limit") || "6";
    // const [searchText, setSearchText] = useState("");
    // const [searchValue] = useDebounce(searchText, 500);

    //  set queries
    const queries: Record<string, string> = {};
    if (page) queries.page = page;
    if (limit) queries.limit = limit;
    // if (searchValue) queries.search = searchValue;

    const { data: reportData } = useGetReportsQuery(queries);

    const columns: TableProps<TDataType>["columns"] = [
        {
            title: "Serial",
            render: (_, __, index) => <p>
                {
                    `# ${Number(page) === 1
                        ? index + 1
                        : (Number(page) - 1) * Number(limit) + index + 1
                    }`}
            </p>,
        },
        {
            title: "Driver",
            render: (_, record) => <div className="flex  items-center gap-x-2 max-w-md">
                {record.reporter?.image ? <AntImage src={imagePreview(record?.reporter?.image)} alt="e-book_image" width={50} height={50} className="object-cover rounded-full" /> : <div className='size-[50px] bg-gray-200 rounded-full flex items-center justify-center font-medium text-xl'>{record?.reporter?.fullName?.charAt(0) || "N"}</div>}
                <p>{record?.reporter?.fullName || "N/A"}</p>
            </div>
        },
        {
            title: "Against",
            dataIndex: "against",
            render: (_, record) => <div className="flex  items-center gap-x-2 max-w-md">
                {record.reportedUser?.image ? <AntImage src={imagePreview(record?.reportedUser?.image)} alt="e-book_image" width={50} height={50} className="object-cover rounded-full" /> : <div className='size-[50px] bg-gray-200 rounded-full flex items-center justify-center font-medium text-xl'>{record?.reportedUser?.fullName?.charAt(0) || "N"}</div>}
                <p>{record?.reportedUser?.fullName || "N/A"}</p>
            </div>
        },
        {
            title: "Date",
            dataIndex: "createdAt",
            render: (text) => <p>{moment(text).format("ll")}</p>,
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (_, record) => (
                <div onClick={() => { setOpen(true); setCurrentData(record) }} className='bg-[#EAF6EC] px-2 py-1 rounded-lg w-fit flex gap-x-2 items-center text-[#24983F]'>
                    <Eye size={20} color="#24983F" className="cursor-pointer" />
                    <span>View</span>
                </div>
            ),
        },
    ];
    return (
        <>
            <div className='space-y-10'>
                {/* <Input value={searchText} onChange={(e) => setSearchText(e.target.value)} prefix={<Search color='#686868' size={18} />} type='text' placeholder='Search here...' className='!border-[#B9B9B9] h-[40px]' /> */}
                <DataTable columns={columns} data={reportData?.data?.reports} pageSize={Number(limit)} total={reportData?.data?.pagination?.total}></DataTable>
            </div>
            <ClaimDetailsModal open={open} setOpen={setOpen} data={currentData} />
        </>
    )
}
