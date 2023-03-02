import { isAxiosError } from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQueryClient } from "react-query"

import { updateShipmentStatusFn } from "@/api/shipmentApi"
import { IShipmentResponse } from "@/api/types"
import { RouteParams, ShipmentStatus } from "@/shared/types"
import { EDIT } from "@/constants"
import { showToast } from "@/shared/utils"

export const useUpdateShipmentStatus = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { shipmentId } = useParams<keyof RouteParams>() as RouteParams

  return useMutation(
    () =>
      updateShipmentStatusFn(
        shipmentId,
        Object.keys(ShipmentStatus)[Object.values(ShipmentStatus).indexOf(ShipmentStatus.DRAFT)],
      ),
    {
      onSuccess: (data: IShipmentResponse) => {
        // put the current data in the cache of the "shipmentById" request
        queryClient.setQueryData(["shipmentById", data.id], data)

        // invalidate the cache of "allShipments" request because the data has been changed
        queryClient.invalidateQueries("allShipments")

        // invalidate the cache of "shipmentsFieldValues" request because the data has been changed
        queryClient.invalidateQueries("shipmentsFieldValues")

        navigate(`${EDIT}/shipment/${data.id}`)
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          showToast({ type: "error", text: error.response?.data.errorMessage || error.message })
        }
      },
    },
  )
}
