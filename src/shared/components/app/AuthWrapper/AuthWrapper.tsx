import { Box, Grid, GridContainer, GridItem, Hidden, Spacer } from "@/shared/components"
import { IllustrationLetterLogo, IllustrationLogo } from "@/shared/illustrations"

import { CommonLayout } from "@/shared/layouts/common"

export const AuthWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <CommonLayout>
      <GridContainer css={{ height: "100%" }} fullBleed={{ "@initial": false, "@sm": true }}>
        <Grid
          columns={{ "@initial": 6, "@sm": 12, "@lg": 24 }}
          columnGap={32}
          css={{
            height: `calc(var(--vh) * 100)`,
            backgroundColor: "$neutrals-0",

            "@md": { backgroundColor: "$neutrals-11" },
          }}
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
            <Box
              css={{
                position: "relative",

                "@md": {
                  padding: "$40",
                  backgroundColor: "$neutrals-0",

                  after: {
                    content: "''",
                    display: "block",
                    backgroundColor: "$brand-yellow-light",
                    position: "absolute",
                    left: 0,
                    bottom: "-$32",
                    width: "100%",
                    height: "$32",
                  },
                },
              }}
            >
              <Hidden
                above="md"
                css={{ position: "absolute", top: "-$64", left: 0, "@sm": { top: "-$32" } }}
              >
                <IllustrationLogo theme="dark" />
              </Hidden>
              {children}
              <Hidden
                below="md"
                css={{
                  position: "absolute",
                  bottom: -100,
                  left: -134,
                }}
              >
                <IllustrationLetterLogo />
              </Hidden>
            </Box>
            <Spacer size={32} />
            <Hidden
              below="md"
              css={{
                position: "absolute",
                top: "$56",
                left: "$56",
              }}
            >
              <IllustrationLogo />
            </Hidden>
          </GridItem>
        </Grid>
      </GridContainer>
    </CommonLayout>
  )
}
