import { cn } from "@/lib/utils"

const CustomAvatar = ({ text, className }: { text: string, className?: string }) => {
    return <div className={cn('size-[50px] bg-gray-200 rounded-full flex items-center justify-center font-medium text-xl', className)}>{text}</div>
}

export default CustomAvatar;