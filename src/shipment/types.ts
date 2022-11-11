export enum ShippingType {
  Quote = "quote",
  Shipment = "shipment",
}

export enum StepName {
  INFO = "info",
  FROM = "from",
  TO = "to",
  SHIPMENT = "shipment",
  RATES = "rates",
}

export type QuoteStep = Exclude<StepName, StepName.FROM | StepName.TO>

export type ShipmentStep = Exclude<StepName, StepName.INFO>

export type ShipmentStepperState = {
  info: IStep
  shipment: IStep
  rates: IStep
}

export interface IStep {
  name: string
  completed: boolean
  disabled: boolean
  stepNumber: number
}
