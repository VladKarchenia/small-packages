import { useQuery } from "react-query"

import { useAuthStore } from "@/store"
import { searchShipmentsFn } from "@/api/shipmentApi"

export const useSearchShipments = (keyword: string) => {
  const organization = useAuthStore((state) => state.organization)
  const isEnabled = !!organization.id && keyword.length > 3

  return useQuery(
    ["searchShipments", organization.id, keyword],
    () => searchShipmentsFn({ keyword, organization }),
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: isEnabled ? 5 * 60 * 1000 : 0,
      enabled: isEnabled,
    },
  )
}
