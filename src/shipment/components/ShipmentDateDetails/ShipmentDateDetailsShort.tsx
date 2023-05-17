import { useFormContext } from "react-hook-form"
import tzlookup from "tz-lookup"
import formatInTimeZone from "date-fns-tz/formatInTimeZone"

import { ShipmentState } from "@/shared/types"

import { Copy, Flex, Stack } from "@/shared/components"
import { IconLocationPin } from "@/shared/icons"

export const ShipmentDateDetailsShort = () => {
  const { watch } = useFormContext<ShipmentState>()
  const { date, sender } = watch()
  const timeZone = tzlookup(
    parseFloat(sender.fullAddress.latitude),
    parseFloat(sender.fullAddress.longitude),
  )

  return (
    <Stack space={8}>
      {date ? (
        <Flex align="center">
          <Flex css={{ paddingRight: "$8" }}>
            <IconLocationPin />
          </Flex>
          <Copy color="theme-b-n3">
            {formatInTimeZone(date, timeZone, "MMM d, yyyy hh:mm aa (zzz)")}
          </Copy>
        </Flex>
      ) : null}
    </Stack>
  )
}
