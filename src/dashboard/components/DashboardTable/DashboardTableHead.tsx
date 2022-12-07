import { useState } from "react"
import { Column, Copy, Flex, SortableColumn, Spacer, TableHead } from "@/shared/components"
import { IconArrowDown, IconArrowTop } from "@/shared/icons"
import {
  ShipmentsPagedOrderBy,
  SortDirection,
  useDashboardActionContext,
  useDashboardStateContext,
} from "@/dashboard/state"
import { ShippingType } from "@/shipment"

interface IDashboardTableHeadProps {
  shippingType: ShippingType
}

export const DashboardTableHead = ({ shippingType }: IDashboardTableHeadProps) => {
  const [shipmentId, setShipmentId] = useState<
    ShipmentsPagedOrderBy.IdAsc | ShipmentsPagedOrderBy.IdDesc
  >(ShipmentsPagedOrderBy.IdAsc)
  const [creationDate, setCreationDate] = useState<
    ShipmentsPagedOrderBy.CreationDateAsc | ShipmentsPagedOrderBy.CreationDateDesc
  >(ShipmentsPagedOrderBy.CreationDateAsc)
  const [recipientName, setRecipientName] = useState<
    ShipmentsPagedOrderBy.RecipientNameAsc | ShipmentsPagedOrderBy.RecipientNameDesc
  >(ShipmentsPagedOrderBy.RecipientNameAsc)

  const { sortOrder } = useDashboardStateContext()
  const { setSortOrder, setSortDirection } = useDashboardActionContext()

  return (
    <TableHead>
      <SortableColumn align="start" css={{ width: 230 }}>
        <Flex
          align="center"
          justify="between"
          css={{
            backgroundColor:
              sortOrder === ShipmentsPagedOrderBy.IdAsc ||
              sortOrder === ShipmentsPagedOrderBy.IdDesc
                ? "$neutrals-3"
                : "inherit",
            borderRadius: "$8",
            paddingX: "$12",
            cursor: "pointer",

            hover: {
              backgroundColor: "$neutrals-3",
            },
          }}
          onClick={() => {
            if (sortOrder === ShipmentsPagedOrderBy.IdAsc) {
              setShipmentId(ShipmentsPagedOrderBy.IdDesc)
              setSortOrder(ShipmentsPagedOrderBy.IdDesc)
              setSortDirection(SortDirection.DESC)
            } else {
              setShipmentId(ShipmentsPagedOrderBy.IdAsc)
              setSortOrder(ShipmentsPagedOrderBy.IdAsc)
              setSortDirection(SortDirection.ASC)
            }
          }}
        >
          <Copy as="span" scale={8} color="system-black" bold>
            {"ID"}
          </Copy>
          <Spacer size={12} horizontal />
          {shipmentId === ShipmentsPagedOrderBy.IdAsc ? (
            <IconArrowDown size="xs" />
          ) : (
            <IconArrowTop size="xs" />
          )}
        </Flex>
      </SortableColumn>
      {shippingType === ShippingType.Shipment ? (
        <>
          <Column align="start" css={{ width: 300 }}>
            {"Sender's name"}
          </Column>
          <SortableColumn align="start" css={{ width: 300 }}>
            <Flex
              align="center"
              justify="between"
              css={{
                backgroundColor:
                  sortOrder === ShipmentsPagedOrderBy.RecipientNameAsc ||
                  sortOrder === ShipmentsPagedOrderBy.RecipientNameDesc
                    ? "$neutrals-3"
                    : "inherit",
                borderRadius: "$8",
                paddingX: "$12",
                cursor: "pointer",

                hover: {
                  backgroundColor: "$neutrals-3",
                },
              }}
              onClick={() => {
                if (sortOrder === ShipmentsPagedOrderBy.RecipientNameAsc) {
                  setRecipientName(ShipmentsPagedOrderBy.RecipientNameDesc)
                  setSortOrder(ShipmentsPagedOrderBy.RecipientNameDesc)
                  setSortDirection(SortDirection.DESC)
                } else {
                  setRecipientName(ShipmentsPagedOrderBy.RecipientNameAsc)
                  setSortOrder(ShipmentsPagedOrderBy.RecipientNameAsc)
                  setSortDirection(SortDirection.ASC)
                }
              }}
            >
              <Copy as="span" scale={8} color="system-black" bold>
                {"Recipient's name"}
              </Copy>
              <Spacer size={12} horizontal />
              {recipientName === ShipmentsPagedOrderBy.RecipientNameAsc ? (
                <IconArrowDown size="xs" />
              ) : (
                <IconArrowTop size="xs" />
              )}
            </Flex>
          </SortableColumn>
        </>
      ) : (
        <Column align="start" css={{ width: 460 }}>
          {"Origin address"}
        </Column>
      )}
      <Column align="start" css={{ width: 460 }}>
        {"Destination address"}
      </Column>
      <SortableColumn align="start" css={{ width: 230 }}>
        <Flex
          align="center"
          justify="between"
          css={{
            backgroundColor:
              sortOrder === ShipmentsPagedOrderBy.CreationDateAsc ||
              sortOrder === ShipmentsPagedOrderBy.CreationDateDesc
                ? "$neutrals-3"
                : "inherit",
            borderRadius: "$8",
            paddingX: "$12",
            cursor: "pointer",

            hover: {
              backgroundColor: "$neutrals-3",
            },
          }}
          onClick={() => {
            if (sortOrder === ShipmentsPagedOrderBy.CreationDateAsc) {
              setCreationDate(ShipmentsPagedOrderBy.CreationDateDesc)
              setSortOrder(ShipmentsPagedOrderBy.CreationDateDesc)
              setSortDirection(SortDirection.DESC)
            } else {
              setCreationDate(ShipmentsPagedOrderBy.CreationDateAsc)
              setSortOrder(ShipmentsPagedOrderBy.CreationDateAsc)
              setSortDirection(SortDirection.ASC)
            }
          }}
        >
          <Copy as="span" scale={8} color="system-black" bold>
            {"Creation date"}
          </Copy>
          <Spacer size={12} horizontal />
          {creationDate === ShipmentsPagedOrderBy.CreationDateAsc ? (
            <IconArrowDown size="xs" />
          ) : (
            <IconArrowTop size="xs" />
          )}
        </Flex>
      </SortableColumn>
      <Column align="start" css={{ width: 250 }}>
        {"Status"}
      </Column>
    </TableHead>
  )
}
