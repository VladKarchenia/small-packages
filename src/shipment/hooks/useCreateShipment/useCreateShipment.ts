import { isAxiosError } from "axios"
import { useMutation, useQueryClient } from "react-query"

import { useAuthStore, useBoundStore } from "@/store"
import { createShipmentFn } from "@/api/shipmentApi"
import { formatShipmentRequestData, showToast } from "@/shared/utils"
import { IShipmentResponse } from "@/api/types"
import { ShipmentState } from "@/shared/types"

export const useCreateShipment = () => {
  const queryClient = useQueryClient()
  const organization = useAuthStore((state) => state.organization)
  const shippingType = useBoundStore((state) => state.shippingType)

  return useMutation(
    (data: ShipmentState) =>
      createShipmentFn(formatShipmentRequestData(data, shippingType, organization)),
    {
      onSuccess: (data: IShipmentResponse) => {
        // put the current data in the cache of the "shipmentById" request
        queryClient.setQueryData(["shipmentById", data.id], data)

        // invalidate the cache of "allShipments" request because the data has been changed
        queryClient.invalidateQueries("allShipments")

        // invalidate the cache of "shipmentsFieldValues" request because the data has been changed
        queryClient.invalidateQueries("shipmentsFieldValues")
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          showToast({ type: "error", text: error.response?.data.errorMessage || error.message })
        }
      },
    },
  )
}
