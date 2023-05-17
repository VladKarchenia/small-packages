import React from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { HOME, SETTINGS } from "@/constants"

import {
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
  NavButton,
} from "@/shared/components"
import { IconHome, IconHomeSolid, IconSettings, IconSettingsSolid } from "@/shared/icons"
import { IllustrationSquareLogo } from "@/shared/illustrations"
import { ThemeSwitcher } from "@/settings/components"

interface IMainLayoutProps {
  mobileFullBleed?: boolean
}

export const MainLayout: React.FC<React.PropsWithChildren<IMainLayoutProps>> = ({
  mobileFullBleed = true,
  children,
}) => {
  const location = useLocation()
  const navigate = useNavigate()
  const isActive = (pathname: string, url: string) => pathname === url

  return (
    <GridContainer fullBleed={{ "@initial": mobileFullBleed, "@sm": true }}>
      <Grid columns={{ "@initial": "1fr", "@sm": "$96 1fr" }}>
        <GridItem
          css={{
            display: "none",

            "@sm": {
              display: "block",
              minHeight: "calc(var(--vh) * 100)",
              backgroundColor: "$theme-b-n9",
              textAlign: "center",
            },
          }}
        >
          <Flex align="center" justify="center" direction="column" css={{ padding: "$20 0 $48" }}>
            <IllustrationSquareLogo />
          </Flex>
          <Stack space={20}>
            <NavButton
              icon={isActive(location.pathname, HOME) ? <IconHomeSolid /> : <IconHome />}
              selected={isActive(location.pathname, HOME)}
              onClick={() => navigate(HOME)}
              ariaLabel="Home button"
            />
            <NavButton
              icon={
                isActive(location.pathname, SETTINGS) ? <IconSettingsSolid /> : <IconSettings />
              }
              selected={isActive(location.pathname, SETTINGS)}
              onClick={() => navigate(SETTINGS)}
              ariaLabel="User management"
            />
          </Stack>
        </GridItem>

        <GridItem>
          <Grid rows={{ "@initial": "1fr", "@sm": "$72 1fr" }}>
            <GridItem
              css={{
                display: "none",
                "@sm": {
                  display: "block",
                  padding: "$16 $32",
                },
              }}
            >
              <Flex align="center" justify="between">
                <Flex>
                  <Hidden below="md">
                    <GlobalSearch />
                    <Spacer size={24} horizontal />
                  </Hidden>
                  {/* TODO: remove it later */}
                  <>
                    <Spacer size={24} horizontal />
                    <ThemeSwitcher />
                  </>
                </Flex>

                <Flex align="center">
                  <ProfileButton />
                  <Spacer size={20} horizontal />
                  <LogoutButton />
                </Flex>
              </Flex>
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
        </GridItem>
      </Grid>
    </GridContainer>
  )
}
