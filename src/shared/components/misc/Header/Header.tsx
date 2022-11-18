import React from "react"
import { Authorization, HeaderNavItem, HeaderNavWrapper, Logo } from "@/shared/components"

interface IHeaderProps {
  hasShadow?: boolean
  theme?: "default" | "cream" | "transparent"
}

export const Header: React.FC<React.PropsWithChildren<IHeaderProps>> = ({
  children = null,
  hasShadow = false,
  theme = "default",
}) => {
  return (
    <HeaderNavWrapper theme={theme} hasShadow={{ "@initial": false, "@md": hasShadow }}>
      <HeaderNavItem justify="start">{children}</HeaderNavItem>
      <HeaderNavItem>
        <Logo />
      </HeaderNavItem>
      <HeaderNavItem justify="end">
        <Authorization />
      </HeaderNavItem>
    </HeaderNavWrapper>
  )
}
