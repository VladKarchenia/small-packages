import { Box, Spacer } from "@/shared/components"
import { CommonLayout } from "@/shared/layouts/common"
import { MainLayout } from "@/shared/layouts/main"

export const Profile = () => {
  return (
    <CommonLayout>
      <MainLayout mobileFullBleed={false}>
        <Spacer size={{ "@initial": 40, "@sm": 0 }} />
        <Box>Profile Page</Box>
      </MainLayout>
    </CommonLayout>
  )
}
