import { Button, Copy, Flex, Hidden, Link, Spacer, useStepperContext } from "@/shared/components"
import { ShipmentState } from "@/shared/state"
import { StepName, ShippingType, StepActionsBar } from "@/shipment"
import { useFormContext } from "react-hook-form"

export const StepperFooter = ({ shippingType }: { shippingType: ShippingType }) => {
  const { watch } = useFormContext<ShipmentState>()
  const { rate, date } = watch()

  const { selected } = useStepperContext("StepperFooter")
  const isLastStep = selected[0] === StepName.RATES

  if (!isLastStep) return null

  return (
    <Flex direction="column" css={{ paddingX: "$16" }}>
      <Spacer size={{ "@initial": 24, "@sm": 32 }} />
      <StepActionsBar shippingType={shippingType}>
        <Button
          type="submit"
          full
          disabled={
            (shippingType === ShippingType.Quote && !date) ||
            (shippingType === ShippingType.Shipment && !rate.name)
          }
        >
          <Copy as="span" scale={8} color="system-white" bold>
            {shippingType === ShippingType.Quote ? "Create a shipment" : "Confirm"}
          </Copy>
        </Button>
      </StepActionsBar>

      <Hidden above="sm">
        <Spacer size={16} />
        <Link href="/" css={{ width: "100%" }}>
          <Copy scale={8} color="system-black" bold>
            Back to Home page
          </Copy>
        </Link>
        <Spacer size={24} />
      </Hidden>
    </Flex>
  )
}
