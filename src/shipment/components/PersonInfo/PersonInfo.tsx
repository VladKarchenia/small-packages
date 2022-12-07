import { Controller, useFormContext } from "react-hook-form"
import {
  Button,
  Copy,
  FormCheckbox,
  FormInput,
  Grid,
  GridContainer,
  GridItem,
  Select,
  SelectItem,
  Spacer,
  Stack,
  useStepperContext,
} from "@/shared/components"
import { ShippingType, StepActionsBar, StepInputGroup, StepName } from "@/shipment"
import { ShipmentState } from "@/shared/state"

const countriesList = [{ full: "USA" }]

export const PersonInfo = ({
  handleContinueClick,
  person,
}: {
  handleContinueClick: (
    step: StepName.FROM | StepName.TO,
    nextStep: StepName.TO | StepName.SHIPMENT,
  ) => void
  person: "sender" | "recipient"
}) => {
  const {
    watch,
    control,
    register,
    trigger,
    formState: { errors },
  } = useFormContext<ShipmentState>()

  const { sender, recipient } = watch()
  const {
    name: sendersName,
    phone: sendersPhone,
    email: sendersEmail,
    fullAddress: {
      country: sendersCountry,
      zipCode: sendersZipCode,
      state: sendersState,
      city: sendersCity,
      address1: sendersAddress1,
    },
  } = sender
  const {
    name: recipientsName,
    phone: recipientsPhone,
    email: recipientsEmail,
    fullAddress: {
      country: recipientsCountry,
      zipCode: recipientsZipCode,
      state: recipientsState,
      city: recipientsCity,
      address1: recipientsAddress1,
    },
  } = recipient

  const { setSelected } = useStepperContext("PersonInfo")

  const onContinueHandler = () => {
    if (person === "sender") {
      setSelected([StepName.TO])
      handleContinueClick(StepName.FROM, StepName.TO)
    } else {
      setSelected([StepName.SHIPMENT])
      handleContinueClick(StepName.TO, StepName.SHIPMENT)
    }
  }

  return (
    <GridContainer fullBleed>
      <Stack space={24}>
        <StepInputGroup
          start={
            <Controller
              name={`${person}.name`}
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
                      pattern: {
                        value: /^[a-zA-Z\s]*$/,
                        message: "Only alphabetic characters and spaces allowed",
                      },
                      minLength: {
                        value: 2,
                        message: "Name min length not met",
                      },
                      maxLength: {
                        value: 40,
                        message: "Name max length exceeded",
                      },
                    })}
                    onBlur={(event: any) => {
                      field.onChange(event?.target?.value !== "" ? event?.target?.value.trim() : "")
                      trigger(`${person}.name`)
                    }}
                    id={`${person}.name`}
                    label={person === "sender" ? "Sender's name" : "Recipient's name"}
                    labelProps={{ hidden: true, required: true }}
                    description={person === "sender" ? "Sender's name" : "Recipient's name"}
                    type="text"
                    error={errors[person]?.name?.message}
                  />
                )
              }}
            />
          }
          end={
            <Grid columns={"1fr $96"} columnGap={8}>
              <GridItem>
                <Controller
                  name={`${person}.phone`}
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
                          pattern: {
                            value: /^(\+1\d{10})$/,
                            message: "Not match the format: +1 NXX NXX XXXX",
                          },
                        })}
                        onBlur={(event: any) => {
                          field.onChange(
                            event?.target?.value !== "" ? event?.target?.value.trim() : "",
                          )
                          trigger(`${person}.phone`)
                        }}
                        id={`${person}.phone`}
                        label="Phone number"
                        labelProps={{ hidden: true, required: true }}
                        description="Phone number"
                        type="text"
                        error={errors[person]?.phone?.message}
                      />
                    )
                  }}
                />
              </GridItem>
              <GridItem>
                <Controller
                  name={`${person}.extension`}
                  control={control}
                  render={({ field }) => {
                    return (
                      <FormInput
                        {...field}
                        {...register(field.name, {
                          pattern: {
                            value: /^(\d{0,6})$/,
                            message: "Only numeric characters allowed",
                          },
                          maxLength: {
                            value: 6,
                            message: "Extension max length exceeded",
                          },
                        })}
                        onBlur={(event: any) => {
                          field.onChange(
                            event?.target?.value !== "" ? event?.target?.value.trim() : "",
                          )
                          trigger(`${person}.extension`)
                        }}
                        id={`${person}.extension`}
                        label="Extension"
                        labelProps={{ hidden: true }}
                        description="Extension"
                        type="text"
                        error={errors[person]?.extension?.message}
                      />
                    )
                  }}
                />
              </GridItem>
            </Grid>
          }
        />

        <StepInputGroup
          start={
            <Controller
              name={`${person}.company`}
              control={control}
              render={({ field }) => {
                return (
                  <FormInput
                    {...field}
                    {...register(field.name, {
                      minLength: {
                        value: 2,
                        message: "Name min length not met",
                      },
                      maxLength: {
                        value: 40,
                        message: "Name max length exceeded",
                      },
                    })}
                    onBlur={(event: any) => {
                      field.onChange(event?.target?.value !== "" ? event?.target?.value.trim() : "")
                      trigger(`${person}.company`)
                    }}
                    id={`${person}.company`}
                    label="Company name"
                    labelProps={{ hidden: true }}
                    description="Company name"
                    type="text"
                    error={errors[person]?.company?.message}
                  />
                )
              }}
            />
          }
          end={
            <Controller
              name={`${person}.email`}
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
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email",
                      },
                    })}
                    onBlur={(event: any) => {
                      field.onChange(event?.target?.value !== "" ? event?.target?.value.trim() : "")
                      trigger(`${person}.email`)
                    }}
                    id={`${person}.email`}
                    label="Email"
                    labelProps={{ hidden: true, required: true }}
                    description="Email"
                    type="email"
                    error={errors[person]?.email?.message}
                  />
                )
              }}
            />
          }
        />

        <StepInputGroup
          start={
            <Controller
              name={`${person}.fullAddress.country`}
              control={control}
              render={({ field }) => {
                return (
                  <Select
                    {...field}
                    {...register(field.name)}
                    label="Country"
                    labelProps={{ hidden: true, required: true }}
                    description="Country"
                    onValueChange={field.onChange}
                  >
                    {countriesList.map((country) => (
                      <SelectItem key={country.full} value={country.full}>
                        {country.full}
                      </SelectItem>
                    ))}
                  </Select>
                )
              }}
            />
          }
          end={
            <Controller
              name={`${person}.fullAddress.zipCode`}
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
                      // TODO: add not found error after query
                      pattern: {
                        value: /^([0-9]{5}|([0-9]{5}-[0-9]{4}))?$/,
                        message: "Not match the format: XXXXX or XXXXX-XXXX",
                      },
                      minLength: {
                        value: 5,
                        message: "Zip code min length not met",
                      },
                      maxLength: {
                        value: 10,
                        message: "Zip code max length exceeded",
                      },
                    })}
                    onBlur={(event: any) => {
                      field.onChange(event?.target?.value !== "" ? event?.target?.value.trim() : "")
                      trigger(`${person}.fullAddress.zipCode`)
                    }}
                    id={`${person}.fullAddress.zipCode`}
                    label="Zip Code"
                    labelProps={{ hidden: true, required: true }}
                    description="Zip Code"
                    type="text"
                    error={errors[person]?.fullAddress?.zipCode?.message}
                  />
                )
              }}
            />
          }
        />

        <StepInputGroup
          start={
            // TODO: make it as as Select and disable before zipcode was found
            <Controller
              name={`${person}.fullAddress.state`}
              control={control}
              render={({ field }) => {
                return (
                  <FormInput
                    {...field}
                    {...register(field.name)}
                    id={`${person}.fullAddress.state`}
                    label="State"
                    labelProps={{ hidden: true, required: true }}
                    description="State"
                    type="text"
                    error={errors[person]?.fullAddress?.state?.message}
                  />
                )
              }}
            />
          }
          end={
            // TODO: make it as as Select and disable before zipcode was found
            <Controller
              name={`${person}.fullAddress.city`}
              control={control}
              render={({ field }) => {
                return (
                  <FormInput
                    {...field}
                    {...register(field.name)}
                    id={`${person}.fullAddress.city`}
                    label="City"
                    labelProps={{ hidden: true, required: true }}
                    description="City"
                    type="text"
                    error={errors[person]?.fullAddress?.city?.message}
                  />
                )
              }}
            />
          }
        />

        <StepInputGroup
          start={
            <Controller
              name={`${person}.fullAddress.address1`}
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
                      maxLength: {
                        value: 40,
                        message: "Address max length exceeded",
                      },
                    })}
                    onBlur={(event: any) => {
                      field.onChange(event?.target?.value !== "" ? event?.target?.value.trim() : "")
                      trigger(`${person}.fullAddress.address1`)
                    }}
                    id={`${person}.fullAddress.address1`}
                    label="Address line 1"
                    labelProps={{ hidden: true, required: true }}
                    description="Address line 1"
                    placeholder="Street, apartment"
                    type="text"
                    error={errors[person]?.fullAddress?.address1?.message}
                  />
                )
              }}
            />
          }
          end={
            <Controller
              name={`${person}.fullAddress.address2`}
              control={control}
              render={({ field }) => {
                return (
                  <FormInput
                    {...field}
                    {...register(field.name, {
                      maxLength: {
                        value: 40,
                        message: "Address max length exceeded",
                      },
                    })}
                    onBlur={(event: any) => {
                      field.onChange(event?.target?.value !== "" ? event?.target?.value.trim() : "")
                      trigger(`${person}.fullAddress.address2`)
                    }}
                    id={`${person}.fullAddress.address2`}
                    label="Address line 2"
                    labelProps={{ hidden: true }}
                    description="Address line 2"
                    placeholder="House, suite, etc."
                    type="text"
                    error={errors[person]?.fullAddress?.address2?.message}
                  />
                )
              }}
            />
          }
        />

        {person === "recipient" ? (
          <FormCheckbox
            {...register(`${person}.fullAddress.isResidential`)}
            name={`${person}.fullAddress.isResidential`}
            id={`${person}.fullAddress.isResidential`}
            label="This is a residential address"
            error={errors[person]?.fullAddress?.isResidential?.message}
          />
        ) : null}
      </Stack>

      <Spacer size={{ "@initial": 24, "@sm": 32 }} />

      <StepActionsBar shippingType={ShippingType.Shipment}>
        <Button
          onClick={onContinueHandler}
          full
          disabled={
            !!errors.sender ||
            !!errors.recipient ||
            (person === "sender"
              ? !sendersName ||
                !sendersPhone ||
                !sendersEmail ||
                !sendersCountry ||
                !sendersZipCode ||
                !sendersState ||
                !sendersCity ||
                !sendersAddress1
              : !recipientsName ||
                !recipientsPhone ||
                !recipientsEmail ||
                !recipientsCountry ||
                !recipientsZipCode ||
                !recipientsState ||
                !recipientsCity ||
                !recipientsAddress1)
          }
        >
          <Copy as="span" scale={8} color="system-white" bold>
            Continue
          </Copy>
        </Button>
      </StepActionsBar>
    </GridContainer>
  )
}
