import { useFormContext } from "react-hook-form"
import { Copy, Flex, Spacer } from "@/shared/components"
import { IStepperFormValues } from "../StepperContainer"
import { IconClock } from "@/shared/icons"

export const ShipmentDetailsShort = () => {
  const { watch } = useFormContext<IStepperFormValues>()
  const { parcels } = watch()

  return (
    <>
      {parcels.map((parcel, index) => (
        <Flex align="center" key={index}>
          <Flex
            align="center"
            justify="center"
            css={{
              height: "$32",
              width: "$32",
              minWidth: "$32",
              borderRadius: "$rounded",
              backgroundColor: "$neutrals-3",
              color: "$system-black",
            }}
          >
            <IconClock size="xs" />
          </Flex>
          <Spacer size={12} horizontal />
          <Copy scale={9} color="system-black" bold>
            {parcel.dimensions.length}x{parcel.dimensions.width}x{parcel.dimensions.height} cm;
          </Copy>
          <Spacer size={8} horizontal />
          <Copy scale={9} color="system-black" bold>
            {parcel.weight} kg
          </Copy>
        </Flex>
      ))}
    </>
  )
}
