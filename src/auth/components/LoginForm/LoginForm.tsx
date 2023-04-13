import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Controller, useFormContext } from "react-hook-form"

import { LoginInput } from "@/api/types"
import { RECOVERY } from "@/constants"

import {
  Button,
  ButtonIcon,
  Copy,
  Flex,
  FormInput,
  Link,
  Spacer,
  Stack,
  Title,
} from "@/shared/components"
import { IconClarityEye, IconClarityEyeCrossed } from "@/shared/icons"

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
      <Title as="h1" color="neutrals-12">
        Welcome!
      </Title>
      <Spacer size={4} />
      <Copy scale={5} color="neutrals-6">
        Please log in to continue
      </Copy>
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
                  <ButtonIcon
                    ariaLabel="Show password"
                    type="button"
                    icon={passwordShown ? <IconClarityEyeCrossed /> : <IconClarityEye />}
                    onClick={togglePasswordVisibility}
                    inputIcon
                  />
                }
              />
            )
          }}
        />
      </Stack>

      <Spacer size={16} />
      <Link as="button" type="button" onClick={() => navigate(RECOVERY)} fontWeight="bold">
        Forgot password?
      </Link>
      <Spacer size={24} />
      <Button type="submit" full loading={isLoading}>
        Login
      </Button>
    </Flex>
  )
}
