import { DashboardProvider } from "@/dashboard/state"

import { MainLayout } from "@/shared/layouts/main"
import { CommonLayout } from "@/shared/layouts/common"
import { BurgerMenu, Flex, GridItem, Hidden, ProfileButton } from "@/shared/components"
import { DashboardTabs } from "@/dashboard/components"

export const Home = () => {
  return (
    <DashboardProvider>
      <CommonLayout>
        <MainLayout withGlobalSearch mobileFullBleed={false}>
          <GridItem
            column={{ "@initial": "1 / span 6", "@sm": "1 / span 12", "@lg": "1 / span 24" }}
          >
            <Hidden above="sm">
              <Flex align="center" justify="between" css={{ paddingTop: "$20" }}>
                <BurgerMenu />
                <ProfileButton />
              </Flex>
            </Hidden>
            <DashboardTabs />
          </GridItem>
        </MainLayout>
      </CommonLayout>
    </DashboardProvider>
  )
}
