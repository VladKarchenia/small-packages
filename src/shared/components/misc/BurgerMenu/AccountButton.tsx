import { IconBurgerMenu } from "@/shared/icons"

import { SAccountButton } from "./AccountButton.styles"

export interface IAccountButton {
  onClick: () => void
  theme?: "default" | "cream" | "transparent"
}

export const AccountButton = ({ onClick, theme = "default" }: IAccountButton) => {
  const label = "label"

  return (
    <SAccountButton aria-label={label} onClick={onClick} theme={theme} rounded>
      <IconBurgerMenu />
    </SAccountButton>
  )
}
