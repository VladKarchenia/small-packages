import { Box, Button, GridContainer, Spacer, useStepperContext } from "@/shared/components"
import { ShipmentStepEnum } from "@/shipment"

export const Summary = ({
  handleContinueClick,
}: {
  handleContinueClick: (step: ShipmentStepEnum, nextStep: ShipmentStepEnum) => void
}) => {
  const { setSelected } = useStepperContext("Summary")

  // const handleSelect = () => {
  //   setSelected([ShipmentStepEnum.CONFIRMATION])
  //   handleContinueClick(ShipmentStepEnum.SUMMARY, ShipmentStepEnum.CONFIRMATION)
  // }

  return (
    <GridContainer fullBleed>
      <Box>Summary content</Box>
      <Spacer size={32} />
      {/* <Button onClick={() => handleSelect()}>Continue</Button> */}
      <Spacer size={32} />
    </GridContainer>
  )
}
