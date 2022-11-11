import { Button, Copy, Flex, Link, Spacer, useStepperContext } from "@/shared/components"
import { StepName, IStepperFormValues, ShippingType } from "@/shipment"
import { useFormContext } from "react-hook-form"

export const StepperFooter = ({ shippingType }: { shippingType: ShippingType }) => {
  const { watch } = useFormContext<IStepperFormValues>()
  const { rate, date } = watch()

  const { selected } = useStepperContext("StepperFooter")
  const isLastStep = selected[0] === StepName.RATES

  if (!isLastStep) return null

  return (
    <Flex direction="column" css={{ paddingX: "$16" }}>
      <Spacer size={24} />
      <Button
        type="submit"
        disabled={
          (shippingType === ShippingType.Quote && !date) ||
          (shippingType === ShippingType.Shipment && !rate.name)
        }
      >
        <Copy as="span" scale={8} color="system-white" bold>
          {shippingType === ShippingType.Quote ? "Create a shipment" : "Confirm"}
        </Copy>
      </Button>
      <Spacer size={16} />
      <Link href="/">
        <Copy scale={8} color="system-black" bold>
          Back to Home page
        </Copy>
      </Link>
      <Spacer size={24} />
    </Flex>
  )
}
