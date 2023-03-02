import React from "react"

import { IconBurgerMenu } from "@/shared/icons"

import { SBurgerMenuButton } from "./BurgerMenuButton.styles"

interface IBurgerMenuButtonProps {
  onClick: () => void
  theme?: "default" | "cream" | "transparent"
}

export const BurgerMenuButton = React.forwardRef<HTMLButtonElement, IBurgerMenuButtonProps>(
  ({ onClick, theme = "default" }, ref) => {
    const label = "label"

    return (
      <SBurgerMenuButton ref={ref} aria-label={label} onClick={onClick} theme={theme} rounded>
        <IconBurgerMenu />
      </SBurgerMenuButton>
    )
  },
)

BurgerMenuButton.displayName = "BurgerMenuButton"
