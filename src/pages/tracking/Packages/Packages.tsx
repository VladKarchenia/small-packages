import { CommonLayout } from "@/shared/layouts/common"
import { MainLayout } from "@/shared/layouts/main"

import { Breadcrumbs, GridItem, Hidden } from "@/shared/components"
import { PackagesInfoContainer } from "@/tracking/components"

export const Packages = () => {
  return (
    <CommonLayout>
      <MainLayout>
        <GridItem column={{ "@initial": "1 / span 6", "@sm": "1 / span 12", "@lg": "1 / span 24" }}>
          <Hidden below="md">
            <Breadcrumbs />
          </Hidden>
          <PackagesInfoContainer />
        </GridItem>
      </MainLayout>
    </CommonLayout>
  )
}
