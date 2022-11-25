import { Controller, useFieldArray, useFormContext } from "react-hook-form"
import {
  Button,
  ButtonIcon,
  Copy,
  Flex,
  FormInput,
  FormInputGroup,
  FormInputGroupItem,
  GridContainer,
  Link,
  Select,
  SelectItem,
  Spacer,
  Stack,
  useStepperContext,
} from "@/shared/components"
import { ShippingType, StepName } from "@/shipment"
import { ShipmentState } from "@/shared/state"
import { PackageType, ParcelContentType, PickupType } from "@/shared/state/ShipmentContext"
import { IconBin, IconPlus } from "@/shared/icons"
import { PARCEL_LIMIT } from "@/constants"

const pickupTypeList: PickupType[] = Object.values(PickupType)
const packageTypeList: PackageType[] = Object.values(PackageType)
const parcelContentTypeList: ParcelContentType[] = Object.values(ParcelContentType)

export const ShipmentDetails = ({
  handleContinueClick,
  shippingType,
}: {
  handleContinueClick: (step: StepName.SHIPMENT, nextStep: StepName.DATE) => void
  shippingType: ShippingType
}) => {
  const {
    setValue,
    watch,
    control,
    register,
    formState: { errors },
  } = useFormContext<ShipmentState>()
  const { fields } = useFieldArray({ name: "parcels" })
  const { parcels } = watch()

  const { setSelected } = useStepperContext("ShipmentDetails")

  const onContinueHandler = () => {
    setSelected([StepName.DATE])
    handleContinueClick(StepName.SHIPMENT, StepName.DATE)
  }

  const onAddParcelClick = () => {
    const newParcelsArray = [
      ...parcels,
      {
        pickupType: PickupType.Schedule,
        weight: "0.1",
        dimensions: {
          length: "1",
          width: "1",
          height: "1",
        },
        packageType: PackageType.Own,
        content: ParcelContentType.Gift,
        totalPrice: "0.1",
        totalCurrency: "USD",
      },
    ]
    setValue("parcels", newParcelsArray)
  }

  const onDeleteParcelClick = (index: number) => {
    const newParcelsArray = parcels.filter((_, idx) => idx !== index)
    setValue("parcels", newParcelsArray)
  }

  return (
    <GridContainer fullBleed>
      <Stack space={32}>
        {fields.map((field, index) => (
          <Stack space={24} key={field.id}>
            {parcels.length > 1 ? (
              <Flex
                align="center"
                justify="between"
                css={{ borderBottom: "1px solid $neutrals-4" }}
              >
                <Copy scale={8} color="system-black" bold>
                  Parcel {index + 1}
                </Copy>
                <ButtonIcon
                  type="button"
                  ariaLabel={`remove parcel ${index + 1}`}
                  icon={<IconBin fixedSize width={20} height={20} />}
                  onClick={() => onDeleteParcelClick(index)}
                />
              </Flex>
            ) : null}

            <Controller
              name={`parcels.${index}.pickupType`}
              control={control}
              render={({ field }) => {
                return (
                  <Select
                    {...field}
                    {...register(field.name, {})}
                    label="Pickup type"
                    labelProps={{ hidden: true, required: true }}
                    description="Pickup type"
                    onValueChange={field.onChange}
                  >
                    {pickupTypeList.map((pickupType) => (
                      <SelectItem key={pickupType} value={pickupType}>
                        {pickupType}
                      </SelectItem>
                    ))}
                  </Select>
                )
              }}
            />

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
                        message: "The minimum weight is 0.1 lb",
                      },
                      max: {
                        value: 10,
                        message: "The maximum weight is 10 lb",
                      },
                    })}
                    id={`parcels.${index}.weight`}
                    label="Weight, lb"
                    labelProps={{ required: true }}
                    type="number"
                    error={errors?.parcels?.[index]?.weight?.message}
                  />
                )
              }}
            />

            <FormInputGroup
              id="dimensions-input-group"
              label="Dimensions, in"
              labelProps={{ required: shippingType === ShippingType.Shipment }}
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
                            message: "The minimum length is 1 in",
                          },
                          max: {
                            value: 10,
                            message: "The maximum length is 10 in",
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
                            message: "The minimum width is 1 in",
                          },
                          max: {
                            value: 10,
                            message: "The maximum width is 10 in",
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
                            message: "The minimum height is 1 in",
                          },
                          max: {
                            value: 10,
                            message: "The maximum height is 10 in",
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

            <Controller
              name={`parcels.${index}.packageType`}
              control={control}
              render={({ field }) => {
                return (
                  <Select
                    {...field}
                    {...register(field.name, {})}
                    label="Package type"
                    labelProps={{ hidden: true, required: true }}
                    description="Package type"
                    onValueChange={field.onChange}
                  >
                    {packageTypeList.map((packageType) => (
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
      </Stack>

      {parcels.length < PARCEL_LIMIT ? (
        <>
          <Spacer size={24} />
          <Link as="button" type="button" onClick={onAddParcelClick}>
            <Copy
              as="span"
              scale={8}
              color="system-black"
              bold
              css={{ display: "flex", alignItems: "center" }}
            >
              <IconPlus size="xs" css={{ color: "$system-black", paddingRight: "$4" }} />
              Add a parcel
            </Copy>
          </Link>
        </>
      ) : null}

      <Spacer size={24} />

      <Button
        onClick={onContinueHandler}
        full
        // TODO: create a constant for the desabled state
        // TODO: Add if there are an errors
        disabled={
          shippingType === ShippingType.Shipment
            ? false
            : !parcels[0].weight ||
              !parcels[0].dimensions.length ||
              !parcels[0].dimensions.width ||
              !parcels[0].dimensions.height
        }
      >
        <Copy as="span" scale={8} color="system-white" bold>
          Continue
        </Copy>
      </Button>
    </GridContainer>
  )
}
