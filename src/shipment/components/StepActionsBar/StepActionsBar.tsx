import { useNavigate } from "react-router-dom"

import { useShipmentStateContext } from "@/shared/state"

import { Button, Copy, Grid, GridItem, Hidden, useStepperContext } from "@/shared/components"
import { StepName, getPrevStep } from "@/shipment"

interface IStepActionsBarProps {
  backDisabled?: boolean
}

export const StepActionsBar: React.FC<React.PropsWithChildren<IStepActionsBarProps>> = ({
  backDisabled,
  children,
}) => {
  const { selected, setSelected } = useStepperContext("AddressInfo")
  const navigate = useNavigate()
  const { shippingType } = useShipmentStateContext()
  const isFirstStep = selected[0] === StepName.INFO || selected[0] === StepName.FROM

  const onBackHandler = () => {
    if (isFirstStep) {
      return navigate("/")
    }

    const prevStep = getPrevStep({ shippingType, currentStep: selected[0] })
    return setSelected([prevStep])
  }

  return (
    <Grid
      columns={{ "@initial": "1fr", "@sm": "1fr 1fr" }}
      columnGap={{ "@initial": 0, "@sm": 16 }}
    >
      <GridItem>{children}</GridItem>
      {!isFirstStep ? (
        <GridItem>
          <Hidden below="sm">
            <Button action="secondary" onClick={onBackHandler} full disabled={backDisabled}>
              {/* TODO: fix default button copy */}
              <Copy as="span" scale={8} color="system-black" bold>
                Previous
              </Copy>
            </Button>
          </Hidden>
        </GridItem>
      ) : null}
    </Grid>
  )
}
