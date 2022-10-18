import React from "react"
import { Flex, FlexItem } from "@/shared/components"
import { IconChevronLeft, IconChevronRight } from "@/shared/icons"

import { SActionButton } from "./Pagination.styles"

interface IActionButton {
  disabled: boolean
  label: string
  onClick: () => void
}

export interface IPaginationProps {
  children: React.ReactNode
  previous: IActionButton
  next: IActionButton
}

export const Pagination: React.FC<React.PropsWithChildren<IPaginationProps>> = ({
  children,
  previous,
  next,
}) => {
  return (
    <Flex justify={{ "@initial": "center", "@md": "start" }} align="center">
      <FlexItem
        align="center"
        order={{ "@initial": "first", "@md": "middle" }}
        css={{ marginRight: "$16", "@md": { marginRight: "$8" } }}
      >
        <SActionButton
          icon={<IconChevronLeft />}
          ariaLabel={previous.label}
          onClick={previous.onClick}
          disabled={previous.disabled}
        />
      </FlexItem>
      <FlexItem
        align="center"
        order={{ "@initial": "middle", "@md": "first" }}
        css={{ marginRight: "$16", width: "max-content" }}
      >
        {children}
      </FlexItem>
      <FlexItem align="center" order="last">
        <SActionButton
          icon={<IconChevronRight />}
          ariaLabel={next.label}
          onClick={next.onClick}
          disabled={next.disabled}
        />
      </FlexItem>
    </Flex>
  )
}
