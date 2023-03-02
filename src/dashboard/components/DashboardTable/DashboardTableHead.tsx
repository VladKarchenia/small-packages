import { useBoundStore } from "@/store"
import {
  ShipmentsPagedOrderBy,
  SortDirection,
  useDashboardActionContext,
  useDashboardStateContext,
} from "@/dashboard/state"
import { ShippingType } from "@/shared/types"

import { Column, Copy, Flex, SortableColumn, Spacer, TableHead } from "@/shared/components"
import { IconDropArrowDown, IconDropArrowTop } from "@/shared/icons"
import { useMedia } from "@/shared/hooks"
import { mediaQueries } from "@/stitches/theme"

export const DashboardTableHead = ({ isLoading = false }: { isLoading?: boolean }) => {
  const { sortOrder } = useDashboardStateContext()
  const tab = useBoundStore((state) => state.tab)
  const { setSortOrder, setSortDirection } = useDashboardActionContext()
  const isLargeAndAbove = useMedia([mediaQueries.lg], [true], false)

  return (
    <TableHead>
      {isLoading ? (
        <Column align="start">ID</Column>
      ) : (
        <SortableColumn align="start">
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
                setSortOrder(ShipmentsPagedOrderBy.IdDesc)
                setSortDirection(SortDirection.DESC)
              } else {
                setSortOrder(ShipmentsPagedOrderBy.IdAsc)
                setSortDirection(SortDirection.ASC)
              }
            }}
          >
            <Copy as="span" scale={{ "@initial": 10, "@lg": 8 }} color="system-black" bold>
              ID
            </Copy>
            <Spacer size={12} horizontal />
            {sortOrder === ShipmentsPagedOrderBy.IdDesc ? (
              <IconDropArrowTop size="xs" />
            ) : (
              <IconDropArrowDown size="xs" />
            )}
          </Flex>
        </SortableColumn>
      )}

      {tab === ShippingType.Shipment ? (
        <>
          {isLoading ? (
            <Column align="start">{isLargeAndAbove ? "Sender's name" : "Sender"}</Column>
          ) : (
            <SortableColumn align="start">
              <Flex
                align="center"
                justify="between"
                css={{
                  backgroundColor:
                    sortOrder === ShipmentsPagedOrderBy.SenderNameAsc ||
                    sortOrder === ShipmentsPagedOrderBy.SenderNameDesc
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
                  if (sortOrder === ShipmentsPagedOrderBy.SenderNameAsc) {
                    setSortOrder(ShipmentsPagedOrderBy.SenderNameDesc)
                    setSortDirection(SortDirection.DESC)
                  } else {
                    setSortOrder(ShipmentsPagedOrderBy.SenderNameAsc)
                    setSortDirection(SortDirection.ASC)
                  }
                }}
              >
                <Copy as="span" scale={{ "@initial": 10, "@lg": 8 }} color="system-black" bold>
                  {isLargeAndAbove ? "Sender's name" : "Sender"}
                </Copy>
                <Spacer size={12} horizontal />
                {sortOrder === ShipmentsPagedOrderBy.SenderNameDesc ? (
                  <IconDropArrowTop size="xs" />
                ) : (
                  <IconDropArrowDown size="xs" />
                )}
              </Flex>
            </SortableColumn>
          )}

          {isLoading ? (
            <Column align="start">{isLargeAndAbove ? "Recipient's name" : "Recipient"}</Column>
          ) : (
            <SortableColumn align="start">
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
                    setSortOrder(ShipmentsPagedOrderBy.RecipientNameDesc)
                    setSortDirection(SortDirection.DESC)
                  } else {
                    setSortOrder(ShipmentsPagedOrderBy.RecipientNameAsc)
                    setSortDirection(SortDirection.ASC)
                  }
                }}
              >
                <Copy as="span" scale={{ "@initial": 10, "@lg": 8 }} color="system-black" bold>
                  {isLargeAndAbove ? "Recipient's name" : "Recipient"}
                </Copy>
                <Spacer size={12} horizontal />
                {sortOrder === ShipmentsPagedOrderBy.RecipientNameDesc ? (
                  <IconDropArrowTop size="xs" />
                ) : (
                  <IconDropArrowDown size="xs" />
                )}
              </Flex>
            </SortableColumn>
          )}
        </>
      ) : (
        <Column align="start">Origin address</Column>
      )}
      <Column align="start">Destination address</Column>

      {isLoading ? (
        <Column align="start">{isLargeAndAbove ? "Creation date" : "Creation"}</Column>
      ) : (
        <SortableColumn align="start">
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
                setSortOrder(ShipmentsPagedOrderBy.CreationDateDesc)
                setSortDirection(SortDirection.DESC)
              } else {
                setSortOrder(ShipmentsPagedOrderBy.CreationDateAsc)
                setSortDirection(SortDirection.ASC)
              }
            }}
          >
            <Copy as="span" scale={{ "@initial": 10, "@lg": 8 }} color="system-black" bold>
              {isLargeAndAbove ? "Creation date" : "Creation"}
            </Copy>
            <Spacer size={12} horizontal />
            {sortOrder === ShipmentsPagedOrderBy.CreationDateDesc ? (
              <IconDropArrowTop size="xs" />
            ) : (
              <IconDropArrowDown size="xs" />
            )}
          </Flex>
        </SortableColumn>
      )}

      {isLoading ? (
        <Column align="start">Status</Column>
      ) : (
        <SortableColumn align="start">
          <Flex
            align="center"
            justify="between"
            css={{
              backgroundColor:
                sortOrder === ShipmentsPagedOrderBy.StatusAsc ||
                sortOrder === ShipmentsPagedOrderBy.StatusDesc
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
              if (sortOrder === ShipmentsPagedOrderBy.StatusAsc) {
                setSortOrder(ShipmentsPagedOrderBy.StatusDesc)
                setSortDirection(SortDirection.DESC)
              } else {
                setSortOrder(ShipmentsPagedOrderBy.StatusAsc)
                setSortDirection(SortDirection.ASC)
              }
            }}
          >
            <Copy as="span" scale={{ "@initial": 10, "@lg": 8 }} color="system-black" bold>
              Status
            </Copy>
            <Spacer size={12} horizontal />
            {sortOrder === ShipmentsPagedOrderBy.StatusDesc ? (
              <IconDropArrowTop size="xs" />
            ) : (
              <IconDropArrowDown size="xs" />
            )}
          </Flex>
        </SortableColumn>
      )}
    </TableHead>
  )
}
