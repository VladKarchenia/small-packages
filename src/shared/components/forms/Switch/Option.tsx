import { forwardRef, InputHTMLAttributes, memo } from "react"

import { SSwitchOption, SSwitchOptionInput } from "./Option.styles"

export interface SwitchOptionProps extends InputHTMLAttributes<HTMLInputElement> {}

export const SwitchOption = memo(
  forwardRef<HTMLLabelElement, SwitchOptionProps>(({ ...props }, ref) => {
    return (
      <SSwitchOption ref={ref} data-switch-option={props.value}>
        <SSwitchOptionInput type="radio" {...props} />
      </SSwitchOption>
    )
  }),
)

SwitchOption.displayName = "SwitchOption"
