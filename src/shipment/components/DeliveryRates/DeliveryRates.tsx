import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"

import { useBoundStore } from "@/store"
import { useModalActions } from "@/shared/hooks"
import { ShippingType, ShipmentState } from "@/shared/types"
import { StepName } from "@/shipment/types"

import {
  Copy,
  FormRadioGroup,
  RateRadioInput,
  GridContainer,
  Spacer,
  Button,
  useStepperContext,
  Hidden,
  Title,
} from "@/shared/components"
import { StepActionsBar, StepperFooter } from "@/shipment/components"

const rates = [
  {
    rateType: "UPS (Priority)",
    name: "Delivery date: Oct 8, 2023 by 6:00 PM (CST)",
    price: 430,
    currency: "$",
    id: "23",
  },
  {
    rateType: "UPS (Economy)",
    name: "Delivery date: May 22, 2023 by 1:00 PM (CST)",
    price: 200,
    currency: "$",
    id: "24",
  },
  {
    rateType: "FedEx (Economy)",
    name: "Delivery date: Dec 25, 2023 by 11:50 AM (CST)",
    price: 250,
    currency: "$",
    id: "25",
  },
]

export const DeliveryRates = ({
  handleContinueClick,
}: {
  handleContinueClick?: (step: StepName.RATES, nextStep: StepName.SUMMARY) => void
}) => {
  const shippingType = useBoundStore((state) => state.shippingType)
  const { setValue, watch } = useFormContext<ShipmentState>()
  const { rate } = watch()

  const { setSelected } = useStepperContext("ShipmentRateDetails")

  const { open } = useModalActions()
  // TODO: get this expiredRates from shipment data
  const expiredRates = false

  const [checkedOption, setCheckedOption] = useState(rate.id)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCheckedOption(event.target.value)

  const onContinueHandler = () => {
    setSelected([StepName.SUMMARY])
    if (handleContinueClick) {
      handleContinueClick(StepName.RATES, StepName.SUMMARY)
    }
  }

  // useEffect(() => {
  //   // TODO: need to refetch getRates request with new date
  //   // + need to add loading and error views
  // }, [date])

  useEffect(() => {
    if (expiredRates) {
      open("reloadRates")
    }
  }, [expiredRates, open])

  useEffect(() => {
    const selectedRate = rates.find((i) => i.id === checkedOption)
    if (selectedRate) {
      setValue("rate", selectedRate)
    }
  }, [checkedOption, setValue])

  return (
    <GridContainer fullBleed>
      <Hidden below="sm">
        <Title as="h3" scale={3}>
          Delivery rates & Transit times
        </Title>
        <Spacer size={40} />
      </Hidden>
      <Copy scale={9} color="theme-n6-n5">
        {shippingType === ShippingType.Quote
          ? "Rates shown here may be different than the actual charges for your shipment"
          : "Please select a rate"}
      </Copy>
      <Spacer size={24} />
      <FormRadioGroup
        value={checkedOption}
        onChange={handleChange}
        id="rates-radio-id"
        name="rates-radio-group"
        disabled={shippingType === ShippingType.Quote}
        withCells
      >
        {rates.map((rate) => (
          <RateRadioInput
            key={rate.id}
            value={rate.id}
            rateType={rate.rateType}
            rateName={rate.name}
            price={rate.price}
            currency={rate.currency}
            disabled={shippingType === ShippingType.Quote}
          />
        ))}
      </FormRadioGroup>

      {shippingType === ShippingType.Shipment ? (
        <>
          <Spacer size={{ "@initial": 24, "@sm": 32 }} />
          <StepActionsBar>
            <Button full disabled={!rate.name} onClick={onContinueHandler}>
              Continue
            </Button>
          </StepActionsBar>
        </>
      ) : (
        <StepperFooter />
      )}
    </GridContainer>
  )
}
