import { useCallback, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useFormContext } from "react-hook-form"

import { ShipmentState, useShipmentStateContext } from "@/shared/state"

import { Copy, GridContainer, Stack, Spacer, useStepperContext, Button } from "@/shared/components"
import { DateInput, ShippingType, StepActionsBar, StepName, StepperState } from "@/shipment"

export const ShipmentDateDetails = ({
  handleContinueClick,
  setStepperState,
}: {
  handleContinueClick: (step: StepName.DATE, nextStep: StepName.RATES) => void
  setStepperState: (value: any) => void
}) => {
  const [isStepChanged, setIsStepChanged] = useState(false)
  const { watch } = useFormContext<ShipmentState>()
  const { date } = watch()
  const location = useLocation()
  const isEditMode = location.pathname.includes("edit")
  const { shippingType, date: dateContext } = useShipmentStateContext()

  const { setSelected } = useStepperContext("ShipmentDateDetails")

  const onContinueHandler = () => {
    setSelected([StepName.RATES])
    handleContinueClick(StepName.DATE, StepName.RATES)
  }

  // transforms dimensions to strings and sets the value of the isStepChanged variable
  // according to whether the array with parcels from the form has changed compared to the context
  const stepChangesChecker = useCallback(() => {
    setIsStepChanged(date.getTime() !== dateContext.getTime())
  }, [date, dateContext])

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
        <DateInput date={date} />
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
