import { useFormContext } from "react-hook-form"
import { Button, Copy, GridContainer, Spacer, Stack, useStepperContext } from "@/shared/components"
import { ShipmentState } from "@/shared/state"
import { StepName, LocationInput } from "@/shipment"

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
      <Stack space={8}>
        <LocationInput
          initialValue={sender.fullAddress}
          onChange={(destination) => {
            setValue("sender.fullAddress", destination)
          }}
          placeholder="From"
        />
        <LocationInput
          initialValue={recipient.fullAddress}
          onChange={(destination) => {
            setValue("recipient.fullAddress", destination)
          }}
          placeholder="To"
        />
      </Stack>
      <Spacer size={32} />
      <Button
        onClick={onContinueHandler}
        full
        disabled={
          !sender.fullAddress.location ||
          !recipient.fullAddress.location ||
          // TODO: need to add better condition to prevent same from and to addresses using ID or some field
          sender.fullAddress.location === recipient.fullAddress.location
        }
      >
        {/* TODO: fix default button copy */}
        <Copy as="span" scale={8} color="system-white" bold>
          Continue
        </Copy>
      </Button>
    </GridContainer>
  )
}
