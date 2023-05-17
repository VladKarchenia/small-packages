import React from "react"

import { CSS } from "@/stitches/config"
import { ComponentProps } from "@/stitches/types"

import { Copy, Spacer, ErrorLabel, FormLabel, IFormLabelProps, Box } from "@/shared/components"

import { SFormInputGroup, SFormInputGroupItems, SFormInputGroupItem } from "./FormInputGroup.styles"

export interface IFormInputGroupProps extends ComponentProps<typeof SFormInputGroup> {
  description?: string
  error?: string
  label: React.ReactNode
  labelProps?: IFormLabelProps
  id?: string
  inputCss?: CSS
}

type IFormInputGroupItemProps = ComponentProps<typeof SFormInputGroupItem>

/**
 * Use with FormInputGroupItem to nest form field components.
 */
export const FormInputGroup: React.FC<React.PropsWithChildren<IFormInputGroupProps>> = ({
  children,
  description,
  error,
  label,
  labelProps,
  inputCss,
  ...props
}) => (
  <SFormInputGroup {...props}>
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

    {(!labelProps?.hidden || description) && <Spacer size={4} />}

    <SFormInputGroupItems css={{ ...((inputCss || {}) as Record<string, never>) }}>
      {children}
    </SFormInputGroupItems>

    {error && (
      <Box css={{ position: "absolute" }}>
        <ErrorLabel id={props?.id}>{error}</ErrorLabel>
      </Box>
    )}
  </SFormInputGroup>
)

/**
 * FormInputGroupItem will pass labelProps to child form field. These props
 * will remove the form field box-shadow and visually hide the field label.
 *
 * You can declare css overrides by passing a css prop with a style object.
 */
export const FormInputGroupItem: React.FC<React.PropsWithChildren<IFormInputGroupItemProps>> = ({
  children,
  ...props
}) => (
  <SFormInputGroupItem {...props}>
    {React.Children.map(
      children,
      (child) =>
        // React.isValidElement(child) && React.cloneElement(child, { labelProps: { hidden: true } }),
        React.isValidElement(child) && React.cloneElement(child),
    )}
  </SFormInputGroupItem>
)
