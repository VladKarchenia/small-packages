import { useFormContext } from "react-hook-form"
import { Copy, GridContainer, Stack, Spacer, useStepperContext, Button } from "@/shared/components"
import { DateInput, ShippingType, StepActionsBar, StepName } from "@/shipment"
import { ShipmentState } from "@/shared/state"

export const ShipmentDateDetails = ({
  shippingType,
  handleContinueClick,
}: {
  shippingType: ShippingType
  handleContinueClick: (step: StepName.DATE, nextStep: StepName.RATES) => void
}) => {
  const { watch } = useFormContext<ShipmentState>()
  const { date } = watch()

  const { setSelected } = useStepperContext("ShipmentDateDetails")

  const onContinueHandler = () => {
    setSelected([StepName.RATES])
    handleContinueClick(StepName.DATE, StepName.RATES)
  }

  return (
    <GridContainer fullBleed>
      <Stack space={12}>
        <Copy scale={9}>Please, select a ready date to calculate the cost</Copy>
        <DateInput date={date} />
      </Stack>
      <Spacer size={{ "@initial": 24, "@sm": 32 }} />
      <StepActionsBar shippingType={shippingType}>
        <Button onClick={onContinueHandler} full disabled={!date}>
          <Copy as="span" scale={8} color="system-white" bold>
            Continue
          </Copy>
        </Button>
      </StepActionsBar>
    </GridContainer>
  )
}
