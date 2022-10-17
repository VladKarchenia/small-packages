import React, { useEffect, useRef, useMemo } from "react"
import { ComponentProps } from "@/utils"
import { useTabs } from "./hooks"

import { STabList } from "./TabList.styles"

export interface ITabListProps extends Omit<ComponentProps<typeof STabList>, "onChange"> {
  /**
   * Used for the aria-label to identify the region of a page
   */
  label: string
}

export const TabList = ({ children, label, ...props }: ITabListProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { getNextItem, getPreviousItem, getStartItem, getEndItem, setItems } = useTabs()

  const tabListItems = useMemo(() => {
    return React.Children.toArray(children).map(
      // (child: React.ReactElement<ITabListItemProps>) => child.props.id
      (child: any) => child.props.id,
    )
  }, [children])

  useEffect(() => {
    setItems(tabListItems)
  }, [tabListItems, setItems])

  useEffect(() => {
    const current = ref.current

    const handleKeyUp = (event: KeyboardEvent) => {
      const { key } = event

      switch (key) {
        case "ArrowRight":
          getNextItem()
          break
        case "ArrowLeft":
          getPreviousItem()
          break
        case "Home":
          getStartItem()
          break
        case "End":
          getEndItem()
          break
      }
    }

    current?.addEventListener("keyup", handleKeyUp)

    return () => {
      current?.removeEventListener("keyup", handleKeyUp)
    }
  })

  return (
    <STabList role="tablist" aria-label={label} ref={ref} align="center" {...props}>
      {children}
    </STabList>
  )
}
