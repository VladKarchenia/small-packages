import { useState } from "react"
import { Stepper } from "@/shared/components"
import { IStep, ShipmentStepEnum, StepperFooter } from "@/shipment"
import { DeliveryRates, DeliveryRatesShort } from "../DeliveryRates"
import { AddressInfo, AddressInfoShort } from "../AddressInfo"
import { ShipmentDetails, ShipmentDetailsShort } from "../ShipmentDetails"
import { StepItem } from "../StepItem"
import { FormProvider, useForm } from "react-hook-form"

type State = {
  info: IStep
  shipment: IStep
  rates: IStep
}

export interface DestinationState {
  location: string | null
  placeId: string | null
}

interface IParcelDimensions {
  length: string
  width: string
  height: string
}

interface IParcel {
  weight: string
  dimensions: IParcelDimensions
}

interface IRate {
  type: string
  name: string
  price: string
  currency: string
  id: string
}

export interface IStepperFormValues {
  fromAddress: DestinationState
  toAddress: DestinationState
  parcels: IParcel[]
  date: Date
  rate: IRate
}

const initialState: State = {
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
  rates: {
    name: "rates",
    completed: false,
    disabled: true,
    stepNumber: 3,
  },
}

export const StepperContainer = () => {
  const [stepperState, setStepperState] = useState(initialState)

  const handleContinueClick = (step: ShipmentStepEnum, nextStep: ShipmentStepEnum) => {
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

  const stepsData = [
    {
      title: "Address Information",
      data: stepperState.info,
      mainContent: <AddressInfo handleContinueClick={handleContinueClick} />,
      shortContent: <AddressInfoShort />,
    },
    {
      title: "Shipment Details",
      data: stepperState.shipment,
      mainContent: <ShipmentDetails handleContinueClick={handleContinueClick} />,
      shortContent: <ShipmentDetailsShort />,
    },
    {
      title: "Delivery Rates",
      data: stepperState.rates,
      mainContent: <DeliveryRates />,
      shortContent: <DeliveryRatesShort />,
    },
  ]

  const methods = useForm<IStepperFormValues>({
    defaultValues: {
      fromAddress: {
        location: "USA, New York",
        // location: null,
        placeId: null,
      },
      toAddress: {
        location: "USA, Los Angeles",
        // location: null,
        placeId: null,
      },
      parcels: [
        {
          weight: "2",
          // weight: null,
          dimensions: {
            length: "1",
            // length: null,
            width: "2",
            // width: null,
            height: "3",
            // height: null,
          },
        },
      ],
      date: new Date(),
      // date: null,
      rate: {
        type: "UPS",
        name: "Express Delivery",
        price: "430.00",
        currency: "$",
        id: "23",
      },
      // rate: null,
    },
  })

  const onSubmit = (data: IStepperFormValues) => {
    console.log(data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stepper defaultSelected={[ShipmentStepEnum.INFO]}>
          {stepsData.map((step) => (
            <StepItem
              key={step.title}
              title={step.title}
              data={step.data}
              mainContent={step.mainContent}
              shortContent={step.shortContent}
              totalSteps={stepsData.length}
            />
          ))}
          <StepperFooter />
        </Stepper>
      </form>
    </FormProvider>
  )
}
