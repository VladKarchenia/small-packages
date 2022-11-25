import { useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Button, Copy, Flex, FormInput, Link, Spacer, Stack, Title } from "@/shared/components"

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
    <Flex align="start" justify="center" direction="column">
      <Title as="h1" scale={4}>
        Welcome!
      </Title>
      <Spacer size={4} />
      <Copy scale={9}>Please, log in to continue</Copy>
      <Spacer size={32} />
      <Stack space={24}>
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
      </Stack>

      <Spacer size={16} />
      <Link href="/recovery">
        <Copy scale={9} color="system-black">
          Forgot a password?
        </Copy>
      </Link>
      <Spacer size={24} />
      <Button type="submit" full loading={isLoading}>
        <Copy as="span" scale={8} color="system-white" bold>
          Login
        </Copy>
      </Button>
    </Flex>
  )
}
