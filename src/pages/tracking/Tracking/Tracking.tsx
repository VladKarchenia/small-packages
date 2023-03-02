import { CommonLayout } from "@/shared/layouts/common"
import { MainLayout } from "@/shared/layouts/main"

import { Breadcrumbs, GridItem, Hidden } from "@/shared/components"
import { TrackingContainer } from "@/tracking/components"

export const Tracking = () => {
  return (
    <CommonLayout>
      <MainLayout>
        <GridItem column={{ "@initial": "1 / span 6", "@sm": "1 / span 12", "@lg": "1 / span 24" }}>
          <Hidden below="md">
            <Breadcrumbs />
          </Hidden>
          <TrackingContainer />
        </GridItem>
      </MainLayout>
    </CommonLayout>
  )
}
