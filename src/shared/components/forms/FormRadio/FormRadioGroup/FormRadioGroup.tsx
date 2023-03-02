import React from "react"

import { ComponentProps } from "@/stitches/types"

import { ErrorLabel, IFormRadioInputProps } from "@/shared/components"

import { SFormRadioGroup } from "./FormRadioGroup.styles"

type RadioGroupChildren =
  | React.ReactElement<IFormRadioInputProps>
  | Array<React.ReactElement<IFormRadioInputProps>>

const createRadioId = (groupName: string, value: string) => `${groupName}__radio-${value}`

export interface IFormRadioGroupProps
  extends Omit<ComponentProps<typeof SFormRadioGroup>, "onChange"> {
  children: RadioGroupChildren
  value: string
  name: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  error?: string
  view?: "circle" | "tick"
  withCells?: boolean
  horizontal?: boolean
}

export const FormRadioGroup = React.forwardRef<HTMLDivElement, IFormRadioGroupProps>(
  (
    { disabled, value, name, view, withCells = false, horizontal = false, ...props },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    forwardedRef,
  ) => {
    const { id, error, children, onChange, ...radioGroupProps } = props

    const clonedChildren = React.Children.map(
      children,
      (child) =>
        React.isValidElement(child) &&
        React.cloneElement(child, {
          name,
          onChange,
          disabled,
          checked: value === child.props.value,
          id: createRadioId(name, (child.props?.value as string) || ""),
          view,
        }),
    )

    return (
      <SFormRadioGroup
        id={id}
        data-ui="radiogroup"
        role="radiogroup"
        withCells={withCells}
        horizontal={horizontal}
        {...radioGroupProps}
      >
        {clonedChildren}
        {error && <ErrorLabel id={`${id}__error`}>{error}</ErrorLabel>}
      </SFormRadioGroup>
    )
  },
)

FormRadioGroup.displayName = "FormRadioGroup"
