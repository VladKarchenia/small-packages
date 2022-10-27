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
  Title,
  useAccordionContext,
} from "@/shared/components"
import { ShipmentStepEnum } from "@/shipment"

const packageInfoSchema = object({
  height: string().min(1, "Height is required"),
  width: string().min(1, "Width is required"),
  depth: string().min(1, "Depth is required"),
})

type PackageInfoInput = TypeOf<typeof packageInfoSchema>

const defaultValues: PackageInfoInput = {
  height: "",
  width: "",
  depth: "",
}

export const ShipmentDetails = ({
  handleContinueClick,
}: {
  handleContinueClick: (step: ShipmentStepEnum, nextStep: ShipmentStepEnum) => void
}) => {
  const methods = useForm<PackageInfoInput>({
    mode: "all",
    defaultValues,
    resolver: zodResolver(packageInfoSchema),
  })

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = methods

  const { setSelected } = useAccordionContext("ShipmentDetails")

  const onSubmitHandler: SubmitHandler<PackageInfoInput> = (values) => {
    packageInfoSchema.parse(values)

    if (isValid) {
      setSelected([ShipmentStepEnum.SUMMARY])
      handleContinueClick(ShipmentStepEnum.SHIPMENT, ShipmentStepEnum.SUMMARY)
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)} noValidate autoComplete="off">
        <GridContainer fullBleed>
          <Grid
            columns={{ "@initial": "1fr", "@sm": "1fr 1fr 1fr" }}
            columnGap={{ "@initial": 0, "@sm": 32 }}
          >
            <GridItem>
              <Title as="h5">Package Details</Title>
              <Spacer size={24} />
              <Controller
                control={control}
                defaultValue={defaultValues.height}
                name="height"
                render={({ field }) => {
                  return (
                    <FormInput
                      {...field}
                      id="height"
                      label="Package height"
                      type="text"
                      error={errors[field.name]?.message}
                    />
                  )
                }}
              />
            </GridItem>
            <GridItem>
              <Spacer size={56} />
              <Controller
                control={control}
                defaultValue={defaultValues.width}
                name="width"
                render={({ field }) => {
                  return (
                    <FormInput
                      {...field}
                      id="width"
                      label="Package width"
                      type="text"
                      error={errors[field.name]?.message}
                    />
                  )
                }}
              />
            </GridItem>
            <GridItem>
              <Spacer size={56} />
              <Controller
                control={control}
                defaultValue={defaultValues.depth}
                name="depth"
                render={({ field }) => {
                  return (
                    <FormInput
                      {...field}
                      id="depth"
                      label="Package depth"
                      type="text"
                      error={errors[field.name]?.message}
                    />
                  )
                }}
              />
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
