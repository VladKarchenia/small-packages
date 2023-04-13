import { useNavigate } from "react-router-dom"

import { useAuthStore } from "@/store"
import { mediaQueries } from "@/stitches/theme"
import { useMedia } from "@/shared/hooks"
import { Role } from "@/shared/types"
import { HOME } from "@/constants"

import { GridContainer, HeaderBar, Hidden, Redacted, Spacer, Stack } from "@/shared/components"
import { TrackingDetailsItem } from "@/tracking/components"

import { STrackingSection } from "@/tracking/components/TrackingContainer/TrackingContainer.styles"

export const TrackingPlaceholderQuote = () => {
  const navigate = useNavigate()
  const isMediumAndAbove = useMedia([mediaQueries.md], [true], false)
  const user = useAuthStore((state) => state.user)
  const role = user.authorities?.[0]?.authority

  return (
    <>
      <Hidden above="sm">
        <HeaderBar
          title="Quote details"
          onClick={() => navigate(HOME)}
          css={{ paddingRight: "$40" }}
        />
      </Hidden>
      <GridContainer fullBleed={{ "@initial": false, "@sm": true }}>
        <Hidden below="md">
          <Redacted height="$32" width="560px" text animated />
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

      <GridContainer
        fullBleed={{ "@initial": false, "@sm": true }}
        css={{
          "@initial": {
            maxWidth: "100%",
            paddingBottom: "$48",
          },
          "@md": {
            maxWidth: 560,
            marginLeft: "initial",
          },
        }}
      >
        <STrackingSection>
          <Hidden below="md">
            <TrackingDetailsItem title="Main Info" main />
          </Hidden>
          <Stack space={24} dividers={isMediumAndAbove ? false : true} css={{ width: "$144" }}>
            <TrackingDetailsItem title="From where to where">
              <Redacted height="$24" width="320px" text animated />
            </TrackingDetailsItem>

            <TrackingDetailsItem title="Pickup Date">
              <Redacted height="$20" width="200px" text animated />
            </TrackingDetailsItem>

            <TrackingDetailsItem title="Shipment Details">
              <Stack space={12}>
                <Redacted height="$20" width="260px" text animated />
                <Redacted height="$20" width="140px" text animated />
              </Stack>
            </TrackingDetailsItem>
          </Stack>
        </STrackingSection>
      </GridContainer>

      <Spacer size={{ "@initial": 24, "@md": 0 }} />
    </>
  )
}
