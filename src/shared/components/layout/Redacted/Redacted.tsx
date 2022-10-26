import React from "react"
import { CSS } from "@/config"
import { ComponentProps } from "@/utils"

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
        ...((css as {}) || {}),
        height: text ? `calc(${height} - $4)` : height,
        width,
        marginTop: text ? "$4" : 0,
      }}
    >
      {children}
    </SRedacted>
  )
}
