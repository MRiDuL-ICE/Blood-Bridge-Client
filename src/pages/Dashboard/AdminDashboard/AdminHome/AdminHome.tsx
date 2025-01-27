import useAdmin from "@/hooks/useAdmin";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useUsers from "@/hooks/useUsers";
import Welcome from "@/shared/Welcome/Welcome";
import { useQuery } from "@tanstack/react-query";
import { Users, DollarSign, Droplet, TrendingUp } from "lucide-react";

const AdminHome = () => {
  const { user }: any = useAuth();
  // @ts-ignore
  const [users, refetch] = useUsers();
  const axiosSecure = useAxiosSecure();
  const [isAdmin] = useAdmin();
  const { data: donations = [] } = useQuery({
    queryKey: ["donations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donation-requests");
      return res.data;
    },
  });

  // Calculate total funds
  const totalFunds = donations.reduce(
    (sum: number, donation: any) => sum + (donation.amount || 0),
    0
  );

  // Stats data
  const stats = [
    {
      title: "Total Donors",
      value: users.length,
      icon: Users,
      trend: "+12.5%",
      bgColor: "bg-gradient-to-br from-purple-500 to-indigo-600",
    },
    {
      title: "Total Funds",
      value: `$${totalFunds.toLocaleString()}`,
      icon: DollarSign,
      trend: "+8.2%",
      bgColor: "bg-gradient-to-br from-emerald-500 to-teal-600",
    },
    {
      title: "Blood Requests",
      value: donations.length,
      icon: Droplet,
      trend: "+15.3%",
      bgColor: " bg-gradient-to-br from-[#DC143C] to-pink-600",
    },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          {isAdmin ? (
            <>
              <Welcome
                name={user.displayName}
                subHeading1={"a great leader"}
                subHeading2={"very hard worker"}
                subHeading3={"making a difference"}
              />
            </>
          ) : (
            <>
              <Welcome
                name={user.displayName}
                subHeading1={"a great volunteer"}
                subHeading2={"so active"}
                subHeading3={"such a hard worker"}
              ></Welcome>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className={`${stat.bgColor} rounded-lg p-6 text-white shadow-lg transform transition-transform hover:scale-105`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white/80 text-sm font-medium mb-1">
                      {stat.title}
                    </p>
                    <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                    <div className="flex items-center text-white/90 text-sm">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>{stat.trend} from last month</span>
                    </div>
                  </div>
                  <div className="bg-white/20 p-3 rounded-lg">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                </div>

                <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white/40 rounded-full"
                    style={{ width: "70%" }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
