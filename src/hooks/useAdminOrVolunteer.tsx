import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAdminOrVolunteer = () => {
  const { user, loading }: any = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isAdminOrVolunteer, isPending: isAdminOrVolunteerLoading } =
    useQuery({
      queryKey: [user?.email, "isAdminOrVolunteer"],
      enabled: !loading,
      queryFn: async () => {
        const res = await axiosSecure.get(
          `/users/admin-volunteer/${user?.email}`
        );
        console.log(res.data);
        return res.data?.adminOrVolunteer;
      },
    });
  return [isAdminOrVolunteer, isAdminOrVolunteerLoading];
};

export default useAdminOrVolunteer;
