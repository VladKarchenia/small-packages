export enum ShipmentStepEnum {
  INFO = "info",
  SHIPMENT = "shipment",
  SUMMARY = "summary",
  CONFIRMATION = "confirmation",
}

export interface IStep {
  name: string
  completed: boolean
  disabled: boolean
}
