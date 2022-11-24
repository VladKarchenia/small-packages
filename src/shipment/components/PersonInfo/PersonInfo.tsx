import { Controller, useFormContext } from "react-hook-form"
import {
  Button,
  Copy,
  FormCheckbox,
  FormInput,
  GridContainer,
  Select,
  SelectItem,
  Spacer,
  Stack,
  useStepperContext,
} from "@/shared/components"
import { StepName } from "@/shipment"
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
    setValue,
    watch,
    control,
    register,
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
      <Stack space={12}>
        <Controller
          name={`${person}.name`}
          control={control}
          render={({ field }) => {
            return (
              <FormInput
                {...field}
                {...register(field.name)}
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
        <Controller
          name={`${person}.phone`}
          control={control}
          render={({ field }) => {
            return (
              <FormInput
                {...field}
                {...register(field.name, {})}
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
        <Controller
          name={`${person}.extension`}
          control={control}
          render={({ field }) => {
            return (
              <FormInput
                {...field}
                {...register(field.name, {})}
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
        <Controller
          name={`${person}.email`}
          control={control}
          render={({ field }) => {
            return (
              <FormInput
                {...field}
                {...register(field.name, {})}
                id={`${person}.email`}
                label="Email"
                labelProps={{ hidden: true, required: true }}
                description="Email"
                type="text"
                error={errors[person]?.email?.message}
              />
            )
          }}
        />
        <Controller
          name={`${person}.company`}
          control={control}
          render={({ field }) => {
            return (
              <FormInput
                {...field}
                {...register(field.name, {})}
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
        <Controller
          name={`${person}.fullAddress.country`}
          control={control}
          render={({ field }) => {
            return (
              <Select
                {...field}
                {...register(field.name, {})}
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
        <Controller
          name={`${person}.fullAddress.zipCode`}
          control={control}
          render={({ field }) => {
            return (
              <FormInput
                {...field}
                {...register(field.name, {})}
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
        <Controller
          name={`${person}.fullAddress.state`}
          control={control}
          render={({ field }) => {
            return (
              <FormInput
                {...field}
                {...register(field.name, {})}
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
        <Controller
          name={`${person}.fullAddress.city`}
          control={control}
          render={({ field }) => {
            return (
              <FormInput
                {...field}
                {...register(field.name, {})}
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
        <Controller
          name={`${person}.fullAddress.address1`}
          control={control}
          render={({ field }) => {
            return (
              <FormInput
                {...field}
                {...register(field.name, {})}
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
        <Controller
          name={`${person}.fullAddress.address2`}
          control={control}
          render={({ field }) => {
            return (
              <FormInput
                {...field}
                {...register(field.name, {})}
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
      </Stack>
      {person === "recipient" ? (
        <>
          <Spacer size={16} />
          <FormCheckbox
            {...register(`${person}.fullAddress.isResidential`)}
            name={`${person}.fullAddress.isResidential`}
            id={`${person}.fullAddress.isResidential`}
            label="This is a residential address"
            error={errors[person]?.fullAddress?.isResidential?.message}
          />
        </>
      ) : null}
      <Spacer size={24} />
      <Button
        onClick={onContinueHandler}
        full
        disabled={
          person === "sender"
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
              !recipientsAddress1
        }
      >
        <Copy as="span" scale={8} color="system-white" bold>
          Continue
        </Copy>
      </Button>
    </GridContainer>
  )
}
