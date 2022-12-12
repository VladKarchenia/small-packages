import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Controller, useFormContext } from "react-hook-form"
import { Button, Copy, Flex, FormInput, Spacer, Stack, Title } from "@/shared/components"
import { IconClarityEye } from "@/shared/icons"
import { ResetInput } from "@/api/types"
import { SShowPasswordButton } from "./ResetForm.styles"

export const ResetForm = ({
  defaultValues,
  isLoading,
  isPasswordChanged,
}: {
  defaultValues: ResetInput
  isLoading: boolean
  isPasswordChanged: boolean
}) => {
  const navigate = useNavigate()

  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useFormContext<ResetInput>()
  const [passwordShown, setPasswordShown] = useState(false)
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false)
  const togglePasswordVisibility = () => setPasswordShown(!passwordShown)
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordShown(!confirmPasswordShown)
  const { password } = watch()

  if (isPasswordChanged) {
    return (
      <Flex justify="center" direction="column">
        <Title as="h1" scale={4}>
          Create a new password
        </Title>
        <Spacer size={4} />
        <Copy scale={9}>Your password has been successfully changed</Copy>
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
                {...register(field.name, {
                  required: {
                    value: true,
                    message: "Required field",
                  },
                  pattern: {
                    value: /^[A-Za-z0-9]+$/,
                    message: "Only alphanumeric characters allowed",
                  },
                  validate: {
                    notOnlyNumbers: (v: string) =>
                      /^(?=.*\d)/.test(v) || "Alphanumeric characters required",
                    notOnlyLetters: (v: string) =>
                      /^(?=.*[a-zA-Z])/.test(v) || "Alphanumeric characters required",
                    oneUppercaseLetter: (v: string) =>
                      /^(?=.*[A-Z])/.test(v) || "Minimum 1 uppercase letter required",
                  },
                  minLength: {
                    value: 7,
                    message: "Password min length not met",
                  },
                  maxLength: {
                    value: 30,
                    message: "Password max length exceeded",
                  },
                })}
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
                {...register(field.name, {
                  required: {
                    value: true,
                    message: "Required field",
                  },
                  pattern: {
                    value: /^[A-Za-z0-9]+$/,
                    message: "Only alphanumeric characters allowed",
                  },
                  validate: {
                    matching: (v: string) => v === password || "Passwords not match",
                  },
                  minLength: {
                    value: 7,
                    message: "Password min length not met",
                  },
                  maxLength: {
                    value: 30,
                    message: "Password max length exceeded",
                  },
                })}
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
      <Button type="submit" full loading={isLoading} disabled={!!errors.confirmPassword?.message}>
        <Copy as="span" scale={8} color="system-white" bold>
          OK
        </Copy>
      </Button>
    </Flex>
  )
}
