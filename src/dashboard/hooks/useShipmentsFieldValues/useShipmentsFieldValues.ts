import { useQuery } from "react-query"

import { useAuthStore } from "@/store"
import { getShipmentsFieldValuesFn } from "@/api/shipmentApi"

export const useShipmentsFieldValues = ({
  field,
  keyword,
  status,
}: {
  field: string
  keyword: string
  status: "QUOTE" | "SHIPMENT"
}) => {
  const organization = useAuthStore((state) => state.organization)
  const isEnabled = !!organization.id && (keyword.length === 0 || keyword.length > 3)

  return useQuery(
    ["shipmentsFieldValues", organization.id, field, keyword, status],
    () => getShipmentsFieldValuesFn({ field, keyword, status, organization }),
    {
      staleTime: Infinity,
      cacheTime: isEnabled ? 5 * 60 * 1000 : 0,
      enabled: isEnabled,
    },
  )
}
