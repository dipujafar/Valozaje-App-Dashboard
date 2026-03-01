"use client";
import { Input, Table } from "antd";
import { Search, Star } from "lucide-react";
import React, { useState, useMemo, useEffect } from "react";
import { Image as AntImage, TableProps } from "antd";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useGetVehiclesQuery } from "@/redux/api/vehicleApi";

type TDataType = {
  key?: string;
  serial: number;
  name: string;
  submittedOn: string;
  number: string;
  email: string;
  status: string;
  vehicleType: string;
  brand: string;
  model: string;
  licensePlate: string;
  _id: string;
};

export default function ApprovalTable() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Debounce search term to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const {
    data: apiData,
    isLoading,
    isError,
  } = useGetVehiclesQuery({
    page,
    limit: pageSize,
    // status: "pending",
    search: debouncedSearch || undefined,
  });

  // Reset to page 1 when search changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  // Transform API data to table format
  const data: TDataType[] = useMemo(() => {
    if (!apiData?.data?.vehicles) return [];

    return apiData.data.vehicles.map((vehicle: any, index: number) => ({
      key: vehicle._id,
      serial: (page - 1) * pageSize + index + 1,
      name: vehicle.user?.fullName || "N/A",
      submittedOn: new Date(vehicle.submittedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
      number: vehicle.user?.phone || "N/A",
      email: vehicle.user?.email || "N/A",
      status: vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1),
      vehicleType: vehicle.vehicleType,
      brand: vehicle.brand,
      model: vehicle.vehicleModel,
      licensePlate: vehicle.licensePlateNumber,
      _id: vehicle._id,
    }));
  }, [apiData, page, pageSize]);
  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "#",
      dataIndex: "serial",
      align: "center",
      width: 60,
    },
    {
      title: "Driver",
      dataIndex: "name",
      render: (text, record) => (
        <div className="flex items-center gap-x-2">
          <AntImage
            src={"/client_dummy_image.png"}
            alt="driver_image"
            width={50}
            height={50}
            className="object-cover rounded-full"
          />
          <div>
            <p className="font-medium">{text}</p>
            <p className="text-xs text-gray-500">{record.vehicleType}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Vehicle",
      dataIndex: "brand",
      render: (text, record) => (
        <div>
          <p>
            {text} {record.model}
          </p>
          <p className="text-xs text-gray-500">{record.licensePlate}</p>
        </div>
      ),
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
      render: (text) => (
        <div
          className={cn(
            "text-[#24983F] w-fit px-3 py-1 bg-[#EAF6EC] rounded-md",
            text === "Pending" && "text-[#8C7000] bg-[#FFFAE6] ",
          )}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <div
          onClick={() =>
            router.push(`/approval/approval-details/${record._id}`)
          }
          className="bg-[#EAF6EC] px-2 py-1 rounded-lg w-fit flex gap-x-2 items-center text-[#24983F] cursor-pointer"
        >
          <Eye size={20} color="#24983F" className="cursor-pointer" />
          <span>View</span>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-10">
        <Input
          prefix={<Search color="#686868" size={18} />}
          type="text"
          placeholder="Search by driver name, email, or phone...."
          className="!border-[#B9B9B9] h-[40px]"
          disabled
        />
        <div className="flex justify-center items-center h-[400px]">
          <div className="text-muted-foreground">Loading vehicles...</div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-10">
        <Input
          prefix={<Search color="#686868" size={18} />}
          type="text"
          placeholder="Search by driver name, email, or phone...."
          className="!border-[#B9B9B9] h-[40px]"
          disabled
        />
        <div className="flex justify-center items-center h-[400px]">
          <div className="text-red-500">
            Failed to load vehicles. Please try again.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <Input
        prefix={<Search color="#686868" size={18} />}
        type="text"
        placeholder="Search by driver name, email, or phone...."
        className="!border-[#B9B9B9] h-[40px]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        allowClear
      />
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        scroll={{ x: "max-content" }}
        pagination={{
          current: page,
          pageSize: pageSize,
          total: apiData?.data?.pagination?.total || 0,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          pageSizeOptions: ["5", "10", "20", "50"],
          onChange: (newPage, newPageSize) => {
            setPage(newPage);
            if (newPageSize !== pageSize) {
              setPageSize(newPageSize);
              setPage(1); // Reset to first page when page size changes
            }
          },
        }}
      />
    </div>
  );
}
