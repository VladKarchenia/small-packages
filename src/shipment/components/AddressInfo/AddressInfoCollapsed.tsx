import { useFormContext } from "react-hook-form"
import { IStepperFormValues } from "@/shipment"
import { AddressInfoShort } from "@/shared/components"

export const AddressInfoCollapsed = () => {
  const { watch } = useFormContext<IStepperFormValues>()
  const { fromAddress, toAddress } = watch()

  return <AddressInfoShort fromAddress={fromAddress.location} toAddress={toAddress.location} />
}
