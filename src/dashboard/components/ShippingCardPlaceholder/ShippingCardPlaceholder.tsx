import { Divider, Flex, Redacted, Stack } from "@/shared/components"

import { SShippingCard } from "./ShippingCardPlaceholder.styles"

export const ShippingCardPlaceholder = () => (
  <SShippingCard>
    <Flex align="start" justify="between" css={{ width: "100%", paddingBottom: "$16" }}>
      <Stack space={4}>
        <Redacted height="$32" width="200px" text animated />
        <Redacted height="$24" width="$80" text animated />
      </Stack>
    </Flex>
    <Divider />
    <Stack space={12} css={{ marginTop: "$16" }}>
      <Flex justify="between">
        <Redacted height="$24" width="$80" text animated />
        <Redacted height="$24" width="$80" text animated />
      </Flex>
      <Flex justify="between">
        <Redacted height="$24" width="100px" text animated />
        <Redacted height="$24" width="$80" text animated />
      </Flex>
      <Flex justify="between">
        <Redacted height="$24" width="120px" text animated />
        <Redacted height="$24" width="$80" text animated />
      </Flex>
    </Stack>
  </SShippingCard>
)
