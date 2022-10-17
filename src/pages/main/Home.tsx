import { useTranslation } from "react-i18next"
import {
  Box,
  Button,
  GridContainer,
  Spacer,
  TabList,
  TabListItem,
  TabPanel,
  TabPanels,
  Tabs,
} from "@/shared/components"
import { useModalActions } from "@/shared/hooks"
import { CommonLayout } from "@/shared/layouts/common"
import { IconTick } from "@/shared/icons"

export const Home = () => {
  const { t } = useTranslation()
  const { open } = useModalActions()

  return (
    <CommonLayout>
      <GridContainer>
        <Box>{t("common:test.title")}</Box>
        <Box>{t("common:test.copy")}</Box>
        <IconTick />
        <Spacer size={40} />
        <Button onClick={() => open("timePeriod")}>Open modal</Button>
        <Spacer size={40} />
        <Tabs selectedTab="listings">
          <TabList label="" css={{ marginBottom: "$24" }}>
            <TabListItem id="listings">Listings</TabListItem>
            <TabListItem id="payout-methods">Payout Methods</TabListItem>
          </TabList>
          <TabPanels>
            <TabPanel id="listings">1. Content from listings tab</TabPanel>
            <TabPanel id="payout-methods">2. Content from payout-methods tab</TabPanel>
          </TabPanels>
        </Tabs>
      </GridContainer>
    </CommonLayout>
  )
}
