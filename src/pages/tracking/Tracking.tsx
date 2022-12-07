import { CommonLayout } from "@/shared/layouts/common"
import { MainLayout } from "@/shared/layouts/main"
import { TrackingContainer } from "@/tracking"

export const Tracking = () => {
  return (
    <CommonLayout>
      <MainLayout>
        <TrackingContainer />
      </MainLayout>
    </CommonLayout>
  )
}
