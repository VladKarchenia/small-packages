import { useFormContext } from "react-hook-form"

import { ShipmentState } from "@/shared/state"

import { Copy, Flex, Spacer, Stack } from "@/shared/components"
import { IconClock } from "@/shared/icons"

export const ShipmentDetailsShort = () => {
  const { watch } = useFormContext<ShipmentState>()
  const { parcels } = watch()

  return (
    <Stack space={8}>
      {parcels.map((parcel, index) => (
        <Flex align="center" key={index}>
          <Flex align="center" justify="center" css={{ color: "$system-black" }}>
            <IconClock size="xs" />
          </Flex>
          <Spacer size={12} horizontal />
          <Copy scale={9} color="system-black">
            {parcel.dimensions.length}x{parcel.dimensions.width}x{parcel.dimensions.height} in;
          </Copy>
          <Spacer size={8} horizontal />
          <Copy scale={9} color="system-black">
            {parcel.weight} lb
          </Copy>
        </Flex>
      ))}
    </Stack>
  )
}
