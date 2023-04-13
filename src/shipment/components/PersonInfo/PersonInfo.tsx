import { useCallback, useEffect, useMemo } from "react"
import { isAxiosError } from "axios"
import { Controller, useFormContext } from "react-hook-form"

import { ResidentialType, ShipmentState } from "@/shared/types"
import { useCitiesByZipCode } from "@/shipment/hooks"
import { StepName } from "@/shipment/types"

import {
  Button,
  Copy,
  Flex,
  FormCheckbox,
  FormInput,
  FormSelect,
  Grid,
  GridContainer,
  GridItem,
  Hidden,
  Spacer,
  Stack,
  Switch,
  SwitchOption,
  Title,
  useStepperContext,
  useSwitch,
} from "@/shared/components"
import {
  AddressFieldPopover,
  ReturnAddressSection,
  StepActionsBar,
  StepInputGroup,
} from "@/shipment/components"

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
  const countriesList = useMemo(
    () => (person === "sender" ? ["United States"] : ["United States", "Canada"]),
    [person],
  )

  const {
    watch,
    control,
    register,
    trigger,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<ShipmentState>()

  const { sender, senderReturn, recipient, hasReturnAddress } = watch()

  const country = getValues(`${person}.fullAddress.country`)
  const zipCode = getValues(`${person}.fullAddress.zipCode`)
  const state = getValues(`${person}.fullAddress.state`)
  const city = getValues(`${person}.fullAddress.city`)
  const address1 = getValues(`${person}.fullAddress.address1`)
  const address2 = getValues(`${person}.fullAddress.address2`)
  const latitude = getValues(`${person}.fullAddress.latitude`)
  const longitude = getValues(`${person}.fullAddress.longitude`)

  const { setSelected } = useStepperContext("PersonInfo")

  const switchProps = useSwitch<"similar" | "new">(
    "returnAddress",
    hasReturnAddress ? "new" : "similar",
  )

  const onContinueHandler = () => {
    if (person === "sender") {
      setSelected([StepName.TO])
      handleContinueClick(StepName.FROM, StepName.TO)
    } else {
      setSelected([StepName.SHIPMENT])
      handleContinueClick(StepName.TO, StepName.SHIPMENT)
    }
  }

  const { data, status, error } = useCitiesByZipCode({ country, zipCode })

  const statesList = useMemo(() => data?.data || [], [data?.data])
  const citiesList = useMemo(
    () => statesList.find((item) => item.state === state)?.cities || [],
    [statesList, state],
  )
  const zipLatitude = useMemo(() => data?.latitude || "", [data?.latitude])
  const zipLongitude = useMemo(() => data?.longitude || "", [data?.longitude])

  const checkButtonDisability = useCallback(() => {
    if (!!errors.sender || !!errors.senderReturn || !!errors.recipient) {
      return true
    }

    if (person === "sender") {
      if (hasReturnAddress) {
        return (
          !sender.name ||
          !sender.phone ||
          !sender.email ||
          !sender.fullAddress.country ||
          !sender.fullAddress.zipCode ||
          !sender.fullAddress.state ||
          !sender.fullAddress.city ||
          !sender.fullAddress.address1 ||
          !sender.fullAddress.displayName ||
          !senderReturn.name ||
          !senderReturn.phone ||
          !senderReturn.email ||
          !senderReturn.fullAddress.country ||
          !senderReturn.fullAddress.zipCode ||
          !senderReturn.fullAddress.state ||
          !senderReturn.fullAddress.city ||
          !senderReturn.fullAddress.address1 ||
          !senderReturn.fullAddress.displayName
        )
      } else {
        return (
          !sender.name ||
          !sender.phone ||
          !sender.email ||
          !sender.fullAddress.country ||
          !sender.fullAddress.zipCode ||
          !sender.fullAddress.state ||
          !sender.fullAddress.city ||
          !sender.fullAddress.address1 ||
          !sender.fullAddress.displayName
        )
      }
    } else {
      return (
        !recipient.name ||
        !recipient.phone ||
        !recipient.email ||
        !recipient.fullAddress.country ||
        !recipient.fullAddress.zipCode ||
        !recipient.fullAddress.state ||
        !recipient.fullAddress.city ||
        !recipient.fullAddress.address1 ||
        !recipient.fullAddress.displayName
      )
    }
  }, [sender, senderReturn, recipient, errors, hasReturnAddress, person])

  useEffect(() => {
    if (status === "success" && statesList.length !== 0) {
      setValue(`${person}.fullAddress.state`, state ? state : statesList[0].state)
      setValue(`${person}.fullAddress.city`, city ? city : citiesList[0])
      setValue(`${person}.fullAddress.latitude`, latitude ? latitude : zipLatitude)
      setValue(`${person}.fullAddress.longitude`, longitude ? longitude : zipLongitude)

      trigger(`${person}.fullAddress.zipCode`)
    }
  }, [
    status,
    statesList,
    citiesList,
    person,
    state,
    city,
    setValue,
    trigger,
    latitude,
    zipLatitude,
    longitude,
    zipLongitude,
  ])

  useEffect(() => {
    if (isAxiosError(error)) {
      setError(`${person}.fullAddress.zipCode`, {
        type: "validate",
        message: error.response?.data.errorMessage || error.message,
      })
    }
  }, [error, setError, person])

  return (
    <GridContainer fullBleed>
      <Hidden below="sm">
        <Title as="h3" scale={3}>
          {person === "sender" ? "Ship From" : "Ship To"}
        </Title>
        <Spacer size={40} />
      </Hidden>
      <Stack space={24}>
        <StepInputGroup
          start={
            <Controller
              name={`${person}.name`}
              control={control}
              render={({ field }) => {
                return (
                  <FormInput
                    {...register(field.name, {
                      shouldUnregister: true,
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
                    {...field}
                    onBlur={(event) => {
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
            <Grid columns="1fr $96" columnGap={16}>
              <GridItem>
                <Controller
                  name={`${person}.phone`}
                  control={control}
                  render={({ field }) => {
                    return (
                      <FormInput
                        {...register(field.name, {
                          shouldUnregister: true,
                          required: {
                            value: true,
                            message: "Required field",
                          },
                          pattern: {
                            value: /^(\+1\d{10})$/,
                            message: "Not match the format: +1 NXX NXX XXXX",
                          },
                        })}
                        {...field}
                        onBlur={(event) => {
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
                        {...register(field.name, {
                          shouldUnregister: true,
                          pattern: {
                            value: /^(\d{0,6})$/,
                            message: "Only numeric characters allowed",
                          },
                          maxLength: {
                            value: 6,
                            message: "Extension max length exceeded",
                          },
                        })}
                        {...field}
                        onBlur={(event) => {
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
                    {...register(field.name, {
                      shouldUnregister: true,
                      minLength: {
                        value: 2,
                        message: "Name min length not met",
                      },
                      maxLength: {
                        value: 40,
                        message: "Name max length exceeded",
                      },
                    })}
                    {...field}
                    onBlur={(event) => {
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
                    {...register(field.name, {
                      shouldUnregister: true,
                      required: {
                        value: true,
                        message: "Required field",
                      },
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email",
                      },
                    })}
                    {...field}
                    onBlur={(event) => {
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
                  <FormSelect
                    {...register(field.name, { shouldUnregister: true })}
                    {...field}
                    onValueChange={(value) => {
                      if (value !== field.value) {
                        setValue(`${person}.fullAddress.zipCode`, "")
                        setValue(`${person}.fullAddress.state`, "")
                        setValue(`${person}.fullAddress.city`, "")
                        setValue(`${person}.fullAddress.address1`, "")
                        setValue(`${person}.fullAddress.address2`, "")
                        setValue(`${person}.fullAddress.displayName`, "")
                        setValue(`${person}.fullAddress.latitude`, "")
                        setValue(`${person}.fullAddress.longitude`, "")
                        if (person === "recipient") {
                          setValue(
                            `${person}.fullAddress.isResidential`,
                            JSON.parse(ResidentialType.Nonresidential),
                          )
                        }
                      }

                      return field.onChange(value)
                    }}
                    label="Country"
                    labelProps={{ hidden: true, required: true }}
                    description="Country"
                    options={countriesList}
                  />
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
                    {...register(field.name, {
                      shouldUnregister: true,
                      required: {
                        value: true,
                        message: "Required field",
                      },
                      pattern: {
                        value:
                          country === "United States"
                            ? /^([0-9]{5}|([0-9]{5}-[0-9]{4}))?$/
                            : /^([A-Za-z0-9]{3} [A-Za-z0-9]{3})?$/,
                        message:
                          country === "United States"
                            ? "Not match the format: XXXXX or XXXXX-XXXX"
                            : "Not match the format: A1A 1A1",
                      },
                      minLength: {
                        value: country === "United States" ? 5 : 7,
                        message: "Zip code min length not met",
                      },
                      maxLength: {
                        value: country === "United States" ? 10 : 7,
                        message: "Zip code max length exceeded",
                      },
                      validate: {
                        notFound: (_, values) =>
                          !!values[person].fullAddress.state || "Zip code not found",
                      },
                    })}
                    {...field}
                    onChange={(event) => {
                      let formattedValue = event?.target?.value.replaceAll(" ", "").toUpperCase()

                      if (
                        country === "Canada" &&
                        event?.target?.value.replaceAll(" ", "").length > 3
                      ) {
                        formattedValue = formattedValue.replace(/^(.{3})(.*)$/, "$1 $2")
                      }

                      if (formattedValue !== zipCode) {
                        field.onChange(formattedValue)

                        setValue(`${person}.fullAddress.state`, "")
                        setValue(`${person}.fullAddress.city`, "")
                        setValue(`${person}.fullAddress.address1`, "")
                        setValue(`${person}.fullAddress.address2`, "")
                        setValue(`${person}.fullAddress.displayName`, "")
                        setValue(`${person}.fullAddress.latitude`, "")
                        setValue(`${person}.fullAddress.longitude`, "")
                        if (person === "recipient") {
                          setValue(
                            `${person}.fullAddress.isResidential`,
                            JSON.parse(ResidentialType.Nonresidential),
                          )
                        }

                        clearErrors([`${person}.fullAddress.address1`])
                      }
                    }}
                    id={`${person}.fullAddress.zipCode`}
                    label="Zip code / Postal code"
                    labelProps={{ hidden: true, required: true }}
                    description="Zip code / Postal code"
                    type="text"
                    autoComplete="new-password"
                    error={errors[person]?.fullAddress?.zipCode?.message}
                    onBlur={(event) => {
                      field.onBlur()
                      field.onChange(event?.target?.value !== "" ? event?.target?.value.trim() : "")
                      trigger(`${person}.fullAddress.zipCode`)
                    }}
                  />
                )
              }}
            />
          }
        />

        <StepInputGroup
          start={
            <Controller
              name={`${person}.fullAddress.state`}
              control={control}
              render={({ field }) => {
                return (
                  <FormSelect
                    {...register(field.name, { shouldUnregister: true })}
                    {...field}
                    onValueChange={(value) => {
                      if (value !== field.value) {
                        setValue(`${person}.fullAddress.city`, "")
                        setValue(`${person}.fullAddress.address1`, "")
                        setValue(`${person}.fullAddress.address2`, "")
                        setValue(`${person}.fullAddress.displayName`, "")
                        if (person === "recipient") {
                          setValue(
                            `${person}.fullAddress.isResidential`,
                            JSON.parse(ResidentialType.Nonresidential),
                          )
                        }
                      }

                      return field.onChange(value)
                    }}
                    label="State / Province"
                    labelProps={{ hidden: true, required: true }}
                    description="State / Province"
                    options={statesList.map((item) => item.state)}
                    disabled={statesList.length === 0}
                    error={errors[person]?.fullAddress?.state?.message}
                  />
                )
              }}
            />
          }
          end={
            <Controller
              name={`${person}.fullAddress.city`}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Required field",
                },
              }}
              render={({ field }) => {
                return (
                  <FormSelect
                    {...register(field.name, { shouldUnregister: true })}
                    {...field}
                    onValueChange={(value) => {
                      if (value !== field.value) {
                        setValue(`${person}.fullAddress.address1`, "")
                        setValue(`${person}.fullAddress.address2`, "")
                        setValue(`${person}.fullAddress.displayName`, "")
                        if (person === "recipient") {
                          setValue(
                            `${person}.fullAddress.isResidential`,
                            JSON.parse(ResidentialType.Nonresidential),
                          )
                        }
                      }

                      return field.onChange(value)
                    }}
                    label="City"
                    labelProps={{ hidden: true, required: true }}
                    description="City"
                    options={citiesList}
                    disabled={citiesList.length === 0}
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
              rules={{
                required: {
                  value: true,
                  message: "Required field",
                },
                maxLength: {
                  value: 100,
                  message: "Address max length exceeded",
                },
              }}
              render={({ field: { onChange, onBlur, value, name } }) => {
                return (
                  <AddressFieldPopover
                    name={name}
                    value={value}
                    onChange={onChange}
                    id={`${person}.fullAddress.address1`}
                    label="Address line 1"
                    labelProps={{ hidden: true, required: true }}
                    description="Address line 1"
                    placeholder=""
                    disabled={citiesList.length === 0}
                    errorMessage={errors[person]?.fullAddress?.address1?.message}
                    onBlur={(event) => {
                      onBlur()
                      onChange(event?.target?.value !== "" ? event?.target?.value.trim() : "")
                      trigger(`${person}.fullAddress.address1`)
                    }}
                    person={person}
                    zipLatitude={zipLatitude}
                    zipLongitude={zipLongitude}
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
                    {...register(field.name, {
                      shouldUnregister: true,
                      maxLength: {
                        value: 40,
                        message: "Address max length exceeded",
                      },
                    })}
                    {...field}
                    onChange={(event) => {
                      const formattedValue = event?.target?.value.replaceAll(" ", "")

                      if (formattedValue !== address2) {
                        field.onChange(formattedValue)
                        setValue(
                          `${person}.fullAddress.displayName`,
                          formattedValue !== ""
                            ? `${formattedValue}, ${address1}, ${city}, ${state}, ${zipCode}, ${country}`
                            : `${address1}, ${city}, ${state}, ${zipCode}, ${country}`,
                        )
                      }
                    }}
                    onBlur={(event) => {
                      field.onChange(event?.target?.value !== "" ? event?.target?.value.trim() : "")
                      trigger(`${person}.fullAddress.address2`)
                    }}
                    id={`${person}.fullAddress.address2`}
                    label="Address line 2"
                    labelProps={{ hidden: true }}
                    description="Address line 2"
                    placeholder="Apt, suite, etc."
                    disabled={address1.length === 0}
                    type="text"
                    autoComplete="new-password"
                    error={errors[person]?.fullAddress?.address2?.message}
                  />
                )
              }}
            />
          }
        />

        {person === "recipient" ? (
          <Controller
            name={`${person}.fullAddress.isResidential`}
            control={control}
            render={({ field }) => {
              return (
                <FormCheckbox
                  {...register(field.name)}
                  id={`${person}.fullAddress.isResidential`}
                  label="This is a residential address"
                  error={errors[person]?.fullAddress?.isResidential?.message}
                />
              )
            }}
          />
        ) : null}
      </Stack>

      {person === "sender" ? (
        <>
          <Spacer size={{ "@initial": 40, "@md": 48 }} />
          <Flex
            align="center"
            justify={{ "@initial": "between", "@sm": "start" }}
            css={{ gap: "$24" }}
          >
            <Copy scale={5} color="theme-b-n3" fontWeight="bold">
              Use a different return address?
            </Copy>
            <Switch
              {...switchProps}
              onValueChange={(value) => {
                setValue("hasReturnAddress", value === "new")
                setValue("senderReturn.fullAddress.country", value === "new" ? "United States" : "")
                clearErrors(["senderReturn"])
                switchProps.onValueChange(value)
              }}
              checked={switchProps.value === "new"}
            >
              <SwitchOption value={hasReturnAddress ? "similar" : "new"} />
            </Switch>
          </Flex>
          <ReturnAddressSection switchValue={switchProps.value} />
        </>
      ) : null}

      <Spacer size={32} />

      <StepActionsBar>
        <Button full disabled={checkButtonDisability()} onClick={onContinueHandler}>
          Continue
        </Button>
      </StepActionsBar>
    </GridContainer>
  )
}
