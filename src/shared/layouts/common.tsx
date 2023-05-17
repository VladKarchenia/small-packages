import React from "react"

import { useKeyboardFocus, useViewportHeight } from "@/shared/hooks"

import { Global } from "@/shared/components"

export const CommonLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  useKeyboardFocus()
  useViewportHeight({ updateOnResize: true })

  return <Global>{children}</Global>
}
