import { Box, ButtonIcon, Copy, Flex, Hidden } from "@/shared/components"
import { IconChevronLeft } from "@/shared/icons"

export const HeaderBar = ({ title, onClick }: { title: string; onClick: () => void }) => {
  return (
    <Flex
      align="center"
      css={{ padding: "$16 $8", "@md": { paddingTop: "$0", paddingBottom: "$40" } }}
    >
      <Hidden above="sm">
        <ButtonIcon
          type="button"
          ariaLabel="Back button"
          icon={<IconChevronLeft size="sm" />}
          onClick={onClick}
          css={{ flex: "0 0 auto" }}
        />
      </Hidden>
      <Box
        css={{
          flex: "1 1 100%",
          paddingRight: "$32",
          textAlign: "center",
          "@md": { textAlign: "start" },
        }}
      >
        <Copy scale={{ "@initial": 8, "@md": 5 }} color="system-black" bold>
          {title}
        </Copy>
      </Box>
    </Flex>
  )
}
