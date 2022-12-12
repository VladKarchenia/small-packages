import { useFormContext } from "react-hook-form"
import {
  Button,
  Copy,
  GridContainer,
  Hidden,
  Spacer,
  Stack,
  useStepperContext,
} from "@/shared/components"
import { ShipmentState } from "@/shared/state"
import { StepName, LocationInput, ShippingType, StepActionsBar } from "@/shipment"

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
        <Stack space={24}>
          <LocationInput
            initialValue={sender.fullAddress}
            onChange={(destination) => {
              setValue("sender.fullAddress", destination)
            }}
            placeholder="From"
            description="From"
            labelProps={{ required: true }}
          />
          <LocationInput
            initialValue={recipient.fullAddress}
            onChange={(destination) => {
              setValue("recipient.fullAddress", destination)
            }}
            placeholder="To"
            description="To"
            labelProps={{ required: true }}
          />
        </Stack>
      </Hidden>
      <Hidden above="sm">
        <Stack space={24}>
          <LocationInput
            initialValue={sender.fullAddress}
            onChange={(destination) => {
              setValue("sender.fullAddress", destination)
            }}
            placeholder="From"
            description="From"
            labelProps={{ required: true }}
          />
          <LocationInput
            initialValue={recipient.fullAddress}
            onChange={(destination) => {
              setValue("recipient.fullAddress", destination)
            }}
            placeholder="To"
            description="To"
            labelProps={{ required: true }}
          />
        </Stack>
      </Hidden>
      <Spacer size={{ "@initial": 24, "@sm": 32 }} />
      <StepActionsBar shippingType={ShippingType.Quote}>
        <Button
          onClick={onContinueHandler}
          full
          disabled={
            !sender.fullAddress.location ||
            !recipient.fullAddress.location ||
            // TODO: do we need a better condition to prevent same from and to addresses using ID or some field?
            sender.fullAddress.location === recipient.fullAddress.location
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
