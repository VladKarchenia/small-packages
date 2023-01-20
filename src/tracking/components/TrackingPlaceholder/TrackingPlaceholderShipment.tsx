import { useNavigate } from "react-router-dom"

import { Role } from "@/shared/types"

import {
  Box,
  Copy,
  Divider,
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

export const TrackingPlaceholderShipment = () => {
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
      >
        <Hidden below="md" css={{ gridArea: "main" }}>
          <STrackingGridItem>
            <Stack space={24}>
              <Title as="h3" scale={{ "@initial": 8, "@md": 7 }}>
                Main Info
              </Title>
              <TrackingDetailsItem title="From where to where">
                <Redacted height="$20" text animated />
              </TrackingDetailsItem>
              <TrackingDetailsItem title="Date and delivery service">
                <Stack space={12}>
                  <Redacted height="$20" text animated />
                  <Redacted height="$20" text animated />
                </Stack>
              </TrackingDetailsItem>
              <TrackingDetailsItem title="Shipment Details">
                <Stack space={12}>
                  <Redacted height="$20" text animated />
                  <Redacted height="$20" text animated />
                </Stack>
              </TrackingDetailsItem>
            </Stack>
          </STrackingGridItem>
        </Hidden>

        <Hidden above="md">
          <GridContainer fullBleed={{ "@initial": false, "@sm": true }}>
            <STrackingGridItem css={{ gridArea: "main" }}>
              <Stack space={24} dividers>
                <>
                  <TrackingDetailsItem title="Tracking number link" titleIndent={4} titleScale={11}>
                    <Redacted height="$40" text animated />
                  </TrackingDetailsItem>
                  <Spacer size={24} />
                  <TrackingDetailsItem title="From where to where" titleScale={11}>
                    <Redacted height="$20" text animated />
                  </TrackingDetailsItem>
                </>

                <TrackingDetailsItem title="Date and delivery service" titleScale={11}>
                  <Stack space={12}>
                    <Redacted height="$20" text animated />
                    <Redacted height="$20" text animated />
                    <Redacted height="$20" text animated />
                  </Stack>
                </TrackingDetailsItem>

                <TrackingDetailsItem title="Shipment Details" titleScale={11}>
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

                <TrackingDetailsItem title="Sender’s info" titleScale={11}>
                  <Stack space={12}>
                    <Redacted height="$20" text animated />
                    <Redacted height="$20" text animated />
                    <Redacted height="$20" text animated />
                  </Stack>
                </TrackingDetailsItem>

                <TrackingDetailsItem title="Recipient’s info" titleScale={11}>
                  <Stack space={12}>
                    <Redacted height="$20" text animated />
                    <Redacted height="$20" text animated />
                    <Redacted height="$20" text animated />
                  </Stack>
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

        <Hidden below="md">
          <STrackingGridItem css={{ gridArea: "usersInfo" }}>
            <Stack space={12}>
              <TrackingDetailsItem
                title="Sender’s info"
                titleScale={7}
                titleColor={"system-black"}
                titleIndent={24}
              >
                <Stack space={12}>
                  <Redacted height="$20" text animated />
                  <Redacted height="$20" text animated />
                  <Redacted height="$20" text animated />
                </Stack>
              </TrackingDetailsItem>
              <TrackingDetailsItem
                title="Recipient’s info"
                titleScale={7}
                titleColor={"system-black"}
                titleIndent={24}
              >
                <Stack space={12}>
                  <Redacted height="$20" text animated />
                  <Redacted height="$20" text animated />
                  <Redacted height="$20" text animated />
                </Stack>
              </TrackingDetailsItem>
            </Stack>
          </STrackingGridItem>
        </Hidden>

        <Hidden below="md">
          <GridContainer fullBleed={{ "@initial": false, "@sm": true }} css={{ height: "100%" }}>
            <STrackingGridItem css={{ gridArea: "costs" }}>
              <TrackingDetailsItem
                title="Costs"
                titleScale={7}
                titleColor={"system-black"}
                titleIndent={0}
              >
                <Redacted height="28px" width="50%" text animated />
                <Spacer size={16} />
                <Stack space={16}>
                  <Redacted height="$20" text animated />
                  <Redacted height="$20" text animated />
                  <Redacted height="$20" text animated />
                  <Divider />
                  <Redacted height="$20" text animated />
                  <Redacted height="$20" text animated />
                </Stack>
              </TrackingDetailsItem>
            </STrackingGridItem>
          </GridContainer>
        </Hidden>

        <Hidden above="md">
          <GridContainer fullBleed={{ "@initial": false, "@sm": true }}>
            <STrackingGridItem css={{ gridArea: "costs" }}>
              <TrackingDetailsItem title="Costs" titleScale={11} titleIndent={8}>
                <Redacted height="$24" width="50%" text animated />
              </TrackingDetailsItem>
            </STrackingGridItem>
          </GridContainer>
        </Hidden>

        <GridContainer fullBleed={{ "@initial": false, "@sm": true }}>
          <STrackingGridItem css={{ gridArea: "labels" }}>
            <Hidden below="md">
              <TrackingDetailsItem
                title="Tracking & Label Links"
                titleIndent={16}
                titleScale={7}
                titleColor={"system-black"}
              >
                <Copy scale={11} bold>
                  Tracking number link
                </Copy>
                <Spacer size={4} />
                <Redacted height="$40" text animated />
              </TrackingDetailsItem>
            </Hidden>

            <Hidden above="md">
              <Title as="h3" scale={7}>
                Label links
              </Title>
              <Spacer size={16} />
              <Copy scale={9}>
                Shipment label must be printed and attached to a package before it is picked up
              </Copy>
            </Hidden>
            <Spacer size={{ "@initial": 24, "@md": 32 }} />

            <Stack space={{ "@initial": 16, "@md": 24 }}>
              <Box>
                <Copy scale={{ "@initial": 10, "@sm": 9 }}>Label in PDF</Copy>
                <Spacer size={4} />
                <Redacted height="$20" text animated />
              </Box>
              <Box>
                <Copy scale={{ "@initial": 10, "@sm": 9 }}>Label in ZPL</Copy>
                <Spacer size={4} />
                <Redacted height="$20" text animated />
              </Box>
              <Hidden above="md">
                <Divider />
              </Hidden>
              <Box>
                <Copy scale={{ "@initial": 10, "@sm": 9 }}>Return label in PDF</Copy>
                <Spacer size={4} />
                <Redacted height="$20" text animated />
              </Box>
              <Box>
                <Copy scale={{ "@initial": 10, "@sm": 9 }}>Return label in ZPL</Copy>
                <Spacer size={4} />
                <Redacted height="$20" text animated />
              </Box>
            </Stack>

            <Spacer size={{ "@initial": 8, "@md": 0 }} />
            <Hidden below="md">
              <Spacer size={20} />
              <Copy scale={9}>
                * Shipment label must be printed and attached to a package before it is picked up
              </Copy>
            </Hidden>
          </STrackingGridItem>
        </GridContainer>
      </STrackingGrid>

      <Spacer size={{ "@initial": 24, "@md": 0 }} />
    </>
  )
}
