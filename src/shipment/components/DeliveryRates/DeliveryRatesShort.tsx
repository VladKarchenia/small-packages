import { useFormContext } from "react-hook-form"

import { ShipmentState } from "@/shared/types"

import { Copy, Flex, Stack } from "@/shared/components"
import { IconCross, IconPencil } from "@/shared/icons"

export const DeliveryRatesShort = () => {
  const { watch } = useFormContext<ShipmentState>()
  const { rate } = watch()

  return (
    <Stack space={8}>
      <Flex align="center">
        <Flex css={{ paddingRight: "$8" }}>
          <IconCross />
        </Flex>
        <Copy scale={8} color="system-black">
          {rate.rateType} {rate.name}
        </Copy>
      </Flex>
      <Flex align="center">
        <Flex css={{ paddingRight: "$8" }}>
          <IconPencil />
        </Flex>
        <Copy scale={8} color="system-black">
          {rate.currency} {rate.price.toFixed(2)}
        </Copy>
      </Flex>
    </Stack>
  )
}
