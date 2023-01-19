import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { Controller, useFormContext } from "react-hook-form"

import { searchCitiesByZipFn } from "@/api/placeApi"
import { ICitiesByZipResponse } from "@/api/types"
import { ShipmentState } from "@/shared/state"

import { FormInput, FormSelect, Grid, GridItem, Stack } from "@/shared/components"
import { AddressFieldPopover, StepInputGroup } from "@/shipment"

export const ReturnAddressSection = ({ switchValue }: { switchValue: "similar" | "new" }) => {
  const person = "senderReturn"
  const countriesList = ["United States"]
  const [statesList, setStatesList] = useState<ICitiesByZipResponse[]>([])
  const [citiesList, setCitiesList] = useState<string[]>([])

  const {
    control,
    register,
    trigger,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useFormContext<ShipmentState>()

  const country = getValues(`${person}.fullAddress.country`)
  const zipCode = getValues(`${person}.fullAddress.zipCode`)
  const state = getValues(`${person}.fullAddress.state`)

  const { isLoading, isFetching, refetch } = useQuery(
    ["searchReturnCitiesByZip"],
    () =>
      searchCitiesByZipFn({
        country,
        zipCode,
      }),
    {
      enabled: false,
      onSuccess: (data) => {
        if (data.length !== 0) {
          const states = data.map((item) => item.state)

          setStatesList(data)
          setValue(`${person}.fullAddress.state`, state ? state : states[0])
          setCitiesList(data[0].cities)
        } else {
          setError(`${person}.fullAddress.zipCode`, { message: "Zip code not found" })
        }
      },
    },
  )

  useEffect(() => {
    if (zipCode) {
      refetch()
    }
  }, [])

  useEffect(() => {
    if (switchValue === "similar") {
      setValue("senderReturn.name", "")
      setValue("senderReturn.phone", "")
      setValue("senderReturn.extension", "")
      setValue("senderReturn.email", "")
      setValue("senderReturn.company", "")
      setValue("senderReturn.fullAddress.displayName", "")
      setValue("senderReturn.fullAddress.zipCode", "")
      setValue("senderReturn.fullAddress.state", "")
      setValue("senderReturn.fullAddress.city", "")
      setValue("senderReturn.fullAddress.address1", "")
      setValue("senderReturn.fullAddress.address2", "")
      setValue("senderReturn.fullAddress.latitude", "")
      setValue("senderReturn.fullAddress.longitude", "")

      setStatesList([])
      setCitiesList([])
    }
  }, [switchValue, setValue])

  if (switchValue === "similar") return null

  return (
    <Stack space={24} css={{ paddingTop: "$24", "@sm": { paddingTop: "$32" } }}>
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
                  label={"Sender's name"}
                  labelProps={{ hidden: true, required: true }}
                  description={"Sender's name"}
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
                <FormSelect
                  {...field}
                  {...register(field.name, {})}
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

                      setStatesList([])
                      setCitiesList([])
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
                  {...field}
                  {...register(field.name, {
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
                  })}
                  onChange={(e: any) => {
                    let formattedValue = e?.target?.value.replaceAll(" ", "").toUpperCase()

                    if (country === "Canada" && e?.target?.value.replaceAll(" ", "").length > 3) {
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

                      setStatesList([])
                      setCitiesList([])

                      return trigger(`${person}.fullAddress.zipCode`).then((isValid: boolean) => {
                        if (isValid) {
                          refetch()
                        }
                      })
                    }
                  }}
                  id={`${person}.fullAddress.zipCode`}
                  label="Zip code / Postal code"
                  labelProps={{ hidden: true, required: true }}
                  description="Zip code / Postal code"
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
          <Controller
            name={`${person}.fullAddress.state`}
            control={control}
            render={({ field }) => {
              return (
                <FormSelect
                  {...field}
                  {...register(field.name, {})}
                  onValueChange={(value) => {
                    if (value !== field.value) {
                      setValue(`${person}.fullAddress.city`, "")
                      setValue(`${person}.fullAddress.address1`, "")
                      setValue(`${person}.fullAddress.address2`, "")
                      setValue(`${person}.fullAddress.displayName`, "")
                      setValue(`${person}.fullAddress.latitude`, "")
                      setValue(`${person}.fullAddress.longitude`, "")

                      setCitiesList(statesList.find((item) => item.state === value)?.cities || [])
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
              maxLength: {
                value: 40,
                message: "City max length exceeded",
              },
            }}
            render={({ field: { onChange, onBlur, value, name } }) => {
              return (
                <AddressFieldPopover
                  name={name}
                  value={value}
                  onChange={onChange}
                  fieldName="city"
                  id={`${person}.fullAddress.city`}
                  label="City"
                  labelProps={{ hidden: true, required: true }}
                  description="City"
                  disabled={citiesList.length === 0}
                  error={errors[person]?.fullAddress?.city?.message}
                  onBlur={(event: any) => {
                    onBlur()
                    onChange(event?.target?.value !== "" ? event?.target?.value.trim() : "")
                    trigger(`${person}.fullAddress.city`)
                  }}
                  defaultSuggestions={citiesList}
                  person={person}
                />
              )
            }}
          />
        }
      />

      <StepInputGroup
        start={
          // TODO: add validation if address wasn't selected from the list (lat, lng, displayName weren't set)
          <Controller
            name={`${person}.fullAddress.address1`}
            control={control}
            rules={{
              required: {
                value: true,
                message: "Required field",
              },
              maxLength: {
                value: 40,
                message: "Address max length exceeded",
              },
            }}
            render={({ field: { onChange, onBlur, value, name } }) => {
              return (
                <AddressFieldPopover
                  name={name}
                  value={value}
                  onChange={onChange}
                  fieldName="address1"
                  id={`${person}.fullAddress.address1`}
                  label="Address line 1"
                  labelProps={{ hidden: true, required: true }}
                  description="Address line 1"
                  placeholder="Street, apartment"
                  disabled={statesList.length === 0 || citiesList.length === 0}
                  error={errors[person]?.fullAddress?.address1?.message}
                  onBlur={(event: any) => {
                    onBlur()
                    onChange(event?.target?.value !== "" ? event?.target?.value.trim() : "")
                    trigger(`${person}.fullAddress.address1`)
                  }}
                  person={person}
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
    </Stack>
  )
}
