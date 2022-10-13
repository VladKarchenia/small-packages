import React from "react"
import { Box, HeaderNavItem, HeaderNavWrapper, Logo } from "@/shared/components"

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
    <HeaderNavWrapper
      theme={theme}
      hasShadow={{ "@initial": false, "@md": hasShadow }}
      css={{ paddingX: "$16" }}
    >
      <HeaderNavItem justify="start">{children}</HeaderNavItem>
      <HeaderNavItem>
        <Logo />
      </HeaderNavItem>
      <HeaderNavItem justify="end">
        <Box>Поиск</Box>
      </HeaderNavItem>
    </HeaderNavWrapper>
  )
}
