import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import { StepName, QuoteStep, StepperState } from "@/shipment/types"

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
  const [defaultStep, setDefaultStep] = useState<StepName | null>(null)
  const location = useLocation()
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

  const stepsData = [
    {
      title: "Address Information",
      data: stepperState.info,
      mainContent: (
        <AddressInfo handleContinueClick={handleContinueClick} setStepperState={setStepperState} />
      ),
      // shortContent: <AddressInfoCollapsed />,
    },
    {
      title: "Shipment Details",
      data: stepperState.shipment,
      mainContent: (
        <PackageDetails
          handleContinueClick={handleContinueClick}
          setStepperState={setStepperState}
        />
      ),
      // shortContent: <PackageDetailsShort />,
    },
    {
      title: "Ready Date",
      data: stepperState.date,
      mainContent: (
        <ShipmentDateDetails
          handleContinueClick={handleContinueClick}
          setStepperState={setStepperState}
        />
      ),
      // shortContent: <ShipmentDateDetailsShort />,
    },
    {
      title: "Delivery Rates",
      data: stepperState.rates,
      mainContent: <DeliveryRates />,
      // shortContent: <DeliveryRatesShort />,
    },
  ]

  useEffect(() => {
    setDefaultStep(StepName.INFO)
    // check expired date and time ->
    // set stepper state
    if (isEditMode) {
      setStepperState((prevState) => {
        return {
          ...prevState,
          info: {
            ...prevState.info,
            completed: true,
            disabled: false,
          },
          shipment: {
            ...prevState.shipment,
            completed: true,
            disabled: false,
          },
          date: {
            ...prevState.date,
            completed: true,
            disabled: false,
          },
          rates: {
            ...prevState.rates,
            completed: true,
            disabled: false,
          },
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!defaultStep) return null

  return (
    <StepperForm
      title={isEditMode ? "Edit a quote" : "Create a quote"}
      defaultStep={defaultStep}
      stepsData={stepsData}
    />
  )
}
