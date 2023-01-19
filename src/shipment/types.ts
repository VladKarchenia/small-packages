export enum ShippingType {
  Quote = "quote",
  Shipment = "shipment",
}

export enum StepName {
  INFO = "info",
  FROM = "from",
  TO = "to",
  SHIPMENT = "shipment",
  DATE = "date",
  RATES = "rates",
  SUMMARY = "summary",
  RECEIPT = "receipt",
}

export type QuoteStep = Exclude<
  StepName,
  StepName.FROM | StepName.TO | StepName.SUMMARY | StepName.RECEIPT
>

export type ShipmentStep = Exclude<StepName, StepName.INFO>

export interface IStepsDataItem {
  title: string
  data: IStep
  mainContent: React.ReactNode
}

export interface IStep {
  name: string
  completed: boolean
  disabled: boolean
  stepNumber: number
}
