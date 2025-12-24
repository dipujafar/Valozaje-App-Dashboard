import { Card } from "@/components/ui/card"
import { StatCard } from "./StatCard"
import ThresholdProgress from "@/components/shared/ThresholdProgress"

interface AccountSummaryProps {
  totalNetEarnings: number
  lifetimeCommissionPaid: number
  commissionDue: number
  currentProgress: number
  targetProgress: number
}

export function AccountSummary({
  totalNetEarnings,
  lifetimeCommissionPaid,
  commissionDue,
  currentProgress,
  targetProgress,
}: AccountSummaryProps) {
  const progressPercentage = (currentProgress / targetProgress) * 100

  return (
    <Card className="p-6 shadow-[0_0_10px_0_rgba(0,0,0,0.2)]">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-medium text-muted-foreground uppercase tracking-wide mb-4">Account Summary</h3>

          <div className="grid gap-6 sm:grid-cols-3">
            <StatCard label="Total Net Earnings" value={totalNetEarnings} variant="neutral" />
            <StatCard label="Lifetime Commission Paid" value={lifetimeCommissionPaid} variant="success" />
            <StatCard label="Commission Due" value={commissionDue} variant="danger" />
          </div>
        </div>


        <hr />

        <div className="pt-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium text-[#989898] uppercase tracking-wide">Threshold Progress</h3>
            <span className="text-sm font-semibold text-foreground">
                <ThresholdProgress current={65} total={200} />
            </span>
          </div>

        
        </div>
      </div>
    </Card>
  )
}
