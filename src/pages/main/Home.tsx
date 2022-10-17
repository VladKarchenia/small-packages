import { Box, Button, Spacer } from "@/shared/components"
import { useModalActions } from "@/shared/hooks"
import { CommonLayout } from "@/shared/layouts/common"

export const Home = () => {
  const { open } = useModalActions()

  return (
    <CommonLayout>
      <Box>123</Box>
      <Spacer size={40} />
      <Button onClick={() => open("timePeriod")}>Open modal</Button>
    </CommonLayout>
  )
}
