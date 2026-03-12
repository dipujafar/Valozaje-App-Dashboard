"use client";

import { useState } from "react";
import DataTable from "@/utils/DataTable";
import { TableProps } from "antd";
import { Eye } from "lucide-react";
import { useGetReferralsQuery } from "@/redux/api/referralsApi";
import { useSearchParams } from "next/navigation";
import ReferralsDetailsModal from "@/components/(adminDashboard)/modals/ReferralsDetailsModal";

type TReferral = {
  _id: string;
  referrerInfo: {
    fullName: string;
    email: string;
    referralCode: string;
    totalReferrals: number;
    activeReferrals: number;
  };
  referrals: any[];
  totalReferred: number;
};

export default function ReferralsTable() {
  const [open, setOpen] = useState(false);
  const [currentData, setCurrentData] = useState<TReferral | null>(null);

  const page = useSearchParams().get("page") || "1";
  const limit = useSearchParams().get("limit") || "10";

  const queries: Record<string, string> = {};
  if (page) queries.page = page;
  if (limit) queries.limit = limit;

  const { data } = useGetReferralsQuery(queries);

  const columns: TableProps<TReferral>["columns"] = [
    {
      title: "Serial",
      render: (_, __, index) => (
        <p>
          {`# ${
            Number(page) === 1
              ? index + 1
              : (Number(page) - 1) * Number(limit) + index + 1
          }`}
        </p>
      ),
    },

    {
      title: "Referrer Name",
      render: (_, record) => <p>{record?.referrerInfo?.fullName || "N/A"}</p>,
    },

    {
      title: "Email",
      render: (_, record) => <p>{record?.referrerInfo?.email || "N/A"}</p>,
    },

    {
      title: "Referral Code",
      render: (_, record) => (
        <p>{record?.referrerInfo?.referralCode || "N/A"}</p>
      ),
    },

    {
      title: "Total Referred",
      dataIndex: "totalReferred",
      render: (text) => <p>{text}</p>,
    },

    {
      title: "Action",
      render: (_, record) => (
        <div
          onClick={() => {
            setOpen(true);
            setCurrentData(record);
          }}
          className="bg-[#EAF6EC] px-2 py-1 rounded-lg w-fit flex gap-x-2 items-center text-[#24983F] cursor-pointer"
        >
          <Eye size={20} />
          <span>View</span>
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={data?.data?.referrals}
        pageSize={Number(limit)}
        total={data?.data?.pagination?.total}
      />

      <ReferralsDetailsModal
        open={open}
        setOpen={setOpen}
        data={currentData}
      />
    </>
  );
}