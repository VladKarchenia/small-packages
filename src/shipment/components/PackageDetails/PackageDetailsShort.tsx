import { useFormContext } from "react-hook-form"

import { ShipmentState } from "@/shared/types"

import { Copy, Flex, Spacer, Stack } from "@/shared/components"
import { IconClock } from "@/shared/icons"

export const PackageDetailsShort = () => {
  const { watch } = useFormContext<ShipmentState>()
  const { parcels } = watch()

  return (
    <Stack space={8}>
      {Object.values(parcels).map((parcel) => (
        <Flex align="center" key={parcel.packageId}>
          <Flex align="center" justify="center" css={{ color: "$system-black" }}>
            <IconClock />
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
