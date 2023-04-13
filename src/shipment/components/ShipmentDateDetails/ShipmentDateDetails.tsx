import { useFormContext } from "react-hook-form"

import { useBoundStore } from "@/store"
import { ShippingType, ShipmentState } from "@/shared/types"
import { StepName } from "@/shipment/types"
import { INITIAL_READY_DATE_DEFAULT } from "@/constants"

import {
  Copy,
  GridContainer,
  Stack,
  Spacer,
  useStepperContext,
  Button,
  Hidden,
  Title,
} from "@/shared/components"
import { DateInput, StepActionsBar } from "@/shipment/components"

export const ShipmentDateDetails = ({
  handleContinueClick,
}: {
  handleContinueClick: (step: StepName.DATE, nextStep: StepName.RATES) => void
}) => {
  const { watch } = useFormContext<ShipmentState>()
  const { date, sender } = watch()
  const shippingType = useBoundStore((state) => state.shippingType)
  const isDateExpired = date < new Date(INITIAL_READY_DATE_DEFAULT)

  const { setSelected } = useStepperContext("ShipmentDateDetails")

  const onContinueHandler = () => {
    setSelected([StepName.RATES])
    handleContinueClick(StepName.DATE, StepName.RATES)
  }

  return (
    <GridContainer fullBleed>
      <Hidden below="sm">
        <Title as="h3" scale={3}>
          Ready Date & Time
        </Title>
        <Spacer size={40} />
      </Hidden>
      <Stack space={12} css={{ position: "relative" }}>
        <Copy scale={9} color="theme-b-n3">
          Please select a ready date to calculate the cost
        </Copy>
        <DateInput date={date} sender={sender} />
      </Stack>
      <Spacer size={{ "@initial": 24, "@sm": 32 }} />
      <StepActionsBar>
        <Button
          full
          disabled={
            // TODO: add a condition when it's a Shipment and a status is Draft
            shippingType === ShippingType.Quote && isDateExpired
          }
          onClick={onContinueHandler}
        >
          Get rates
        </Button>
      </StepActionsBar>
    </GridContainer>
  )
}
