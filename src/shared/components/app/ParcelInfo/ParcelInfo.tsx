import { IPackaging, IParcel } from "@/shared/types"

import { Copy, Flex, Spacer, Stack } from "@/shared/components"
import { IconCalendar } from "@/shared/icons"

interface IParcelInfoProps {
  packaging: IPackaging
  parcel: IParcel
}

export const ParcelInfo = ({ packaging, parcel }: IParcelInfoProps) => {
  return (
    <Stack space={12}>
      <Flex>
        <Copy scale={{ "@initial": 9, "@sm": 8 }} color="neutrals-7">
          Contents:
        </Copy>
        <Spacer size={4} horizontal />
        <Copy scale={{ "@initial": 9, "@sm": 8 }} color="system-black">
          {packaging.packageContent}
        </Copy>
      </Flex>
      <Flex>
        <Copy scale={{ "@initial": 9, "@sm": 8 }} color="neutrals-7">
          Declared value:
        </Copy>
        <Spacer size={4} horizontal />
        <Copy scale={{ "@initial": 9, "@sm": 8 }} color="system-black">
          ${parcel.totalPrice}
        </Copy>
      </Flex>
      <Flex align="center">
        <Flex align="center" justify="center">
          <IconCalendar />
        </Flex>
        <Spacer size={8} horizontal />
        <Copy scale={{ "@initial": 9, "@sm": 8 }} color="system-black">
          {parcel.dimensions.length}x{parcel.dimensions.width}x{parcel.dimensions.height} in;
        </Copy>
        <Spacer size={8} horizontal />
        <Copy scale={{ "@initial": 9, "@sm": 8 }} color="system-black">
          {parcel.weight} lb
        </Copy>
      </Flex>
      <Flex align="center">
        <Flex align="center" justify="center">
          <IconCalendar />
        </Flex>
        <Spacer size={8} horizontal />
        <Copy scale={{ "@initial": 9, "@sm": 8 }} color="system-black">
          #shipmentID
        </Copy>
      </Flex>
    </Stack>
  )
}
