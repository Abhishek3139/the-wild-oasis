import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queruClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: UpdateCurrentUser,
    onSuccess: () => {
      toast.success("User account successfully updated");
      //   queruClient.setQueryData("user")
      queruClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}
