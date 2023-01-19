import { ShipmentsPagedOrderBy } from "@/dashboard/state"
import { ShippingType } from "@/shipment"
import { ShipmentStatus } from "../types"

export const createSortString = (sortOrder: ShipmentsPagedOrderBy) => {
  switch (sortOrder) {
    case ShipmentsPagedOrderBy.CreationDateAsc:
    case ShipmentsPagedOrderBy.CreationDateDesc:
      return "createdAt"
    // return "updatedAt"

    case ShipmentsPagedOrderBy.IdAsc:
    case ShipmentsPagedOrderBy.IdDesc:
      return "id"

    case ShipmentsPagedOrderBy.RecipientNameAsc:
    case ShipmentsPagedOrderBy.RecipientNameDesc:
      return "data.CONSIGNEE_CONTACT"
  }
}

export const createFilterString = (
  shippingType: ShippingType | null,
  status: ShipmentStatus[],
  recipientName: string[],
  originalAddress: string[],
  destinationAddress: string[],
) => {
  let filterString = ""

  if (status.length > 0) {
    filterString += `data.SHIPMENT_STATUS:${status.join(",")}`
  } else {
    filterString +=
      shippingType === ShippingType.Quote
        ? "data.SHIPMENT_STATUS:QUOTE_READY,QUOTE_QUOTED"
        : "data.SHIPMENT_STATUS:COMPLETED,CONFIRMED,DELIVERED,DRAFT,IN_DELIVERY,SUBMIT_READY"
  }

  if (originalAddress.length > 0) {
    filterString += `;data.ORIGIN_GEOLOC.DISPLAY_NAME:${originalAddress
      .map((i) => encodeURIComponent(encodeURIComponent(i)))
      .join(",")}`
  }

  if (destinationAddress.length > 0) {
    filterString += `;data.CONSIGNEE_GEOLOC.DISPLAY_NAME:${destinationAddress
      .map((i) => encodeURIComponent(encodeURIComponent(i)))
      .join(",")}`
  }

  if (recipientName.length > 0) {
    filterString += `;data.CONSIGNEE_CONTACT:${recipientName
      .map((i) => encodeURIComponent(encodeURIComponent(i)))
      .join(",")}`
  }

  return filterString
}
