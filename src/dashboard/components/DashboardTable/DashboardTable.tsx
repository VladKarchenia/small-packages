import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import tzlookup from "tz-lookup"
import formatInTimeZone from "date-fns-tz/formatInTimeZone"
import { shallow } from "zustand/shallow"

import { useBoundStore } from "@/store"
import { CSS, styled } from "@/stitches/config"
import { ShipmentStatus, ShippingType } from "@/shared/types"
import { createFilterString, createSortString, spaceAndEnterKeyDown } from "@/shared/utils"
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
  Button,
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
  const navigate = useNavigate()
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
        <Flex align="center" wrap css={{ gap: "$24" }}>
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
          </Flex>
          {isFilterApplied ? (
            <Button action="text" type="button" onClick={handleResetClick}>
              Clear all filters
            </Button>
          ) : null}
        </Flex>
        <Copy color="theme-n6-n5">
          Results:
          <Copy as="span" color="theme-b-n3" css={{ paddingLeft: "$4" }}>
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
                <TableRow
                  key={shipment.id}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    spaceAndEnterKeyDown(e.key) && navigate(href)
                  }}
                  css={{
                    outline: "none",
                    keyboardFocus: {
                      backgroundColor: "$theme-n2-n7",
                    },
                  }}
                >
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
                      text={shipment.data?.ORIGIN_GEOLOC?.DISPLAY_NAME || "-"}
                      showTitle
                    />
                  )}
                  <TabularDataLink
                    href={href}
                    tdCss={{ maxWidth: 160, "@lg": { maxWidth: 200 } }}
                    linkCss={{ "@lg": { paddingRight: "$80" } }}
                    text={shipment.data?.CONSIGNEE_GEOLOC?.DISPLAY_NAME || "-"}
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
                    linkCss={{ paddingRight: "$2" }}
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
                <Copy as="span" color="theme-b-n3">
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
            scale={{ "@initial": 10, "@lg": 6 }}
            color="theme-b-n3"
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
