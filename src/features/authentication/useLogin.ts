import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
interface types {
  email: string;
  password: string;
}
export const useLogin = () => {
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }: types) => loginApi({ email, password }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: () => {
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Provided email or password are incorrect");
    },
  });
  return {
    login,
    isLoading,
  };
};
