import React from "react"
import { Global } from "../components"

export const CommonLayout: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  return <Global backgroundColor="neutrals-0">{children}</Global>
}

export const getCommonLayout = (page: any) => <CommonLayout>{page}</CommonLayout>
