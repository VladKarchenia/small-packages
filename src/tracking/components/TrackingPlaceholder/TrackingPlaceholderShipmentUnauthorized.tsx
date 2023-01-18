import { useNavigate } from "react-router-dom"
import {
  Box,
  GridContainer,
  GridItem,
  HeaderBar,
  Hidden,
  Redacted,
  Spacer,
  Stack,
  Title,
} from "@/shared/components"
import { TrackingDetailsItem } from "@/tracking"
import {
  STrackingGrid,
  STrackingGridItem,
} from "@/tracking/components/TrackingContainer/TrackingContainer.styles"
import {
  SRoutePointIcon,
  SRoutePointWrapper,
} from "@/tracking/components/ShipmentRoutePoint/ShipmentRoutePoint.styles"
import { Rows } from "./helpers"

export const TrackingPlaceholderShipmentUnauthorized = () => {
  const routes = [1, 2, 3, 4, 5]
  const navigate = useNavigate()

  return (
    <>
      <Hidden above="sm">
        <HeaderBar title="Shipment details" onClick={() => navigate("/")} />
      </Hidden>
      <GridContainer fullBleed={{ "@initial": false, "@sm": true }}>
        <Spacer size={8} />
        <Redacted height="$32" width="299px" text animated />
        <Spacer size={12} />
        <Redacted height="$20" width="173px" text animated />
        <Spacer size={20} />
      </GridContainer>
      <STrackingGrid
        columns={{ "@initial": "1fr", "@md": "1fr 1fr 1fr 1fr" }}
        gap={{ "@initial": 16, "@md": 24 }}
        rows={"auto auto"}
        css={{
          "@initial": {
            gridTemplateAreas: `"map"
                              "main"`,
          },
          "@md": {
            gridTemplateAreas: `"main  map " 
                              "route map "`,
          },
        }}
      >
        <Hidden below="md" css={{ gridArea: "main" }}>
          <STrackingGridItem>
            <Stack space={24}>
              <Title as="h3" scale={{ "@initial": 8, "@md": 7 }}>
                Main Info
              </Title>
              <TrackingDetailsItem title="From where to where">
                <Redacted height="$20" width="261px" text animated />
              </TrackingDetailsItem>
              <TrackingDetailsItem title="Date and delivery service">
                <Rows count={2} height="$20" width="261px" />
              </TrackingDetailsItem>
            </Stack>
          </STrackingGridItem>
        </Hidden>

        <Hidden above="md">
          <GridContainer fullBleed={{ "@initial": false, "@sm": true }}>
            <STrackingGridItem css={{ gridArea: "main" }}>
              <Stack space={24} dividers>
                <TrackingDetailsItem title="From where to where" titleScale={11}>
                  <Redacted height="$20" width="261px" text animated />
                </TrackingDetailsItem>

                <TrackingDetailsItem title="Date and delivery service" titleScale={11}>
                  <Rows count={2} height="$20" width="261px" />
                </TrackingDetailsItem>

                <TrackingDetailsItem title="Route" titleScale={11}>
                  {routes.map((route, index) => {
                    return (
                      <SRoutePointWrapper
                        align="start"
                        last={routes.length - 1 === index}
                        key={index}
                      >
                        <SRoutePointIcon align="center" justify="center" active={false} />
                        {index == 3 || index == 4 ? (
                          <Box>
                            <Redacted height="$20" width="53px" text animated />
                            <Spacer size={8} />
                            <Redacted height="$20" width="189px" text animated />
                          </Box>
                        ) : (
                          <Box>
                            <Redacted height="$20" width="66px" text animated />
                          </Box>
                        )}
                      </SRoutePointWrapper>
                    )
                  })}
                </TrackingDetailsItem>
              </Stack>
            </STrackingGridItem>
          </GridContainer>
        </Hidden>

        <GridItem column={{ "@md": "span 3" }} css={{ gridArea: "map" }}>
          <Box
            css={{
              backgroundColor: "$neutrals-3",
              minHeight: "260px",
              "@initials": { borderRadius: 0 },
              "@md": { borderRadius: "20px", minHeight: "420px" },
            }}
          />
        </GridItem>

        <Hidden below="md">
          <STrackingGridItem css={{ gridArea: "route" }}>
            <TrackingDetailsItem
              title="Route"
              titleScale={7}
              titleColor={"system-black"}
              titleIndent={24}
            >
              {routes.map((route, index) => {
                return (
                  <SRoutePointWrapper align="start" last={routes.length - 1 === index} key={index}>
                    <SRoutePointIcon align="center" justify="center" active={false} />
                    {index == 3 || index == 4 ? (
                      <Box>
                        <Redacted height="$20" width="53px" text animated />
                        <Spacer size={8} />
                        <Redacted height="$20" width="189px" text animated />
                      </Box>
                    ) : (
                      <Box>
                        <Redacted height="$20" width="66px" text animated />
                      </Box>
                    )}
                  </SRoutePointWrapper>
                )
              })}
            </TrackingDetailsItem>
          </STrackingGridItem>
        </Hidden>
      </STrackingGrid>
    </>
  )
}
