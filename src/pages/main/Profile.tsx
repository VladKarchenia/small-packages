import { Box, GridContainer, Spacer, Stack } from "@/shared/components"
import { CommonLayout } from "@/shared/layouts/common"
import { useStateContext } from "@/shared/state"

export const Profile = () => {
  const stateContext = useStateContext()
  const user = stateContext?.state.authUser

  return (
    <CommonLayout>
      <GridContainer>
        <Spacer size={40} />
        <Box>Profile Page</Box>
        <Stack space={24}>
          <Box>{user?.id}</Box>
          <Box>{user?.name}</Box>
          <Box>{user?.email}</Box>
          <Box>{user?.role}</Box>
        </Stack>
      </GridContainer>
    </CommonLayout>
  )
}
