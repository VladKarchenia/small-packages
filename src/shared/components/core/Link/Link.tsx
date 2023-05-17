import React, { useCallback } from "react"

import { ComponentProps } from "@/stitches/types"

import { Copy, ICopyProps } from "@/shared/components"

import { SLink } from "./Link.styles"

export interface ILinkProps extends Omit<ComponentProps<typeof SLink>, "onClick"> {
  as?: "a" | "button"
  scale?: ICopyProps["scale"]
  fontWeight?: ICopyProps["fontWeight"]
  noWrap?: boolean
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
  shouldPreventDefault?: boolean
}

export const Link = ({
  children,
  as = "a",
  shouldPreventDefault = false,
  onClick,
  scale = 6,
  fontWeight,
  noWrap,
  ...props
}: ILinkProps): React.ReactElement => {
  const handleOnClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>) => {
      if (shouldPreventDefault) {
        event.preventDefault()
      }

      onClick && onClick(event)
    },
    [shouldPreventDefault, onClick],
  )

  const linkProps = React.useMemo(() => {
    const { className, target, ...rest } = props
    const commonLinkProps = {
      ...rest,
      as,
      target,
      className,
    }

    if (target === "_blank") {
      return {
        ...commonLinkProps,
        rel: "noopener noreferrer",
      }
    }

    return commonLinkProps
  }, [props, as])

  return (
    <SLink data-ui="link" onClick={handleOnClick} {...linkProps}>
      {!noWrap ? (
        <Copy as="span" scale={scale} fontWeight={fontWeight}>
          {children}
        </Copy>
      ) : (
        children
      )}
    </SLink>
  )
}
