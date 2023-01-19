import { IPlaceResponse } from "@/api/types"
import { IAddress } from "@/shared/types"
import { ShippingType, StepName } from "./types"

export const getPrevStep = ({
  shippingType,
  currentStep,
}: {
  shippingType: ShippingType | null
  currentStep: string
}) => {
  let prevStep = currentStep

  if (shippingType === ShippingType.Quote) {
    switch (currentStep) {
      case StepName.SHIPMENT:
        prevStep = StepName.INFO
        break
      case StepName.DATE:
        prevStep = StepName.SHIPMENT
        break
      case StepName.RATES:
        prevStep = StepName.DATE
        break
    }
  } else {
    switch (currentStep) {
      case StepName.TO:
        prevStep = StepName.FROM
        break
      case StepName.SHIPMENT:
        prevStep = StepName.TO
        break
      case StepName.DATE:
        prevStep = StepName.SHIPMENT
        break
      case StepName.RATES:
        prevStep = StepName.DATE
        break
      case StepName.SUMMARY:
        prevStep = StepName.RATES
        break
      case StepName.RECEIPT:
        prevStep = StepName.SUMMARY
        break
    }
  }

  return prevStep
}

export const transformLocation = ({
  displayName,
  country,
  zipCode,
  state,
  city,
  address1,
  address2,
  latitude,
  longitude,
}: IPlaceResponse): IAddress => {
  return {
    displayName: displayName || "",
    country: country || "",
    zipCode: zipCode || "",
    state: state || "",
    city: city || "",
    address1: address1 || "",
    address2: address2 || "",
    latitude: latitude || "",
    longitude: longitude || "",
  }
}
