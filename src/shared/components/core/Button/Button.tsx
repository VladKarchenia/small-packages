import * as React from "react"

import { ComponentProps } from "@/stitches/types"

import { Copy, Flex, ICopyProps } from "@/shared/components"
import { IllustrationSpinner } from "@/shared/illustrations"

import { SButton, SButtonIcon, SButtonSpinner } from "./Button.styles"

export interface IButtonProps extends ComponentProps<typeof SButton> {
  icon?: JSX.Element
  suffix?: JSX.Element

  id?: string
  className?: string

  href?: string
  target?: string
  type?: "button" | "submit"

  ariaLabel?: string
  dataTestid?: string

  disabled?: boolean
  noWrap?: boolean
  shouldPreventDefault?: boolean

  scale?: ICopyProps["scale"]
  copyProps?: ICopyProps

  loading?: boolean

  onBlur?: (event: React.SyntheticEvent) => void
  onFocus?: (event: React.SyntheticEvent) => void
  onClick?: (event: React.SyntheticEvent) => void
}

interface ButtonElementProps extends Partial<IButtonProps> {
  "aria-label"?: string
  "data-testid"?: string
  rel?: string
}

export const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  (
    {
      children,
      icon,
      suffix,
      noWrap,
      shouldPreventDefault,
      ariaLabel,
      dataTestid,
      onClick,
      scale = 6,
      copyProps,
      loading,
      ...props
    },
    ref,
  ) => {
    const isLink = props.as === "a"

    const buttonProps = React.useMemo(() => {
      const commonButtonProps: ButtonElementProps = {
        "aria-label": ariaLabel,
        "data-testid": dataTestid,
      }

      if (isLink) {
        return {
          ...commonButtonProps,
          rel: props.target === "_blank" ? "noopener noreferrer" : "",
        }
      } else {
        return {
          ...commonButtonProps,
          type: props.type || "button",
        }
      }
    }, [ariaLabel, dataTestid, isLink, props.target, props.type])

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
      <SButton ref={ref} {...buttonProps} {...props} onClick={handleClick}>
        <Flex css={{ position: "relative", gap: "$8" }}>
          {icon && <SButtonIcon>{icon}</SButtonIcon>}
          {!noWrap ? (
            <Copy scale={scale} fontWeight="bold" {...copyProps}>
              {children}
            </Copy>
          ) : (
            children
          )}
          {suffix && <SButtonIcon>{suffix}</SButtonIcon>}
          {loading && (
            <SButtonSpinner>
              <IllustrationSpinner />
            </SButtonSpinner>
          )}
        </Flex>
      </SButton>
    )
  },
)

Button.displayName = "Button"
