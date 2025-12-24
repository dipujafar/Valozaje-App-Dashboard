import { Image } from "antd";
import { Star } from "lucide-react";

interface StatItemProps {
  value: number;
  label: string;
}

const StatItem = ({ value, label }: StatItemProps) => (
  <div className="bg-[#0595DD21] rounded-lg px-4 py-3 text-center min-w-[110px]">
    <p className="text-[#1376A8] font-semibold text-xl">{value}</p>
    <p className=" text-xs">{label}</p>
  </div>
);

interface UserProfileCardProps {
  name: string;
  balance: number;
  rating: number;
  avatarUrl: string;
  stats: {
    trips: number;
    packages: number;
    travel: number;
    claim: number;
  };
}

const UserProfileCard = ({
  name,
  balance,
  rating,
  avatarUrl,
  stats,
}: UserProfileCardProps) => {
  const isNegativeBalance = balance < 0;

  return (
    <div className="flex flex-col items-center">
      {/* Avatar with rating badge */}
      <div className="relative mb-3">
        <div className="size-28 rounded-full overflow-hidden border-4 border-card shadow-avatar">
          <Image
            src={avatarUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-card rounded-full px-2 py-0.5 flex items-center gap-1 shadow-sm border border-border">
          <Star color="#F5A91C" fill="#F5A91C" className="w-3 h-3" />
          <span className="text-xs font-medium text-foreground">{rating}</span>
        </div>
      </div>

      {/* Name */}
      <h2 className="text-xl font-medium text-foreground mb-1">{name}</h2>

      {/* Balance */}
      <p
        className={`text-3xl font-semibold mb-6 ${
          isNegativeBalance ? "text-[#DD4242]" : "text-[#1376A8]"
        }`}
      >
        {isNegativeBalance ? "-" : ""}${Math.abs(balance)}
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-[240px]">
        <StatItem value={stats.trips} label="Trips" />
        <StatItem value={stats.packages} label="Packages" />
        <StatItem value={stats.travel} label="Travel" />
        <StatItem value={stats.claim} label="Claim" />
      </div>
    </div>
  );
};

export default UserProfileCard;
