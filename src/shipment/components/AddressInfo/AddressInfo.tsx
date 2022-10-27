import { Controller, FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { object, string, TypeOf } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Button,
  FormInput,
  Grid,
  GridContainer,
  GridItem,
  Spacer,
  Stack,
  Title,
  useAccordionContext,
} from "@/shared/components"
import { ShipmentStepEnum } from "@/shipment"

const addressInfoSchema = object({
  sendersName: string().min(1, "Your name is required"),
  fromAddress: string().min(1, "Your address is required"),
  recipientsName: string().min(1, "Recipient's address is required"),
  toAddress: string().min(1, "Recipient's address is required"),
})

type AddressInfoInput = TypeOf<typeof addressInfoSchema>

const defaultValues: AddressInfoInput = {
  sendersName: "",
  fromAddress: "",
  recipientsName: "",
  toAddress: "",
}

export const AddressInfo = ({
  handleContinueClick,
}: {
  handleContinueClick: (step: ShipmentStepEnum, nextStep: ShipmentStepEnum) => void
}) => {
  const methods = useForm<AddressInfoInput>({
    mode: "all",
    defaultValues,
    resolver: zodResolver(addressInfoSchema),
  })

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = methods

  const { setSelected } = useAccordionContext("AddressInfo")

  const onSubmitHandler: SubmitHandler<AddressInfoInput> = (values) => {
    addressInfoSchema.parse(values)

    if (isValid) {
      setSelected([ShipmentStepEnum.SHIPMENT])
      handleContinueClick(ShipmentStepEnum.INFO, ShipmentStepEnum.SHIPMENT)
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)} noValidate autoComplete="off">
        <GridContainer fullBleed>
          <Grid
            columns={{ "@initial": "1fr", "@sm": "1fr 1fr" }}
            columnGap={{ "@initial": 0, "@sm": 32 }}
          >
            <GridItem>
              <Title as="h5">From Address</Title>
              <Spacer size={24} />
              <Stack space={24}>
                <Controller
                  control={control}
                  defaultValue={defaultValues.sendersName}
                  name="sendersName"
                  render={({ field }) => {
                    return (
                      <FormInput
                        {...field}
                        id="sendersName"
                        label="Your Name"
                        type="text"
                        error={errors[field.name]?.message}
                      />
                    )
                  }}
                />
                <Controller
                  control={control}
                  defaultValue={defaultValues.fromAddress}
                  name="fromAddress"
                  render={({ field }) => {
                    return (
                      <FormInput
                        {...field}
                        id="fromAddress"
                        label="Your Address"
                        type="text"
                        error={errors[field.name]?.message}
                      />
                    )
                  }}
                />
              </Stack>
            </GridItem>
            <GridItem>
              <Title as="h5">To Address</Title>
              <Spacer size={24} />
              <Stack space={24}>
                <Controller
                  control={control}
                  defaultValue={defaultValues.recipientsName}
                  name="recipientsName"
                  render={({ field }) => {
                    return (
                      <FormInput
                        {...field}
                        id="recipientsName"
                        label="Recipient Name"
                        type="text"
                        error={errors[field.name]?.message}
                      />
                    )
                  }}
                />
                <Controller
                  control={control}
                  defaultValue={defaultValues.toAddress}
                  name="toAddress"
                  render={({ field }) => {
                    return (
                      <FormInput
                        {...field}
                        id="toAddress"
                        label="Recipient Address"
                        type="text"
                        error={errors[field.name]?.message}
                      />
                    )
                  }}
                />
              </Stack>
            </GridItem>
          </Grid>
          <Spacer size={32} />
          <Button type="submit">Continue</Button>
          <Spacer size={32} />
        </GridContainer>
      </form>
    </FormProvider>
  )
}
