import { useFormContext } from "react-hook-form"
import { IStepperFormValues } from "@/shipment"
import { AddressInfoInLine } from "@/shared/components/app"

export const AddressInfoShort = () => {
  const { watch } = useFormContext<IStepperFormValues>()
  const { fromAddress, toAddress } = watch()

  return <AddressInfoInLine fromAddress={fromAddress.location} toAddress={toAddress.location} />
}
