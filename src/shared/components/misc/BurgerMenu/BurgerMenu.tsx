import React from "react"
import { Copy, Drawer, Stack, useDrawer, useDrawerActions } from "@/shared/components"
import { BurgerMenuButton } from "./BurgerMenuButton"
import { HOME, USER_MANAGEMENT } from "@/constants"
import { ComponentProps } from "@/utils"
import { SNavLink } from "./NavLink.styles"
import { IconCross } from "@/shared/icons"

export interface INavItem {
  href: string
  text: string
}

interface INavLinkProps extends ComponentProps<typeof SNavLink> {
  selected?: boolean
}

const menuItems: INavItem[] = [
  {
    href: HOME,
    text: "Home",
  },
  {
    href: USER_MANAGEMENT,
    text: "User Management",
  },
]

export const MenuNavItems = ({ items }: { items: INavItem[] }) => {
  return (
    <Stack as="ul" space={12} outerDividers="bottom" dividers>
      {items.map(({ href, text }) => (
        <NavLink key={href} href={href}>
          {text}
        </NavLink>
      ))}
    </Stack>
  )
}

export const NavLink: React.FC<INavLinkProps> = ({ children, href, selected = false, role }) => (
  <SNavLink href={href} selected={selected} role={role}>
    <Copy scale={8} color="system-black" bold>
      {children}
    </Copy>
  </SNavLink>
)

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
