import { Link } from "react-router-dom"
import { Controller, useFormContext } from "react-hook-form"
import { Button, Copy, FormInput, Spacer } from "@/shared/components"
import { LoginInput } from "./LoginFormContainer"

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
              type="password"
              error={errors[field.name]?.message}
            />
          )
        }}
      />

      <Spacer size={32} />

      <Button type="submit" loading={isLoading}>
        Login
      </Button>
    </>
  )
}
