import { useFormContext } from "react-hook-form"
import { Button, Copy, GridContainer, Spacer, Stack, useStepperContext } from "@/shared/components"
import { IStepperFormValues, ShipmentStepEnum, LocationInput } from "@/shipment"

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
        full
        disabled={
          !fromAddress.location ||
          !toAddress.location ||
          // TODO: need to add better condition to prevent same from and to addresses using ID or some field
          fromAddress.location === toAddress.location
        }
      >
        {/* TODO: fix default button copy */}
        <Copy as="span" scale={8} color="system-white" bold>
          Continue
        </Copy>
      </Button>
    </GridContainer>
  )
}
