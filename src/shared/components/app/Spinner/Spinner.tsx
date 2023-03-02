import { Flex } from "@/shared/components"
import { IllustrationSpinner } from "@/shared/illustrations"

export const Spinner = () => {
  return (
    <Flex align="center" css={{ padding: "$16", height: "$56" }}>
      <IllustrationSpinner css={{ display: "block", height: "$20", width: "$20" }} />
    </Flex>
  )
}
