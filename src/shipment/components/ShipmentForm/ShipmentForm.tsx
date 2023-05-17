import { useState } from "react"
import { useLocation } from "react-router-dom"

import { StepName, ShipmentStep, IStepsDataItem, StepperState } from "@/shipment/types"
import { useMedia } from "@/shared/hooks"
import { mediaQueries } from "@/stitches/theme"

import {
  PackageDetails,
  DeliveryRates,
  PersonInfo,
  StepperForm,
  ShipmentDateDetails,
  Summary,
  Receipt,
} from "@/shipment/components"

const initialState: Omit<StepperState, "info"> = {
  from: {
    name: "from",
    completed: false,
    disabled: false,
    stepNumber: 1,
  },
  to: {
    name: "to",
    completed: false,
    disabled: true,
    stepNumber: 2,
  },
  shipment: {
    name: "shipment",
    completed: false,
    disabled: true,
    stepNumber: 3,
  },
  date: {
    name: "date",
    completed: false,
    disabled: true,
    stepNumber: 4,
  },
  rates: {
    name: "rates",
    completed: false,
    disabled: true,
    stepNumber: 5,
  },
  summary: {
    name: "summary",
    completed: false,
    disabled: true,
    stepNumber: 6,
  },
  receipt: {
    name: "receipt",
    completed: false,
    disabled: true,
    stepNumber: 7,
  },
}

export const ShipmentForm = () => {
  const [stepperState, setStepperState] = useState(initialState as StepperState)
  const location = useLocation()
  const isSmallAndAbove = useMedia([mediaQueries.sm], [true], false)
  const isEditMode = location.pathname.includes("edit")

  const handleContinueClick = (step: ShipmentStep, nextStep: ShipmentStep) => {
    setStepperState((prevState) => {
      return {
        ...prevState,
        [step]: {
          ...prevState[step],
          name: step,
          completed: true,
          disabled: false,
        },
        [nextStep]: {
          ...prevState[nextStep],
          name: nextStep,
          completed: false,
          disabled: false,
        },
      }
    })
  }

  const stepsData: IStepsDataItem[] = [
    {
      title: isSmallAndAbove ? "From" : "Ship From",
      data: stepperState.from,
      mainContent: <PersonInfo handleContinueClick={handleContinueClick} person="sender" />,
      // shortContent: <PersonInfoCollapsed person="sender" />,
    },
    {
      title: isSmallAndAbove ? "To" : "Ship To",
      data: stepperState.to,
      mainContent: <PersonInfo handleContinueClick={handleContinueClick} person="recipient" />,
      // shortContent: <PersonInfoCollapsed person="recipient" />,
    },
    {
      title: isSmallAndAbove ? "Details" : "Shipment ",
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
      mainContent: <DeliveryRates handleContinueClick={handleContinueClick} />,
      // shortContent: <DeliveryRatesShort />,
    },
    {
      title: "Summary",
      data: stepperState.summary,
      mainContent: <Summary handleContinueClick={handleContinueClick} />,
    },
    {
      title: "Receipt",
      data: stepperState.receipt,
      mainContent: <Receipt />,
    },
  ]

  return (
    <StepperForm
      title={isEditMode ? "Edit a shipment" : "Create a shipment"}
      defaultStep={StepName.FROM}
      stepsData={stepsData}
      setStepperState={setStepperState}
    />
  )
}
