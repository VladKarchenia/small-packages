import { CSS } from "@/stitches/config"

import { Box, ButtonIcon, Copy, Flex, Hidden } from "@/shared/components"
import { IconChevronLeft } from "@/shared/icons"

export const HeaderBar = ({
  title,
  onClick,
  css,
}: {
  title: string
  onClick: () => void
  css?: CSS
}) => {
  return (
    <Flex
      align="center"
      css={{
        ...css,
        width: "100%",
        paddingY: "$16",
        paddingLeft: "$8",
        "@md": { paddingTop: 0, paddingBottom: "$40" },
      }}
    >
      <Hidden above="sm">
        <ButtonIcon
          type="button"
          ariaLabel="Back button"
          icon={<IconChevronLeft />}
          onClick={onClick}
          css={{ flex: "0 0 auto" }}
        />
      </Hidden>
      <Box
        css={{
          flex: "1 1 100%",
          textAlign: "center",
          "@sm": { textAlign: "start" },
        }}
      >
        <Copy scale={{ "@initial": 8, "@md": 5 }} color="system-black" bold>
          {title}
        </Copy>
      </Box>
    </Flex>
  )
}
