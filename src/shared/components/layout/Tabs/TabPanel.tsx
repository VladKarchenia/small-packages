import { ComponentProps } from "@/stitches/types"

import { useTabsContext } from "./Tabs"

import { STabPanel } from "./TabPanel.styles"

export interface ITabPanelProps extends ComponentProps<typeof STabPanel> {
  /**
   * ID of the Tab Panel
   */
  id: string
}

export const TabPanel = ({ children, id }: ITabPanelProps) => {
  const { selected, animate } = useTabsContext("TabPanel")
  const isSelected = selected === id
  return (
    <STabPanel
      aria-hidden={!isSelected}
      id={`panel-${id}`}
      aria-labelledby={`tab-${id}`}
      role="tabpanel"
      css={{
        marginRight: "-100%",
      }}
      animate={animate}
    >
      {isSelected ? children : null}
    </STabPanel>
  )
}
