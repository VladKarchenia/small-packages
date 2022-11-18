import { Flex, Redacted, Spacer } from "@/shared/components"

export const ShippingCardPlaceholder = () => (
  <>
    <Flex>
      <Redacted height="$24" width="100px" text animated />
      <Spacer horizontal size={16} />
      <Redacted height="$24" width="64px" text animated />
    </Flex>
    <Flex css={{ marginTop: "$2" }}>
      <Redacted height="$24" width="64px" text animated />
      <Spacer size={24} horizontal />
      <Redacted height="$24" width="160px" text animated />
    </Flex>
    <Spacer size={16} />
    <Redacted height="$24" width="120px" text animated />
    <Flex justify="between">
      <Redacted height="$24" width="80px" text animated />
      <Redacted height="$24" width="64px" text animated />
    </Flex>
  </>
)
