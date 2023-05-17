import { isAxiosError } from "axios"
import { useQuery } from "react-query"

import { getShipmentByIdFn } from "@/api/shipmentApi"
import { formatShipmentResponseData, showToast } from "@/shared/utils"

export const useShipmentById = (shipmentId: string) => {
  const isEnabled = !!shipmentId

  return useQuery(["shipmentById", shipmentId], () => getShipmentByIdFn(shipmentId), {
    staleTime: 5 * 60 * 1000,
    cacheTime: isEnabled ? 5 * 60 * 1000 : 0,
    enabled: isEnabled,
    select: (shipment) => ({
      ...formatShipmentResponseData(shipment.data),
      createdAt: shipment.createdAt,
    }),
    onError: (error) => {
      if (isAxiosError(error)) {
        showToast({ type: "error", text: error.response?.data.errorMessage || error.message })
      }
    },
  })
}
