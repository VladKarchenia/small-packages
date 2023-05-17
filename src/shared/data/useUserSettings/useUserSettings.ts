import { useQuery } from "react-query"

import { getUserSettingsFn } from "@/api/userApi"

export const useUserSettings = (organizationId: number | null) => {
  return useQuery(["searchShipments", organizationId], () => getUserSettingsFn(organizationId), {
    staleTime: Infinity,
    enabled: !!organizationId,
  })
}
