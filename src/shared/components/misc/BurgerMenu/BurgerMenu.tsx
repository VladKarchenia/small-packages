import * as React from "react"
import { Copy, Drawer, Stack, useDrawer, useDrawerActions } from "@/shared/components"
import { AccountButton } from "./AccountButton"
import { atomicClassNames, ComponentProps } from "@/utils"
import { SNavLink } from "./NavLink.styles"
import { IconCross } from "@/shared/icons"

export const HOME = "/"
export const USER_MENEGEMENT = "/"

export interface INavItem {
  href: string
  text: string
}

interface INavLink extends ComponentProps<typeof SNavLink> {
  selected?: boolean
}

const menuItems: INavItem[] = [
  {
    href: HOME,
    text: "Home",
  },
  {
    href: USER_MENEGEMENT,
    text: "User Management",
  },
]

export const MenuNavItems = ({ items }: { items: INavItem[] }) => {
  return (
    <Stack as="ul" space={12} dividers={true}>
      {items.map(({ href, text }) => (
        <NavLink key={href} href={href}>
          {text}
        </NavLink>
      ))}
    </Stack>
  )
}

export const NavLink: React.FC<INavLink> = ({ children, href, selected = false, role }) => (
  <SNavLink href={href} selected={selected} role={role}>
    <Copy
      scale={8}
      as="span"
      color="system-black"
      className={atomicClassNames({ display: "inline-block" })}
    >
      {children}
    </Copy>
  </SNavLink>
)

export interface IBurgerMenuProps {
  currentPathname?: string
}
// export interface ILoginMenuProps {
//   config: ILoginConfig;
//   registerCountries?: ICountryOption[];
//   isTransparent?: boolean;
//   theme?: "default" | "cream" | "transparent";
//   /**
//    * @deprecated use `onLogin` and `onLogout` props
//    */
//   consumerCb?: (user: IUserInfo) => void;
//   onLogin?: (user: IUserInfo) => void;
//   onLogout?: () => void;
// }

export const BurgerMenu: React.FC<IBurgerMenuProps> = () => {
  const [drawerProps] = useDrawer("AccountButton")
  const { open } = useDrawerActions()

  return (
    <Drawer
      {...drawerProps}
      closeIcon={<IconCross />}
      fullWidth={{ "@max-sm": true }}
      trigger={
        <AccountButton
          // cdnUrl={config.cdnUrl}
          // isLoggedIn={isLoggedIn}
          // theme={theme}
          // isTransparent={isTransparent}
          onClick={() => open("AccountButton")}
          // userInfo={config.userInfo}
        />
      }
    >
      <MenuNavItems items={menuItems} />
    </Drawer>
  )
}

BurgerMenu.displayName = "BurgerMenu"
