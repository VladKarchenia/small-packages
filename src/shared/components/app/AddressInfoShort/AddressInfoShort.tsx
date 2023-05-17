import { IAddress } from "@/shared/types"

import { Copy, Flex } from "@/shared/components"
import { IconArrowRight } from "@/shared/icons"

export const AddressInfoShort = ({
  fromAddress,
  toAddress,
}: {
  fromAddress: IAddress
  toAddress: IAddress
}) => {
  return (
    <Flex align="center" css={{ color: "$theme-b-n5" }}>
      <Copy>{`${fromAddress.country}, ${fromAddress.state}, ${fromAddress.city}`}</Copy>
      <Flex css={{ paddingX: "$8" }}>
        <IconArrowRight />
      </Flex>
      <Copy>{`${toAddress.country}, ${toAddress.state}, ${toAddress.city}`}</Copy>
    </Flex>
  )
}
