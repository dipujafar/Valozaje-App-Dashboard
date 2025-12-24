import UserDetailsTabs from "./UserDetailsTabs";
import UserProfileCard from "./UserProfileCard";

const UserDetails = () => {
    const userData = {
        name: "Alex Johnson",
        balance: -190,
        rating: 4.5,
        avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
        stats: {
            trips: 142,
            packages: 89,
            travel: 12,
            claim: 3,
        },
        fullName: "Alex Johnson",
        email: "alex@me.com",
        phone: "0123456789",
        address: "barcelona, spain",
        dob: "1990-01-01",
        due: 240,
        about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    };

    return (
        <div className="min-h-[calc(100vh-200px)] ">
            <h1 className="text-2xl font-semibold text-foreground mb-8">User Details</h1>

            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
                {/* Left Side - Profile Card */}
                <div className="lg:w-1/4 border-r-2  h-full ">
                    <UserProfileCard
                        name={userData.name}
                        balance={userData.balance}
                        rating={userData.rating}
                        avatarUrl={userData.avatarUrl}
                        stats={userData.stats}
                    />
                </div>

                {/* Right Side - Tabs */}
                <div className="flex-1 min-w-0">
                    <UserDetailsTabs
                        userData={{
                            fullName: userData.fullName,
                            email: userData.email,
                            phone: userData.phone,
                            address: userData.address,
                            dob: userData.dob,
                            due: userData.due,
                            about: userData.about,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
