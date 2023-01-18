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
import {
  STrackingGrid,
  STrackingGridItem,
} from "@/tracking/components/TrackingContainer/TrackingContainer.styles"
import { TrackingDetailsItem } from "@/tracking"
import {
  SRoutePointIcon,
  SRoutePointWrapper,
} from "@/tracking/components/ShipmentRoutePoint/ShipmentRoutePoint.styles"
import { useNavigate } from "react-router-dom"
import { Rows, LabelRows } from "./helpers"

export const TrackingPlaceholderShipment = () => {
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
                <Rows count={3} height="$20" width="261px" />
              </TrackingDetailsItem>

              <TrackingDetailsItem title="Shipment Details">
                <Stack space={12}>
                  <Redacted height="$20" width="261px" text animated />
                  <Redacted height="$20" width="235px" text animated />
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
                  <TrackingDetailsItem title="Tracking number" titleIndent={4} titleScale={11}>
                    <Redacted height="$40" width="311px" text animated />
                  </TrackingDetailsItem>
                  <Spacer size={24} />
                  <TrackingDetailsItem title="From where to where" titleScale={11}>
                    <Redacted height="$20" width="261px" text animated />
                  </TrackingDetailsItem>
                </>

                <TrackingDetailsItem title="Date and delivery service" titleScale={11}>
                  <Stack space={12}>
                    <Rows count={3} height="$20" width="261px" />
                  </Stack>
                </TrackingDetailsItem>
                <TrackingDetailsItem title="Shipment Details" titleScale={11}>
                  <Stack space={12}>
                    <Rows count={3} height="$20" width="261px" />
                  </Stack>
                  <Spacer size={24} />
                  <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black" bold>
                    Parcel 1
                  </Copy>
                  <Divider />
                  <Spacer size={16} />
                  <Stack space={12}>
                    <Rows count={3} height="$20" width="261px" />
                  </Stack>
                  <Spacer size={32} />
                  <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black" bold>
                    Parcel 2
                  </Copy>
                  <Divider />
                  <Spacer size={16} />
                  <Stack space={12}>
                    <Rows count={3} height="$20" width="261px" />
                  </Stack>
                </TrackingDetailsItem>

                <TrackingDetailsItem title="Route" titleScale={11}>
                  {routes.map((route, index) => {
                    return (
                      <SRoutePointWrapper
                        align="start"
                        last={routes.length - 1 === index}
                        key={index}
                      >
                        <SRoutePointIcon
                          align="center"
                          justify="center"
                          active={false}
                        ></SRoutePointIcon>
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

                <TrackingDetailsItem title="Sender’s info" titleScale={11}>
                  <Rows count={5} height="$20" width="261px" />
                </TrackingDetailsItem>

                <TrackingDetailsItem title="Recipient’s info" titleScale={11}>
                  <Rows count={5} height="$20" width="261px" />
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
                  <Redacted height="$20" width="142px" text animated />
                  <Redacted height="$20" width="113px" text animated />
                  <Redacted height="$20" width="124px" text animated />
                  <Redacted height="$20" width="157px" text animated />
                  <Redacted height="$20" width="136px" text animated />
                </Stack>
              </TrackingDetailsItem>
              <TrackingDetailsItem
                title="Recipient’s info"
                titleScale={7}
                titleColor={"system-black"}
                titleIndent={24}
              >
                <Stack space={12}>
                  <Redacted height="$20" width="142px" text animated />
                  <Redacted height="$20" width="113px" text animated />
                  <Redacted height="$20" width="124px" text animated />
                  <Redacted height="$20" width="157px" text animated />
                  <Redacted height="$20" width="136px" text animated />
                </Stack>
              </TrackingDetailsItem>
            </Stack>
          </STrackingGridItem>
        </Hidden>
        <Hidden below="md">
          <GridContainer fullBleed={{ "@initial": false, "@sm": true }}>
            <STrackingGridItem css={{ gridArea: "costs" }}>
              <TrackingDetailsItem
                title="Costs"
                titleScale={7}
                titleColor={"system-black"}
                titleIndent={24}
              >
                <Redacted height="$20" width="84px" text animated />
                <Spacer size={32} />
                <Stack space={16}>
                  <Rows count={6} height="$20" width="100%" />
                  <Divider />
                  <Rows count={2} height="$20" width="100%" />
                </Stack>
              </TrackingDetailsItem>
            </STrackingGridItem>
          </GridContainer>
        </Hidden>
        <Hidden above="md">
          <GridContainer fullBleed={{ "@initial": false, "@sm": true }}>
            <STrackingGridItem css={{ gridArea: "costs" }}>
              <TrackingDetailsItem title="Costs" titleScale={11} titleIndent={8}>
                <Redacted height="$20" width="185px" text animated />
              </TrackingDetailsItem>
            </STrackingGridItem>
          </GridContainer>
        </Hidden>

        <GridContainer fullBleed={{ "@initial": false, "@sm": true }}>
          <STrackingGridItem css={{ gridArea: "labels" }}>
            <Hidden below="md">
              <Title as="h3" scale={{ "@initial": 8, "@md": 7 }}>
                Tracking & Label LINKS
              </Title>
              <Spacer size={{ "@initial": 16, "@md": 24 }} />
              <Redacted height="$48" text animated />
              <Spacer size={{ "@initial": 24, "@md": 32 }} />
              <LabelRows count={4} />
              <Spacer size={20} />
              <Redacted height="$16" css={{ maxWidth: "332px" }} text animated />
              <Spacer size={4} />
              <Redacted height="$16" width="149px" text animated />
            </Hidden>
            <Hidden above="md">
              <Title as="h3" scale={{ "@initial": 8, "@md": 7 }}>
                Tracking & Label links
              </Title>
              <Spacer size={{ "@initial": 16, "@md": 24 }} />
              <Redacted height="$20" width="200px" text animated />
              <Spacer size={{ "@initial": 24, "@md": 32 }} />
              <LabelRows count={4} />
            </Hidden>
          </STrackingGridItem>
        </GridContainer>
      </STrackingGrid>
    </>
  )
}
