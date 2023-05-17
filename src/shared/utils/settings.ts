import { ChangePersonPreferencesInput } from "@/api/types"
import { PickupType } from "@/shared/types"

import { replaceFalsyProps } from "./shipment"

export const formatPersonPreferenceRequestData = (data: ChangePersonPreferencesInput) => {
  const initialData = {
    readyTime: data.readyTime,
    quoteExpirationDays: data.quoteExpirationDays,
    packagingType: data.packagingType,
    declaredValue: data.declaredValue,
    currency: data.currency,
    dimensionUnit: data.unitOfMeasure.split("/")[0],
    weightUnit: data.unitOfMeasure.split("/")[1],
    pickupType: Object.keys(PickupType)[Object.values(PickupType).indexOf(data.pickupType)],
    organizationId: data.organizationId,
  }

  const formattedData = JSON.stringify(initialData, replaceFalsyProps)

  return JSON.parse(formattedData)
}
