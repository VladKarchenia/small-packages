import { Controller, useFieldArray, useFormContext } from "react-hook-form"
// import { object, string, TypeOf } from "zod"
// import { zodResolver } from "@hookform/resolvers/zod"
import {
  Button,
  FormInput,
  FormInputGroup,
  FormInputGroupItem,
  GridContainer,
  Spacer,
  Stack,
  useStepperContext,
} from "@/shared/components"
import { IStepperFormValues, ShipmentStepEnum } from "@/shipment"

// const packageInfoSchema = object({
//   height: string().min(1, "Height is required"),
//   width: string().min(1, "Width is required"),
//   depth: string().min(1, "Depth is required"),
// })

// type PackageInfoInput = TypeOf<typeof packageInfoSchema>

// const defaultValues: PackageInfoInput = {
//   height: "",
//   width: "",
//   depth: "",
// }

export const ShipmentDetails = ({
  handleContinueClick,
}: {
  handleContinueClick: (step: ShipmentStepEnum, nextStep: ShipmentStepEnum) => void
}) => {
  const { watch, control } = useFormContext<IStepperFormValues>()
  const { fields } = useFieldArray({ name: "parcels" })
  const { parcels } = watch()

  const { setSelected } = useStepperContext("ShipmentDetails")

  const onContinueHandler = () => {
    setSelected([ShipmentStepEnum.RATES])
    handleContinueClick(ShipmentStepEnum.SHIPMENT, ShipmentStepEnum.RATES)
  }

  return (
    <GridContainer fullBleed>
      {fields.map((field, index) => (
        <Stack space={24} key={field.id}>
          <Controller
            name={`parcels.${index}.weight`}
            control={control}
            render={({ field }) => {
              return (
                <FormInput
                  {...field}
                  id={`parcels.${index}.weight`}
                  label="Weight, kg"
                  type="text"
                  // error={errors[field.name]?.message}
                />
              )
            }}
          />
          <FormInputGroup id="dimensions-input-group" label="Dimensions, cm">
            <FormInputGroupItem>
              <Controller
                name={`parcels.${index}.dimensions.length`}
                control={control}
                render={({ field }) => {
                  return (
                    <FormInput
                      {...field}
                      id={`parcels.${index}.dimensions.length`}
                      label="Length"
                      labelProps={{ hidden: true }}
                      description="Length"
                      type="text"
                      // error={errors[field.name]?.message}
                    />
                  )
                }}
              />
            </FormInputGroupItem>
            <FormInputGroupItem>
              <Controller
                name={`parcels.${index}.dimensions.width`}
                control={control}
                render={({ field }) => {
                  return (
                    <FormInput
                      {...field}
                      id={`parcels.${index}.dimensions.width`}
                      label="Width"
                      labelProps={{ hidden: true }}
                      description="Width"
                      type="text"
                      // error={errors[field.name]?.message}
                    />
                  )
                }}
              />
            </FormInputGroupItem>
            <FormInputGroupItem>
              <Controller
                name={`parcels.${index}.dimensions.height`}
                control={control}
                render={({ field }) => {
                  return (
                    <FormInput
                      {...field}
                      id={`parcels.${index}.dimensions.height`}
                      label="Height"
                      labelProps={{ hidden: true }}
                      description="Height"
                      type="text"
                      // error={errors[field.name]?.message}
                    />
                  )
                }}
              />
            </FormInputGroupItem>
          </FormInputGroup>
        </Stack>
      ))}

      <Spacer size={32} />
      <Button
        onClick={onContinueHandler}
        color="black"
        full
        disabled={
          !parcels[0].weight ||
          !parcels[0].dimensions.length ||
          !parcels[0].dimensions.width ||
          !parcels[0].dimensions.height
        }
      >
        Get rates
      </Button>
    </GridContainer>
  )
}
