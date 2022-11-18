import { useState } from "react"
import {
  Button,
  Copy,
  FormRadioGroup,
  FormRadioInput,
  Grid,
  GridItem,
  Stack,
  Title,
} from "@/shared/components"
import { useModal, useModalActions } from "@/shared/hooks"
import { GeneralModal } from "../GeneralModal"

export const CancelShipmentModal = () => {
  const [isReasonsOpen, setReasonsOpen] = useState<boolean>(false)
  const [cancelShipment] = useModal("cancelShipment")
  const { close } = useModalActions()

  const [checkedOption, setCheckedOption] = useState("Duplicated")
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setCheckedOption(e.target.value)

  const handleContinueClick = () => {
    if (!isReasonsOpen) {
      setReasonsOpen(true)
    } else {
      close("cancelShipment")
      // TODO: need to async this setReasonsOpen
      setReasonsOpen(false)
      setCheckedOption("Duplicated")
      // TODO: need to call some request to send the reason and change data
    }
  }

  const handleCancelClick = () => {
    setReasonsOpen(false)
    setCheckedOption("Duplicated")
    close("cancelShipment")
  }

  return (
    <GeneralModal {...cancelShipment}>
      <Stack space={16} css={{ paddingX: "$16" }}>
        {isReasonsOpen ? (
          <Title as="h3" scale={6} css={{ textAlign: "center" }}>
            Please, select the reason of cancellation
          </Title>
        ) : (
          <Stack space={8} css={{ textAlign: "center" }}>
            <Title as="h3" scale={6}>
              Do you want to cancel the shipment?
            </Title>
            <Copy scale={9} css={{ paddingBottom: "$8" }}>
              In case of cancellation, you will not be able to use it
            </Copy>
          </Stack>
        )}

        {isReasonsOpen ? (
          <FormRadioGroup
            value={checkedOption}
            onChange={handleChange}
            id="cancel-shipment-reason"
            name="cancel-shipment-reason"
            css={{ paddingX: "$0" }}
          >
            {[
              {
                label: "Duplicated shipment",
                // TODO: replace with enum
                value: "Duplicated",
              },
              {
                label: "Fees-shipping costs",
                value: "Fees",
              },
              {
                label: "Placed by mistake",
                value: "Mistake",
              },
              {
                label: "Wrong Ship from address",
                value: "Wrong",
              },
              {
                label: "Other",
                value: "Other",
              },
            ].map(({ label, value }) => (
              <FormRadioInput
                key={value}
                label={label}
                value={value}
                labelCss={{
                  "&:not(:last-of-type)": {
                    paddingBottom: "$12",
                  },
                }}
              />
            ))}
          </FormRadioGroup>
        ) : null}

        <Grid gap={{ "@initial": 8, "@sm": 16 }} columns={"1fr 1fr"}>
          <GridItem>
            <Button full onClick={handleContinueClick}>
              <Copy as="span" scale={8} color="system-white" bold>
                OK
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
