import { ShippingType } from "@/shipment"
import { ShipmentInput } from "@/api/types"
import { ShipmentState } from "@/shared/state"
import { IParcel, PackageType, ParcelContentType, PickupType, ShipmentStatus } from "@/shared/types"

const replaceFalsyProps = (key: string, value: unknown) => {
  // TODO: Should we remove empty string as well?
  // should create and patch use different helpers?
  // if (value === "" || value === null || value === undefined) {
  if (value === null || value === undefined) {
    return undefined
  }

  return value
}

export const formatShipmentRequestData = (data: ShipmentState, shippingType: ShippingType) => {
  // TODO: use Zustand
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const packages = data.parcels.map((item) => ({
    DIMENSION: `${item.dimensions.length}x${item.dimensions.width}x${item.dimensions.height}`,
    WEIGHT: parseFloat(item.weight),
    DECLARED_VALUE_AMOUNT: item.totalPrice,
    PACKAGING: Object.keys(PackageType)[Object.values(PackageType).indexOf(item.packageType)],
  }))

  const initialData = {
    CONSIGNEE_ADDRESS1: data.recipient.fullAddress.address1,
    CONSIGNEE_ADDRESS2: data.recipient.fullAddress.address2,
    CONSIGNEE_CITY: data.recipient.fullAddress.city,
    CONSIGNEE_COMPANY: data.recipient.company,
    CONSIGNEE_CONTACT: data.recipient.name,
    CONSIGNEE_COUNTRY: data.recipient.fullAddress.country,
    CONSIGNEE_EMAIL: data.recipient.email,
    CONSIGNEE_PHONE: data.recipient.phone,
    CONSIGNEE_PHONE_EXTENSION: data.recipient.extension,
    CONSIGNEE_POSTALCODE: data.recipient.fullAddress.zipCode,
    CONSIGNEE_RESIDENTIAL: data.recipient.fullAddress.isResidential
      ? `${data.recipient.fullAddress.isResidential}`
      : "false",
    CONSIGNEE_STATE: data.recipient.fullAddress.state,
    CONSIGNEE_GEOLOC: {
      DISPLAY_NAME: data.recipient.fullAddress.displayName,
      LATITUDE: data.recipient.fullAddress.latitude,
      LONGITUDE: data.recipient.fullAddress.longitude,
    },

    ORIGIN_ADDRESS1: data.sender.fullAddress.address1,
    ORIGIN_ADDRESS2: data.sender.fullAddress.address2,
    ORIGIN_CITY: data.sender.fullAddress.city,
    ORIGIN_COMPANY: data.sender.company,
    ORIGIN_CONTACT: data.sender.name,
    ORIGIN_COUNTRY: data.sender.fullAddress.country,
    ORIGIN_EMAIL: data.sender.email,
    ORIGIN_PHONE: data.sender.phone,
    ORIGIN_PHONE_EXTENSION: data.sender.extension,
    ORIGIN_POSTALCODE: data.sender.fullAddress.zipCode,
    ORIGIN_STATE: data.sender.fullAddress.state,
    ORIGIN_GEOLOC: {
      DISPLAY_NAME: data.sender.fullAddress.displayName,
      LATITUDE: data.sender.fullAddress.latitude,
      LONGITUDE: data.sender.fullAddress.longitude,
    },

    PACKAGE: packages,

    ORGANIZATION_ID: user?.activeOrganizationId,
    SHIPMENT_STATUS:
      shippingType === ShippingType.Quote
        ? Object.keys(ShipmentStatus)[
            Object.values(ShipmentStatus).indexOf(ShipmentStatus.QUOTE_DRAFT)
          ]
        : Object.keys(ShipmentStatus)[Object.values(ShipmentStatus).indexOf(ShipmentStatus.DRAFT)],
  }

  const formattedData = JSON.stringify(initialData, replaceFalsyProps)

  return JSON.parse(formattedData)
}

export const formatShipmentResponseData = (data: ShipmentInput) => {
  const parcels: IParcel[] = data.PACKAGE.map((item) => {
    const [length, width, height] = item.DIMENSION.split("x")

    return {
      pickupType: PickupType.Schedule,
      weight: `${item.WEIGHT}`,
      dimensions: {
        length,
        width,
        height,
      },
      packageType: PackageType[item.PACKAGING],
      content: ParcelContentType.Documents,
      totalPrice: item.DECLARED_VALUE_AMOUNT || "",
      totalCurrency: "USD",

      // TRACKING_NUMBER - for the tracking page, need to add into the context
      // currency field is not needed
    }
  })

  return {
    sender: {
      name: data.ORIGIN_CONTACT,
      phone: data.ORIGIN_PHONE,
      extension: data.ORIGIN_PHONE_EXTENSION,
      email: data.ORIGIN_EMAIL,
      company: data.ORIGIN_COMPANY,
      fullAddress: {
        displayName: data.ORIGIN_GEOLOC.DISPLAY_NAME,
        country: data.ORIGIN_COUNTRY,
        zipCode: data.ORIGIN_POSTALCODE,
        state: data.ORIGIN_STATE,
        city: data.ORIGIN_CITY,
        address1: data.ORIGIN_ADDRESS1,
        address2: data.ORIGIN_ADDRESS2,
        latitude: data.ORIGIN_GEOLOC.LATITUDE,
        longitude: data.ORIGIN_GEOLOC.LONGITUDE,
      },
    },
    recipient: {
      name: data.CONSIGNEE_CONTACT,
      phone: data.CONSIGNEE_PHONE,
      extension: data.CONSIGNEE_PHONE_EXTENSION,
      email: data.CONSIGNEE_EMAIL,
      company: data.CONSIGNEE_COMPANY,
      fullAddress: {
        displayName: data.CONSIGNEE_GEOLOC.DISPLAY_NAME,
        country: data.CONSIGNEE_COUNTRY,
        zipCode: data.CONSIGNEE_POSTALCODE,
        state: data.CONSIGNEE_STATE,
        city: data.CONSIGNEE_CITY,
        address1: data.CONSIGNEE_ADDRESS1,
        address2: data.CONSIGNEE_ADDRESS2,
        latitude: data.CONSIGNEE_GEOLOC.LATITUDE,
        longitude: data.CONSIGNEE_GEOLOC.LONGITUDE,
        isResidential: JSON.parse(data.CONSIGNEE_RESIDENTIAL),
      },
    },
    parcels,
    date: new Date(),
    rate: {
      rateType: "",
      name: "",
      price: 0,
      currency: "",
      id: "",
    },
    shippingType: data.SHIPMENT_STATUS.includes("QUOTE")
      ? ShippingType.Quote
      : ShippingType.Shipment,
    shipmentStatus: ShipmentStatus[data.SHIPMENT_STATUS],
    currentLocation: {
      displayName: data?.CURRENT_GEOLOC?.DISPLAY_NAME || "",
      latitude: data?.CURRENT_GEOLOC?.LATITUDE || "",
      longitude: data?.CURRENT_GEOLOC?.LONGITUDE || "",
    },
  }
}
