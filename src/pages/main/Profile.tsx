import { CommonLayout } from "@/shared/layouts/common"
import { MainLayout } from "@/shared/layouts/main"
import { ProfileContainer } from "@/profile"

export const Profile = () => {
  return (
    <CommonLayout>
      <MainLayout fullContentSize={false} mobileFullBleed={false}>
        <ProfileContainer />
      </MainLayout>
    </CommonLayout>
  )
}
