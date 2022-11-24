import { useFormContext } from "react-hook-form"
import { Copy, Flex, Stack } from "@/shared/components"
import { IconCross, IconPencil } from "@/shared/icons"
import { ShipmentState } from "@/shared/state"

export const DeliveryRatesShort = () => {
  const { watch } = useFormContext<ShipmentState>()
  const { rate } = watch()

  return (
    <Stack space={8}>
      <Flex align="center">
        <Flex css={{ paddingRight: "$8" }}>
          <IconCross size="xs" />
        </Flex>
        <Copy scale={8} color="system-black">
          {rate.rateType} {rate.name}
        </Copy>
      </Flex>
      <Flex align="center">
        <Flex css={{ paddingRight: "$8" }}>
          <IconPencil size="xs" />
        </Flex>
        <Copy scale={8} color="system-black">
          {rate.currency} {rate.price.toFixed(2)}
        </Copy>
      </Flex>
    </Stack>
  )
}
