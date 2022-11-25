import React from "react"
import { ComponentProps } from "@/utils"
import { Flex } from "@/shared/components"

interface IHeaderNavItemProps extends ComponentProps<typeof Flex> {}

export const HeaderNavItem: React.FC<IHeaderNavItemProps> = ({
  children,
  align = "center",
  justify,
}) => {
  return (
    <Flex align={align} justify={justify} css={{ height: "100%" }}>
      {children}
    </Flex>
  )
}
