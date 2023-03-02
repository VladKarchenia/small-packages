import { useCallback, useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { useFormContext } from "react-hook-form"

import { useBoundStore } from "@/store"
import { useShipmentById } from "@/shared/data"
import { RouteParams, ShippingType, ShipmentState } from "@/shared/types"
import { StepName, StepperState } from "@/shipment/types"

import { Copy, GridContainer, Stack, Spacer, useStepperContext, Button } from "@/shared/components"
import { DateInput, StepActionsBar } from "@/shipment/components"

export const ShipmentDateDetails = ({
  handleContinueClick,
  setStepperState,
}: {
  handleContinueClick: (step: StepName.DATE, nextStep: StepName.RATES) => void
  setStepperState: React.Dispatch<React.SetStateAction<StepperState>>
}) => {
  const [isStepChanged, setIsStepChanged] = useState(false)
  const { watch } = useFormContext<ShipmentState>()
  const { date, sender } = watch()
  const location = useLocation()
  const isEditMode = location.pathname.includes("edit")
  const { shipmentId } = useParams<keyof RouteParams>() as RouteParams
  const shippingType = useBoundStore((state) => state.shippingType)
  const { data } = useShipmentById(shipmentId)

  const { setSelected } = useStepperContext("ShipmentDateDetails")

  const onContinueHandler = () => {
    setSelected([StepName.RATES])
    handleContinueClick(StepName.DATE, StepName.RATES)
  }

  // transforms dimensions to strings and sets the value of the isStepChanged variable according to
  // whether the array with parcels from the form has changed compared to the currently stored
  const stepChangesChecker = useCallback(() => {
    if (data?.date) {
      setIsStepChanged(date.getTime() !== data.date.getTime())
    }
  }, [date, data?.date])

  // TODO: shippingType was added to avoid shipment edit mode - remove it later
  // checks if edit mode is now and triggers the stepChangesChecker function
  // if the date value has changed
  useEffect(() => {
    if (isEditMode && shippingType === ShippingType.Quote) {
      stepChangesChecker()
    }
  }, [date, isEditMode, stepChangesChecker, shippingType])

  // TODO: shippingType was added to avoid shipment edit mode - remove it later
  // checks if edit mode is now and triggers the setStepperState function
  // if the isStepChanged variable has changed setting completed and disabled fields to the stepper steps
  useEffect(() => {
    if (isEditMode && shippingType === ShippingType.Quote) {
      setStepperState((prevState: StepperState) => {
        return {
          ...prevState,
          rates: {
            ...prevState.rates,
            // if the date hasn't been changed, set to true
            completed: !isStepChanged,
            // if the date has been changed, set to false
            disabled: isStepChanged,
          },
        }
      })
    }
  }, [isStepChanged, setStepperState, isEditMode, shippingType])

  return (
    <GridContainer fullBleed>
      <Stack space={12} css={{ position: "relative" }}>
        <Copy scale={9}>Please, select a ready date to calculate the cost</Copy>
        <DateInput date={date} sender={sender} />
      </Stack>
      <Spacer size={{ "@initial": 24, "@sm": 32 }} />
      <StepActionsBar>
        {/* TODO: add isExpired condition to disable button and show error message */}
        <Button onClick={onContinueHandler} full disabled={!date}>
          <Copy as="span" scale={8} color="system-white" bold>
            Get rates
          </Copy>
        </Button>
      </StepActionsBar>
    </GridContainer>
  )
}
