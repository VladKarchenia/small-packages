import React from "react"
import { ComponentProps } from "@/utils"
import { Box, Copy, Flex, Spacer } from "@/shared/components"

import { ErrorLabel } from "../ErrorLabel"
import { FormLabel, IFormLabelProps } from "../FormLabel"
import {
  SFormField,
  SFormFieldContainer,
  SFormFieldPrefix,
  SFormFieldSuffix,
} from "./FormField.styles"

export interface IFormFieldCommonProps {
  label: React.ReactNode
  postLabel?: React.ReactNode

  description?: React.ReactNode

  error?: React.ReactNode
  hasError?: boolean

  labelProps?: IFormLabelProps

  prefix?: React.ReactNode
  suffix?: React.ReactNode

  afterField?: React.ReactNode

  isFocused?: boolean
}

export interface IFormFieldProps
  extends Omit<ComponentProps<typeof SFormField>, "prefix">,
    IFormFieldCommonProps {}

export const FormField = ({
  children,

  label,
  postLabel,

  description,

  error,
  hasError,

  labelProps,

  prefix,
  suffix,

  afterField,

  isFocused,

  ...props
}: IFormFieldProps) => {
  return (
    <SFormField {...props} id={props.id ? `${props.id}-form-field` : undefined}>
      <Flex justify="between">
        <FormLabel {...labelProps}>
          {label}
          {labelProps?.required ? (
            <Copy as="span" scale={9} css={{ paddingLeft: "$2" }}>
              *
            </Copy>
          ) : null}
        </FormLabel>

        {postLabel && (
          <>
            <Spacer size={8} horizontal />
            {postLabel}
          </>
        )}
      </Flex>

      {description && (
        <Copy scale={10}>
          {description}
          {labelProps?.required ? (
            <Copy as="span" scale={10} css={{ paddingLeft: "$2" }}>
              *
            </Copy>
          ) : null}
        </Copy>
      )}

      {(!labelProps?.hidden || description) && <Spacer size={8} />}

      <SFormFieldContainer hasError={!!error || hasError} isFocused={isFocused}>
        {prefix && <SFormFieldPrefix>{prefix}</SFormFieldPrefix>}

        {children}

        {suffix && <SFormFieldSuffix>{suffix}</SFormFieldSuffix>}
      </SFormFieldContainer>

      {(error || afterField) && (
        <Box css={{ position: "absolute" }}>
          <Flex justify="between">
            {error && <ErrorLabel id={props?.id}>{error}</ErrorLabel>}
            {afterField}
          </Flex>
        </Box>
      )}
    </SFormField>
  )
}
