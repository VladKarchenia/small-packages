import { IPackaging, IParcel } from "@/shared/types"

import { Copy, Flex, Spacer, Stack } from "@/shared/components"
import { IconCalendar } from "@/shared/icons"

interface IParcelInfoProps {
  packaging: IPackaging
  parcel: IParcel
}

export const ParcelInfo = ({ packaging, parcel }: IParcelInfoProps) => {
  return (
    <Stack space={12} css={{ color: "$theme-b-n3" }}>
      <Flex>
        <Copy>Contents:</Copy>
        <Spacer size={4} horizontal />
        <Copy>{packaging.packageContent}</Copy>
      </Flex>
      <Flex>
        <Copy>Declared value:</Copy>
        <Spacer size={4} horizontal />
        <Copy>${parcel.totalPrice}</Copy>
      </Flex>
      <Flex align="center">
        <Flex align="center" justify="center">
          <IconCalendar />
        </Flex>
        <Spacer size={8} horizontal />
        <Copy>
          {parcel.dimensions.length}x{parcel.dimensions.width}x{parcel.dimensions.height} in;
        </Copy>
        <Spacer size={8} horizontal />
        <Copy>{parcel.weight} lb</Copy>
      </Flex>
      <Flex align="center">
        <Flex align="center" justify="center">
          <IconCalendar />
        </Flex>
        <Spacer size={8} horizontal />
        <Copy>#shipmentID</Copy>
      </Flex>
    </Stack>
  )
}
