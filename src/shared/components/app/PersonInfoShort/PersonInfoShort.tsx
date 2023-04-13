import { Copy, Flex, Spacer, Stack } from "@/shared/components"
import { IconCompany, IconLocationPin, IconPhone, IconUser } from "@/shared/icons"
import { IPerson } from "@/shared/types"

interface IPersonInfoShortProps {
  person: "sender" | "recipient"
  sender?: IPerson
  recipient?: IPerson
}

export const PersonInfoShort = ({ person, sender, recipient }: IPersonInfoShortProps) => {
  return (
    <Stack space={12} css={{ color: "$theme-b-n5" }}>
      <Flex align="start">
        <IconUser />
        <Spacer size={8} horizontal />
        <Copy>{person === "sender" ? sender?.name : recipient?.name}</Copy>
      </Flex>
      <Flex align="start">
        <IconPhone />
        <Spacer size={8} horizontal />
        <Copy>{person === "sender" ? sender?.phone : recipient?.phone}</Copy>
      </Flex>
      {person === "sender" && !!sender?.company ? (
        <Flex align="start">
          <IconCompany />
          <Spacer size={8} horizontal />
          <Copy>{sender.company}</Copy>
        </Flex>
      ) : null}
      {person === "recipient" && !!recipient?.company ? (
        <Flex align="start">
          <IconCompany />
          <Spacer size={8} horizontal />
          <Copy>{recipient.company}</Copy>
        </Flex>
      ) : null}
      <Flex align="start">
        <IconLocationPin />
        <Spacer size={8} horizontal />
        <Copy>
          {person === "sender"
            ? sender?.fullAddress.displayName
            : recipient?.fullAddress.displayName}
        </Copy>
      </Flex>
      {/* TODO: add tracking number here */}
      {/* {trackingNumber ? (
        <Flex align="start">
            <IconTracking />
          <Spacer size={8} horizontal />
          <Copy>
            {person === "sender" ? sender?.phone : recipient?.phone}
          </Copy>
        </Flex>
      ) : null} */}
    </Stack>
  )
}
