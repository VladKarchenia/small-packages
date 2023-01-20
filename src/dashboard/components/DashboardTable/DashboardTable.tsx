import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useQuery } from "react-query"
import format from "date-fns/format"

import { CSS, styled } from "@/config"
import { getAllShipmentsFn } from "@/api/shipmentApi"
import { IShipmentResponse } from "@/api/types"
import { ShippingType } from "@/shipment"
import { ShipmentStatus } from "@/shared/types"
import { createFilterString, createSortString } from "@/shared/utils"
import { useDashboardActionContext, useDashboardStateContext } from "@/dashboard/state"

import {
  TableRow,
  Table,
  TableBody,
  TabularData,
  Flex,
  StatusLabel,
  Spacer,
  Copy,
  CreateButton,
} from "@/shared/components"

import { DashboardTableHead } from "./DashboardTableHead"
import { DashboardTablePlaceholder } from "./DashboardTablePlaceholder"
import { ActionDetailsButton } from "../ActionDetailsButton"
import { DashboardTableStatusFilter } from "../DashboardTableStatusFilter"
import { DashboardTableNameFilter } from "../DashboardTableNameFilter"
import { DashboardTableOriginAddressFilter } from "../DashboardTableOriginAddressFilter"
import { DashboardTableDestinationAddressFilter } from "../DashboardTableDestinationAddressFilter"

export const DashboardTable = () => {
  const { t } = useTranslation()
  const [shipments, setShipments] = useState<IShipmentResponse[]>([])
  const {
    status,
    recipientName,
    originalAddress,
    destinationAddress,
    sortOrder,
    direction,
    shippingType,
  } = useDashboardStateContext()
  const { resetFilterField } = useDashboardActionContext()
  const isFilterApplied = useMemo<boolean>(() => {
    return Boolean(
      (shippingType === ShippingType.Shipment &&
        (status.length > 0 || recipientName.length > 0 || destinationAddress.length > 0)) ||
        (shippingType === ShippingType.Quote &&
          (originalAddress.length > 0 || destinationAddress.length > 0)),
    )
  }, [shippingType, status, recipientName, originalAddress, destinationAddress])

  const handleResetClick = () => {
    resetFilterField("status")
    resetFilterField("recipientName")
    resetFilterField("originalAddress")
    resetFilterField("destinationAddress")
  }

  // TODO: probably we need to use only isLoading to show skeleton
  const { isLoading, isFetching, refetch } = useQuery(
    // TODO: check how not to call this all the time!
    ["getShipments"],
    () =>
      getAllShipmentsFn({
        // TODO: sort and filters should be placed also in zustand and be used here
        filter: createFilterString(
          shippingType,
          status,
          recipientName,
          originalAddress,
          destinationAddress,
        ),
        sort: `${createSortString(sortOrder)},${direction}`,
      }),
    {
      enabled: false,
      onSuccess: (data) => {
        // maybe we also need to set shipments into zustand as a cache?
        setShipments(data.content)
      },
    },
  )

  useEffect(() => {
    refetch()
  }, [
    shippingType,
    status,
    recipientName,
    originalAddress,
    destinationAddress,
    sortOrder,
    direction,
    refetch,
  ])

  if (isLoading || isFetching) {
    return (
      <DashboardTablePlaceholder shippingType={shippingType} isFilterApplied={isFilterApplied} />
    )
  }

  return (
    <>
      <CreateButton />
      <Flex align="center" justify="between">
        <Flex align="center" wrap css={{ gap: "$12" }}>
          {/* TODO: need to clear filters after tab switching */}
          {shippingType === ShippingType.Shipment ? (
            <>
              <DashboardTableStatusFilter />
              <DashboardTableNameFilter />
            </>
          ) : (
            <>
              <DashboardTableOriginAddressFilter />
            </>
          )}

          <DashboardTableDestinationAddressFilter />

          {isFilterApplied ? (
            <Copy
              scale={8}
              color="system-black"
              bold
              onClick={handleResetClick}
              css={{ cursor: "pointer" }}
            >
              Clear all filters
            </Copy>
          ) : null}
        </Flex>
        <Copy scale={9}>
          Found:
          <Copy as="span" scale={9} color="system-black" bold css={{ paddingLeft: "$4" }}>
            {shipments.length}
          </Copy>
        </Copy>
      </Flex>

      <Table caption="Dashboard table">
        <DashboardTableHead />
        <TableBody>
          {!isLoading && !isFetching && shipments.length > 0 ? (
            shipments.map((shipment) => {
              const href = `/tracking/${shipment.id}`

              return (
                <TableRow key={shipment.id}>
                  <TabularDataLink href={href} text={shipment.id} />
                  {shippingType === ShippingType.Shipment ? (
                    <>
                      <TabularDataLink href={href} text={shipment.data.ORIGIN_CONTACT || "-"} />
                      <TabularDataLink href={href} text={shipment.data.CONSIGNEE_CONTACT || "-"} />
                    </>
                  ) : (
                    <TabularDataLink
                      href={href}
                      tdCss={{ maxWidth: 200 }}
                      linkCss={{ "@lg": { paddingRight: "$80" } }}
                      // text={shipment.sender?.fullAddress?.displayName}
                      text={shipment.data.ORIGIN_ADDRESS1 || "-"}
                      showTitle
                    />
                  )}
                  <TabularDataLink
                    href={href}
                    tdCss={{ maxWidth: 200 }}
                    linkCss={{ "@lg": { paddingRight: "$80" } }}
                    // text={shipment.recipient?.fullAddress?.displayName}
                    text={shipment.data.CONSIGNEE_ADDRESS1 || "-"}
                    showTitle
                  />
                  <TabularDataLink
                    href={href}
                    text={format(new Date(shipment.createdAt), "MMM d, yyyy (OOO)")}
                  />
                  <TabularDataLink href={href} linkCss={{ paddingRight: "$0" }}>
                    <Flex align="center" justify="between" css={{ width: "100%", height: "100%" }}>
                      <StatusLabel status={ShipmentStatus[shipment.data.SHIPMENT_STATUS]} />
                      <Spacer size={8} horizontal />
                      <ActionDetailsButton shippingType={shippingType} shipmentId={shipment.id} />
                    </Flex>
                  </TabularDataLink>
                </TableRow>
              )
            })
          ) : (
            <TableRow
              css={{
                hover: {
                  backgroundColor: "inherit",
                },
              }}
            >
              <TabularData colSpan={6} css={{ textAlign: "center", cursor: "default" }}>
                <Copy as="span" scale={8} color="system-black">
                  {isFilterApplied
                    ? "There are no issues that match your filter"
                    : "There is no data yet"}
                </Copy>
                {/* <ResetYourFiltersMessage /> */}
              </TabularData>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}

const SLink = styled("a", {
  reset: true,
  display: "flex",
  alignItems: "center",
  height: "100%",
  paddingX: "$16",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
})

const TabularDataLink: React.FC<
  React.PropsWithChildren<{
    href: string
    tdCss?: CSS
    linkCss?: CSS
    text?: string
    showTitle?: boolean
  }>
> = ({ href, tdCss, linkCss, text = "", showTitle = false, children }) => (
  <TabularData css={tdCss}>
    <SLink href={href} css={linkCss}>
      {text ? (
        <Copy
          as="span"
          scale={8}
          color="system-black"
          css={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}
          title={showTitle ? text : ""}
        >
          {text}
        </Copy>
      ) : (
        children
      )}
    </SLink>
  </TabularData>
)
