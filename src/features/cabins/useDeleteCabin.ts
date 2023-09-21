import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { delteCabin } from "../../services/apiCabins";

export const useDeleteCabin = () => {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: delteCabin,
    onSuccess: () => {
      toast.success("cabin successfully Deleted");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error: string) => toast.error(error),
  });
  return { isDeleting, mutate };
};
