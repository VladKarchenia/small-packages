import React from "react"
import { Box, GridContainer, Grid, GridItem, Logo, Title, Spacer, Flex } from "@/shared/components"
import { CommonLayout } from "@/shared/layouts/common"

import { LoginFormContainer } from "./LoginFormContainer"

export const Login = () => {
  return (
    <CommonLayout>
      <GridContainer fullBleed>
        <Grid
          columns={{ "@initial": "1fr", "@sm": "1fr 1fr" }}
          css={{ "@sm": { height: "100vh" }, height: "100%" }}
        >
          <GridItem
            css={{
              backgroundColor: "$neutrals-1",
              padding: "$32 $24",
              display: "flex",
              flexFlow: "column nowrap",
              justifyContent: "center",
            }}
          >
            <Box css={{ flex: "0 0 auto" }}>
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
                    style={{ height: "48px" }}
                  />
                </Flex>
              </a>
            </Box>
            <Spacer size={32} />
            <Flex
              justify="center"
              direction="column"
              css={{
                flex: "1 1 100%",
              }}
            >
              <Title css={{ marginBottom: "$24" }} as="h2">
                Welcome!
              </Title>
              <LoginFormContainer />
            </Flex>
          </GridItem>
          <GridItem
            css={{ backgroundColor: "$brand-blue-lightest", minHeight: "480px" }}
          ></GridItem>
        </Grid>
      </GridContainer>
    </CommonLayout>
  )
}
