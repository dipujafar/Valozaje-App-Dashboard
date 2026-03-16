"use client";
import { RiCloseLargeLine } from "react-icons/ri";
import { useState } from "react"
import { Form, Input, Button, Upload, message, Modal } from "antd"
import { CloudUploadOutlined } from "@ant-design/icons"
import type { UploadProps } from "antd"

const { Dragger } = Upload

interface PlatformFormValues {
    name: string
    platformLink: string
}


const AddPlatformModal = ({
    open,
    setOpen,
    title
}: {
    open: boolean;
    setOpen: (collapsed: boolean) => void;
    title?: string
}) => {

    const [form] = Form.useForm()
    const [fileList, setFileList] = useState<any[]>([])

    const uploadProps: UploadProps = {
        name: "file",
        multiple: false,
        fileList,
        beforeUpload: (file) => {
            const isImage = file.type.startsWith("image/")
            if (!isImage) {
                message.error("You can only upload image files!")
                return false
            }
            const isLt8M = file.size / 1024 / 1024 < 8
            if (!isLt8M) {
                message.error("Image must be smaller than 8MB!")
                return false
            }
            setFileList([file])
            return false
        },
        onRemove: () => {
            setFileList([])
        },
        accept: "image/*,image/png,image/jpeg,image/jpg",
    }

    const onFinish = (values: PlatformFormValues) => {
        console.log("Form values:", values)
        console.log("Uploaded files:", fileList)
        // message.success("Platform added successfully!")
        form.resetFields()
        setFileList([])
    }

    return (
        <Modal
            open={open}
            footer={null}
            centered={true}
            onCancel={() => setOpen(false)}
            closeIcon={false}
            style={{
                minWidth: "max-content",
                position: "relative",
            }}
        >
            <div>
                <div className="flex justify-between items-center">
                    <div></div>
                    <div
                        className="size-8 bg-transparent border border-red-500 hover:bg-red-600   rounded-full flex justify-center items-center cursor-pointer group duration-500"
                        onClick={() => setOpen(false)}
                    >
                        <RiCloseLargeLine
                            size={14}
                            className="text-red-600 group-hover:text-red-100 group"
                        />
                    </div>
                </div>
                <div className="w-full">
                    <h2 className="text-xl font-semibold text-center mb-6">Add New Platform</h2>

                    <Form form={form} layout="vertical" onFinish={onFinish}>
                        <Form.Item label={<span className="text-sm font-medium text-gray-700">Course Thumbnail</span>}>
                            <Dragger {...uploadProps} className="">
                                <div className="py-2">
                                    <CloudUploadOutlined className="!text-6xl !text-gray-400 mb-3" />
                                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                                    <p className="text-xs text-gray-400 mt-1">PNG, JPG </p>
                                </div>
                            </Dragger>
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-sm font-medium text-gray-700">Name</span>}
                            name="name"
                            rules={[{ required: true, message: "Please enter the platform name" }]}
                        >
                            <Input placeholder="Enter Platform Name" className="!h-11 !rounded-md" />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-sm font-medium text-gray-700">Platform Link/Number</span>}
                            name="platformLink"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter the platform link or number",
                                },
                            ]}
                        >
                            <Input placeholder="Enter Platform link" className="!h-11 !rounded-md" />
                        </Form.Item>

                        <Form.Item className="mb-0">
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="w-full !h-12 !bg-[#22c55e] hover:!bg-[#16a34a] !text-white !text-base !font-medium !rounded-lg"
                            >
                                Add
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Modal>
    );
};

export default AddPlatformModal;
