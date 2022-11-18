import { Copy, Flex } from "@/shared/components"
import { IconArrowRight } from "@/shared/icons"

export const AddressInfoShort = ({
  fromAddress,
  toAddress,
}: {
  fromAddress: string
  toAddress: string
}) => {
  return (
    <Flex align="center">
      <Copy scale={8} color="system-black">
        {fromAddress}
      </Copy>
      <Flex css={{ paddingX: "$8" }}>
        <IconArrowRight size="xs" />
      </Flex>
      <Copy scale={8} color="system-black">
        {toAddress}
      </Copy>
    </Flex>
  )
}
