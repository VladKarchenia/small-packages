import { useCallback, useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { useFormContext } from "react-hook-form"

import { useShipmentById } from "@/shared/data"
import { RouteParams, ShipmentState } from "@/shared/types"
import { StepName, StepperState } from "@/shipment/types"

import {
  Button,
  Copy,
  GridContainer,
  Hidden,
  Spacer,
  Stack,
  useStepperContext,
} from "@/shared/components"
import { LocationInput, StepActionsBar, LocationPopover } from "@/shipment/components"

export const AddressInfo = ({
  handleContinueClick,
  setStepperState,
}: {
  handleContinueClick: (step: StepName.INFO, nextStep: StepName.SHIPMENT) => void
  setStepperState: React.Dispatch<React.SetStateAction<StepperState>>
}) => {
  const [isStepChanged, setIsStepChanged] = useState(false)
  const { setValue, watch } = useFormContext<ShipmentState>()
  const { sender, recipient } = watch()
  const stringifiedSenderAddress = JSON.stringify(sender.fullAddress)
  const stringifiedRecipientAddress = JSON.stringify(recipient.fullAddress)
  const { setSelected } = useStepperContext("AddressInfo")
  const { shipmentId } = useParams<keyof RouteParams>() as RouteParams
  const { data } = useShipmentById(shipmentId)
  const location = useLocation()
  const isEditMode = location.pathname.includes("edit")

  const onContinueHandler = () => {
    setSelected([StepName.SHIPMENT])
    handleContinueClick(StepName.INFO, StepName.SHIPMENT)
  }

  // sets the value of the isStepChanged variable according to whether the sender or
  // recipient fullAddress from the form has changed compared to the currently stored
  const stepChangesChecker = useCallback(() => {
    if (data?.sender.fullAddress && data?.recipient.fullAddress) {
      setIsStepChanged(
        JSON.stringify(sender.fullAddress) !== JSON.stringify(data.sender.fullAddress) ||
          JSON.stringify(recipient.fullAddress) !== JSON.stringify(data.recipient.fullAddress),
      )
    }
  }, [
    sender.fullAddress,
    recipient.fullAddress,
    data?.sender.fullAddress,
    data?.recipient.fullAddress,
  ])

  // checks if edit mode is now and triggers the stepChangesChecker function
  // if the stringifiedSenderAddress or stringifiedRecipientAddress variables have changed
  useEffect(() => {
    if (isEditMode) {
      stepChangesChecker()
    }
  }, [stringifiedSenderAddress, stringifiedRecipientAddress, isEditMode, stepChangesChecker])

  // checks if edit mode is now and triggers the setStepperState function
  // if the isStepChanged variable has changed setting completed and disabled fields to the stepper steps
  useEffect(() => {
    if (isEditMode) {
      setStepperState((prevState: StepperState) => {
        return {
          ...prevState,
          rates: {
            ...prevState.rates,
            // if the address hasn't been changed, set to true
            completed: !isStepChanged,
            // if the address has been changed, set to false
            disabled: isStepChanged,
          },
        }
      })
    }
  }, [isStepChanged, setStepperState, isEditMode])

  return (
    <GridContainer fullBleed>
      <Hidden below="sm">
        <Stack space={24}>
          <LocationPopover
            value={sender.fullAddress}
            onChange={(locationDetails) => {
              setValue("sender.fullAddress", locationDetails)
            }}
            label="From"
            labelProps={{ hidden: true, required: true }}
            description="From"
            placeholder="From"
            country="United States"
            person="sender"
          />
          <LocationPopover
            value={recipient.fullAddress}
            onChange={(locationDetails) => {
              setValue("recipient.fullAddress", locationDetails)
            }}
            label="To"
            labelProps={{ hidden: true, required: true }}
            description="To"
            placeholder="To"
            country="United States,Canada"
            person="recipient"
          />
        </Stack>
      </Hidden>
      <Hidden above="sm">
        <Stack space={24}>
          <LocationInput
            initialValue={sender.fullAddress}
            onChange={(locationDetails) => {
              setValue("sender.fullAddress", locationDetails)
            }}
            id="Address from"
            label="From"
            placeholder="From"
            description="From"
            labelProps={{ required: true }}
            country="United States"
            person="sender"
          />
          <LocationInput
            initialValue={recipient.fullAddress}
            onChange={(locationDetails) => {
              setValue("recipient.fullAddress", locationDetails)
            }}
            id="Address to"
            label="To"
            placeholder="To"
            description="To"
            labelProps={{ required: true }}
            country="United States,Canada"
            person="recipient"
          />
        </Stack>
      </Hidden>
      <Spacer size={{ "@initial": 24, "@sm": 32 }} />
      <StepActionsBar>
        <Button
          onClick={onContinueHandler}
          full
          disabled={
            !sender.fullAddress.displayName ||
            !recipient.fullAddress.displayName ||
            sender.fullAddress.displayName === recipient.fullAddress.displayName
          }
        >
          {/* TODO: fix default button copy */}
          <Copy as="span" scale={8} color="system-white" bold>
            Continue
          </Copy>
        </Button>
      </StepActionsBar>
    </GridContainer>
  )
}
