import { useFormContext } from "react-hook-form"
import { Copy, Flex, Stack } from "@/shared/components"
import { IStepperFormValues } from "../StepperContainer"
import { IconCross, IconLocationPin, IconPencil } from "@/shared/icons"
import format from "date-fns/format"

export const DeliveryRatesShort = () => {
  const { watch } = useFormContext<IStepperFormValues>()
  const { rate, date } = watch()

  return (
    <Stack space={8}>
      {date ? (
        <Flex align="center">
          <Flex css={{ paddingRight: "$8" }}>
            <IconLocationPin size="xs" />
          </Flex>
          <Copy scale={8} color="system-black">
            {format(date, "dd.MM.yyyy")}
          </Copy>
        </Flex>
      ) : null}
      <Flex align="center">
        <Flex css={{ paddingRight: "$8" }}>
          <IconCross size="xs" />
        </Flex>
        <Copy scale={8} color="system-black">
          {rate.type} {rate.name}
        </Copy>
      </Flex>
      <Flex align="center">
        <Flex css={{ paddingRight: "$8" }}>
          <IconPencil size="xs" />
        </Flex>
        <Copy scale={8} color="system-black">
          {rate.currency} {rate.price}
        </Copy>
      </Flex>
    </Stack>
  )
}
