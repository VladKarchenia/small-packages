import { useFormContext } from "react-hook-form"

import { ShipmentState } from "@/shared/types"

import { AddressInfoShort } from "@/shared/components"

export const AddressInfoCollapsed = () => {
  const { watch } = useFormContext<ShipmentState>()
  const { sender, recipient } = watch()

  return <AddressInfoShort fromAddress={sender.fullAddress} toAddress={recipient.fullAddress} />
}
