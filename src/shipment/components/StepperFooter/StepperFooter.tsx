import { Button, Copy, Flex, Link, Spacer, useStepperContext } from "@/shared/components"
import { ShipmentStepEnum } from "@/shipment"
import { useFormContext } from "react-hook-form"
import { IStepperFormValues } from "../StepperContainer"

export const StepperFooter = () => {
  const { watch } = useFormContext<IStepperFormValues>()
  const { rate } = watch()

  const { selected } = useStepperContext("StepperFooter")
  const isLastStep = selected[0] === ShipmentStepEnum.RATES

  if (!isLastStep) return null

  return (
    <Flex direction="column" css={{ paddingX: "$16" }}>
      <Spacer size={24} />
      <Button type="submit" disabled={!rate.name} color="black">
        <Copy scale={8} color="system-white" bold>
          Create a shipment
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
