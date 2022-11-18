import { useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Button, Copy, FormInput, Spacer } from "@/shared/components"

import { LoginInput } from "./LoginFormContainer"
import { SShowPasswordButton } from "./LoginForm.styles"
import { IconClarityEye } from "@/shared/icons"

export const LoginForm = ({
  defaultValues,
  isLoading,
}: {
  defaultValues: LoginInput
  isLoading: boolean
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<LoginInput>()

  const [passwordShown, setPasswordShown] = useState(false)
  const togglePasswordVisibility = () => setPasswordShown(!passwordShown)

  return (
    <>
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

      <Spacer size={32} />

      <Controller
        control={control}
        defaultValue={defaultValues.password}
        name="password"
        render={({ field }) => {
          return (
            <FormInput
              {...field}
              id="password"
              label="Password"
              type={passwordShown ? "text" : "password"}
              error={errors[field.name]?.message}
              placeholder="Enter your password"
              suffix={
                <SShowPasswordButton type="button" onClick={() => togglePasswordVisibility()}>
                  <IconClarityEye height={20} width={20} fixedSize />
                </SShowPasswordButton>
              }
            />
          )
        }}
      />

      <Spacer size={32} />
      <Button type="submit" full loading={isLoading}>
        <Copy as="span" scale={8} color="system-white" bold>
          Login
        </Copy>
      </Button>
    </>
  )
}
