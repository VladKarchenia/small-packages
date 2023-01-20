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
import { Role } from "@/shared/types"

export const TrackingPlaceholderShipmentUnauthorized = () => {
  const routes = [1, 2, 3]
  const navigate = useNavigate()
  // TODO: use Zustand
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const role = user?.authorities?.[0]?.authority

  return (
    <>
      <Hidden above="sm">
        <HeaderBar
          title="Shipment details"
          onClick={() => navigate("/")}
          css={{ paddingRight: "$40" }}
        />
      </Hidden>
      <GridContainer fullBleed={{ "@initial": false, "@sm": true }}>
        <Hidden below="md">
          <Redacted height="$32" width="565px" text animated />
          <Spacer size={12} />
          {role === Role.Admin || role === Role.Ops ? (
            <Redacted height="$24" width="180px" text animated />
          ) : null}
        </Hidden>
        <Hidden above="md">
          <Redacted height="$24" text animated />
          <Spacer size={8} />
          {role === Role.Admin || role === Role.Ops ? (
            <Redacted height="$20" width="180px" text animated />
          ) : null}
        </Hidden>
      </GridContainer>

      <Spacer size={{ "@initial": 16, "@sm": 24 }} />

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
            <Title as="h3" scale={7} color="system-black">
              Main Info
            </Title>

            <Spacer size={24} />

            <GridContainer fullBleed={{ "@initial": false, "@sm": true }}>
              <Stack space={32}>
                <TrackingDetailsItem title="From where to where">
                  <Redacted height="$20" text animated />
                </TrackingDetailsItem>
                <TrackingDetailsItem title="Date and delivery service">
                  <Stack space={12}>
                    <Redacted height="$20" text animated />
                    <Redacted height="$20" text animated />
                  </Stack>
                </TrackingDetailsItem>
              </Stack>
            </GridContainer>
          </STrackingGridItem>
        </Hidden>

        <Hidden above="md">
          <GridContainer fullBleed={{ "@initial": false, "@sm": true }}>
            <STrackingGridItem css={{ gridArea: "main" }}>
              <Stack space={24} dividers>
                <TrackingDetailsItem title="From where to where" titleScale={11}>
                  <Redacted height="$20" text animated />
                </TrackingDetailsItem>

                <TrackingDetailsItem title="Date and delivery service" titleScale={11}>
                  <Stack space={12}>
                    <Redacted height="$20" text animated />
                    <Redacted height="$20" text animated />
                  </Stack>
                </TrackingDetailsItem>

                <TrackingDetailsItem title="Route" titleScale={11}>
                  {routes.map((route, index) => {
                    return (
                      <SRoutePointWrapper
                        align="start"
                        last={routes.length - 1 === index}
                        key={route}
                      >
                        <SRoutePointIcon align="center" justify="center" />
                        <Box css={{ width: "100%" }}>
                          <Redacted height="$20" width="50%" text animated />
                          <Redacted height="$20" text animated />
                        </Box>
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

              "@md": { borderRadius: "$8", minHeight: "100%" },
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
                  <SRoutePointWrapper align="start" last={routes.length - 1 === index} key={route}>
                    <SRoutePointIcon align="center" justify="center" />
                    <Box css={{ width: "100%" }}>
                      <Redacted height="$20" width="50%" text animated />
                      <Redacted height="$20" text animated />
                    </Box>
                  </SRoutePointWrapper>
                )
              })}
            </TrackingDetailsItem>
          </STrackingGridItem>
        </Hidden>
      </STrackingGrid>

      <Spacer size={{ "@initial": 24, "@md": 0 }} />
    </>
  )
}
