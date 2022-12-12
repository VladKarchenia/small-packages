import { useMemo } from "react"
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

interface ITableProps {
  isLoading: boolean
  bookings: any[]
  shippingType: ShippingType
}

export const DashboardTable = ({ isLoading, bookings = [], shippingType }: ITableProps) => {
  const { t } = useTranslation()
  const { status, recipientName, originalAddress, destinationAddress } = useDashboardStateContext()
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

  if (isLoading) {
    return <DashboardTablePlaceholder shippingType={shippingType} />
  }

  if (!isLoading && !bookings.length) {
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
            12/{bookings.length}
          </Copy>
        </Flex>
      </Flex>

      <Table caption="Dashboard table">
        <DashboardTableHead shippingType={shippingType} />
        <TableBody>
          {bookings.map((booking) => {
            return (
              <TableRow key={booking?.id}>
                <TabularDataLink href={"/tracking"} text={booking?.id} />
                {shippingType === ShippingType.Shipment ? (
                  <>
                    <TabularDataLink href={"/tracking"} text={booking?.sender?.name} />
                    <TabularDataLink href={"/tracking"} text={booking?.recipient?.name} />
                  </>
                ) : (
                  <TabularDataLink
                    href={"/tracking"}
                    tdCss={{ maxWidth: 200 }}
                    linkCss={{ "@lg": { paddingRight: "$80" } }}
                    text={booking?.sender?.fullAddress?.location}
                    showTitle
                  />
                )}
                <TabularDataLink
                  href={"/tracking"}
                  tdCss={{ maxWidth: 200 }}
                  linkCss={{ "@lg": { paddingRight: "$80" } }}
                  text={booking?.recipient?.fullAddress?.location}
                  showTitle
                />
                <TabularDataLink href={"/tracking"} text={booking?.creationDate} />
                <TabularDataLink href={"/tracking"} linkCss={{ paddingRight: "$0" }}>
                  <Flex align="center" justify="between" css={{ width: "100%" }}>
                    <StatusLabel status={booking?.status} />
                    <Spacer size={8} horizontal />
                    <ActionDetailsButton shippingType={shippingType} />
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
