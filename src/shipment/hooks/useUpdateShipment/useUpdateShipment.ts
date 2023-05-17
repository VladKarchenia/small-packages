import { isAxiosError } from "axios"
import { useParams } from "react-router-dom"
import { useMutation, useQueryClient } from "react-query"

import { useAuthStore, useBoundStore } from "@/store"
import { updateShipmentFn } from "@/api/shipmentApi"
import { formatShipmentRequestData, showToast } from "@/shared/utils"
import { IShipmentResponse } from "@/api/types"
import { RouteParams, ShipmentState, ShipmentStatus, ShippingType } from "@/shared/types"

export const useUpdateShipment = () => {
  const queryClient = useQueryClient()
  const organization = useAuthStore((state) => state.organization)
  const shippingType = useBoundStore((state) => state.shippingType)
  const { shipmentId } = useParams<keyof RouteParams>() as RouteParams

  return useMutation(
    (data: ShipmentState) =>
      updateShipmentFn(
        shipmentId,
        formatShipmentRequestData(
          data,
          shippingType,
          organization,
          shippingType === ShippingType.Quote
            ? ShipmentStatus.QUOTE_QUOTED
            : ShipmentStatus.SUBMITTED,
        ),
      ),
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
