import { useNavigate } from "react-router-dom"

import { HOME } from "@/constants"

import { Box, Flex, Grid, GridContainer, GridItem, Spacer } from "@/shared/components"
import { CommonLayout } from "@/shared/layouts/common"

export const AuthWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate()

  return (
    <CommonLayout>
      <GridContainer css={{ height: "100%" }} fullBleed={{ "@initial": false, "@sm": true }}>
        <Grid
          columns={{ "@initial": 6, "@sm": 12, "@lg": 24 }}
          columnGap={32}
          css={{ height: `calc(var(--vh) * 100)` }}
        >
          <GridItem
            column={{
              "@initial": "1 / span 6",
              "@sm": "2 / span 10",
              "@md": "4 / span 6",
              "@lg": "9 / span 8",
            }}
            css={{
              display: "flex",
              flexFlow: "column nowrap",
              justifyContent: "center",
            }}
          >
            <Flex justify={{ "@sm": "center" }}>
              <a
                aria-haspopup="false"
                aria-label="Logo name"
                role="button"
                tabIndex={0}
                onClick={() => navigate(HOME)}
                style={{ textDecoration: "none" }}
              >
                <Flex css={{ height: "$40", "@sm": { height: "$64" } }}>
                  <img
                    alt="logo"
                    src="https://gulfrelay.com/wp-content/uploads/2020/02/Gulf-Relay-horizontal-2-1-768x136.png"
                  />
                </Flex>
              </a>
            </Flex>
            <Spacer size={{ "@initial": 32, "@sm": 48 }} />
            <Box
              css={{
                "@sm": {
                  padding: "$40",
                  border: "1px solid $neutrals-4",
                  borderRadius: "$8",
                },
              }}
            >
              {children}
            </Box>
            <Spacer size={96} />
          </GridItem>
        </Grid>
      </GridContainer>
    </CommonLayout>
  )
}
