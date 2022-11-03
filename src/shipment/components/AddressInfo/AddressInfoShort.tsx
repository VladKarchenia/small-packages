import { useFormContext } from "react-hook-form"
import { Copy, Flex } from "@/shared/components"
import { IStepperFormValues } from "../StepperContainer"
import { IconArrowRight } from "@/shared/icons"

export const AddressInfoShort = () => {
  const { watch } = useFormContext<IStepperFormValues>()
  const { fromAddress, toAddress } = watch()

  return (
    <Flex align="center">
      <Copy scale={8} color="system-black">
        {fromAddress.location}
      </Copy>
      <Flex css={{ paddingX: "$8" }}>
        <IconArrowRight size="xs" />
      </Flex>
      <Copy scale={8} color="system-black">
        {toAddress.location}
      </Copy>
    </Flex>
  )
}
