import { useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"

import { useBoundStore } from "@/store"
import { useShipmentById } from "@/shared/data"
import { RouteParams, ShipmentState, ShippingType } from "@/shared/types"
import { StepperState } from "@/shipment/types"
import { INITIAL_READY_DATE_DEFAULT } from "@/constants"

export const useCheckUpdates = ({
  formState,
  setStepperState,
}: {
  formState: ShipmentState
  setStepperState: React.Dispatch<React.SetStateAction<StepperState>>
}) => {
  const shippingType = useBoundStore((state) => state.shippingType)
  const { shipmentId } = useParams<keyof RouteParams>() as RouteParams
  const { data } = useShipmentById(shipmentId)
  const { sender, recipient, parcels, date } = formState
  const location = useLocation()
  const isEditMode = location.pathname.includes("edit")

  const isInfoStepChanged =
    JSON.stringify(sender.fullAddress) !== JSON.stringify(data?.sender.fullAddress) ||
    JSON.stringify(recipient.fullAddress) !== JSON.stringify(data?.recipient.fullAddress)
  const isPackageStepChanged = JSON.stringify(parcels) !== JSON.stringify(data?.parcels)
  const isDateStepChanged = date.getTime() !== data?.date.getTime()
  const isDateExpired = date < new Date(INITIAL_READY_DATE_DEFAULT)

  useEffect(() => {
    if (isEditMode) {
      if (shippingType === ShippingType.Quote) {
        setStepperState((prevState) => {
          return {
            ...prevState,
            info: {
              ...prevState.info,
              completed: true,
              disabled: false,
            },
            shipment: {
              ...prevState.shipment,
              completed: true,
              disabled: false,
            },
            date: {
              ...prevState.date,
              completed: true,
              disabled: false,
            },
            rates: {
              ...prevState.rates,
              completed:
                !isDateExpired && !isInfoStepChanged && !isPackageStepChanged && !isDateStepChanged,
              disabled:
                isDateExpired || isInfoStepChanged || isPackageStepChanged || isDateStepChanged,
            },
          }
        })
      } else {
        setStepperState((prevState) => {
          return {
            ...prevState,
            from: {
              ...prevState.from,
              completed: true,
              disabled: false,
            },
            to: {
              ...prevState.to,
              completed: true,
              disabled: false,
            },
            shipment: {
              ...prevState.shipment,
              completed: true,
              disabled: false,
            },
            date: {
              ...prevState.date,
              completed: true,
              disabled: false,
            },
            rates: {
              ...prevState.rates,
              completed: true,
              disabled: false,
            },
            summary: {
              ...prevState.summary,
              completed: true,
              disabled: false,
            },
            // TODO: depends on if it was created in Proship
            receipt: {
              ...prevState.receipt,
              // completed: false,
              completed: true,
              // disabled: true,
              disabled: false,
            },
          }
        })
      }
    }
  }, [
    isEditMode,
    setStepperState,
    shippingType,
    isDateExpired,
    isInfoStepChanged,
    isPackageStepChanged,
    isDateStepChanged,
  ])

  return null
}
