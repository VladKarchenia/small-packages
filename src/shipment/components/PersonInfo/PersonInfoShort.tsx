import { useFormContext } from "react-hook-form"
import { ShipmentState } from "@/shared/state"
import { PersonInfoShortCard } from "@/shared/components/app"

export const PersonInfoShort = ({ person }: { person: "sender" | "recipient" }) => {
  const { watch } = useFormContext<ShipmentState>()
  const { sender, recipient } = watch()

  return <PersonInfoShortCard person={person} sender={sender} recipient={recipient} />
}
