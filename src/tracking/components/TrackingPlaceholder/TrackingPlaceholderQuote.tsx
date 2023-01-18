import { useNavigate } from "react-router-dom"
import {
  GridContainer,
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
import { Rows } from "./helpers"

export const TrackingPlaceholderQuote = () => {
  const navigate = useNavigate()

  return (
    <>
      <Hidden above="sm">
        <HeaderBar title="Quote details" onClick={() => navigate("/")} />
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
              <TrackingDetailsItem title="Pickup Date">
                <Redacted height="$20" width="261px" text animated />
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
                <TrackingDetailsItem title="From where to where" titleScale={11}>
                  <Redacted height="$20" width="261px" text animated />
                </TrackingDetailsItem>

                <TrackingDetailsItem title="Pickup Date">
                  <Redacted height="$20" width="261px" text animated />
                </TrackingDetailsItem>

                <TrackingDetailsItem title="Shipment Details" titleScale={11}>
                  <Rows count={2} height="$20" width="261px" />
                </TrackingDetailsItem>
              </Stack>
            </STrackingGridItem>
          </GridContainer>
        </Hidden>
      </STrackingGrid>
    </>
  )
}
