import { Controller, useFieldArray, useFormContext } from "react-hook-form"
import {
  Box,
  Button,
  ButtonIcon,
  Copy,
  ErrorLabel,
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
import { ShippingType, StepActionsBar, StepInputGroup, StepName } from "@/shipment"
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
    trigger,
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
        weight: "1.0",
        dimensions: {
          length: "1",
          width: "1",
          height: "1",
        },
        packageType: PackageType.Own,
        content: ParcelContentType.Gift,
        totalPrice: "20.00",
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
      <Stack space={{ "@initial": 32, "@sm": 48 }}>
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

            <StepInputGroup
              start={
                <Controller
                  name={`parcels.${index}.pickupType`}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Select
                        {...field}
                        {...register(field.name)}
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
              }
              end={
                <Controller
                  name={`parcels.${index}.weight`}
                  control={control}
                  render={({ field }) => {
                    return (
                      <FormInput
                        {...field}
                        {...register(field.name, {
                          required: {
                            value: true,
                            message: "Required field",
                          },
                          validate: {
                            min: (v: string) => parseFloat(v) >= 0.1 || "Weight min value not met",
                            max: (v: string) =>
                              parseFloat(v) <= 99.9 || "Weight max value exceeded",
                          },
                        })}
                        onBlur={(event: any) => {
                          field.onChange(
                            event?.target?.value !== ""
                              ? parseFloat(event?.target?.value).toFixed(1)
                              : "",
                          )
                          trigger(`parcels.${index}.weight`)
                        }}
                        onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
                          if (event.key === "e" || event.key === "-" || event.key === "+") {
                            event.preventDefault()
                          }
                        }}
                        id={`parcels.${index}.weight`}
                        label="Weight, lb"
                        description="Weight, lb"
                        labelProps={{ hidden: true, required: true }}
                        type="number"
                        error={errors?.parcels?.[index]?.weight?.message}
                      />
                    )
                  }}
                />
              }
            />

            <StepInputGroup
              start={
                <>
                  <FormInputGroup
                    id="dimensions-input-group"
                    label="Dimensions, in"
                    labelProps={{ hidden: true, required: shippingType === ShippingType.Shipment }}
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
                                required: {
                                  value: shippingType === ShippingType.Shipment,
                                  message: "Length field required",
                                },
                                setValueAs: (v) => (v ? parseInt(v) : ""),
                                // setValueAs: (v) => {
                                //   if (v) {
                                //     if (parseInt(v) < 0) {
                                //       return 1
                                //     }

                                //     if (parseInt(v) > 99) {
                                //       return 99
                                //     }

                                //     return parseInt(v)
                                //   }

                                //   return ""
                                // },
                                min: {
                                  value: 1,
                                  message: "Length min value not met",
                                },
                                max: {
                                  value: 99,
                                  message: "Length max value exceeded",
                                },
                              })}
                              onBlur={(event: any) => {
                                field.onChange(
                                  event?.target?.value !== ""
                                    ? parseInt(event?.target?.value).toFixed()
                                    : "",
                                )
                                trigger(`parcels.${index}.dimensions.length`)
                              }}
                              onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
                                if (event.key === "e" || event.key === "-" || event.key === "+") {
                                  event.preventDefault()
                                }
                              }}
                              id={`parcels.${index}.dimensions.length`}
                              label="Length, in"
                              labelProps={{ hidden: true }}
                              description="Length, in"
                              type="number"
                              hasError={!!errors?.parcels?.[index]?.dimensions?.length?.message}
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
                                required: {
                                  value: shippingType === ShippingType.Shipment,
                                  message: "Width field required",
                                },
                                setValueAs: (v) => (v ? parseInt(v) : ""),
                                // setValueAs: (v) => {
                                //   if (v) {
                                //     if (parseInt(v) < 0) {
                                //       return 1
                                //     }

                                //     if (parseInt(v) > 99) {
                                //       return 99
                                //     }

                                //     return parseInt(v)
                                //   }

                                //   return ""
                                // },
                                min: {
                                  value: 1,
                                  message: "Width min value not met",
                                },
                                max: {
                                  value: 99,
                                  message: "Width max value exceeded",
                                },
                              })}
                              onBlur={(event: any) => {
                                field.onChange(
                                  event?.target?.value !== ""
                                    ? parseInt(event?.target?.value).toFixed()
                                    : "",
                                )
                                trigger(`parcels.${index}.dimensions.width`)
                              }}
                              onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
                                if (event.key === "e" || event.key === "-" || event.key === "+") {
                                  event.preventDefault()
                                }
                              }}
                              id={`parcels.${index}.dimensions.width`}
                              label="Width, in"
                              labelProps={{ hidden: true }}
                              description="Width, in"
                              type="number"
                              hasError={!!errors?.parcels?.[index]?.dimensions?.width?.message}
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
                                required: {
                                  value: shippingType === ShippingType.Shipment,
                                  message: "Height field required",
                                },
                                setValueAs: (v) => (v ? parseInt(v) : ""),
                                // setValueAs: (v) => {
                                //   if (v) {
                                //     if (parseInt(v) < 0) {
                                //       return 1
                                //     }

                                //     if (parseInt(v) > 99) {
                                //       return 99
                                //     }

                                //     return parseInt(v)
                                //   }

                                //   return ""
                                // },
                                min: {
                                  value: 1,
                                  message: "Height min value not met",
                                },
                                max: {
                                  value: 99,
                                  message: "Height max value exceeded",
                                },
                              })}
                              onBlur={(event: any) => {
                                field.onChange(
                                  event?.target?.value !== ""
                                    ? parseInt(event?.target?.value).toFixed()
                                    : "",
                                )
                                trigger(`parcels.${index}.dimensions.height`)
                              }}
                              onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
                                if (event.key === "e" || event.key === "-" || event.key === "+") {
                                  event.preventDefault()
                                }
                              }}
                              id={`parcels.${index}.dimensions.height`}
                              label="Height, in"
                              labelProps={{ hidden: true }}
                              description="Height, in"
                              type="number"
                              hasError={!!errors?.parcels?.[index]?.dimensions?.height?.message}
                            />
                          )
                        }}
                      />
                    </FormInputGroupItem>
                  </FormInputGroup>
                  {errors?.parcels?.[index]?.dimensions?.length?.message ||
                  errors?.parcels?.[index]?.dimensions?.width?.message ||
                  errors?.parcels?.[index]?.dimensions?.height?.message ? (
                    <Box css={{ position: "absolute" }}>
                      <Flex>
                        <ErrorLabel>
                          {errors?.parcels?.[index]?.dimensions?.length?.message ||
                            errors?.parcels?.[index]?.dimensions?.width?.message ||
                            errors?.parcels?.[index]?.dimensions?.height?.message}
                        </ErrorLabel>
                      </Flex>
                    </Box>
                  ) : null}
                </>
              }
              end={
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
              }
            />

            {shippingType === ShippingType.Shipment ? (
              <StepInputGroup
                start={
                  <Controller
                    name={`parcels.${index}.content`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <Select
                          {...field}
                          {...register(field.name, {})}
                          label="Package contents"
                          labelProps={{ hidden: true, required: true }}
                          description="Package contents"
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
                }
                end={
                  // TODO: Make a price number field with currency selection
                  <Controller
                    name={`parcels.${index}.totalPrice`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <FormInput
                          {...field}
                          {...register(field.name, {
                            required: {
                              value: true,
                              message: "Required field",
                            },
                            validate: {
                              min: (v: string) => parseFloat(v) >= 0.1 || "Min value not met",
                              max: (v: string) =>
                                parseFloat(v) <= 99999999.99 || "Max value exceeded",
                            },
                          })}
                          onBlur={(event: any) => {
                            field.onChange(
                              event?.target?.value !== ""
                                ? parseFloat(event?.target?.value).toFixed(2)
                                : "",
                            )
                            trigger(`parcels.${index}.totalPrice`)
                          }}
                          onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
                            if (event.key === "e" || event.key === "-" || event.key === "+") {
                              event.preventDefault()
                            }
                          }}
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
                }
              />
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

      <Spacer size={{ "@initial": 24, "@sm": 32 }} />

      <StepActionsBar shippingType={shippingType}>
        <Button onClick={onContinueHandler} full disabled={!!errors.parcels}>
          <Copy as="span" scale={8} color="system-white" bold>
            Continue
          </Copy>
        </Button>
      </StepActionsBar>
    </GridContainer>
  )
}
