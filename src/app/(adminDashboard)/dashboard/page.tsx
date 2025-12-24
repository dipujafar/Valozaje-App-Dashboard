import { CommissionRadialChart } from "./_components/CommissionRadialChart/CommissionRadialChart";
import { EarningsChart } from "./_components/EarningsChart/EarningsChart";
import { PendingActions } from "./_components/PendingActions";
import { RecentActivity } from "./_components/RecentActivity";
import StatContainer from "./_components/stats/StatContainer";

const DashboardPage = () => {
  return (
    <div className="lg:space-y-7 space-y-5 ">
      <StatContainer />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EarningsChart />
        <CommissionRadialChart />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PendingActions />
        <RecentActivity />
      </div>
      {/*  */}
    </div>
  );
};

export default DashboardPage;
