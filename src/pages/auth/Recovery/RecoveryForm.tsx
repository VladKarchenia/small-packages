import { useState } from "react"
import { useNavigate } from "react-router-dom"
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

  const [isEmailSent, setIsEmailSent] = useState(false)
  const navigate = useNavigate()
  const { email } = watch()

  const handleConfirmClick = () => {
    setIsEmailSent(true)
  }

  if (isEmailSent) {
    return (
      <Flex justify="center" direction="column">
        <Title as="h1" scale={4}>
          Password recovery
        </Title>
        <Spacer size={4} />
        <Copy scale={9}>Please, check your e-mail for further instructions</Copy>
        <Spacer size={32} />
        <Button type="button" full onClick={() => navigate("/login")}>
          <Copy as="span" scale={8} color="system-white" bold>
            OK
          </Copy>
        </Button>
      </Flex>
    )
  }

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
                id="email"
                label="Email"
                type="email"
                error={errors[field.name]?.message}
                placeholder="Enter your email"
              />
            )
          }}
        />
        <Button
          type="submit"
          full
          loading={isLoading}
          onClick={handleConfirmClick}
          disabled={!email}
        >
          <Copy as="span" scale={8} color="system-white" bold>
            Confirm
          </Copy>
        </Button>
      </Stack>
    </Flex>
  )
}
