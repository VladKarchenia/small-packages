import { Box, GridContainer, Grid, GridItem, Title, Spacer, Flex, Copy } from "@/shared/components"
import { CommonLayout } from "@/shared/layouts/common"

import { LoginFormContainer } from "./LoginFormContainer"

export const Login = () => {
  return (
    <CommonLayout>
      <GridContainer css={{ height: "100%" }}>
        <Grid
          columns={{ "@initial": 6, "@sm": 12, "@lg": 24 }}
          columnGap={32}
          css={{ "@sm": { height: "100vh" }, height: "100%" }}
        >
          <GridItem
            column={{
              "@initial": "span 6",
              "@sm": "2 / span 10",
              "@md": "4 / span 6",
              "@lg": "8 / span 10",
            }}
            css={{
              display: "flex",
              flexFlow: "column nowrap",
              justifyContent: "center",
            }}
          >
            <Box>
              <a
                aria-haspopup="false"
                aria-label="Logo name"
                role="button"
                tabIndex={0}
                href={"/"}
                style={{ textDecoration: "none" }}
              >
                <Flex>
                  <img
                    alt="logo"
                    src="https://gulfrelay.com/wp-content/uploads/2020/02/Gulf-Relay-horizontal-2-1-768x136.png"
                    style={{ height: "38px" }}
                  />
                </Flex>
              </a>
            </Box>
            <Spacer size={32} />
            <Flex justify="center" direction="column">
              <Title as="h1" scale={4}>
                Welcome!
              </Title>
              <Copy scale={9}>Please, log in to continue</Copy>
              <Spacer size={24} />
              <LoginFormContainer />
            </Flex>
            <Spacer size={96} />
          </GridItem>
        </Grid>
      </GridContainer>
    </CommonLayout>
  )
}
