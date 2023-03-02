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

  borderless,

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

        {postLabel && (
          <>
            <Spacer size={8} horizontal />
            {postLabel}
          </>
        )}
      </Flex>

      {(!labelProps?.hidden || description) && <Spacer size={8} />}

      <SFormFieldContainer
        hasError={!!error || hasError}
        isFocused={isFocused}
        borderless={borderless}
        // TODO: fix this
        // isDisabled={true}
      >
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
