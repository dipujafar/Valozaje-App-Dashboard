"use client";;
import { Modal } from "antd";
import { RiCloseLargeLine } from "react-icons/ri";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"


const reportedBy = {
    name: "Gloirepaluku",
    email: "you@gmail.com",
}
const against = {
    name: "Gloirepaluku",
    email: "you@gmail.com",
}

const category = "Dangerous Driving"
const description = "There's a group of people blocking the intersection at Main & 4th. Traffic is completely stopped. Avoid this route if possible!"



const ClaimDetailsModal = ({
    open,
    setOpen,

}: {
    open: boolean;
    setOpen: (collapsed: boolean) => void;

}) => {

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
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={"/client_dummy_image.png"} alt={reportedBy.name} />
                                        <AvatarFallback className="bg-primary/10 text-primary">
                                            {reportedBy.name.substring(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-foreground">{reportedBy.name}</span>
                                        <span className="text-xs text-muted-foreground">{reportedBy.email}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Against Card */}
                        <Card className="bg-muted/40">
                            <CardContent className="pt-6">
                                <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">Against</p>
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={"/client_dummy_image.png"} alt={against.name} />
                                        <AvatarFallback className="bg-primary/10 text-primary">
                                            {against.name.substring(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-foreground">{against.name}</span>
                                        <span className="text-xs text-muted-foreground">{against.email}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Category Badge */}
                    <Card className="border-border/50">
                        <CardContent className="px-6 py-4">
                            <Badge variant="destructive" className="bg-destructive/10 text-destructive hover:bg-destructive/20">
                                {category}
                            </Badge>
                        </CardContent>
                    </Card>

                    {/* Description Card */}
                    <Card className="border-border/50">
                        <CardContent className="px-6 py-6">
                            <p className="text-pretty text-sm leading-relaxed text-foreground max-w-2xl">{description}</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Modal>
    );
};

export default ClaimDetailsModal;
