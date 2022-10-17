import { Box, Copy, Spacer, Stack, Title } from "@/shared/components"
import { useModal, useModalActions } from "@/shared/hooks"
import { TrayModal } from "../TrayModal"

export interface TimePeriodModalProps {}

export const TimePeriodModal = () => {
  const [timePeriod] = useModal("timePeriod")
  // const { close } = useModalActions()

  return (
    <TrayModal {...timePeriod}>
      <Stack space={8}>
        <Box css={{ paddingX: "$24" }}>
          <Title as="h3" scale={6}>
            Title
          </Title>
          <Spacer size={4} />
          <Copy as="span" scale={9}>
            Copy
          </Copy>
        </Box>
      </Stack>
      <Spacer size={24} />
    </TrayModal>
  )
}
