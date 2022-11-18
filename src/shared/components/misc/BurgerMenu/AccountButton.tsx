import React from "react"
import { IconBurgerMenu } from "@/shared/icons"
import { SAccountButton } from "./AccountButton.styles"

export interface IAccountButton {
  onClick: () => void
  theme?: "default" | "cream" | "transparent"
}

export const AccountButton = React.forwardRef<HTMLButtonElement, IAccountButton>(
  ({ onClick, theme = "default" }, ref) => {
    const label = "label"

    return (
      <SAccountButton ref={ref} aria-label={label} onClick={onClick} theme={theme} rounded>
        <IconBurgerMenu />
      </SAccountButton>
    )
  },
)

AccountButton.displayName = "AccountButton"
