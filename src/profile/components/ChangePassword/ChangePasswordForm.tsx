import { useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Button, Copy, Flex, FormInput, Spacer, Stack, Hidden } from "@/shared/components"
import { IconClarityEye } from "@/shared/icons"
import { ChangeInput } from "@/api/types"
import { SShowPasswordButton } from "./ChangePasswordForm.styls"

export const ChangePasswordForm = ({
  defaultValues,
  isLoading,
}: {
  defaultValues: ChangeInput
  isLoading: boolean
}) => {
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useFormContext<ChangeInput>()
  const [passwordShown, setPasswordShown] = useState(false)
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false)
  const [currentPasswordShown, setCurrentPasswordShown] = useState(false)
  const togglePasswordVisibility = () => setPasswordShown(!passwordShown)
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordShown(!confirmPasswordShown)
  const toggleCurrentPasswordVisibility = () => setCurrentPasswordShown(!currentPasswordShown)
  const { newPassword } = watch()

  return (
    <Flex justify="center" direction="column">
      {/* TODO: maybe it will be a Title component */}
      <Copy scale={{ "@initial": 8, "@sm": 7 }} bold color={"system-black"}>
        Change password
      </Copy>
      <Spacer size={{ "@initial": 24, "@sm": 32 }} />
      <Stack space={24}>
        {/*TODO: maybe need add some component for input passwords*/}
        <Controller
          control={control}
          defaultValue={defaultValues.oldPassword}
          name="oldPassword"
          render={({ field }) => {
            return (
              <FormInput
                {...field}
                {...register(field.name, {
                  required: {
                    value: true,
                    message: "Required field",
                  },
                })}
                id="Old password"
                label="Current password"
                labelProps={{ hidden: true, required: true }}
                description="Current password"
                type={currentPasswordShown ? "text" : "password"}
                error={errors[field.name]?.message}
                placeholder="Enter current password"
                suffix={
                  <SShowPasswordButton
                    type="button"
                    onClick={() => toggleCurrentPasswordVisibility()}
                  >
                    <IconClarityEye height={20} width={20} fixedSize />
                  </SShowPasswordButton>
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
                labelProps={{ hidden: true, required: true }}
                description="New password"
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
                id="Re-enter password"
                label="Re-enter password"
                labelProps={{ hidden: true, required: true }}
                description="Re-enter password"
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
      <Hidden above="sm">
        <Button type="submit" full loading={isLoading} disabled={!!errors.confirmPassword?.message}>
          <Copy as="span" scale={8} color="system-white" bold>
            Save changes
          </Copy>
        </Button>
      </Hidden>
      <Hidden below="sm">
        <Flex justify="between" align="center" direction="row" wrap={false}>
          <Button
            type="submit"
            full
            loading={isLoading}
            disabled={!!errors.confirmPassword?.message}
          >
            <Copy as="span" scale={8} color="system-white" bold>
              Save changes
            </Copy>
          </Button>
          <Spacer size={16} horizontal />
          {/* TODO: cancel action? */}
          <Button action="secondary" onClick={() => console.log("clear form?")} full>
            <Copy as="span" scale={8} color="system-black" bold>
              Cancel
            </Copy>
          </Button>
        </Flex>
      </Hidden>
    </Flex>
  )
}
