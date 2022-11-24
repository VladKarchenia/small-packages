import { useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Button, Copy, Flex, FormInput, Spacer, Stack, Title } from "@/shared/components"
import { IconClarityEye } from "@/shared/icons"
import { ResetInput } from "./ResetFormContainer"
import { SShowPasswordButton } from "./LoginForm.styles"

export const ResetForm = ({
  defaultValues,
  isLoading,
}: {
  defaultValues: ResetInput
  isLoading: boolean
}) => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<ResetInput>()

  const [passwordShown, setPasswordShown] = useState(false)
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false)
  const togglePasswordVisibility = () => setPasswordShown(!passwordShown)
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordShown(!confirmPasswordShown)

  const [emailChecked, setEmailChecked] = useState(false)

  const { email, password, confirmPassword } = watch()

  const handleConfirmClick = () => {
    // TODO: send the request to validate email
    setEmailChecked(true)
  }

  if (emailChecked) {
    return (
      <Flex justify="center" direction="column">
        <Title as="h1" scale={4}>
          Create a new password
        </Title>
        <Spacer size={32} />
        <Stack space={24}>
          <Controller
            control={control}
            defaultValue={defaultValues.password}
            name="password"
            render={({ field }) => {
              return (
                <FormInput
                  {...field}
                  id="New password"
                  label="New password"
                  type={passwordShown ? "text" : "password"}
                  error={errors[field.name]?.message}
                  placeholder="Enter new password"
                  suffix={
                    <SShowPasswordButton type="button" onClick={() => togglePasswordVisibility()}>
                      <IconClarityEye height={20} width={20} fixedSize />
                    </SShowPasswordButton>
                  }
                />
              )
            }}
          />
          <Controller
            control={control}
            defaultValue={defaultValues.confirmPassword}
            name="confirmPassword"
            render={({ field }) => {
              return (
                <FormInput
                  {...field}
                  id="Re-enter password"
                  label="Re-enter password"
                  type={confirmPasswordShown ? "text" : "password"}
                  error={errors[field.name]?.message}
                  placeholder="Re-enter new password"
                  suffix={
                    <SShowPasswordButton
                      type="button"
                      onClick={() => toggleConfirmPasswordVisibility()}
                    >
                      <IconClarityEye height={20} width={20} fixedSize />
                    </SShowPasswordButton>
                  }
                />
              )
            }}
          />
        </Stack>
        <Spacer size={32} />
        <Button type="submit" full loading={isLoading} disabled={password !== confirmPassword}>
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
          type="button"
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
