import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";
// import { settingsType } from "./settingModal";
// interface DataTypes {
//   isLoading: boolean;
//   data: settingsType;
//   error: string;
// }
function useSettings() {
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isLoading, error, settings };
}

export default useSettings;
