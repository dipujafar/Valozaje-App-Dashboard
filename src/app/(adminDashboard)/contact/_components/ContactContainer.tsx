"use client"
import { Button, Image, Spin } from "antd";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import AddPlatformModal from "@/components/(adminDashboard)/modals/AddPlatformModal";
import {
    useDeleteContactPlatformMutation,
    useGetContactPlatformsQuery
} from "@/redux/api/contactPlatformsApi";
import { imagePreview } from "@/utils/imagePreview";

export default function ContactContainer() {
    const { data: platforms, isLoading } = useGetContactPlatformsQuery(undefined);
    const [deletePlatform] = useDeleteContactPlatformMutation();

    const [open, setOpen] = useState(false);

    const handleDelete = (id: string) => {
        toast("Delete Platform?", {
            description: "This action cannot be undone.",
            action: {
                label: "Delete",
                onClick: async () => {
                    try {
                        await deletePlatform(id).unwrap();
                        toast.success("Platform deleted successfully");
                    } catch (err) {
                        toast.error("Failed to delete platform");
                    }
                }
            }
        });
    };

    if (isLoading) {
        return <div className="flex items-center justify-center h-[400px]"><Spin /></div>;
    }

    return (
        <div>

            <div className="flex flex-wrap justify-center items-center lg:gap-10 gap-8">

                {platforms?.data?.data?.map((item: any) => (
                    <div
                        key={item._id}
                        className="group relative flex flex-col items-center justify-center gap-3 py-2 px-2 shadow-[0_0_10px_0_rgba(0,0,0,0.2)] bg-white w-fit rounded-lg min-w-[172px] min-h-[142px]"
                    >

                        {/* delete icon */}
                        <button
                            onClick={() => handleDelete(item._id)}
                            className="absolute top-2 right-2 hidden group-hover:block text-red-500"
                        >
                            <Trash2 size={18} />
                        </button>

                        <Image
                            src={imagePreview(item.thumbnail)}
                            alt={item.name}
                            width={56}
                            height={56}
                            className="size-14 object-contain"
                        />

                        <div className="flex flex-col items-center justify-center">
                            <p className="text-lg font-medium capitalize">
                                {item.name}
                            </p>

                            <p className="text-sm text-muted-foreground">
                                {item.link}
                            </p>
                        </div>

                    </div>
                ))}

            </div>

            <div className="mx-auto max-w-[300px] mt-10">
                <Button
                    onClick={() => setOpen(true)}
                    icon={<Plus />}
                    className="w-[300px] mx-auto h-[40px]"
                >
                    Add Platform
                </Button>
            </div>

            <AddPlatformModal open={open} setOpen={setOpen} />

        </div>
    );
}