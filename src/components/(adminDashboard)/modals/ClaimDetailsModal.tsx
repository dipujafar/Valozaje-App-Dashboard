"use client";;
import { Image, Modal } from "antd";
import { RiCloseLargeLine } from "react-icons/ri";
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react";
import { imagePreview } from "@/utils/imagePreview";
import CustomAvatar from "@/components/ui/customAvatar";





const ClaimDetailsModal = ({
    open,
    setOpen,
    data
}: {
    open: boolean;
    setOpen: (collapsed: boolean) => void;
    data: any
}) => {
    const [currentData, setCurrentData] = useState<any>(null);

    useEffect(() => {
        setCurrentData(data)
    }, [data])

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
                <div className="space-y-4 mt-5">
                    {/* User Cards Row */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {/* Reported By Card */}
                        <Card className="bg-muted/40">
                            <CardContent className="pt-6">
                                <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">Reported by</p>
                                <div className="flex items-center gap-3">
                                    {currentData?.reporter?.image ? <Image src={imagePreview(currentData?.reporter?.image)} width={48} height={48} alt={`${currentData?.reporter?.fullName} image`} className="rounded-full object-cover" fallback="/user-avatar.jpg" /> : <CustomAvatar text={currentData?.reporter?.fullName?.charAt(0) || "N"} />}
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-foreground">{currentData?.reporter?.fullName || "N/A"}</span>
                                        <span className="text-xs text-muted-foreground">{currentData?.reporter?.email || "N/A"}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Against Card */}
                        <Card className="bg-muted/40">
                            <CardContent className="pt-6">
                                <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">Against</p>
                                <div className="flex items-center gap-3">
                                    {currentData?.reportedUser?.image ? <Image src={imagePreview(currentData?.reportedUser?.image)} width={48} height={48} alt={`${currentData?.reportedUser?.fullName} image`} className="rounded-full object-cover"  fallback="/user-avatar.jpg" /> : <CustomAvatar text={currentData?.reportedUser?.fullName?.charAt(0) || "N"} />}
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-foreground">{currentData?.reportedUser?.fullName || "N/A"}</span>
                                        <span className="text-xs text-muted-foreground">{currentData?.reportedUser?.email || "N/A"}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Category Badge */}
                    <Card className="border-border/50">
                        <CardContent className="px-6 py-4">
                            <Badge variant="destructive" className="bg-destructive/10 text-destructive hover:bg-destructive/20">
                                {currentData?.reportSubject?.title || "N/A"}
                            </Badge>
                        </CardContent>
                    </Card>

                    {/* Description Card */}
                    <Card className="border-border/50">
                        <CardContent className="px-6 py-6">
                            <p className="text-pretty text-sm leading-relaxed text-foreground max-w-2xl">{currentData?.additionalDetails || "N/A"}</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Modal>
    );
};

export default ClaimDetailsModal;