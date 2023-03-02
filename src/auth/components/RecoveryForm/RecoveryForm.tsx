import { Controller, useFormContext } from "react-hook-form"
import { Button, Copy, Flex, FormInput, Spacer, Stack, Title } from "@/shared/components"
import { RecoveryInput } from "@/api/types"

export const RecoveryForm = ({
  defaultValues,
  isLoading,
}: {
  defaultValues: RecoveryInput
  isLoading: boolean
}) => {
  const {
    control,
    formState: { errors },
    watch,
    register,
  } = useFormContext<RecoveryInput>()

  const { email } = watch()

  return (
    <Flex align="start" justify="center" direction="column">
      <Title as="h1" scale={4}>
        Password recovery
      </Title>
      <Spacer size={4} />
      <Copy scale={9}>Please, enter your e-mail address</Copy>
      <Spacer size={32} />
      <Stack space={32}>
        <Controller
          control={control}
          defaultValue={defaultValues.email}
          name="email"
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
                id="email"
                label="Email"
                type="email"
                hasError={!!errors[field.name]}
                error={errors[field.name]?.message}
                placeholder="Enter your email"
              />
            )
          }}
        />
        <Button type="submit" full loading={isLoading} disabled={!email}>
          <Copy as="span" scale={8} color="system-white" bold>
            Confirm
          </Copy>
        </Button>
      </Stack>
    </Flex>
  )
}
