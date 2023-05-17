import { useState } from "react"

import { SettingType } from "@/shared/types"

import { TabList, TabListItem, TabPanel, TabPanels, Tabs } from "@/shared/components"
import {
  ChangePersonAccounts,
  ChangePersonInfo,
  ChangePersonPreferences,
} from "@/settings/components"

export const SettingsTabs = () => {
  const [tab, setTab] = useState(SettingType.GeneralInfo)

  return (
    <Tabs selectedTab={tab} animate={false}>
      <TabList label="dashboard-tabs">
        <TabListItem
          id={SettingType.GeneralInfo}
          onChange={() => {
            setTab(SettingType.GeneralInfo)
          }}
        >
          General Info
        </TabListItem>
        <TabListItem
          id={SettingType.Preferences}
          onChange={() => {
            setTab(SettingType.Preferences)
          }}
        >
          Preferences
        </TabListItem>
        <TabListItem
          id={SettingType.Accounts}
          onChange={() => {
            setTab(SettingType.Accounts)
          }}
        >
          Accounts
        </TabListItem>
      </TabList>
      <TabPanels>
        <TabPanel id={SettingType.GeneralInfo}>
          <ChangePersonInfo />
        </TabPanel>
        <TabPanel id={SettingType.Preferences}>
          <ChangePersonPreferences />
        </TabPanel>
        <TabPanel id={SettingType.Accounts}>
          <ChangePersonAccounts />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
