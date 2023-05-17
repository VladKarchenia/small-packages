import { ShippingType } from "@/shared/types"

import { Divider, Flex, Redacted, Stack } from "@/shared/components"

import { SPackagesInfoCard } from "./PackagesInfoCard.styles"

export const PackagesInfoCardPlaceholder = ({ shippingType }: { shippingType: ShippingType }) => (
  <SPackagesInfoCard>
    <Flex align="start" css={{ width: "100%", paddingBottom: "$16" }}>
      <Redacted height="$24" width="$80" text animated />
    </Flex>
    <Divider />
    <Stack space={12} css={{ marginTop: "$16" }}>
      {shippingType === ShippingType.Shipment ? (
        <Flex justify="between">
          <Redacted height="$24" width="100px" text animated />
          <Redacted height="$24" width="$80" text animated />
        </Flex>
      ) : null}
      <Flex justify="between">
        <Redacted height="$24" width="140px" text animated />
        <Redacted height="$24" width="$80" text animated />
      </Flex>
      <Flex justify="between">
        <Redacted height="$24" width="$80" text animated />
        <Redacted height="$24" width="$80" text animated />
      </Flex>
      {shippingType === ShippingType.Shipment ? (
        <Flex justify="between">
          <Redacted height="$24" width="100px" text animated />
          <Redacted height="$24" width="$80" text animated />
        </Flex>
      ) : null}
    </Stack>
  </SPackagesInfoCard>
)
