import React from "react"
import { useNavigate } from "react-router-dom"

import { HOME, SETTINGS } from "@/constants"
import { ComponentProps } from "@/stitches/types"

import { Copy, Drawer, Stack, Title, useDrawer, useDrawerActions } from "@/shared/components"
import { IconCross } from "@/shared/icons"

import { BurgerMenuButton } from "./BurgerMenuButton"

import { SNavLink } from "./NavLink.styles"

export interface INavItem {
  url: string
  text: string
}

interface INavLinkProps extends ComponentProps<typeof SNavLink> {}

const menuItems: INavItem[] = [
  {
    url: HOME,
    text: "Home",
  },
  {
    url: SETTINGS,
    text: "Settings",
  },
]

export const MenuNavItems = ({ items }: { items: INavItem[] }) => {
  return (
    <Stack as="ul" space={12} outerDividers="bottom" dividers>
      {items.map(({ url, text }) => (
        <NavLink key={url} href={url}>
          {text}
        </NavLink>
      ))}
    </Stack>
  )
}

export const NavLink: React.FC<INavLinkProps> = ({ children, href = "", role }) => {
  const navigate = useNavigate()

  return (
    <SNavLink as="button" type="button" onClick={() => navigate(href)} role={role}>
      <Copy fontWeight="semiBold">{children}</Copy>
    </SNavLink>
  )
}

interface IBurgerMenuProps {
  currentPathname?: string
}

export const BurgerMenu: React.FC<IBurgerMenuProps> = () => {
  const [drawerProps] = useDrawer("BurgerMenu")
  const { open } = useDrawerActions()

  return (
    <>
      <Drawer
        {...drawerProps}
        closeIcon={<IconCross />}
        fullWidth={{ "@max-sm": true }}
        trigger={<BurgerMenuButton onClick={() => open("BurgerMenu")} />}
        contentCss={{ padding: "$24 $16" }}
        direction="left"
        header={
          <Title as="h3" scale={3} color="theme-b-n3">
            Menu
          </Title>
        }
      >
        <MenuNavItems items={menuItems} />
      </Drawer>
    </>
  )
}
