"use client";
import { Input, Table, TableProps } from "antd";
import { Search, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Image as AntImage } from "antd";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGetUsersQuery } from "@/redux/api/usersApi";
import {
  transformUsersForTable,
  formatVehicleInfo,
} from "@/utils/userTransformers";

type VehicleType = {
  _id: string;
  brand?: string;
  vehicleModel?: string;
  vehicleType?: string;
  year?: number;
  licensePlateNumber?: string;
} | null;

type TDataType = {
  key: string;
  serial: number;
  _id: string;
  name: string;
  image: string;
  earned: number;
  commission: number;
  vehicle: VehicleType;
  due: number;
  trip: number;
  travel: number;
  rating: number | null;
};

export default function UsersTable() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to page 1 when search changes
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const {
    data: apiData,
    isLoading,
    isError,
  } = useGetUsersQuery({
    page,
    limit,
    search: debouncedSearch,
  });

  const users = apiData?.data?.users || [];
  const pagination = apiData?.data?.pagination || {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  };
  console.log("users:", users);
  // Map API data to table format using utility function
  const data: TDataType[] = transformUsersForTable(users, page, limit);
  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "Serial",
      dataIndex: "serial",
      key: "serial",
      width: 80,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center gap-x-2">
          <AntImage
            src={record.image}
            alt="user_image"
            width={50}
            height={50}
            className="object-cover rounded-full"
            fallback="/user_image.png"
          />
          <p>{text}</p>
        </div>
      ),
    },
    {
      title: "Vehicle",
      dataIndex: "vehicle",
      key: "vehicle",
      render: (vehicle) => <p>{formatVehicleInfo(vehicle)}</p>,
    },
    {
      title: "Due",
      dataIndex: "due",
      key: "due",
      render: (text) => <p>${text.toFixed(2)}</p>,
    },
    {
      title: "Trip",
      dataIndex: "trip",
      key: "trip",
    },
    {
      title: "Travel",
      dataIndex: "travel",
      key: "travel",
      render: (text) => <p className="text-main-color">${text.toFixed(2)}</p>,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (text) => (
        <div className="flex items-center gap-x-0.5">
          <span>{text !== null ? text.toFixed(1) : "N/A"}</span>
          {text !== null && (
            <Star size={18} fill="#FFCC00" className="text-[#FFCC00]" />
          )}
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Link
          href={`/users/user-details/${record._id}`}
          className="bg-[#EAF6EC] px-2 py-1 rounded-lg w-fit flex gap-x-2 items-center text-[#24983F]"
        >
          <Eye size={20} color="#24983F" className="cursor-pointer" />
          <span>View</span>
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <Input
        prefix={<Search color="#686868" size={18} />}
        type="text"
        placeholder="Search by name, email, or phone...."
        className="!border-[#B9B9B9] h-[40px]"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        allowClear
      />
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        pagination={{
          current: page,
          pageSize: limit,
          total: pagination.total,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50"],
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} users`,
          onChange: (newPage, newPageSize) => {
            setPage(newPage);
            if (newPageSize !== limit) {
              setLimit(newPageSize);
              setPage(1);
            }
          },
        }}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
}
