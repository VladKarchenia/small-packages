import { Controller, useFormContext } from "react-hook-form"

import { ChangePersonPreferencesInput } from "@/api/types"
import { Currency, PackagingType, PickupType, UnitOfMeasure } from "@/shared/types"

import { Flex, FormInput, Spacer, Stack, Title, Copy, FormSelect } from "@/shared/components"
import { SaveButton, TimeInput } from "@/settings/components"

export const ChangePersonPreferencesForm = ({ isLoading }: { isLoading: boolean }) => {
  const { control, register, watch } = useFormContext<ChangePersonPreferencesInput>()
  const packagingTypeList: PackagingType[] = Object.values(PackagingType)
  const currencyList: Currency[] = Object.values(Currency)
  const unitOfMeasureList: UnitOfMeasure[] = Object.values(UnitOfMeasure)
  const pickupTypeList: PickupType[] = Object.values(PickupType)
  const quoteExpirationDaysList: number[] = [1, 3, 7, 10, 15]

  const { readyTime } = watch()

  return (
    <Flex justify="center" direction="column" css={{ maxWidth: 1000 }}>
      <Stack space={56}>
        <Stack space={24}>
          <Title as="h3" scale={5} color="theme-b-n3">
            Ready time
          </Title>
          <Stack space={4}>
            <Copy scale={10} color="neutrals-5" fontWeight={"semiBold"}>
              Please, select a ready date to calculate the cost
            </Copy>
            <TimeInput time={readyTime} />
          </Stack>
        </Stack>
        <Stack space={24}>
          <Title as="h3" scale={5} color="theme-b-n3">
            Expiration time for quotes and draft shipments
          </Title>
          <Controller
            name="quoteExpirationDays"
            control={control}
            render={({ field }) => {
              return (
                <FormSelect
                  {...register(field.name, {
                    shouldUnregister: true,
                  })}
                  {...field}
                  onValueChange={field.onChange}
                  label="Select default number of days"
                  labelProps={{ hidden: true, required: true }}
                  description="Select default number of days"
                  options={quoteExpirationDaysList}
                />
              )
            }}
          />
        </Stack>
        <Stack space={24}>
          <Title as="h3" scale={5} color="theme-b-n3">
            Package and Shipment details
          </Title>

          <Controller
            name="packagingType"
            control={control}
            render={({ field }) => {
              return (
                <FormSelect
                  {...register(field.name, {
                    shouldUnregister: true,
                  })}
                  {...field}
                  onValueChange={field.onChange}
                  label="Select default package type"
                  labelProps={{ hidden: true, required: true }}
                  description="Select default package type"
                  options={packagingTypeList}
                />
              )
            }}
          />

          <Controller
            name="declaredValue"
            control={control}
            render={({ field }) => {
              return (
                <FormInput
                  {...register(field.name, {
                    shouldUnregister: true,
                  })}
                  onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
                    if (
                      event.key === "e" ||
                      event.key === "-" ||
                      event.key === "+" ||
                      event.key === "." ||
                      event.key === ","
                    ) {
                      event.preventDefault()
                    }
                  }}
                  {...field}
                  label="Select default declared value"
                  type="number"
                />
              )
            }}
          />
          <Controller
            name="currency"
            control={control}
            render={({ field }) => {
              return (
                <FormSelect
                  {...register(field.name, {
                    shouldUnregister: true,
                  })}
                  {...field}
                  onValueChange={field.onChange}
                  label="Select default currency"
                  labelProps={{ hidden: true, required: true }}
                  description="Select default currency"
                  options={currencyList}
                />
              )
            }}
          />

          <Controller
            name="unitOfMeasure"
            control={control}
            render={({ field }) => {
              return (
                <FormSelect
                  {...register(field.name, {
                    shouldUnregister: true,
                  })}
                  {...field}
                  onValueChange={field.onChange}
                  label="Select default unit of measure"
                  labelProps={{ hidden: true, required: true }}
                  description="Select default unit of measure"
                  options={unitOfMeasureList}
                />
              )
            }}
          />
          <Controller
            name="pickupType"
            control={control}
            render={({ field }) => {
              return (
                <FormSelect
                  {...register(field.name, {
                    shouldUnregister: true,
                  })}
                  {...field}
                  onValueChange={field.onChange}
                  label="Select default pickup type"
                  labelProps={{ hidden: true, required: true }}
                  description="Select default pickup type"
                  options={pickupTypeList}
                />
              )
            }}
          />
        </Stack>
      </Stack>
      <Spacer size={{ "@initial": 40, "@sm": 48 }} />
      <SaveButton isLoading={isLoading} />
      <Spacer size={{ "@initial": 40, "@sm": 48 }} />
    </Flex>
  )
}
