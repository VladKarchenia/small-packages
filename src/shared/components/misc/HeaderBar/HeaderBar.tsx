import { Box, ButtonIcon, Copy, Flex } from "@/shared/components"
import { IconChevronLeft } from "@/shared/icons"

export const HeaderBar = ({ title, onClick }: { title: string; onClick: () => void }) => {
  return (
    <Flex align="center" css={{ padding: "$16 $8" }}>
      <ButtonIcon
        type="button"
        ariaLabel="Back button"
        icon={<IconChevronLeft size="sm" />}
        onClick={onClick}
        css={{ flex: "0 0 auto" }}
      />
      <Box css={{ flex: "1 1 100%", paddingRight: "$32", textAlign: "center" }}>
        <Copy scale={8} color="system-black" bold>
          {title}
        </Copy>
      </Box>
    </Flex>
  )
}
