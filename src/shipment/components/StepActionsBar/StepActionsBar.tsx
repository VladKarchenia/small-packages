import { useNavigate } from "react-router-dom"
import { Button, Copy, Grid, GridItem, Hidden, useStepperContext } from "@/shared/components"
import { StepName, getPrevStep, ShippingType } from "@/shipment"

interface IStepActionsBarProps {
  shippingType: ShippingType
}

export const StepActionsBar: React.FC<React.PropsWithChildren<IStepActionsBarProps>> = ({
  shippingType,
  children,
}) => {
  const { selected, setSelected } = useStepperContext("AddressInfo")
  const navigate = useNavigate()
  const isFirstStep = selected[0] === StepName.INFO || selected[0] === StepName.FROM

  const onBackHandler = () => {
    if (isFirstStep) {
      return navigate("/")
    }

    const prevStep = getPrevStep({ shippingType: shippingType, currentStep: selected[0] })
    return setSelected([prevStep])
  }

  return (
    <Grid
      columns={{ "@initial": "1fr", "@sm": "1fr 1fr" }}
      columnGap={{ "@initial": 0, "@sm": 16 }}
    >
      <GridItem>
        <Hidden below="sm">
          <Button action="secondary" onClick={onBackHandler} full>
            {/* TODO: fix default button copy */}
            <Copy as="span" scale={8} color="system-black" bold>
              Back
            </Copy>
          </Button>
        </Hidden>
      </GridItem>
      <GridItem>{children}</GridItem>
    </Grid>
  )
}
