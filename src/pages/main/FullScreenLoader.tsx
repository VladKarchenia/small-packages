import { Flex, GridContainer } from "@/shared/components"
import { IconDots } from "@/shared/icons"

export const FullScreenLoader = () => {
  return (
    <GridContainer>
      <Flex align={"center"} justify={"center"} css={{ height: "100%" }}>
        <IconDots />
      </Flex>
    </GridContainer>
  )
}
