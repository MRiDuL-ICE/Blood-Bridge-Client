import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useDonationRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { user }: any = useAuth();

  const { data: donations = [], refetch } = useQuery({
    queryKey: ["donations", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donation-requests?email=${user.email}`
      );
      return res.data;
    },
  });
  return [donations, refetch];
};

export default useDonationRequest;
