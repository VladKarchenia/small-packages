import { ComponentProps } from "@/utils"
import { TabsProvider } from "./state"
import { STabs } from "./Tabs.styles"

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

export const Tabs = ({ children, selectedTab, onChange, animate, ...props }: ITabsProps) => {
  return (
    <TabsProvider selectedTab={selectedTab} onChange={onChange} animate={animate}>
      <STabs data-plum-ui="tabs" data-testid="tabs" {...props}>
        {children}
      </STabs>
    </TabsProvider>
  )
}
