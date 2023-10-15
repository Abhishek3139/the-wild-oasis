import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  const { mutate: bookingDelete, isLoading: isDeletingBooking } = useMutation({
    mutationFn: (bookingId: number) => {
      deleteBooking(bookingId);
    },

    onSuccess: () => {
      toast.success("booking successfully Deleted");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (error: string) => toast.error(error),
  });

  return { bookingDelete, isDeletingBooking };
};
