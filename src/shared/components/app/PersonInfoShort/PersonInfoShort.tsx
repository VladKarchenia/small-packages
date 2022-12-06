import { Copy, Flex, Stack } from "@/shared/components"
import { IconLocationPin } from "@/shared/icons"
import { IPerson } from "@/shared/state"

interface IPersonInfoShortProps {
  person: "sender" | "recipient"
  sender: IPerson
  recipient: IPerson
}

export const PersonInfoShort = ({ person, sender, recipient }: IPersonInfoShortProps) => {
  return (
    <Stack space={12}>
      <Flex align="center">
        <Flex css={{ paddingRight: "$8" }}>
          <IconLocationPin size="xs" />
        </Flex>
        <Copy scale={{ "@initial": 9, "@sm": 8 }} color="system-black">
          {person === "sender" ? sender.name : recipient.name}
        </Copy>
      </Flex>
      <Flex align="center">
        <Flex css={{ paddingRight: "$8" }}>
          <IconLocationPin size="xs" />
        </Flex>
        <Copy scale={{ "@initial": 9, "@sm": 8 }} color="system-black">
          {person === "sender" ? sender.phone : recipient.phone}
        </Copy>
      </Flex>
      {person === "sender" && !!sender.company ? (
        <Flex align="center">
          <Flex css={{ paddingRight: "$8" }}>
            <IconLocationPin size="xs" />
          </Flex>
          <Copy scale={{ "@initial": 9, "@sm": 8 }} color="system-black">
            {sender.company}
          </Copy>
        </Flex>
      ) : null}
      {person === "recipient" && !!recipient.company ? (
        <Flex align="center">
          <Flex css={{ paddingRight: "$8" }}>
            <IconLocationPin size="xs" />
          </Flex>
          <Copy scale={{ "@initial": 9, "@sm": 8 }} color="system-black">
            {recipient.company}
          </Copy>
        </Flex>
      ) : null}
      <Flex align="center">
        <Flex css={{ paddingRight: "$8" }}>
          <IconLocationPin size="xs" />
        </Flex>
        <Copy scale={{ "@initial": 9, "@sm": 8 }} color="system-black">
          {person === "sender" ? sender.fullAddress.location : recipient.fullAddress.location}
        </Copy>
      </Flex>
    </Stack>
  )
}
