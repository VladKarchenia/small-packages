import React from "react"
import { Global } from "../components"
import { useViewportHeight } from "../hooks"

export const CommonLayout: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  useViewportHeight({ updateOnResize: true })

  return <Global backgroundColor="neutrals-0">{children}</Global>
}

export const getCommonLayout = (page: any) => <CommonLayout>{page}</CommonLayout>
