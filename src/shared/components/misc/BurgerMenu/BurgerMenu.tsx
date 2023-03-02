import React from "react"
import { useNavigate } from "react-router-dom"

import { HOME, PROFILE } from "@/constants"
import { ComponentProps } from "@/stitches/types"

import { Copy, Drawer, Stack, useDrawer, useDrawerActions } from "@/shared/components"
import { IconCross } from "@/shared/icons"

import { BurgerMenuButton } from "./BurgerMenuButton"

import { SNavLink } from "./NavLink.styles"

export interface INavItem {
  url: string
  text: string
}

interface INavLinkProps extends ComponentProps<typeof SNavLink> {
  selected?: boolean
}

const menuItems: INavItem[] = [
  {
    url: HOME,
    text: "Home",
  },
  {
    url: PROFILE,
    text: "User Management",
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

export const NavLink: React.FC<INavLinkProps> = ({
  children,
  href = "",
  selected = false,
  role,
}) => {
  const navigate = useNavigate()

  return (
    <SNavLink onClick={() => navigate(href)} selected={selected} role={role}>
      <Copy scale={8} color="system-black" bold>
        {children}
      </Copy>
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
      >
        <MenuNavItems items={menuItems} />
      </Drawer>
    </>
  )
}
