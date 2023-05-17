import { ShipmentsPagedOrderBy } from "@/dashboard/state"
import { ShippingType, ShipmentStatus } from "@/shared/types"

export const createSortString = (sortOrder: ShipmentsPagedOrderBy) => {
  switch (sortOrder) {
    case ShipmentsPagedOrderBy.CreationDateAsc:
    case ShipmentsPagedOrderBy.CreationDateDesc:
      return "createdAt"

    case ShipmentsPagedOrderBy.IdAsc:
    case ShipmentsPagedOrderBy.IdDesc:
      return "id"

    case ShipmentsPagedOrderBy.SenderNameAsc:
    case ShipmentsPagedOrderBy.SenderNameDesc:
      return "data.ORIGIN_CONTACT"

    case ShipmentsPagedOrderBy.RecipientNameAsc:
    case ShipmentsPagedOrderBy.RecipientNameDesc:
      return "data.CONSIGNEE_CONTACT"

    case ShipmentsPagedOrderBy.StatusAsc:
    case ShipmentsPagedOrderBy.StatusDesc:
      return "data.SHIPMENT_STATUS"
  }
}

export const createFilterString = (
  tab: ShippingType,
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
      tab === ShippingType.Quote
        ? "data.SHIPMENT_STATUS:QUOTE_QUOTED"
        : "data.SHIPMENT_STATUS:DRAFT,SUBMIT_READY,SUBMITTED,IN_TRANSIT,DELIVERED,IN_RETURN,RETURNED"
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
