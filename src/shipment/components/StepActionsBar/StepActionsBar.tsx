import { useNavigate } from "react-router-dom"

import { useBoundStore } from "@/store"
import { getPrevStep } from "@/shipment/utils"
import { StepName } from "@/shipment/types"
import { HOME } from "@/constants"

import { Button, Grid, GridItem, Hidden, useStepperContext } from "@/shared/components"

interface IStepActionsBarProps {
  backDisabled?: boolean
}

export const StepActionsBar: React.FC<React.PropsWithChildren<IStepActionsBarProps>> = ({
  backDisabled,
  children,
}) => {
  const { selected, setSelected } = useStepperContext("AddressInfo")
  const navigate = useNavigate()
  const shippingType = useBoundStore((state) => state.shippingType)
  const isFirstStep = selected[0] === StepName.INFO || selected[0] === StepName.FROM

  const onBackHandler = () => {
    if (isFirstStep) {
      return navigate(HOME)
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
            <Button action="secondary" full disabled={backDisabled} onClick={onBackHandler}>
              Previous
            </Button>
          </Hidden>
        </GridItem>
      ) : null}
    </Grid>
  )
}
