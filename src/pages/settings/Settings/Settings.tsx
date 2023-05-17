import { GridItem } from "@/shared/components"
import { CommonLayout } from "@/shared/layouts/common"
import { MainLayout } from "@/shared/layouts/main"
import { SettingsContainer } from "@/settings/components"

export const Settings = () => {
  return (
    <CommonLayout>
      <MainLayout>
        <GridItem
          column={{
            "@initial": "1 / span 6",
            "@sm": "1 / span 12",
            "@lg": "1 / span 24",
          }}
        >
          <SettingsContainer />
        </GridItem>
      </MainLayout>
    </CommonLayout>
  )
}
