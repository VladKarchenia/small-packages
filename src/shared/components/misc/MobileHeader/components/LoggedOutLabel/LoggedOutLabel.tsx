import React from "react"
import { IconAccount } from "@/shared/icons"

export interface ILoggedOutLabelProps {
  isTransparent?: boolean
}

export const LoggedOutLabel: React.FC<ILoggedOutLabelProps> = ({ isTransparent }) => {
  return (
    <IconAccount
      width={32}
      height={32}
      fixedSize={true}
      theme={isTransparent ? "transparent" : "default"}
      css={{
        borderRadius: "$rounded",
      }}
    />
  )
}
