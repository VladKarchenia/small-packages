import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import tzlookup from "tz-lookup"
import formatInTimeZone from "date-fns-tz/formatInTimeZone"
import { shallow } from "zustand/shallow"

import { useBoundStore } from "@/store"
import { CSS, styled } from "@/stitches/config"
import { ShipmentStatus, ShippingType } from "@/shared/types"
import { createFilterString, createSortString } from "@/shared/utils"
import { useDashboardActionContext, useDashboardStateContext } from "@/dashboard/state"
import { useAllShipments } from "@/dashboard/hooks"
import { TRACKING } from "@/constants"

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
import {
  ActionDetailsButton,
  DashboardTableStatusFilter,
  DashboardTableNameFilter,
  DashboardTableOriginAddressFilter,
  DashboardTableDestinationAddressFilter,
} from "@/dashboard/components"

import { DashboardTableHead } from "./DashboardTableHead"
import { DashboardTablePlaceholder } from "./DashboardTablePlaceholder"

export const DashboardTable = () => {
  const [shippingType, tab] = useBoundStore((state) => [state.shippingType, state.tab], shallow)
  const { status, recipientName, originalAddress, destinationAddress, sortOrder, direction } =
    useDashboardStateContext()
  const { resetFilterField } = useDashboardActionContext()
  const isFilterApplied = useMemo<boolean>(() => {
    return Boolean(
      (tab === ShippingType.Shipment &&
        (status.length > 0 || recipientName.length > 0 || destinationAddress.length > 0)) ||
        (tab === ShippingType.Quote &&
          (originalAddress.length > 0 || destinationAddress.length > 0)),
    )
  }, [tab, status, recipientName, originalAddress, destinationAddress])

  const handleResetClick = () => {
    resetFilterField("status")
    resetFilterField("recipientName")
    resetFilterField("originalAddress")
    resetFilterField("destinationAddress")
  }

  const { isLoading, data } = useAllShipments({
    type: tab,
    filter: createFilterString(tab, status, recipientName, originalAddress, destinationAddress),
    sort: `${createSortString(sortOrder)},${direction}`,
  })

  const shipments = useMemo(() => (data ? data : []), [data])

  if (isLoading) {
    return <DashboardTablePlaceholder tab={tab} isFilterApplied={isFilterApplied} />
  }

  return (
    <>
      <CreateButton />
      <Flex align="center" justify="between">
        <Flex align="center" wrap css={{ gap: "$12" }}>
          {tab === ShippingType.Shipment ? (
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
          {!isLoading && shipments.length > 0 ? (
            shipments.map((shipment) => {
              const href = `${TRACKING}/${shippingType}/${shipment.id}`
              const timeZone = tzlookup(
                parseFloat(shipment.data.ORIGIN_GEOLOC.LATITUDE),
                parseFloat(shipment.data.ORIGIN_GEOLOC.LONGITUDE),
              )

              return (
                <TableRow key={shipment.id}>
                  <TabularDataLink
                    href={href}
                    tdCss={{ maxWidth: 120, "@lg": { maxWidth: 200 } }}
                    text={shipment.id}
                    showTitle
                  />
                  {tab === ShippingType.Shipment ? (
                    <>
                      <TabularDataLink
                        href={href}
                        tdCss={{ minWidth: 130, "@lg": { maxWidth: 300 } }}
                        text={shipment.data.ORIGIN_CONTACT || "-"}
                        showTitle
                      />
                      <TabularDataLink
                        href={href}
                        tdCss={{ minWidth: 130, "@lg": { maxWidth: 300 } }}
                        text={shipment.data.CONSIGNEE_CONTACT || "-"}
                        showTitle
                      />
                    </>
                  ) : (
                    <TabularDataLink
                      href={href}
                      tdCss={{ maxWidth: 160, "@lg": { maxWidth: 200 } }}
                      linkCss={{ "@lg": { paddingRight: "$80" } }}
                      text={shipment.data.ORIGIN_ADDRESS1 || "-"}
                      showTitle
                    />
                  )}
                  <TabularDataLink
                    href={href}
                    tdCss={{ maxWidth: 160, "@lg": { maxWidth: 200 } }}
                    linkCss={{ "@lg": { paddingRight: "$80" } }}
                    text={shipment.data.CONSIGNEE_ADDRESS1 || "-"}
                    showTitle
                  />
                  <TabularDataLink
                    href={href}
                    text={formatInTimeZone(
                      Date.parse(shipment.createdAt),
                      timeZone,
                      "MMM d, yyyy (zzz)",
                    )}
                    tdCss={{ maxWidth: 160, "@lg": { maxWidth: 230 } }}
                  />
                  <TabularDataLink
                    href={href}
                    linkCss={{ paddingRight: 0 }}
                    tdCss={{ maxWidth: 120, "@lg": { maxWidth: 250 } }}
                  >
                    <Flex align="center" justify="between" css={{ width: "100%", height: "100%" }}>
                      <StatusLabel status={ShipmentStatus[shipment.data.SHIPMENT_STATUS]} />
                      <Spacer size={8} horizontal />
                      <ActionDetailsButton tab={tab} shipmentId={shipment.id} />
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
  paddingX: "$12",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",

  "@lg": {
    paddingX: "$16",
  },
})

const TabularDataLink: React.FC<
  React.PropsWithChildren<{
    href: string
    tdCss?: CSS
    linkCss?: CSS
    text?: string
    showTitle?: boolean
  }>
> = ({ href, tdCss, linkCss, text = "", showTitle = false, children }) => {
  const navigate = useNavigate()

  return (
    <TabularData css={tdCss}>
      <SLink onClick={() => navigate(href)} css={linkCss}>
        {text ? (
          <Copy
            as="span"
            scale={{ "@initial": 10, "@lg": 8 }}
            color="system-black"
            truncate
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
}
