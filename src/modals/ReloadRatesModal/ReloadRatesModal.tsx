import { useModal, useModalActions } from "@/shared/hooks"

import { Button, Copy, Grid, GridItem, Stack, Title } from "@/shared/components"
import { GeneralModal } from "@/modals"

export const ReloadRatesModal = () => {
  const [reloadRates] = useModal("reloadRates")
  const { close } = useModalActions()

  const handleContinueClick = () => {
    close("reloadRates")
    // TODO: need to call some request to reload rates and show loader state
  }

  const handleCancelClick = () => {
    close("reloadRates")
  }

  return (
    <GeneralModal {...reloadRates}>
      <Stack space={16} css={{ paddingX: "$16" }}>
        <Stack space={8} css={{ textAlign: "center" }}>
          <Title as="h3" scale={6}>
            Rates have expired, please reload this page
          </Title>
          <Copy scale={9} css={{ paddingBottom: "$8" }}>
            In case of cancellation, not relevant rates will be displayed
          </Copy>
        </Stack>

        <Grid gap={{ "@initial": 8, "@sm": 16 }} columns="1fr 1fr">
          <GridItem>
            <Button full onClick={handleContinueClick}>
              <Copy as="span" scale={8} color="system-white" bold>
                Reload
              </Copy>
            </Button>
          </GridItem>
          <GridItem>
            <Button action="secondary" full onClick={handleCancelClick}>
              <Copy as="span" scale={8} color="system-black" bold>
                Cancel
              </Copy>
            </Button>
          </GridItem>
        </Grid>
      </Stack>
    </GeneralModal>
  )
}
