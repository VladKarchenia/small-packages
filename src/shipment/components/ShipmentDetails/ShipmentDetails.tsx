import { Controller, useFieldArray, useFormContext } from "react-hook-form"
import {
  Button,
  Copy,
  FormInput,
  FormInputGroup,
  FormInputGroupItem,
  GridContainer,
  Select,
  SelectItem,
  Spacer,
  Stack,
  useStepperContext,
} from "@/shared/components"
import { IStepperFormValues, ShippingType, StepName } from "@/shipment"
import { ParcelType, ParcelContentType } from "@/shared/state/ShipmentContext"

const parcelTypeList: ParcelType[] = [ParcelType.Own, ParcelType.Product]

const parcelContentTypeList: ParcelContentType[] = [ParcelContentType.Gift, ParcelContentType.Other]

export const ShipmentDetails = ({
  handleContinueClick,
  shippingType,
}: {
  handleContinueClick: (step: StepName.SHIPMENT, nextStep: StepName.RATES) => void
  shippingType: ShippingType
}) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<IStepperFormValues>()
  const { fields } = useFieldArray({ name: "parcels" })

  const { setSelected } = useStepperContext("ShipmentDetails")

  const onContinueHandler = () => {
    setSelected([StepName.RATES])
    handleContinueClick(StepName.SHIPMENT, StepName.RATES)
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
                  labelProps={{ hidden: true, required: true }}
                  description="Weight, kg"
                  type="number"
                  error={errors?.parcels?.[index]?.weight?.message}
                />
              )
            }}
          />
          <FormInputGroup
            id="dimensions-input-group"
            label="Dimensions, cm"
            labelProps={{ hidden: true }}
          >
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
                      label="Length, cm"
                      labelProps={{ hidden: true, required: true }}
                      description="Length, cm"
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
                      label="Width, cm"
                      labelProps={{ hidden: true, required: true }}
                      description="Width, cm"
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
                      label="Height, cm"
                      labelProps={{ hidden: true, required: true }}
                      description="Height, cm"
                      type="number"
                      error={errors?.parcels?.[index]?.dimensions?.height?.message}
                    />
                  )
                }}
              />
            </FormInputGroupItem>
          </FormInputGroup>
          <Controller
            name={`parcels.${index}.parcelType`}
            control={control}
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  {...register(field.name, {})}
                  label="Type of the package"
                  labelProps={{ hidden: true, required: true }}
                  description="Type of the package"
                  onValueChange={field.onChange}
                >
                  {parcelTypeList.map((packageType) => (
                    <SelectItem key={packageType} value={packageType}>
                      {packageType}
                    </SelectItem>
                  ))}
                </Select>
              )
            }}
          />
          {shippingType === ShippingType.Shipment ? (
            <Stack space={24}>
              <Controller
                name={`parcels.${index}.content`}
                control={control}
                render={({ field }) => {
                  return (
                    <Select
                      {...field}
                      {...register(field.name, {})}
                      label="What kind of package contents are you shipping?"
                      labelProps={{ hidden: true, required: true }}
                      description="What kind of package contents are you shipping?"
                      onValueChange={field.onChange}
                    >
                      {parcelContentTypeList.map((parcelContentType) => (
                        <SelectItem key={parcelContentType} value={parcelContentType}>
                          {parcelContentType}
                        </SelectItem>
                      ))}
                    </Select>
                  )
                }}
              />
              <Controller
                name={`parcels.${index}.description`}
                control={control}
                render={({ field }) => {
                  return (
                    <FormInput
                      {...field}
                      {...register(field.name, {})}
                      id={`parcels.${index}.description`}
                      label="Content description"
                      labelProps={{ hidden: true, required: true }}
                      description="Content description"
                      type="text"
                      error={errors?.parcels?.[index]?.description?.message}
                    />
                  )
                }}
              />
              {/* TODO: Make a price number field with currency selection and validation */}
              <Controller
                name={`parcels.${index}.totalPrice`}
                control={control}
                render={({ field }) => {
                  return (
                    <FormInput
                      {...field}
                      {...register(field.name, {
                        setValueAs: (v) => (v ? parseFloat(v) : ""),
                        min: {
                          value: 1,
                          message: "The minimum value is 1 USD",
                        },
                        max: {
                          value: 10000,
                          message: "The maximum value is 10000 USD",
                        },
                      })}
                      id={`parcels.${index}.totalPrice`}
                      label="Total Parcel Value, USD"
                      labelProps={{ hidden: true, required: true }}
                      description="Total Parcel Value, USD"
                      type="number"
                      error={errors?.parcels?.[index]?.totalPrice?.message}
                    />
                  )
                }}
              />
            </Stack>
          ) : null}
        </Stack>
      ))}

      <Spacer size={32} />
      <Button
        onClick={onContinueHandler}
        full
        // TODO: create a constant for the desabled state
        // TODO: Add if there are an errors
        // disabled={
        //   shippingType === ShippingType.Shipment
        //     ? false
        //     : !parcels[0].weight ||
        //       !parcels[0].dimensions.length ||
        //       !parcels[0].dimensions.width ||
        //       !parcels[0].dimensions.height
        // }
      >
        <Copy as="span" scale={8} color="system-white" bold>
          Continue
        </Copy>
      </Button>
    </GridContainer>
  )
}
