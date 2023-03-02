import { useFormContext } from "react-hook-form"

import { ShipmentState } from "@/shared/types"

import { PersonInfoShort } from "@/shared/components"

export const PersonInfoCollapsed = ({ person }: { person: "sender" | "recipient" }) => {
  const { watch } = useFormContext<ShipmentState>()
  const { sender, recipient } = watch()

  return <PersonInfoShort person={person} sender={sender} recipient={recipient} />
}
