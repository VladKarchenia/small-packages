import { IPlaceResponse } from "@/api/types"
import { IAddress, ResidentialType } from "@/shared/types"

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
  person,
}: IPlaceResponse & { person: "sender" | "recipient" | "senderReturn" }): IAddress => {
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
    ...(person === "recipient" && { isResidential: JSON.parse(ResidentialType.Nonresidential) }),
  }
}
