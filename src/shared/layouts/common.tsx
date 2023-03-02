import React from "react"

import { useViewportHeight } from "@/shared/hooks"

import { Global } from "@/shared/components"

export const CommonLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  useViewportHeight({ updateOnResize: true })

  return <Global backgroundColor="system-white">{children}</Global>
}
