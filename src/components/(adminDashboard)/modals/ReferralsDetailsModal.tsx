"use client";

import { Modal, Table } from "antd";
import { useEffect, useState } from "react";

const ReferralsDetailsModal = ({
  open,
  setOpen,
  data,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: any;
}) => {
  const [currentData, setCurrentData] = useState<any[]>([]);

  useEffect(() => {
    if (data?.referrals) {
      setCurrentData(data.referrals);
    }
  }, [data]);

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Roles",
      render: (_: any, record: any) => (
        <span>{record.roles?.join(", ")}</span>
      ),
    },
    {
      title: "Referral Code Used",
      dataIndex: "referralCodeUsed",
      render: (value: boolean) => (value ? "Yes" : "No"),
    },
    {
      title: "First Trip Completed",
      dataIndex: "firstTripCompleted",
      render: (value: boolean) => (value ? "Yes" : "No"),
    },
  ];

  return (
    <Modal
      open={open}
      footer={null}
      centered
      onCancel={() => setOpen(false)}
      width={800}
    >
      <h2 className="text-lg font-semibold mb-5">Referral Details</h2>

      <Table
        columns={columns}
        dataSource={currentData}
        pagination={false}
        rowKey="_id"
      />
    </Modal>
  );
};

export default ReferralsDetailsModal;