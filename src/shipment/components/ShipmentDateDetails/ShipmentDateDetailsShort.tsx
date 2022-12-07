import { useFormContext } from "react-hook-form"
import format from "date-fns/format"
import { Copy, Flex, Stack } from "@/shared/components"
import { IconLocationPin } from "@/shared/icons"
import { ShipmentState } from "@/shared/state"

export const ShipmentDateDetailsShort = () => {
  const { watch } = useFormContext<ShipmentState>()
  const { date } = watch()

  return (
    <Stack space={8}>
      {date ? (
        <Flex align="center">
          <Flex css={{ paddingRight: "$8" }}>
            <IconLocationPin size="xs" />
          </Flex>
          <Copy scale={8} color="system-black">
            {format(date, "MMM d, yyyy hh:mm aa")}
          </Copy>
        </Flex>
      ) : null}
    </Stack>
  )
}
