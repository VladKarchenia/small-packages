import React from "react"

import { ComponentProps } from "@/utils"

import { SButtonIcon } from "./ButtonIcon.styles"

export interface IButtonIconProps extends ComponentProps<typeof SButtonIcon> {
  icon: JSX.Element
  ariaLabel: string
  dataTestid?: string
  dataTrackId?: string
  dataTrackValue?: string
  shouldPreventDefault?: boolean
  onBlur?: (e: React.SyntheticEvent) => void
  onFocus?: (e: React.SyntheticEvent) => void
  onClick?: (e: React.SyntheticEvent) => void
}

interface ButtonElementProps extends Partial<IButtonIconProps> {
  "aria-label"?: string
  "data-track-id"?: string
  "data-track-value"?: string
  "data-testid"?: string
}

export const ButtonIcon = React.forwardRef<HTMLButtonElement, IButtonIconProps>(
  (
    {
      icon,
      dataTrackId,
      ariaLabel,
      dataTestid,
      dataTrackValue,
      shouldPreventDefault,
      onClick,
      ...props
    },
    ref,
  ) => {
    const buttonProps = React.useMemo(() => {
      const commonButtonProps: ButtonElementProps = {
        "aria-label": ariaLabel,
        "data-track-id": dataTrackId,
        "data-track-value": dataTrackValue,
        "data-testid": dataTestid,
      }
      return commonButtonProps
    }, [ariaLabel, dataTrackId, dataTrackValue, dataTestid])

    const handleClick = React.useCallback(
      (e: React.SyntheticEvent) => {
        if (shouldPreventDefault) {
          e.preventDefault()
        }

        onClick && onClick(e)
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
