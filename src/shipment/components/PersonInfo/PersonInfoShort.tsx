import { useFormContext } from "react-hook-form"
import { Copy, Flex, Stack } from "@/shared/components"
import { IconLocationPin } from "@/shared/icons"
import { ShipmentState } from "@/shared/state"

export const PersonInfoShort = ({ person }: { person: "sender" | "recipient" }) => {
  const { watch } = useFormContext<ShipmentState>()
  const { sender, recipient } = watch()
  const {
    name: sendersName,
    phone: sendersPhone,
    company: sendersCompany,
    fullAddress: { location: sendersAddress },
  } = sender
  const {
    name: recipientsName,
    phone: recipientsPhone,
    company: recipientsCompany,
    fullAddress: { location: recipientsAddress },
  } = recipient

  return (
    <Stack space={12}>
      <Flex align="center">
        <Flex css={{ paddingRight: "$8" }}>
          <IconLocationPin size="xs" />
        </Flex>
        <Copy scale={8} color="system-black">
          {person === "sender" ? sendersName : recipientsName}
        </Copy>
      </Flex>
      <Flex align="center">
        <Flex css={{ paddingRight: "$8" }}>
          <IconLocationPin size="xs" />
        </Flex>
        <Copy scale={8} color="system-black">
          {person === "sender" ? sendersPhone : recipientsPhone}
        </Copy>
      </Flex>
      {person === "sender" && !!sendersCompany ? (
        <Flex align="center">
          <Flex css={{ paddingRight: "$8" }}>
            <IconLocationPin size="xs" />
          </Flex>
          <Copy scale={8} color="system-black">
            {sendersCompany}
          </Copy>
        </Flex>
      ) : null}
      {person === "recipient" && !!recipientsCompany ? (
        <Flex align="center">
          <Flex css={{ paddingRight: "$8" }}>
            <IconLocationPin size="xs" />
          </Flex>
          <Copy scale={8} color="system-black">
            {recipientsCompany}
          </Copy>
        </Flex>
      ) : null}
      <Flex align="center">
        <Flex css={{ paddingRight: "$8" }}>
          <IconLocationPin size="xs" />
        </Flex>
        <Copy scale={8} color="system-black">
          {person === "sender" ? sendersAddress : recipientsAddress}
        </Copy>
      </Flex>
    </Stack>
  )
}
