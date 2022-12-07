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
  Tooltip,
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
        (!!status || !!recipientName || destinationAddress)) ||
        (shippingType === ShippingType.Quote && (!!originalAddress || destinationAddress)),
    )
  }, [shippingType, status, recipientName, originalAddress, destinationAddress])

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
              onClick={() => console.log("Clear all filters")}
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
                <TabularDataLink href={"/tracking"}>{booking?.id}</TabularDataLink>
                {shippingType === ShippingType.Shipment ? (
                  <>
                    <TabularDataLink href={"/tracking"}>{booking?.sender?.name}</TabularDataLink>
                    <TabularDataLink href={"/tracking"}>{booking?.recipient?.name}</TabularDataLink>
                  </>
                ) : (
                  <TabularDataLink
                    href={"/tracking"}
                    tdCss={{ maxWidth: 200 }}
                    linkCss={{ "@lg": { paddingRight: "$80" } }}
                  >
                    {booking?.sender?.fullAddress?.location}
                  </TabularDataLink>
                )}
                <TabularDataLink
                  href={"/tracking"}
                  tdCss={{ maxWidth: 200 }}
                  linkCss={{ "@lg": { paddingRight: "$80" } }}
                >
                  {/* <Tooltip
                    trigger="hover"
                    tooltip={<Copy>{booking?.recipient?.fullAddress?.location}</Copy>}
                    ariaLabel={booking?.recipient?.fullAddress?.location}
                  >
                    {booking?.recipient?.fullAddress?.location}
                  </Tooltip> */}
                  {booking?.recipient?.fullAddress?.location}
                </TabularDataLink>
                <TabularDataLink href={"/tracking"}>{booking?.creationDate}</TabularDataLink>
                <TabularDataLink href={"/tracking"} linkCss={{ paddingRight: "$0" }} text={false}>
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
  React.PropsWithChildren<{ href: string; tdCss?: CSS; linkCss?: CSS; text?: boolean }>
> = ({ href, tdCss, linkCss, text = true, children }) => (
  <TabularData css={tdCss}>
    <SLink href={href} css={linkCss}>
      {text ? (
        <Copy
          as="span"
          scale={8}
          color="system-black"
          css={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}
        >
          {children}
        </Copy>
      ) : (
        children
      )}
    </SLink>
  </TabularData>
)
