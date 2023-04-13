import { useBoundStore } from "@/store"
import {
  ShipmentsPagedOrderBy,
  SortDirection,
  useDashboardActionContext,
  useDashboardStateContext,
} from "@/dashboard/state"
import { ShippingType } from "@/shared/types"
import { useMedia } from "@/shared/hooks"
import { mediaQueries } from "@/stitches/theme"
import { spaceAndEnterKeyDown } from "@/shared/utils"

import { Column, Copy, Flex, SortableColumn, TableHead } from "@/shared/components"
import { IconDropArrowDown, IconDropArrowTop } from "@/shared/icons"

export const DashboardTableHead = ({ isLoading = false }: { isLoading?: boolean }) => {
  const { sortOrder } = useDashboardStateContext()
  const tab = useBoundStore((state) => state.tab)
  const { setSortOrder, setSortDirection } = useDashboardActionContext()
  const isLargeAndAbove = useMedia([mediaQueries.lg], [true], false)

  const sortById =
    sortOrder === ShipmentsPagedOrderBy.IdAsc || sortOrder === ShipmentsPagedOrderBy.IdDesc
  const sortBySenderName =
    sortOrder === ShipmentsPagedOrderBy.SenderNameAsc ||
    sortOrder === ShipmentsPagedOrderBy.SenderNameDesc
  const sortByRecipientName =
    sortOrder === ShipmentsPagedOrderBy.RecipientNameAsc ||
    sortOrder === ShipmentsPagedOrderBy.RecipientNameDesc
  const sortByDate =
    sortOrder === ShipmentsPagedOrderBy.CreationDateAsc ||
    sortOrder === ShipmentsPagedOrderBy.CreationDateDesc
  const sortByStatus =
    sortOrder === ShipmentsPagedOrderBy.StatusAsc || sortOrder === ShipmentsPagedOrderBy.StatusDesc

  const sortByIdHandler = () => {
    if (sortOrder === ShipmentsPagedOrderBy.IdAsc) {
      setSortOrder(ShipmentsPagedOrderBy.IdDesc)
      setSortDirection(SortDirection.DESC)
    } else {
      setSortOrder(ShipmentsPagedOrderBy.IdAsc)
      setSortDirection(SortDirection.ASC)
    }
  }

  const sortBySenderNameHandler = () => {
    if (sortOrder === ShipmentsPagedOrderBy.SenderNameAsc) {
      setSortOrder(ShipmentsPagedOrderBy.SenderNameDesc)
      setSortDirection(SortDirection.DESC)
    } else {
      setSortOrder(ShipmentsPagedOrderBy.SenderNameAsc)
      setSortDirection(SortDirection.ASC)
    }
  }

  const sortByRecipientNameHandler = () => {
    if (sortOrder === ShipmentsPagedOrderBy.RecipientNameAsc) {
      setSortOrder(ShipmentsPagedOrderBy.RecipientNameDesc)
      setSortDirection(SortDirection.DESC)
    } else {
      setSortOrder(ShipmentsPagedOrderBy.RecipientNameAsc)
      setSortDirection(SortDirection.ASC)
    }
  }

  const sortByDateHandler = () => {
    if (sortOrder === ShipmentsPagedOrderBy.CreationDateAsc) {
      setSortOrder(ShipmentsPagedOrderBy.CreationDateDesc)
      setSortDirection(SortDirection.DESC)
    } else {
      setSortOrder(ShipmentsPagedOrderBy.CreationDateAsc)
      setSortDirection(SortDirection.ASC)
    }
  }

  const sortByStatusHandler = () => {
    if (sortOrder === ShipmentsPagedOrderBy.StatusAsc) {
      setSortOrder(ShipmentsPagedOrderBy.StatusDesc)
      setSortDirection(SortDirection.DESC)
    } else {
      setSortOrder(ShipmentsPagedOrderBy.StatusAsc)
      setSortDirection(SortDirection.ASC)
    }
  }

  const initialTableHeaderCss = {
    height: "$40",
    paddingX: "$12",
    transition: "150ms ease-out",
    cursor: "pointer",
    keyboardFocus: {
      outline: "1px solid $theme-vl-n3",
    },
  }

  return (
    <TableHead>
      {isLoading ? (
        <Column align="start">ID</Column>
      ) : (
        <SortableColumn align="start">
          {/* TODO: make a refactoring of this component */}
          <Flex
            align="center"
            justify="between"
            tabIndex={0}
            onKeyDown={(e) => {
              spaceAndEnterKeyDown(e.key) && sortByIdHandler()
            }}
            css={{
              backgroundColor: sortById ? "$theme-vlt-ydt" : "transparent",
              border: `1px solid ${sortById ? "$theme-vl-yl" : "transparent"}`,

              hover: {
                backgroundColor: "$theme-vlr-ydr",
                borderColor: sortById ? "$theme-vl-yl" : "$theme-vlr-ydr",
              },
              ...initialTableHeaderCss,
            }}
            onClick={() => sortByIdHandler()}
          >
            <Copy
              as="span"
              scale={{ "@initial": 10, "@lg": 6 }}
              fontWeight="bold"
              uppercase={{ "@initial": false, "@lg": true }}
            >
              Id
            </Copy>
            <Flex
              css={{
                color: sortById ? "inherit" : "$neutrals-4",
              }}
            >
              {sortOrder === ShipmentsPagedOrderBy.IdDesc ? (
                <IconDropArrowTop size="xs" />
              ) : (
                <IconDropArrowDown size="xs" />
              )}
            </Flex>
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
                tabIndex={0}
                onKeyDown={(e) => {
                  spaceAndEnterKeyDown(e.key) && sortBySenderNameHandler()
                }}
                css={{
                  backgroundColor: sortBySenderName ? "$theme-vlt-ydt" : "transparent",
                  border: `1px solid ${sortBySenderName ? "$theme-vl-yl" : "transparent"}`,

                  hover: {
                    backgroundColor: "$theme-vlr-ydr",
                    borderColor: sortBySenderName ? "$theme-vl-yl" : "$theme-vlr-ydr",
                  },
                  ...initialTableHeaderCss,
                }}
                onClick={() => sortBySenderNameHandler()}
              >
                <Copy
                  as="span"
                  scale={{ "@initial": 10, "@lg": 6 }}
                  fontWeight="bold"
                  uppercase={{ "@initial": false, "@lg": true }}
                >
                  {isLargeAndAbove ? "Sender's name" : "Sender"}
                </Copy>
                <Flex
                  css={{
                    color: sortBySenderName ? "inherit" : "$neutrals-4",
                  }}
                >
                  {sortOrder === ShipmentsPagedOrderBy.SenderNameDesc ? (
                    <IconDropArrowTop size="xs" />
                  ) : (
                    <IconDropArrowDown size="xs" />
                  )}
                </Flex>
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
                tabIndex={0}
                onKeyDown={(e) => {
                  spaceAndEnterKeyDown(e.key) && sortByRecipientNameHandler()
                }}
                css={{
                  backgroundColor: sortByRecipientName ? "$theme-vlt-ydt" : "transparent",
                  border: `1px solid ${sortByRecipientName ? "$theme-vl-yl" : "transparent"}`,

                  hover: {
                    backgroundColor: "$theme-vlr-ydr",
                    borderColor: sortByRecipientName ? "$theme-vl-yl" : "$theme-vlr-ydr",
                  },
                  ...initialTableHeaderCss,
                }}
                onClick={() => sortByRecipientNameHandler()}
              >
                <Copy
                  as="span"
                  scale={{ "@initial": 10, "@lg": 6 }}
                  fontWeight="bold"
                  uppercase={{ "@initial": false, "@lg": true }}
                >
                  {isLargeAndAbove ? "Recipient's name" : "Recipient"}
                </Copy>
                <Flex
                  css={{
                    color: sortByRecipientName ? "inherit" : "$neutrals-4",
                  }}
                >
                  {sortOrder === ShipmentsPagedOrderBy.RecipientNameDesc ? (
                    <IconDropArrowTop size="xs" />
                  ) : (
                    <IconDropArrowDown size="xs" />
                  )}
                </Flex>
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
            tabIndex={0}
            onKeyDown={(e) => {
              spaceAndEnterKeyDown(e.key) && sortByDateHandler()
            }}
            css={{
              backgroundColor: sortByDate ? "$theme-vlt-ydt" : "transparent",
              border: `1px solid ${sortByDate ? "$theme-vl-yl" : "transparent"}`,

              hover: {
                backgroundColor: "$theme-vlr-ydr",
                borderColor: sortByDate ? "$theme-vl-yl" : "$theme-vlr-ydr",
              },
              ...initialTableHeaderCss,
            }}
            onClick={() => sortByDateHandler()}
          >
            <Copy
              as="span"
              scale={{ "@initial": 10, "@lg": 6 }}
              fontWeight="bold"
              uppercase={{ "@initial": false, "@lg": true }}
            >
              {isLargeAndAbove ? "Creation date" : "Creation"}
            </Copy>
            <Flex
              css={{
                color: sortByDate ? "inherit" : "$neutrals-4",
              }}
            >
              {sortOrder === ShipmentsPagedOrderBy.CreationDateDesc ? (
                <IconDropArrowTop size="xs" />
              ) : (
                <IconDropArrowDown size="xs" />
              )}
            </Flex>
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
            tabIndex={0}
            onKeyDown={(e) => {
              spaceAndEnterKeyDown(e.key) && sortByStatusHandler()
            }}
            css={{
              backgroundColor: sortByStatus ? "$theme-vlt-ydt" : "transparent",
              border: `1px solid ${sortByStatus ? "$theme-vl-yl" : "transparent"}`,

              hover: {
                backgroundColor: "$theme-vlr-ydr",
                borderColor: sortByStatus ? "$theme-vl-yl" : "$theme-vlr-ydr",
              },
              ...initialTableHeaderCss,
            }}
            onClick={() => sortByStatusHandler()}
          >
            <Copy
              as="span"
              scale={{ "@initial": 10, "@lg": 6 }}
              fontWeight="bold"
              uppercase={{ "@initial": false, "@lg": true }}
            >
              Status
            </Copy>
            <Flex
              css={{
                color: sortByStatus ? "inherit" : "$neutrals-4",
              }}
            >
              {sortOrder === ShipmentsPagedOrderBy.StatusDesc ? (
                <IconDropArrowTop size="xs" />
              ) : (
                <IconDropArrowDown size="xs" />
              )}
            </Flex>
          </Flex>
        </SortableColumn>
      )}
    </TableHead>
  )
}
