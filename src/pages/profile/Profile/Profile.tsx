import { GridItem } from "@/shared/components"
import { CommonLayout } from "@/shared/layouts/common"
import { MainLayout } from "@/shared/layouts/main"
import { ProfileContainer } from "@/profile/components"

export const Profile = () => {
  return (
    <CommonLayout>
      <MainLayout>
        <GridItem
          column={{
            "@initial": "1 / span 6",
            "@sm": "1 / span 12",
            "@lg": "1 / span 16",
          }}
        >
          <ProfileContainer />
        </GridItem>
      </MainLayout>
    </CommonLayout>
  )
}
