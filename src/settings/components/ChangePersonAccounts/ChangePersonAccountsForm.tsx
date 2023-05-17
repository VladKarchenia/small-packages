import { Controller, useFormContext } from "react-hook-form"

import { ChangePersonAccountsInput } from "@/api/types"
import { Carriers } from "@/shared/types"

import { Flex, Spacer, Stack, Title, FormSelect, GridItem, Grid } from "@/shared/components"
import { StepInputGroup } from "@/shipment/components"
import { SaveButton } from "@/settings/components"

import { ChangePersonAccountsTable } from "./ChangePersonAccountsTable"

export const ChangePersonAccountsForm = ({ isLoading }: { isLoading: boolean }) => {
  const { control, register, watch } = useFormContext<ChangePersonAccountsInput>()
  const { accounts } = watch()

  const fedExNameList: string[] = accounts
    .filter((el) => el.carrier == Carriers.FedEx && el.name)
    .map((el) => el.name)
  const upsNameList: string[] = accounts
    .filter((el) => el.carrier == Carriers.UPS && el.name)
    .map((el) => el.name)

  return (
    <Flex justify="center" direction="column">
      <Stack space={56}>
        <Stack space={24} css={{ maxWidth: 1000 }}>
          <Title as="h3" scale={5} color="theme-b-n3">
            Accounts
          </Title>
          <StepInputGroup
            start={
              <Controller
                name="fedExName"
                control={control}
                render={({ field }) => {
                  return (
                    <FormSelect
                      {...register(field.name, {
                        shouldUnregister: true,
                      })}
                      {...field}
                      onValueChange={field.onChange}
                      label="Select default FedEx account"
                      labelProps={{ hidden: true, required: true }}
                      description="Select default FedEx account"
                      options={fedExNameList}
                    />
                  )
                }}
              />
            }
            end={
              <Grid columnGap={8}>
                <GridItem>
                  <Controller
                    name="upsName"
                    control={control}
                    render={({ field }) => {
                      return (
                        <FormSelect
                          {...register(field.name, {
                            shouldUnregister: true,
                          })}
                          {...field}
                          onValueChange={field.onChange}
                          label="Select default UPS account"
                          labelProps={{ hidden: true, required: true }}
                          description="Select default UPS account"
                          options={upsNameList}
                        />
                      )
                    }}
                  />
                </GridItem>
              </Grid>
            }
          />
        </Stack>
        <ChangePersonAccountsTable fedExNameList={fedExNameList} upsNameList={upsNameList} />
      </Stack>
      <Spacer size={{ "@initial": 40, "@sm": 48 }} />
      <SaveButton isLoading={isLoading} />
      <Spacer size={{ "@initial": 40, "@sm": 48 }} />
    </Flex>
  )
}
