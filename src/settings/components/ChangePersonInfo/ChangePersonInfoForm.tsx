import { useMemo, useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { useTheme } from "next-themes"
import { ChangePersonInfoInput } from "@/api/types"

import {
  Flex,
  FormInput,
  Spacer,
  Stack,
  Title,
  ButtonIcon,
  GridItem,
  Grid,
  Copy,
  Switch,
  useSwitch,
  SwitchOption,
} from "@/shared/components"
import { IconClarityEye, IconClarityEyeCrossed } from "@/shared/icons"
import { StepInputGroup } from "@/shipment/components"
import { SaveButton } from "@/settings/components"

export const ChangePersonInfoForm = ({
  defaultValues,
  isLoading,
}: {
  defaultValues: ChangePersonInfoInput
  isLoading: boolean
}) => {
  const {
    control,
    register,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext<ChangePersonInfoInput>()
  const { newPassword, oldPassword } = watch()
  const { theme, setTheme } = useTheme()
  const switchProps = useSwitch("darkMode", theme ? theme : "light")
  const [passwordShown, setPasswordShown] = useState(false)
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false)
  const [currentPasswordShown, setCurrentPasswordShown] = useState(false)
  const togglePasswordVisibility = () => setPasswordShown(!passwordShown)
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordShown(!confirmPasswordShown)
  const toggleCurrentPasswordVisibility = () => setCurrentPasswordShown(!currentPasswordShown)

  const isPasswordChanged = useMemo(() => {
    return oldPassword !== defaultValues.oldPassword
  }, [oldPassword, defaultValues.oldPassword])

  return (
    <Flex css={{ maxWidth: 1000 }} justify="center" direction="column">
      <Title as="h3" scale={5} color="theme-b-n3">
        General Info
      </Title>
      <Spacer size={{ "@initial": 24, "@sm": 32 }} />
      <Stack space={24}>
        <StepInputGroup
          start={
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => {
                return (
                  <FormInput
                    {...register(field.name, {
                      shouldUnregister: true,
                      disabled: true,
                    })}
                    {...field}
                    id="Full name"
                    label="First name and last name"
                    labelProps={{ hidden: true, required: true }}
                    autoComplete="off"
                    description="Full Name"
                    type="text"
                  />
                )
              }}
            />
          }
          end={
            <Grid columnGap={8}>
              <GridItem>
                <Controller
                  name="phone"
                  control={control}
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
                            value: /^(\+1\d{10})$/,
                            message: "Not match the format: +1 NXX NXX XXXX",
                          },
                        })}
                        {...field}
                        onBlur={(event) => {
                          field.onChange(
                            event?.target?.value !== "" ? event?.target?.value.trim() : "",
                          )
                        }}
                        id="Phone Number"
                        label="Phone number"
                        labelProps={{ hidden: true, required: true }}
                        autoComplete="off"
                        description="Phone number"
                        type="text"
                        error={errors[field.name]?.message}
                      />
                    )
                  }}
                />
              </GridItem>
            </Grid>
          }
        />
        <Controller
          name="username"
          control={control}
          render={({ field }) => {
            return (
              <FormInput
                {...register(field.name, {
                  shouldUnregister: true,
                  disabled: true,
                })}
                {...field}
                id="email"
                label="Email"
                labelProps={{ hidden: true, required: true }}
                autoComplete="off"
                description="Email"
                type="email"
              />
            )
          }}
        />

        <Spacer size={{ "@initial": 24, "@sm": 32 }} />

        <Title as="h3" scale={5} color="theme-b-n3">
          Change password
        </Title>

        <Controller
          control={control}
          defaultValue={defaultValues.oldPassword}
          name="oldPassword"
          render={({ field }) => {
            return (
              <FormInput
                {...register(field.name, {
                  shouldUnregister: true,
                  required: {
                    value: isPasswordChanged,
                    message: "Required field",
                  },
                })}
                {...field}
                id="Old password"
                label="Current password"
                labelProps={{ hidden: true, required: true }}
                description="Current password"
                type={currentPasswordShown ? "text" : "password"}
                error={errors[field.name]?.message}
                placeholder="Enter current password"
                autoComplete="new-password"
                onBlur={() => {
                  trigger("oldPassword")

                  if (oldPassword === "") {
                    trigger("newPassword")
                    trigger("confirmPassword")
                  }
                }}
                suffix={
                  <ButtonIcon
                    ariaLabel="Show current password"
                    type="button"
                    icon={currentPasswordShown ? <IconClarityEyeCrossed /> : <IconClarityEye />}
                    onClick={toggleCurrentPasswordVisibility}
                    inputIcon
                  />
                }
              />
            )
          }}
        />
        <Controller
          control={control}
          defaultValue={defaultValues.newPassword}
          name="newPassword"
          render={({ field }) => {
            return (
              <FormInput
                {...register(field.name, {
                  shouldUnregister: true,
                  required: {
                    value: isPasswordChanged,
                    message: "Required field",
                  },
                  pattern: {
                    value: /^[A-Za-z0-9]+$/,
                    message: "Only alphanumeric characters allowed",
                  },
                  validate: {
                    notOnlyNumbers: (v: string) =>
                      !isPasswordChanged ||
                      /^(?=.*\d)/.test(v) ||
                      "Alphanumeric characters required",
                    notOnlyLetters: (v: string) =>
                      !isPasswordChanged ||
                      /^(?=.*[a-zA-Z])/.test(v) ||
                      "Alphanumeric characters required",
                    oneUppercaseLetter: (v: string) =>
                      !isPasswordChanged ||
                      /^(?=.*[A-Z])/.test(v) ||
                      "Minimum 1 uppercase letter required",
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
                {...field}
                id="New password"
                label="New password"
                labelProps={{ hidden: true, required: true }}
                description="New password"
                type={passwordShown ? "text" : "password"}
                error={errors[field.name]?.message}
                placeholder="Enter new password"
                autoComplete="new-password"
                suffix={
                  <ButtonIcon
                    ariaLabel="Show new password"
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
        <Controller
          control={control}
          defaultValue={defaultValues.confirmPassword}
          name="confirmPassword"
          render={({ field }) => {
            return (
              <FormInput
                {...register(field.name, {
                  shouldUnregister: true,
                  required: {
                    value: isPasswordChanged,
                    message: "Required field",
                  },
                  pattern: {
                    value: /^[A-Za-z0-9]+$/,
                    message: "Only alphanumeric characters allowed",
                  },
                  validate: {
                    matching: (v: string) => v === newPassword || "Passwords not match",
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
                {...field}
                id="Confirm password"
                label="New password"
                labelProps={{ hidden: true, required: true }}
                description="Confirm password"
                type={confirmPasswordShown ? "text" : "password"}
                error={errors[field.name]?.message}
                placeholder="Confirm new password"
                autoComplete="off"
                suffix={
                  <ButtonIcon
                    ariaLabel="Show confirm password"
                    type="button"
                    icon={confirmPasswordShown ? <IconClarityEyeCrossed /> : <IconClarityEye />}
                    onClick={toggleConfirmPasswordVisibility}
                    inputIcon
                  />
                }
              />
            )
          }}
        />
      </Stack>
      <Spacer size={40} />
      <Flex align="center" justify="start" css={{ gap: "$24" }}>
        <Copy scale={5} color="theme-b-n3" fontWeight="bold">
          Dark Mode
        </Copy>
        <Switch
          {...switchProps}
          onValueChange={(value) => {
            setTheme(value)
            setValue("darkTheme", value !== "light")
            switchProps.onValueChange(value)
          }}
          checked={switchProps.value === "dark"}
        >
          <SwitchOption value={theme === "light" ? "dark" : "light"} />
        </Switch>
      </Flex>
      <Spacer size={{ "@initial": 40, "@sm": 48 }} />
      <SaveButton isLoading={isLoading} />
      <Spacer size={{ "@initial": 40, "@sm": 48 }} />
    </Flex>
  )
}
