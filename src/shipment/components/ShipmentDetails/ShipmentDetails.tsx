import { Controller, useFieldArray, useFormContext } from "react-hook-form"
import {
  Button,
  Copy,
  FormInput,
  FormInputGroup,
  FormInputGroupItem,
  GridContainer,
  Spacer,
  Stack,
  useStepperContext,
} from "@/shared/components"
import { IStepperFormValues, ShipmentStepEnum } from "@/shipment"

export const ShipmentDetails = ({
  handleContinueClick,
}: {
  handleContinueClick: (step: ShipmentStepEnum, nextStep: ShipmentStepEnum) => void
}) => {
  const {
    watch,
    control,
    register,
    formState: { errors },
  } = useFormContext<IStepperFormValues>()
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
                  {...register(field.name, {
                    setValueAs: (v) => (v ? parseFloat(v) : ""),
                    min: {
                      value: 0.1,
                      message: "The minimum weight is 0.1 kg",
                    },
                    max: {
                      value: 10,
                      message: "The maximum weight is 10 kg",
                    },
                  })}
                  id={`parcels.${index}.weight`}
                  label="Weight, kg"
                  type="number"
                  error={errors?.parcels?.[index]?.weight?.message}
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
                      {...register(field.name, {
                        setValueAs: (v) => (v ? parseInt(v) : ""),
                        min: {
                          value: 1,
                          message: "The minimum length is 1 cm",
                        },
                        max: {
                          value: 10,
                          message: "The maximum length is 10 cm",
                        },
                      })}
                      id={`parcels.${index}.dimensions.length`}
                      label="Length"
                      labelProps={{ hidden: true }}
                      description="Length"
                      type="number"
                      error={errors?.parcels?.[index]?.dimensions?.length?.message}
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
                      {...register(field.name, {
                        setValueAs: (v) => (v ? parseInt(v) : ""),
                        min: {
                          value: 1,
                          message: "The minimum width is 1 cm",
                        },
                        max: {
                          value: 10,
                          message: "The maximum width is 10 cm",
                        },
                      })}
                      id={`parcels.${index}.dimensions.width`}
                      label="Width"
                      labelProps={{ hidden: true }}
                      description="Width"
                      type="number"
                      error={errors?.parcels?.[index]?.dimensions?.width?.message}
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
                      {...register(field.name, {
                        setValueAs: (v) => (v ? parseInt(v) : ""),
                        min: {
                          value: 1,
                          message: "The minimum height is 1 cm",
                        },
                        max: {
                          value: 10,
                          message: "The maximum height is 10 cm",
                        },
                      })}
                      id={`parcels.${index}.dimensions.height`}
                      label="Height"
                      labelProps={{ hidden: true }}
                      description="Height"
                      type="number"
                      error={errors?.parcels?.[index]?.dimensions?.height?.message}
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
        full
        // TODO: create a constant for the desabled state
        // TODO: Add if there are an errors
        disabled={
          !parcels[0].weight ||
          !parcels[0].dimensions.length ||
          !parcels[0].dimensions.width ||
          !parcels[0].dimensions.height
        }
      >
        <Copy as="span" scale={8} color="system-white" bold>
          Get rates
        </Copy>
      </Button>
    </GridContainer>
  )
}
