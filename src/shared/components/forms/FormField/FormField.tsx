import React from "react"

import { ComponentProps } from "@/utils/types"

import { Copy, Flex, Spacer } from "@/shared/components"

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
        <FormLabel {...labelProps}>{label}</FormLabel>

        {postLabel && (
          <>
            <Spacer size={8} horizontal />
            {postLabel}
          </>
        )}
      </Flex>

      {description && (
        <Copy color="neutrals-7" intent="detail">
          {description}
        </Copy>
      )}

      {(!labelProps?.hidden || description) && <Spacer size={8} />}

      <SFormFieldContainer hasError={!!error || hasError} isFocused={isFocused}>
        {prefix && <SFormFieldPrefix>{prefix}</SFormFieldPrefix>}

        {children}

        {suffix && <SFormFieldSuffix>{suffix}</SFormFieldSuffix>}
      </SFormFieldContainer>

      {(error || afterField) && (
        <>
          <Spacer size={4} />

          <Flex justify="between">
            <div>{error && <ErrorLabel id={props?.id}>{error}</ErrorLabel>}</div>

            <div>{afterField}</div>
          </Flex>
        </>
      )}
    </SFormField>
  )
}
