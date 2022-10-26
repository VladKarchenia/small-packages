import { useShipmentContext } from "@/shared/state"
import { Box, Button, GridContainer, Spacer, useAccordionContext } from "@/shared/components"
import { ShipmentStepEnum } from "@/shipment"

export const Summary = () => {
  const { setSelected } = useAccordionContext("Summary")
  const shipmentContext = useShipmentContext()

  const handleSelect = () => {
    setSelected([ShipmentStepEnum.CONFIRMATION])

    shipmentContext?.dispatch({
      type: "SET_STEP_DATA",
      payload: {
        name: ShipmentStepEnum.SUMMARY,
        completed: true,
        disabled: false,
      },
    })
    shipmentContext?.dispatch({
      type: "SET_STEP_DATA",
      payload: {
        name: ShipmentStepEnum.CONFIRMATION,
        completed: false,
        disabled: false,
      },
    })
  }

  return (
    <GridContainer fullBleed>
      <Box>Summary content</Box>
      <Spacer size={32} />
      <Button onClick={() => handleSelect()}>Continue</Button>
      <Spacer size={32} />
    </GridContainer>
  )
}
