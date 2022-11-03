import React from "react"
import { CSS } from "@/config"
import { ComponentProps } from "@/utils/types"
import { Copy, Flex, Spacer, ErrorLabel, FormLabel, IFormLabelProps } from "@/shared/components"
import { SFormInputGroup, SFormInputGroupItems, SFormInputGroupItem } from "./FormInputGroup.styles"

export interface IFormInputGroupProps extends ComponentProps<typeof SFormInputGroup> {
  description?: string
  error?: string
  hasError?: boolean
  hasFocus?: boolean
  label: React.ReactNode
  labelProps?: IFormLabelProps
  id?: string
  afterField?: React.ReactNode
  inputCss?: CSS
}

export type IFormInputGroupItemProps = ComponentProps<typeof SFormInputGroupItem>

/**
 * Use with FormInputGroupItem to nest form field components.
 */
export const FormInputGroup: React.FC<React.PropsWithChildren<IFormInputGroupProps>> = ({
  children,
  description,
  error,
  hasError = false,
  hasFocus = false,
  label,
  labelProps,
  afterField,
  inputCss,
  ...props
}) => (
  <SFormInputGroup {...props}>
    <FormLabel {...labelProps}>{label}</FormLabel>

    {description && (
      <Copy color="neutrals-7" intent="detail">
        {description}
      </Copy>
    )}

    {(!labelProps?.hidden || description) && <Spacer size={8} />}

    <SFormInputGroupItems css={{ ...((inputCss || {}) as {}) }}>{children}</SFormInputGroupItems>

    {(error || afterField) && (
      <>
        <Spacer size={4} />

        <Flex justify="between">
          <div>{error && <ErrorLabel id={props?.id}>{error}</ErrorLabel>}</div>

          <div>{afterField}</div>
        </Flex>
      </>
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
