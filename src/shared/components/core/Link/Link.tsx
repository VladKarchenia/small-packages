import React, { useCallback } from "react"

import { ComponentProps } from "@/stitches/types"

import { Copy, ICopyProps } from "@/shared/components"

import { SLink } from "./Link.styles"

export interface ILinkProps extends Omit<ComponentProps<typeof SLink>, "onClick"> {
  as?: "a" | "button"
  intent?: ICopyProps["intent"]
  scale?: ICopyProps["scale"]
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
  shouldPreventDefault?: boolean
}

export const Link = ({
  children,
  as = "a",
  shouldPreventDefault = false,
  onClick,
  intent = "copy",
  scale = 8,
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
      intent,
      className,
    }

    if (target === "_blank") {
      return {
        ...commonLinkProps,
        rel: "noopener noreferrer",
      }
    }

    return commonLinkProps
  }, [props, as, intent])

  return (
    <SLink data-ui="link" isCtaIntent={intent === "cta"} onClick={handleOnClick} {...linkProps}>
      <Copy as="span" color="system-inherit" intent={intent} scale={scale}>
        {children}
      </Copy>
    </SLink>
  )
}
