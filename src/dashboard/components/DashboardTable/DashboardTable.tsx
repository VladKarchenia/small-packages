import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
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
import { ShippingType } from "@/shipment"
import { useDashboardActionContext, useDashboardStateContext } from "@/dashboard/state"
import { DashboardTableHead } from "./DashboardTableHead"
import { DashboardTablePlaceholder } from "./DashboardTablePlaceholder"
import { ActionDetailsButton } from "../ActionDetailsButton"
import { CSS, styled } from "@/config"
import { DashboardTableStatusFilter } from "../DashboardTableStatusFilter"
import { DashboardTableNameFilter } from "../DashboardTableNameFilter"
import { DashboardTableOriginAddressFilter } from "../DashboardTableOriginAddressFilter"
import { DashboardTableDestinationAddressFilter } from "../DashboardTableDestinationAddressFilter"
import { IShipmentResponse } from "@/api/types"
import { useQuery } from "react-query"
import { getAllShipmentsFn } from "@/api/shipmentApi"
import { createFilterString, createSortString } from "@/shared/utils"
import format from "date-fns/format"
import { ShipmentStatus } from "@/shared/types"

interface ITableProps {
  shippingType: ShippingType
}

export const DashboardTable = ({ shippingType }: ITableProps) => {
  const { t } = useTranslation()
  const [shipments, setShipments] = useState<IShipmentResponse[]>([])
  const { status, recipientName, originalAddress, destinationAddress, sortOrder, direction } =
    useDashboardStateContext()
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

  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const { isLoading, isFetching, refetch } = useQuery(
    // TODO: check how not to call this all the time!
    ["getShipments"],
    () =>
      getAllShipmentsFn({
        organizationId: user?.activeOrganizationId,
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
        setShipments(data.content)
        // maybe we also need to set shipments into zustand as a cache?
        // return setShipmentContext(formatShipmentResponseData(shipment.data))
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
    return <DashboardTablePlaceholder shippingType={shippingType} />
  }

  if (!isLoading && !isFetching && !shipments.length) {
    return (
      <Table caption="Dashboard table">
        <DashboardTableHead shippingType={shippingType} />
        <TableBody>
          <TableRow>
            <TabularData
              colSpan={5}
              css={{
                padding: "$0",
                borderBottom: "1px solid $neutrals-0",
                firstChild: { padding: "$0" },
                height: `calc((var(--vh) * 100) - $192 - $128 - $48)`,
              }}
            >
              Empty
              {/* <ResetYourFiltersMessage /> */}
            </TabularData>
          </TableRow>
        </TableBody>
      </Table>
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
        <Spacer size={24} horizontal />
        <Flex align="center">
          <Copy scale={9} css={{ paddingRight: "$4" }}>
            Found:
          </Copy>
          <Copy scale={9} color="system-black" bold>
            12/{shipments.length}
          </Copy>
        </Flex>
      </Flex>

      <Table caption="Dashboard table">
        <DashboardTableHead shippingType={shippingType} />
        <TableBody>
          {shipments.map((shipment) => {
            const href = `/tracking/${shipment.id}`

            return (
              <TableRow key={shipment?.id}>
                <TabularDataLink href={href} text={shipment?.id} />
                {shippingType === ShippingType.Shipment ? (
                  <>
                    {/* <TabularDataLink href={href} text={shipment?.sender?.name} />
                    <TabularDataLink href={href} text={shipment?.recipient?.name} /> */}
                    <TabularDataLink href={href} text={shipment?.data.ORIGIN_CONTACT || "-"} />
                    <TabularDataLink href={href} text={shipment?.data.CONSIGNEE_CONTACT || "-"} />
                  </>
                ) : (
                  <TabularDataLink
                    href={href}
                    tdCss={{ maxWidth: 200 }}
                    linkCss={{ "@lg": { paddingRight: "$80" } }}
                    // text={shipment?.sender?.fullAddress?.displayName}
                    text={shipment?.data.ORIGIN_ADDRESS1 || "-"}
                    showTitle
                  />
                )}
                <TabularDataLink
                  href={href}
                  tdCss={{ maxWidth: 200 }}
                  linkCss={{ "@lg": { paddingRight: "$80" } }}
                  // text={shipment?.recipient?.fullAddress?.displayName}
                  text={shipment?.data.CONSIGNEE_ADDRESS1 || "-"}
                  showTitle
                />
                {/* <TabularDataLink href={href} text={shipment?.creationDate} /> */}
                <TabularDataLink
                  href={href}
                  text={format(new Date(shipment?.createdAt), "MMM d, yyyy")}
                />
                <TabularDataLink href={href} linkCss={{ paddingRight: "$0" }}>
                  <Flex align="center" justify="between" css={{ width: "100%" }}>
                    <StatusLabel status={ShipmentStatus[shipment?.data.SHIPMENT_STATUS]} />
                    <Spacer size={8} horizontal />
                    <ActionDetailsButton shippingType={shippingType} shipmentId={shipment.id} />
                  </Flex>
                </TabularDataLink>
              </TableRow>
            )
          })}
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
