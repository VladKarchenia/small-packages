import React from "react"
import { Box, GridContainer, Grid, GridItem, Title, Spacer, Flex, Copy } from "@/shared/components"
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
              padding: "$32 $16",
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
                    style={{ height: "38px" }}
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
              <Title as="h1" scale={4}>
                Welcome!
              </Title>
              <Copy scale={9}>Please, log in to continue</Copy>
              <Spacer size={24} />
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
