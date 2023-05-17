import { ShippingType } from "@/shared/types"

import { Flex, GridContainer, Redacted, Spacer, Stack } from "@/shared/components"
import { PackagesInfoTableRow } from "@/tracking/components"

export const PackagesInfoTablePlaceholder = ({ shippingType }: { shippingType: ShippingType }) => (
  <GridContainer
    fullBleed={{ "@initial": false, "@sm": true }}
    css={{
      maxWidth: "100%",
      paddingBottom: "$48",
      marginLeft: "initial",
    }}
  >
    <Flex css={{ gap: "$32" }}>
      <Redacted height="$24" width="100px" text animated />
      <Redacted height="$24" width="100px" text animated />
      {shippingType === ShippingType.Shipment ? (
        <Redacted height="$24" width="100px" text animated />
      ) : null}
    </Flex>
    <Spacer size={24} />
    <PackagesInfoTableRow
      packageNumber="Package number"
      packageTrackingNumber="Package tracking number"
      dimensions="Dimensions (L x W x H)"
      weight="Weight"
      declaredValue="Declared Value"
      shippingType={shippingType}
      isTableHead
      isPlaceholder
    />
    <Stack space={0}>
      {Array.from(new Array(20), (_, index) => index).map((v) => (
        <PackagesInfoTableRow key={v} shippingType={shippingType} isPlaceholder />
      ))}
    </Stack>
  </GridContainer>
)
