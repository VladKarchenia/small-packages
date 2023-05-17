import { isAxiosError } from "axios"
import { useQuery } from "react-query"

import { useAuthStore } from "@/store"
import { getAllShipmentsFn } from "@/api/shipmentApi"
import { ShippingType } from "@/shared/types"
import { showToast } from "@/shared/utils"

export const useAllShipments = ({
  type,
  filter,
  sort,
}: {
  type: ShippingType
  filter: string
  sort: string
}) => {
  const organization = useAuthStore((state) => state.organization)

  return useQuery(
    ["allShipments", organization.id, type, filter, sort],
    () => getAllShipmentsFn({ filter, sort, organization }),
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: 5 * 60 * 1000,
      enabled: !!organization.id,
      keepPreviousData: true,
      onError: (error) => {
        if (isAxiosError(error)) {
          showToast({ type: "error", text: error.response?.data.errorMessage || error.message })
        }
      },
    },
  )
}
