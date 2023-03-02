import React from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { HOME, PROFILE } from "@/constants"

import {
  ButtonIcon,
  Flex,
  GlobalSearch,
  Grid,
  GridContainer,
  GridItem,
  ProfileButton,
  LogoutButton,
  Spacer,
  Stack,
  Hidden,
} from "@/shared/components"
import { IconHome, IconManagement } from "@/shared/icons"

interface IMainLayoutProps {
  withGlobalSearch?: boolean
  mobileFullBleed?: boolean
}

export const MainLayout: React.FC<React.PropsWithChildren<IMainLayoutProps>> = ({
  withGlobalSearch = false,
  mobileFullBleed = true,
  children,
}) => {
  const location = useLocation()
  const navigate = useNavigate()
  const isActive = (pathname: string, url: string) => pathname === url

  return (
    <GridContainer fullBleed={{ "@initial": mobileFullBleed, "@sm": true }}>
      <Grid rows={{ "@initial": "1fr", "@sm": "$72 1fr" }}>
        <GridItem
          css={{
            display: "none",
            "@sm": {
              display: "block",
              padding: "$16 $32",
              borderBottom: "1px solid $neutrals-4",
            },
          }}
        >
          <Flex align="center" justify="between">
            <Flex>
              <a
                aria-haspopup="false"
                aria-label="Logo name"
                role="button"
                tabIndex={0}
                onClick={() => navigate(HOME)}
                style={{ textDecoration: "none", cursor: "pointer" }}
              >
                <Flex css={{ height: "$40" }}>
                  <img
                    alt="logo"
                    src="https://gulfrelay.com/wp-content/uploads/2020/02/Gulf-Relay-horizontal-2-1-768x136.png"
                  />
                </Flex>
              </a>
              <Spacer size={32} horizontal />
              {withGlobalSearch ? (
                <Hidden below="md">
                  <GlobalSearch />
                  <Spacer size={24} horizontal />
                </Hidden>
              ) : null}
            </Flex>

            <Flex align="center">
              <ProfileButton />
              <Spacer size={20} horizontal />
              <LogoutButton />
            </Flex>
          </Flex>
        </GridItem>
        <Grid columns={{ "@initial": "1fr", "@sm": "$88 1fr" }}>
          <GridItem
            css={{
              display: "none",
              "@sm": {
                display: "block",
                // $72 - desktop header height
                minHeight: `calc((var(--vh) * 100) - $72)`,
                paddingY: "$32",
                borderRight: "1px solid $neutrals-4",
                textAlign: "center",
              },
            }}
          >
            <Stack space={32}>
              <ButtonIcon
                type="button"
                ariaLabel="Home button"
                icon={
                  <IconHome
                    css={{
                      color: isActive(location.pathname, HOME) ? "$system-black" : "$neutrals-4",
                    }}
                  />
                }
                onClick={() => navigate(HOME)}
              />
              <ButtonIcon
                type="button"
                ariaLabel="User Management"
                icon={
                  <IconManagement
                    css={{
                      color: isActive(location.pathname, PROFILE) ? "$system-black" : "$neutrals-4",
                    }}
                  />
                }
                onClick={() => navigate(PROFILE)}
              />
            </Stack>
          </GridItem>
          <GridItem>
            <Grid
              columns={{ "@initial": 6, "@sm": 12, "@lg": 24 }}
              columnGap={32}
              css={{ "@sm": { height: "100%", padding: "$32" } }}
            >
              {children}
            </Grid>
          </GridItem>
        </Grid>
      </Grid>
    </GridContainer>
  )
}
