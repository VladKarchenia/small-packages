import React from "react"

import { ComponentProps } from "@/stitches/types"

import {
  Box,
  Copy,
  Flex,
  Spacer,
  ErrorLabel,
  FormLabel,
  IFormLabelProps,
} from "@/shared/components"

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

  borderless?: boolean

  prefix?: React.ReactNode
  suffix?: React.ReactNode
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

  borderless,

  prefix,
  suffix,

  ...props
}: IFormFieldProps) => {
  return (
    <SFormField {...props} id={props.id ? `${props.id}-form-field` : undefined}>
      <Flex justify="between">
        <FormLabel {...labelProps}>{label}</FormLabel>

        {description && (
          <Copy scale={10} color="neutrals-5" fontWeight="semiBold">
            {description}
            {labelProps?.required ? (
              <Copy as="span" scale={10} fontWeight="semiBold" css={{ paddingLeft: "$2" }}>
                *
              </Copy>
            ) : null}
          </Copy>
        )}

        {postLabel && (
          <>
            <Spacer size={8} horizontal />
            {postLabel}
          </>
        )}
      </Flex>

      {(!labelProps?.hidden || description) && <Spacer size={4} />}

      <SFormFieldContainer hasError={!!error || hasError} borderless={borderless}>
        {prefix && <SFormFieldPrefix>{prefix}</SFormFieldPrefix>}

        {children}

        {suffix && <SFormFieldSuffix>{suffix}</SFormFieldSuffix>}
      </SFormFieldContainer>

      {error && (
        <Box css={{ position: "absolute" }}>
          <ErrorLabel id={props?.id}>{error}</ErrorLabel>
        </Box>
      )}
    </SFormField>
  )
}
