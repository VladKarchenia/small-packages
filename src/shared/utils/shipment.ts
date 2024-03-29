import format from "date-fns/format"

import { IUserOrganization, ShipmentInput, ShipmentPackageInput } from "@/api/types"
import {
  IParcel,
  PackageType,
  ShipmentStatus,
  ShippingType,
  ShipmentState,
  IParcels,
  IdenticalPackagesType,
  PickupType,
} from "@/shared/types"
import { PACKAGE_CURRENCY_DEFAULT, PACKAGE_QUANTITY_DEFAULT } from "@/constants"

export const replaceFalsyProps = (_: string, value: unknown) => {
  // TODO: Should we remove empty string as well?
  // should create and patch use different helpers?
  if (value === "" || value === null || value === undefined) {
    // if (value === null || value === undefined) {
    return undefined
  }

  return value
}

export const formatShipmentRequestData = (
  data: ShipmentState,
  shippingType: ShippingType,
  organization: IUserOrganization,
  status?: ShipmentStatus,
) => {
  const packages = Object.values(data.parcels).reduce(
    (acc: ShipmentPackageInput[], item: IParcel) => {
      const parcel: ShipmentPackageInput = {
        DIMENSION: `${item.dimensions.length}x${item.dimensions.width}x${item.dimensions.height}`,
        WEIGHT: item.weight,
        DECLARED_VALUE_AMOUNT: item.totalPrice,
        PACKAGING: PackageType.Custom,
        PACKAGE_REF_ID: item.packageId,
      }

      const identicalParcels = Array.from(new Array(item.quantity)).map(() => parcel)

      return [...acc, ...identicalParcels]
    },
    [],
  )

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
    CONSIGNEE_RESIDENTIAL: `${data.recipient.fullAddress.isResidential}`,
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

    RETURN_ADDRESS_ADDRESS1: data.senderReturn.fullAddress.address1,
    RETURN_ADDRESS_ADDRESS2: data.senderReturn.fullAddress.address2,
    RETURN_ADDRESS_CITY: data.senderReturn.fullAddress.city,
    RETURN_ADDRESS_COMPANY: data.senderReturn.company,
    RETURN_ADDRESS_CONTACT: data.senderReturn.name,
    RETURN_ADDRESS_COUNTRY: data.senderReturn.fullAddress.country,
    RETURN_ADDRESS_EMAIL: data.senderReturn.email,
    RETURN_ADDRESS_PHONE: data.senderReturn.phone,
    RETURN_ADDRESS_PHONE_EXTENSION: data.senderReturn.extension,
    RETURN_ADDRESS_POSTALCODE: data.senderReturn.fullAddress.zipCode,
    RETURN_ADDRESS_STATE: data.senderReturn.fullAddress.state,

    PACKAGE: packages,
    PICKUP_TYPE:
      Object.keys(PickupType)[Object.values(PickupType).indexOf(data.packaging.pickupType)],
    PACKAGING_TYPE: data.packaging.packagingType,
    CONTENT_DESCRIPTION: data.packaging.packageContent,

    PICKUP_READY_DATE: format(data.date, "MM/dd/yyyy"),
    PICKUP_READY_TIME: format(data.date, "HH:mm"),

    ORGANIZATION_ID: organization.id,
    SHIPMENT_STATUS: status
      ? Object.keys(ShipmentStatus)[Object.values(ShipmentStatus).indexOf(status)]
      : // TODO: fix this statuses
      shippingType === ShippingType.Quote
      ? Object.keys(ShipmentStatus)[
          Object.values(ShipmentStatus).indexOf(ShipmentStatus.QUOTE_QUOTED)
        ]
      : Object.keys(ShipmentStatus)[
          Object.values(ShipmentStatus).indexOf(ShipmentStatus.SUBMITTED)
        ],
  }

  const formattedData = JSON.stringify(initialData, replaceFalsyProps)

  return JSON.parse(formattedData)
}

