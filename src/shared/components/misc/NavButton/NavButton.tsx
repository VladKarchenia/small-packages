import { SNavButton } from "./NavButton.styles"

interface INavButtonProps {
  ariaLabel: string
  icon: React.ReactNode
  onClick?: (event: React.SyntheticEvent) => void
  selected?: boolean
}

export const NavButton = ({ ariaLabel, icon, onClick, selected }: INavButtonProps) => {
  return (
    <SNavButton type="button" aria-label={ariaLabel} onClick={onClick} selected={selected}>
      {icon}
    </SNavButton>
  )
}
