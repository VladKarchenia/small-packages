export enum ShipmentStepEnum {
  INFO = "info",
  SHIPMENT = "shipment",
  RATES = "rates",
  // SUMMARY = "summary",
  // CONFIRMATION = "confirmation",
}

export interface IStep {
  name: string
  completed: boolean
  disabled: boolean
  stepNumber: number
}
