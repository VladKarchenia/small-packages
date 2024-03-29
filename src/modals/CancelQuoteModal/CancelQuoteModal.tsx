import { useModal, useModalActions } from "@/shared/hooks"

import { Button, Copy, Grid, GridItem, Stack, Title } from "@/shared/components"
import { GeneralModal } from "@/modals"

export const CancelQuoteModal = () => {
  const [cancelQuote] = useModal("cancelQuote")
  const { close } = useModalActions()

  const handleContinueClick = () => {
    close("cancelQuote")
    // TODO: need to call some request to send the reason and change data
  }

  const handleCancelClick = () => {
    close("cancelQuote")
  }

  return (
    <GeneralModal {...cancelQuote}>
      <Stack space={16} css={{ paddingX: "$16" }}>
        <Stack space={8} css={{ textAlign: "center" }}>
          <Title as="h3" scale={3}>
            Do you want to cancel the quote?
          </Title>
          <Copy scale={9} css={{ paddingBottom: "$8" }}>
            In case of elimination, the quote will be cancelled without being deleted from the list
          </Copy>
        </Stack>

        <Grid gap={{ "@initial": 8, "@sm": 16 }} columns="1fr 1fr">
          <GridItem>
            <Button full onClick={handleContinueClick}>
              OK
            </Button>
          </GridItem>
          <GridItem>
            <Button action="secondary" full onClick={handleCancelClick}>
              Cancel
            </Button>
          </GridItem>
        </Grid>
      </Stack>
    </GeneralModal>
  )
}
