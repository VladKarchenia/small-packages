import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Controller, useFormContext } from "react-hook-form"

import { LoginInput } from "@/api/types"
import { RECOVERY } from "@/constants"

import { Button, Copy, Flex, FormInput, Link, Spacer, Stack, Title } from "@/shared/components"
import { IconClarityEye, IconClarityEyeCrossed } from "@/shared/icons"

import { SShowPasswordButton } from "./LoginForm.styles"

export const LoginForm = ({
  defaultValues,
  isLoading,
}: {
  defaultValues: LoginInput
  isLoading: boolean
}) => {
  const navigate = useNavigate()
  const {
    control,
    register,
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
          defaultValue={defaultValues.username}
          name="username"
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
                id="username"
                label="Email"
                type="email"
                hasError={!!errors[field.name]}
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
                {...register(field.name, {
                  shouldUnregister: true,
                  required: {
                    value: true,
                    message: "Required field",
                  },
                })}
                {...field}
                id="password"
                label="Password"
                type={passwordShown ? "text" : "password"}
                hasError={!!errors[field.name]}
                error={errors[field.name]?.message}
                placeholder="Enter your password"
                suffix={
                  <SShowPasswordButton type="button" onClick={() => togglePasswordVisibility()}>
                    {passwordShown ? <IconClarityEyeCrossed /> : <IconClarityEye />}
                  </SShowPasswordButton>
                }
              />
            )
          }}
        />
      </Stack>

      <Spacer size={16} />
      <Link onClick={() => navigate(RECOVERY)}>
        {/* TODO: fix default link copy */}
        <Copy scale={9} color="system-black">
          Forgot a password?
        </Copy>
      </Link>
      <Spacer size={24} />
      <Button type="submit" full noWrap loading={isLoading}>
        <Copy as="span" scale={8} color="system-white" bold>
          Login
        </Copy>
      </Button>
    </Flex>
  )
}
