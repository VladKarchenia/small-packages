import React from "react"

import { IconBurgerMenu } from "@/shared/icons"

import { SBurgerMenuButton } from "./BurgerMenuButton.styles"

interface IBurgerMenuButtonProps {
  onClick: () => void
}

export const BurgerMenuButton = React.forwardRef<HTMLButtonElement, IBurgerMenuButtonProps>(
  ({ onClick }, ref) => {
    const label = "label"

    return (
      <SBurgerMenuButton ref={ref} aria-label={label} onClick={onClick} rounded>
        <IconBurgerMenu />
      </SBurgerMenuButton>
    )
  },
)

BurgerMenuButton.displayName = "BurgerMenuButton"
