"use client";

import { useCreateMutation, useGetTermsQuery, useUpdateTermsMutation } from "@/redux/api/termsApi";
import { Button, Spin } from "antd";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import "react-quill/dist/quill.snow.css";
import { toast } from "sonner";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const TermsConditionsEditor = () => {
  const { data, isLoading } = useGetTermsQuery(undefined);
  const [updateTerms, { isLoading: isUpdating }] = useUpdateTermsMutation();
  const [create, { isLoading: isCreating }] = useCreateMutation();
  const [value, setValue] = useState(data?.data?.terms?.[0]?.content || '');


  const toolbarOptions = [
    ["image"],
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
  ];

  const moduleConest = {
    toolbar: toolbarOptions,
  };


  useEffect(() => {
    setValue(data?.data?.terms?.[0]?.content || '');
  }, [data]);


  const handleUpdateOrCreate = async () => {

    if (data?.data?.terms?.length === 0) {
      try {
        await create({ content: value });
      } catch (error) {
        toast.error("Failed to create terms and conditions");
      }
    }

    const updatedData = {
      data: { content: value },
      id: data?.data?.terms?.[0]?._id
    }

    try {
      await updateTerms(updatedData);
    } catch (error) {
      toast.error("Failed to update terms and conditions");
    }
  };


  if (isLoading) {
    return <div className="flex justify-center items-center h-[calc(100vh-200px)]"><Spin size="large" /></div>
  }


  return (
    <>
      <div className="flex items-center gap-2">
        <h4 className="text-2xl font-medium text-text-color">
          Terms & Conditions
        </h4>
      </div>
      <div className="mt-5 border rounded p-2">
        <ReactQuill
          modules={moduleConest}
          theme="snow"
          value={value}
          onChange={setValue}
          placeholder="Start writing ......"
          style={{
            // border: "1px solid #EFE8FD",
            marginTop: "20px",
            borderRadius: "10px",
          }}
        />
      </div>

      <Button
        size="large"
        block
        style={{
          marginTop: "20px",
          border: "none",
        }}
        disabled={isLoading || isUpdating || isCreating}
        loading={isUpdating || isCreating}
        onClick={handleUpdateOrCreate}
      >
        Save Changes
      </Button>
    </>
  );
};

export default dynamic(() => Promise.resolve(TermsConditionsEditor), {
  ssr: false,
});
