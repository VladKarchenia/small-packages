import { useFormContext } from "react-hook-form"
// import { object, string, TypeOf } from "zod"
// import { zodResolver } from "@hookform/resolvers/zod"
import {
  Button,
  FormInput,
  GridContainer,
  Spacer,
  Stack,
  useStepperContext,
} from "@/shared/components"
import { IStepperFormValues, ShipmentStepEnum, LocationInput } from "@/shipment"
// import { LocationInput } from "./LocationInput"
// const addressInfoSchema = object({
//   // fromAddress: string().min(1, "Your address is required"),
//   // toAddress: string().min(1, "Recipient's address is required"),
//   fromAddress: string(),
//   toAddress: string(),
// })

// type AddressInfoInput = TypeOf<typeof addressInfoSchema>

// const defaultValues: AddressInfoInput = {
//   fromAddress: "",
//   toAddress: "",
// }

export const AddressInfo = ({
  handleContinueClick,
}: {
  handleContinueClick: (step: ShipmentStepEnum, nextStep: ShipmentStepEnum) => void
}) => {
  const { setValue, watch } = useFormContext<IStepperFormValues>()

  const { fromAddress, toAddress } = watch()

  const { setSelected } = useStepperContext("AddressInfo")

  const onContinueHandler = () => {
    setSelected([ShipmentStepEnum.SHIPMENT])
    handleContinueClick(ShipmentStepEnum.INFO, ShipmentStepEnum.SHIPMENT)
  }

  return (
    <GridContainer fullBleed>
      <Stack space={8}>
        <LocationInput
          initialValue={fromAddress}
          onChange={(destination) => {
            setValue("fromAddress", destination)
          }}
          placeholder="From"
        />
        <LocationInput
          initialValue={toAddress}
          onChange={(destination) => {
            setValue("toAddress", destination)
          }}
          placeholder="To"
        />
      </Stack>
      <Spacer size={32} />
      <Button
        onClick={onContinueHandler}
        color="black"
        full
        // disabled={!fromAddress.location || !toAddress.location}
      >
        Continue
      </Button>
    </GridContainer>
  )
}
