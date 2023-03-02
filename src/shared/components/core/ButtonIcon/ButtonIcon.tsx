import React from "react"

import { ComponentProps } from "@/stitches/types"

import { SButtonIcon } from "./ButtonIcon.styles"

export interface IButtonIconProps extends ComponentProps<typeof SButtonIcon> {
  icon: JSX.Element
  ariaLabel: string
  dataTestid?: string
  shouldPreventDefault?: boolean
  onBlur?: (event: React.SyntheticEvent) => void
  onFocus?: (event: React.SyntheticEvent) => void
  onClick?: (event: React.SyntheticEvent) => void
}

interface ButtonElementProps extends Partial<IButtonIconProps> {
  "aria-label"?: string
  "data-testid"?: string
}

export const ButtonIcon = React.forwardRef<HTMLButtonElement, IButtonIconProps>(
  ({ icon, ariaLabel, dataTestid, shouldPreventDefault, onClick, ...props }, ref) => {
    const buttonProps = React.useMemo(() => {
      const commonButtonProps: ButtonElementProps = {
        "aria-label": ariaLabel,
        "data-testid": dataTestid,
      }
      return commonButtonProps
    }, [ariaLabel, dataTestid])

    const handleClick = React.useCallback(
      (event: React.SyntheticEvent) => {
        if (shouldPreventDefault) {
          event.preventDefault()
        }

        onClick && onClick(event)
      },
      [shouldPreventDefault, onClick],
    )

    return (
      <SButtonIcon ref={ref} {...buttonProps} {...props} onClick={handleClick}>
        {icon}
      </SButtonIcon>
    )
  },
)

ButtonIcon.displayName = "ButtonIcon"
