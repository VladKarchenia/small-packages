import { useFormContext } from "react-hook-form"
import { AddressInfoShort } from "@/shared/components"
import { ShipmentState } from "@/shared/state"

export const AddressInfoCollapsed = () => {
  const { watch } = useFormContext<ShipmentState>()
  const { sender, recipient } = watch()

  return (
    <AddressInfoShort
      fromAddress={sender.fullAddress.displayName}
      toAddress={recipient.fullAddress.displayName}
    />
  )
}
