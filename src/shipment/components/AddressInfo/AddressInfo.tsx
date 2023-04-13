import { useFormContext } from "react-hook-form"

import { ShipmentState } from "@/shared/types"
import { StepName } from "@/shipment/types"

import {
  Button,
  GridContainer,
  Hidden,
  Spacer,
  Stack,
  Title,
  useStepperContext,
} from "@/shared/components"
import { LocationInput, StepActionsBar, LocationPopover } from "@/shipment/components"

export const AddressInfo = ({
  handleContinueClick,
}: {
  handleContinueClick: (step: StepName.INFO, nextStep: StepName.SHIPMENT) => void
}) => {
  const { setValue, watch } = useFormContext<ShipmentState>()
  const { sender, recipient } = watch()
  const { setSelected } = useStepperContext("AddressInfo")

  const onContinueHandler = () => {
    setSelected([StepName.SHIPMENT])
    handleContinueClick(StepName.INFO, StepName.SHIPMENT)
  }

  return (
    <GridContainer fullBleed>
      <Hidden below="sm">
        <Title as="h3" scale={3}>Address Information</Title>
        <Spacer size={40} />
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
          full
          disabled={
            !sender.fullAddress.displayName ||
            !recipient.fullAddress.displayName ||
            sender.fullAddress.displayName === recipient.fullAddress.displayName
          }
          onClick={onContinueHandler}
        >
          Continue
        </Button>
      </StepActionsBar>
    </GridContainer>
  )
}
