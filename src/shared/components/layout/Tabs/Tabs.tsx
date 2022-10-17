import { useEffect, useState } from "react"
import { ComponentProps, createContext } from "@/utils"

import { STabs } from "./Tabs.styles"

export type TabsContextValue = {
  selected: string
  items: string[]

  setSelected: React.Dispatch<React.SetStateAction<string>>
  setItems: React.Dispatch<React.SetStateAction<string[]>>

  animate?: boolean
}

export const [TabsProvider, useTabsContext] = createContext<TabsContextValue>("Tabs")

export interface ITabsProps extends Omit<ComponentProps<typeof STabs>, "onChange"> {
  /**
   * Selected Tab Panel
   */
  selectedTab?: string
  /**
   * Action called after changing the selected value
   */
  onChange?: (value: any) => void
  /**
   * allows to disable/leave the bottom-up movement animation for the TabPanel
   */
  animate?: boolean
}

export const Tabs = ({ selectedTab = "", onChange, animate, ...props }: ITabsProps) => {
  const [selected, setSelected] = useState<string>(selectedTab)
  const [items, setItems] = useState<string[]>([])

  useEffect(() => {
    if (items.length && !selected) {
      setSelected(items[0])
    }
  }, [items, selected])

  useEffect(() => {
    if (selected && onChange) {
      onChange(selected)
    }
  }, [selected])

  useEffect(() => {
    setSelected(selectedTab)
  }, [selectedTab])

  return (
    <TabsProvider
      selected={selected}
      items={items}
      setSelected={setSelected}
      setItems={setItems}
      animate={animate}
    >
      <STabs data-plum-ui="tabs" data-testid="tabs" {...props} />
    </TabsProvider>
  )
}
