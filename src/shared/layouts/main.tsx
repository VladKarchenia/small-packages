import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  Box,
  ButtonIcon,
  Flex,
  GlobalSearch,
  Grid,
  GridContainer,
  GridItem,
  LoggedOutLabel,
  Spacer,
  Stack,
} from "@/shared/components"
import { IconBin, IconCalendar } from "@/shared/icons"
import { HOME, USER_MANAGEMENT } from "@/constants"

interface IMainLayoutProps {
  fullContentSize?: boolean
  withGlobalSearch?: boolean
  mobileFullBleed?: boolean
}

export const MainLayout: React.FC<React.PropsWithChildren<IMainLayoutProps>> = ({
  fullContentSize = true,
  withGlobalSearch = false,
  mobileFullBleed = true,
  children,
}) => {
  const location = useLocation()
  const navigate = useNavigate()
  const isActive = (pathname: string, href: string) => pathname === href

  return (
    <GridContainer fullBleed={{ "@initial": mobileFullBleed, "@sm": true }}>
      <Grid rows={{ "@initial": "1fr", "@sm": "72px 1fr" }}>
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
            <a
              aria-haspopup="false"
              aria-label="Logo name"
              role="button"
              tabIndex={0}
              href={"/"}
              style={{ textDecoration: "none" }}
            >
              <Flex css={{ height: "$40" }}>
                <img
                  alt="logo"
                  src="https://gulfrelay.com/wp-content/uploads/2020/02/Gulf-Relay-horizontal-2-1-768x136.png"
                />
              </Flex>
            </a>

            <Flex align="center">
              {withGlobalSearch ? (
                <>
                  <GlobalSearch />
                  <Spacer size={24} horizontal />
                </>
              ) : null}
              <LoggedOutLabel />
            </Flex>
          </Flex>
        </GridItem>
        <Grid columns={{ "@initial": "1fr", "@sm": "88px 1fr" }}>
          <GridItem
            css={{
              display: "none",
              "@sm": {
                display: "block",
                // 72px - desktop header height
                minHeight: `calc((var(--vh) * 100) - 72px)`,
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
                  <IconBin
                    size="sm"
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
                  <IconCalendar
                    size="sm"
                    css={{
                      color: isActive(location.pathname, USER_MANAGEMENT)
                        ? "$system-black"
                        : "$neutrals-4",
                    }}
                  />
                }
                onClick={() => navigate(USER_MANAGEMENT)}
              />
            </Stack>
          </GridItem>
          <GridItem>
            <Grid
              columns={{ "@initial": 6, "@sm": 12, "@lg": 24 }}
              columnGap={32}
              css={{ "@sm": { padding: "$32" } }}
            >
              <GridItem
                column={
                  fullContentSize
                    ? { "@initial": "1 / span 6", "@sm": "1 / span 12", "@lg": "1 / span 24" }
                    : {
                        "@initial": "1 / span 6",
                        "@sm": "1 / span 12",
                        "@lg": "1 / span 16",
                      }
                }
              >
                {children}
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
      </Grid>
    </GridContainer>
  )
}

export const getMainLayout = (page: any) => <MainLayout>{page}</MainLayout>
