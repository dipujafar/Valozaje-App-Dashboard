"use client"
import whatsApp from "@/assets/icon/whatApp.png";
import instagramImage from "@/assets/icon/instragram.png";
import facebookImage from "@/assets/icon/facebook.png";
import twitterImage from "@/assets/icon/x_icon.png";
import Image from "next/image";
import { Button } from "antd";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddPlatformModal from "@/components/(adminDashboard)/modals/AddPlatformModal";

export default function ContactContainer() {
    const [open, setOpen] = useState(false)
    const data = [
        {
            id: 1,
            name: "Whatsapp",
            icon: whatsApp
        },
        {
            id: 2,
            name: "Instagram",
            icon: instagramImage
        },
        {
            id: 3,
            name: "Facebook",
            icon: facebookImage
        },
        {
            id: 4,
            name: "Twitter",
            icon: twitterImage
        },
    ]
    return (
        <div>
            <div className="flex justify-center items-center lg:gap-10 gap-8">
                {
                    data.map((item) => (
                        <div key={item.id} className="flex flex-col items-center justify-center gap-3 py-2 px-2 shadow-[0_0_10px_0_rgba(0,0,0,0.2)] bg-white w-fit rounded-lg min-w-[172px] min-h-[142px]">
                            <Image src={item.icon} alt={item.name} className="size-14" />
                            <span className="text-lg font-medium">{item.name}</span>
                        </div>
                    ))
                }
            </div>
            <div className="mx-auto max-w-[300px] mt-10">
                <Button onClick={() => setOpen(true)} icon={<Plus />} className="w-[300px] mx-auto h-[40px]">Add Platform </Button>
            </div>
            <AddPlatformModal open={open} setOpen={setOpen} />
        </div>
    )
}
