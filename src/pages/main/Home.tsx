import { BurgerMenu, Flex, Hidden, ProfileButton } from "@/shared/components"
import { CommonLayout } from "@/shared/layouts/common"
import { MainLayout } from "@/shared/layouts/main"
import { DashboardProvider } from "@/dashboard/state"
import { DashboardTabs } from "@/dashboard"

export const Home = () => {
  return (
    <DashboardProvider>
      <CommonLayout>
        <MainLayout withGlobalSearch mobileFullBleed={false}>
          <Hidden above="sm">
            <Flex align="center" justify="between" css={{ paddingTop: "$20" }}>
              <BurgerMenu />
              <ProfileButton />
            </Flex>
          </Hidden>
          <DashboardTabs />
        </MainLayout>
      </CommonLayout>
    </DashboardProvider>
  )
}
