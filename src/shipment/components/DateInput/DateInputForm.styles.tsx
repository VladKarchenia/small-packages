import { styled } from "@/config"
import { Flex } from "@/shared/components"

export const SFooterWrap = styled(Flex, {
  padding: "$16 $24",
  "@md": {
    padding: 0,
  },
  variants: {
    divider: {
      true: {
        borderTop: "1px solid $neutrals-2",
      },
    },
  },
})

export const SDatesInputContent = styled("div", {
  overflow: "hidden auto",
  paddingY: 0,

  "@md": { paddingX: 0, maxWidth: "100%", margin: "0 auto", border: "none" },
})