export const formatShipmentResponseData = (data: ShipmentInput): ShipmentState => {
  const sortedByIdParcels = data.PACKAGE.sort((a, b) =>
    a.PACKAGE_REF_ID.localeCompare(b.PACKAGE_REF_ID),
  )

  const parcels = sortedByIdParcels.reduce((acc: IParcels, item: ShipmentPackageInput) => {
    const [length, width, height] = item.DIMENSION.split("x")

    return {
      ...acc,
      [item.PACKAGE_REF_ID]: {
        weight: parseFloat(item.WEIGHT).toFixed(1),
        dimensions: {
          length,
          width,
          height,
        },
        totalPrice: item.DECLARED_VALUE_AMOUNT || "",
        totalCurrency: PACKAGE_CURRENCY_DEFAULT,
        packageId: item.PACKAGE_REF_ID,
        packageType: PackageType.Custom,
        quantity: acc[item.PACKAGE_REF_ID]
          ? acc[item.PACKAGE_REF_ID]["quantity"] + 1
          : PACKAGE_QUANTITY_DEFAULT,
      },
    }
  }, {})

  return {
    sender: {
      name: data.ORIGIN_CONTACT,
      phone: data.ORIGIN_PHONE,
      extension: data.ORIGIN_PHONE_EXTENSION,
      email: data.ORIGIN_EMAIL,
      company: data.ORIGIN_COMPANY,
      fullAddress: {
        displayName: data.ORIGIN_GEOLOC.DISPLAY_NAME || "",
        country: data.ORIGIN_COUNTRY || "",
        zipCode: data.ORIGIN_POSTALCODE || "",
        state: data.ORIGIN_STATE || "",
        city: data.ORIGIN_CITY || "",
        address1: data.ORIGIN_ADDRESS1 || "",
        address2: data.ORIGIN_ADDRESS2 || "",
        latitude: data.ORIGIN_GEOLOC.LATITUDE || "",
        longitude: data.ORIGIN_GEOLOC.LONGITUDE || "",
      },
    },
    senderReturn: {
      name: data.RETURN_ADDRESS_CONTACT || "",
      phone: data.RETURN_ADDRESS_PHONE || "",
      extension: data.RETURN_ADDRESS_PHONE_EXTENSION || "",
      email: data.RETURN_ADDRESS_EMAIL || "",
      company: data.RETURN_ADDRESS_COMPANY || "",
      fullAddress: {
        displayName: "",
        country: data.RETURN_ADDRESS_COUNTRY || "",
        zipCode: data.RETURN_ADDRESS_POSTALCODE || "",
        state: data.RETURN_ADDRESS_STATE || "",
        city: data.RETURN_ADDRESS_CITY || "",
        address1: data.RETURN_ADDRESS_ADDRESS1 || "",
        address2: data.RETURN_ADDRESS_ADDRESS2 || "",
        latitude: "",
        longitude: "",
      },
    },
    recipient: {
      name: data.CONSIGNEE_CONTACT,
      phone: data.CONSIGNEE_PHONE,
      extension: data.CONSIGNEE_PHONE_EXTENSION,
      email: data.CONSIGNEE_EMAIL,
      company: data.CONSIGNEE_COMPANY,
      fullAddress: {
        displayName: data.CONSIGNEE_GEOLOC.DISPLAY_NAME || "",
        country: data.CONSIGNEE_COUNTRY || "",
        zipCode: data.CONSIGNEE_POSTALCODE || "",
        state: data.CONSIGNEE_STATE || "",
        city: data.CONSIGNEE_CITY || "",
        address1: data.CONSIGNEE_ADDRESS1 || "",
        address2: data.CONSIGNEE_ADDRESS2 || "",
        latitude: data.CONSIGNEE_GEOLOC.LATITUDE || "",
        longitude: data.CONSIGNEE_GEOLOC.LONGITUDE || "",
        isResidential: JSON.parse(data.CONSIGNEE_RESIDENTIAL),
      },
    },
    packaging: {
      pickupType: PickupType[data.PICKUP_TYPE],
      packagingType: data.PACKAGING_TYPE,
      totalPackagesNumber: data.PACKAGE.length,
      packageContent: data.CONTENT_DESCRIPTION,
      identicalPackages:
        Object.keys(parcels).length > 1
          ? IdenticalPackagesType.Different
          : IdenticalPackagesType.Identical,
    },
    parcels,
    date: new Date(`${data.PICKUP_READY_DATE} ${data.PICKUP_READY_TIME}`),
    rate: {
      rateType: "",
      name: "",
      price: 0,
      currency: "",
      id: "",
    },
    shipmentStatus: ShipmentStatus[data.SHIPMENT_STATUS],
    currentLocation: {
      displayName: data?.CURRENT_GEOLOC?.DISPLAY_NAME || "",
      latitude: data?.CURRENT_GEOLOC?.LATITUDE || "",
      longitude: data?.CURRENT_GEOLOC?.LONGITUDE || "",
    },
    hasReturnAddress: !!data?.RETURN_ADDRESS_CONTACT || false,
  }
}
