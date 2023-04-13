import { ChangePersonPreferencesInput, ISettingsUserShipmentPreferences } from "@/api/types"
import { PackagingType, PickupType } from "@/shared/types"

export const defaultUserShipmentPreferencesValues: ISettingsUserShipmentPreferences = {
  readyTime: null,
  quoteExpirationDays: 1,
  packagingType: PackagingType.Own,
  declaredValue: 20,
  currency: "USD",
  dimensionUnit: "in",
  weightUnit: "lb",
  pickupType: "DEFAULT",
}

export const getUserShipmentPreferences = (
  userShipmentPreferences: ISettingsUserShipmentPreferences | null,
  organizationId: number | null,
): ChangePersonPreferencesInput => {
  const shipmentPreferences = userShipmentPreferences?.declaredValue
    ? userShipmentPreferences
    : defaultUserShipmentPreferencesValues

  return {
    ...shipmentPreferences,
    readyTime: shipmentPreferences.readyTime ? new Date(shipmentPreferences.readyTime) : null,
    packagingType: shipmentPreferences.packagingType,
    pickupType: PickupType[shipmentPreferences.pickupType],
    unitOfMeasure: `${shipmentPreferences.dimensionUnit}/${shipmentPreferences.weightUnit}`,
    organizationId,
  }
}
