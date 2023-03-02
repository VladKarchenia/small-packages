import { Copy, Flex, Stack } from "@/shared/components"
import { IconCompany, IconLocationPin, IconPhone, IconUser } from "@/shared/icons"
import { IPerson } from "@/shared/types"

interface IPersonInfoShortProps {
  person: "sender" | "recipient"
  sender?: IPerson
  recipient?: IPerson
}

export const PersonInfoShort = ({ person, sender, recipient }: IPersonInfoShortProps) => {
  return (
    <Stack space={12}>
      <Flex align="start">
        <Flex css={{ paddingRight: "$8" }}>
          <IconUser css={{ color: "$neutrals-7" }} />
        </Flex>
        <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
          {person === "sender" ? sender?.name : recipient?.name}
        </Copy>
      </Flex>
      <Flex align="start">
        <Flex css={{ paddingRight: "$8" }}>
          <IconPhone css={{ color: "$neutrals-7" }} />
        </Flex>
        <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
          {person === "sender" ? sender?.phone : recipient?.phone}
        </Copy>
      </Flex>
      {person === "sender" && !!sender?.company ? (
        <Flex align="start">
          <Flex css={{ paddingRight: "$8" }}>
            <IconCompany css={{ color: "$neutrals-7" }} />
          </Flex>
          <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
            {sender.company}
          </Copy>
        </Flex>
      ) : null}
      {person === "recipient" && !!recipient?.company ? (
        <Flex align="start">
          <Flex css={{ paddingRight: "$8" }}>
            <IconCompany css={{ color: "$neutrals-7" }} />
          </Flex>
          <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
            {recipient.company}
          </Copy>
        </Flex>
      ) : null}
      <Flex align="start">
        <Flex css={{ paddingRight: "$8" }}>
          <IconLocationPin css={{ color: "$neutrals-7" }} />
        </Flex>
        <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
          {person === "sender"
            ? sender?.fullAddress.displayName
            : recipient?.fullAddress.displayName}
        </Copy>
      </Flex>
      {/* TODO: add tracking number here */}
      {/* {trackingNumber ? (
        <Flex align="start">
          <Flex css={{ paddingRight: "$8" }}>
            <IconTracking css={{ color: "$neutrals-7" }} />
          </Flex>
          <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
            {person === "sender" ? sender?.phone : recipient?.phone}
          </Copy>
        </Flex>
      ) : null} */}
    </Stack>
  )
}
