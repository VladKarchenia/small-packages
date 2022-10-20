import { useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Button, FormInput, Spacer, Text } from "@/shared/components"

import { LoginInput } from "./LoginFormContainer"
import { SShowPasswordButton } from "./LoginForm.styles"
import { IconClarityEye } from "@/shared/icons/IconClarityEye"

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
  const togglePasswordVisibility = () => {
    console.log("wadawd")

    setPasswordShown(!passwordShown)
  }

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
              label="Email Address"
              type="email"
              error={errors[field.name]?.message}
            />
          )
        }}
      />

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
              suffix={
                <SShowPasswordButton type="button" onClick={() => togglePasswordVisibility()}>
                  <IconClarityEye size="sm" />
                </SShowPasswordButton>
              }
            />
          )
        }}
      />

      <Spacer size={32} />
      <Text>Remember me</Text>
      <Spacer size={32} />
      <Button type="submit" loading={isLoading} css={{width: '100%', backgroundColor: '$system-black', color: '$system-white'}}>
        Login
      </Button>
    </>
  )
}
