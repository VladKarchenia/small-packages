import { useState } from "react"
import { useLocation } from "react-router-dom"

import { StepName, QuoteStep, StepperState, IStepsDataItem } from "@/shipment/types"
import { useMedia } from "@/shared/hooks"
import { mediaQueries } from "@/stitches/theme"

import {
  PackageDetails,
  AddressInfo,
  DeliveryRates,
  StepperForm,
  ShipmentDateDetails,
} from "@/shipment/components"

const initialState: Omit<StepperState, "from" | "to" | "summary" | "receipt"> = {
  info: {
    name: "info",
    completed: false,
    disabled: false,
    stepNumber: 1,
  },
  shipment: {
    name: "shipment",
    completed: false,
    disabled: true,
    stepNumber: 2,
  },
  date: {
    name: "date",
    completed: false,
    disabled: true,
    stepNumber: 3,
  },
  rates: {
    name: "rates",
    completed: false,
    disabled: true,
    stepNumber: 4,
  },
}

export const QuoteForm = () => {
  const [stepperState, setStepperState] = useState(initialState as StepperState)
  const location = useLocation()
  const isSmallAndAbove = useMedia([mediaQueries.sm], [true], false)
  const isEditMode = location.pathname.includes("edit")

  const handleContinueClick = (step: QuoteStep, nextStep: QuoteStep) => {
    setStepperState((prevState) => {
      return {
        ...prevState,
        [step]: {
          ...prevState[step],
          completed: true,
          disabled: false,
        },
        [nextStep]: {
          ...prevState[nextStep],
          completed: false,
          disabled: false,
        },
      }
    })
  }

  const stepsData: IStepsDataItem[] = [
    {
      title: isSmallAndAbove ? "Where" : "Address Information",
      data: stepperState.info,
      mainContent: <AddressInfo handleContinueClick={handleContinueClick} />,
      // shortContent: <AddressInfoCollapsed />,
    },
    {
      title: isSmallAndAbove ? "Details" : "Shipment Details",
      data: stepperState.shipment,
      mainContent: <PackageDetails handleContinueClick={handleContinueClick} />,
      // shortContent: <PackageDetailsShort />,
    },
    {
      title: isSmallAndAbove ? "Ready Date" : "Ready Date & Time",
      data: stepperState.date,
      mainContent: <ShipmentDateDetails handleContinueClick={handleContinueClick} />,
      // shortContent: <ShipmentDateDetailsShort />,
    },
    {
      title: isSmallAndAbove ? "Rates" : "Delivery rates & Transit times",
      data: stepperState.rates,
      mainContent: <DeliveryRates />,
      // shortContent: <DeliveryRatesShort />,
    },
  ]

  return (
    <StepperForm
      title={isEditMode ? "Edit a quote" : "Create a quote"}
      defaultStep={StepName.INFO}
      stepsData={stepsData}
      setStepperState={setStepperState}
    />
  )
}
