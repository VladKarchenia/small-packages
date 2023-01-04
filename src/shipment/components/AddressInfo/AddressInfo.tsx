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
import { StepName, LocationInput, ShippingType, StepActionsBar, LocationPopover } from "@/shipment"

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
          <LocationPopover
            value={sender.fullAddress}
            onChange={(locationDetails) => {
              setValue("sender.fullAddress", locationDetails)
            }}
            label="From"
            labelProps={{ hidden: true, required: true }}
            description="From"
            placeholder="From"
            country={"United States"}
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
            country={"United States,Canada"}
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
            placeholder="From"
            description="From"
            labelProps={{ required: true }}
            country={"United States"}
          />
          <LocationInput
            initialValue={recipient.fullAddress}
            onChange={(locationDetails) => {
              setValue("recipient.fullAddress", locationDetails)
            }}
            placeholder="To"
            description="To"
            labelProps={{ required: true }}
            country={"United States,Canada"}
          />
        </Stack>
      </Hidden>
      <Spacer size={{ "@initial": 24, "@sm": 32 }} />
      <StepActionsBar shippingType={ShippingType.Quote}>
        <Button
          onClick={onContinueHandler}
          full
          disabled={
            !sender.fullAddress.displayName ||
            !recipient.fullAddress.displayName ||
            // TODO: do we need a better condition to prevent same from and to addresses using ID or some field?
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
