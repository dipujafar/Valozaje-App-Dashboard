import { Star, Phone, Mail, MapPin } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Image } from "antd"
import { cn } from "@/lib/utils"
import CustomAvatar from "@/components/ui/customAvatar"

interface ProfileCardProps {
    name: string
    rating: number
    isActive: boolean
    phone: string
    email: string
    location: string
    avatarUrl?: string
}

export function ProfileCard({ name, rating, isActive, phone, email, location, avatarUrl }: ProfileCardProps) {
    return (
        <Card className="p-6 shadow-[0_0_10px_0_rgba(0,0,0,0.2)]">
            <div className="flex items-start gap-4">
                <div className="relative mb-3">
                    <div className="">
                        {avatarUrl ? <Image
                            src={avatarUrl}
                            alt={name}
                            className="!size-16 !rounded-full"
                        /> : <CustomAvatar text={name.charAt(0) || "N"} />}
                    </div>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-card rounded-full px-2 py-0.5 flex items-center gap-1 shadow-sm border border-border">
                        <Star color="#F5A91C" fill="#F5A91C" className="w-3 h-3" />
                        <span className="text-xs font-medium text-foreground">{rating}</span>
                    </div>
                </div>

                <div className="flex-1 space-y-2">
                    <h2 className="text-lg font-semibold text-foreground">{name}</h2>

                    <div className="flex items-center gap-2">
                        <Badge

                            className={cn(isActive ? "text-emerald-800 bg-emerald-100" : "text-red-800 bg-red-100")}
                        >
                            {isActive ? "Active" : "Inactive"}
                        </Badge>
                    </div>
                </div>
            </div>
            <hr className="mt-3" />
            <div className="mt-3 space-y-3">
                <ContactInfo icon={Phone} text={phone} />
                <ContactInfo icon={Mail} text={email} />
                <ContactInfo icon={MapPin} text={location} />
            </div>
        </Card>
    )
}

function ContactInfo({ icon: Icon, text }: { icon: any; text: string }) {
    return (
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Icon className="h-4 w-4" />
            <span>{text}</span>
        </div>
    )
}
