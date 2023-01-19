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
    <Flex align="center">
      <Copy scale={8} color="system-black">
        {`${fromAddress.country}, ${fromAddress.state}, ${fromAddress.city}`}
      </Copy>
      <Flex css={{ paddingX: "$8" }}>
        <IconArrowRight size="xs" />
      </Flex>
      <Copy scale={8} color="system-black">
        {`${toAddress.country}, ${toAddress.state}, ${toAddress.city}`}
      </Copy>
    </Flex>
  )
}
