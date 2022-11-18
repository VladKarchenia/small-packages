import { BurgerMenu, Flex, LoggedOutLabel } from "@/shared/components"

export const MobileHeader = () => {
  return (
    <Flex align="center" justify="between" css={{ paddingTop: "$20" }}>
      <BurgerMenu />
      <LoggedOutLabel />
    </Flex>
  )
}
