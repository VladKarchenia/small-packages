import React, { forwardRef, memo } from "react"

import { useComboboxContext } from "./Combobox"

export interface ComboboxInputProps {
  className?: string

  children?: React.ReactNode
}

export const ComboboxInput = memo(
  forwardRef<HTMLInputElement, ComboboxInputProps>(({ className, children }, ref) => {
    const { getInputProps } = useComboboxContext("ComboboxInput")

    if (children) {
      return React.cloneElement(children as React.ReactElement, {
        ...getInputProps({ ref }),
      })
    }

    return (
      <input
        className={className}
        type="text"
        data-ui="combobox-input"
        {...getInputProps({ ref })}
      />
    )
  }),
)

ComboboxInput.displayName = "ComboboxInput"
