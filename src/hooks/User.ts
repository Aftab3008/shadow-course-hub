import { fetchMyLearning } from "@/services/user.services";
import { useQuery } from "@tanstack/react-query";

export const useMyLearning = () => {
  const query = useQuery({
    queryKey: ["my-learning"],
    queryFn: fetchMyLearning,
  });
  return query;
};
