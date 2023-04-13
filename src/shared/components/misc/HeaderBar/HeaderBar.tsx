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
        "@sm": { paddingLeft: 0 },
        "@md": { paddingTop: 0, paddingBottom: "$40" },
      }}
    >
      <Hidden above="sm">
        <ButtonIcon
          icon={<IconChevronLeft />}
          ariaLabel="Back button"
          onClick={onClick}
          inputIcon
        />
      </Hidden>
      <Box
        css={{
          flex: "1 1 100%",
          textAlign: "center",
          "@sm": { textAlign: "start" },
        }}
      >
        <Copy scale={3} color="theme-b-n3" fontWeight="bold">
          {title}
        </Copy>
      </Box>
    </Flex>
  )
}
