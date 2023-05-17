import { ShippingType } from "@/shared/types"

import { Flex, GridContainer, Redacted, Spacer, Stack } from "@/shared/components"
import { PackagesInfoCardPlaceholder } from "@/tracking/components"

export const PackagesInfoListPlaceholder = ({ shippingType }: { shippingType: ShippingType }) => (
  <GridContainer
    fullBleed={{ "@initial": false, "@sm": true }}
    css={{
      maxWidth: "100%",
      paddingBottom: "$48",
    }}
  >
    <Redacted height="$24" width="140px" text animated />
    <Spacer size={16} />
    <Flex css={{ gap: "$16" }}>
      <Redacted height="$24" width="100px" text animated />
      <Redacted height="$24" width="100px" text animated />
      {shippingType === ShippingType.Shipment ? (
        <Redacted height="$24" width="100px" text animated />
      ) : null}
    </Flex>
    <Spacer size={16} />
    <Stack space={16}>
      {Array.from(new Array(5), (_, index) => index).map((v) => (
        <PackagesInfoCardPlaceholder key={`placeholder-row-${v}`} shippingType={shippingType} />
      ))}
    </Stack>
  </GridContainer>
)
