import React from "react"

import { CSS } from "@/stitches/config"
import { ComponentProps } from "@/stitches/types"

import { SRedacted } from "./Redacted.styles"

export interface IRedactedProps extends ComponentProps<typeof SRedacted> {
  height?: CSS["height"]
  width?: CSS["width"]

  /**
   * Use when the component is acting as a piece of text
   */
  text?: boolean
}

export const Redacted: React.FC<React.PropsWithChildren<IRedactedProps>> = ({
  children,
  height = "$16",
  width = "100%",
  css,
  text,
  ...props
}: IRedactedProps) => {
  return (
    <SRedacted
      data-ui="redacted"
      {...props}
      css={{
        ...((css as Record<string, never>) || {}),
        height: text ? `calc(${height} - $4)` : height,
        width,
        marginTop: text ? "$4" : 0,
      }}
    >
      {children}
    </SRedacted>
  )
}
