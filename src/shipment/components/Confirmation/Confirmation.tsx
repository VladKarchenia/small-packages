import { Box, Button, GridContainer, Spacer } from "@/shared/components"
import { useNavigate } from "react-router-dom"

export const Confirmation = () => {
  const navigate = useNavigate()

  const handleSelect = () => {
    return navigate("/")
  }

  return (
    <GridContainer fullBleed>
      <Box>Confirmation content</Box>
      <Spacer size={32} />
      <Button onClick={() => handleSelect()}>Finish</Button>
      <Spacer size={32} />
    </GridContainer>
  )
}
