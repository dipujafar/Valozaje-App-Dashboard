import { Skeleton } from "@/components/ui/skeleton";


export default function CommissionStatisticSkeleton() {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 xl:gap-5 gap-3 p-4">
            {/* Total Driver Earnings */}
            <div className="p-4 border bg-section-bg rounded-xl shadow-[0_0_10px_0_rgba(0,0,0,0.2)] ">
                <Skeleton className="h-6 w-3/4 mb-2" /> {/* Title */}
                <Skeleton className="h-10 w-1/2 mb-2" /> {/* Value */}
                <Skeleton className="h-4 w-1/3" /> {/* Change */}
            </div>

            {/* Total Commission Due */}
            <div className="p-4 border bg-section-bg rounded-xl shadow-[0_0_10px_0_rgba(0,0,0,0.2)]">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-10 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/3" />
            </div>

            {/* Total Collected */}
            <div className="p-4 border bg-section-bg rounded-xl shadow-[0_0_10px_0_rgba(0,0,0,0.2)]">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-10 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/3" />
            </div>

            {/* High Risk Drivers */}
            <div className="p-4 border bg-section-bg rounded-xl shadow-[0_0_10px_0_rgba(0,0,0,0.2)]">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-10 w-1/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
            </div>
        </div>
    )
}
