import { useMemo } from "react"
import {
  SortDirection,
  useDashboardActionContext,
  useDashboardStateContext,
} from "@/dashboard/state"
import { Box, Copy, Flex, Pill, Redacted, Spacer, Stack } from "@/shared/components"
import { IconArrowDown, IconArrowTop, IconCross } from "@/shared/icons"
import { ShippingType } from "@/shipment"

import { DashboardPagination } from "../DashboardPagination"
import { SearchInput } from "../SearchInput"
import { ShippingCard } from "../ShippingCard"
import { ShippingCardPlaceholder } from "../ShippingCardPlaceholder"
import { SortFilterBar } from "../SortFilterBar"

interface IShipping {
  code: string
}

interface IDashboardListProps {
  isLoading: boolean
  bookings: IShipping[]
  shippingType: ShippingType
}

const DashboardListPlaceholder = () => (
  <>
    <Spacer size={8} />
    <Redacted height="$24" width="144px" text animated />
    <Spacer size={24} />
    <Stack as="ul" space={24} dividers outerDividers="bottom">
      {Array.from(new Array(20), (_, index) => index).map((v) => (
        <ShippingCardPlaceholder key={`placeholder-row-${v}`} />
      ))}
    </Stack>
  </>
)

export const DashboardList = ({ isLoading, bookings = [], shippingType }: IDashboardListProps) => {
  const { sortOrder, direction, status, recipientName, originalAddress, destinationAddress } =
    useDashboardStateContext()
  const { resetFilterField } = useDashboardActionContext()
  const isFilterApplied = useMemo<boolean>(() => {
    return Boolean(
      (shippingType === ShippingType.Shipment &&
        (!!status || !!recipientName || destinationAddress)) ||
        (shippingType === ShippingType.Quote && (!!originalAddress || destinationAddress)),
    )
  }, [shippingType, status, recipientName, originalAddress, destinationAddress])

  if (isLoading) {
    return <DashboardListPlaceholder />
  }

  if (!isLoading && !bookings.length) {
    return (
      <Box css={{ height: `calc((var(--vh) * 100) - $128 - $96)`, paddingTop: "$80" }}>
        Empty
        {/* <ResetYourFiltersMessage /> */}
      </Box>
    )
  }

  return (
    <>
      <SearchInput
        placeholder={
          shippingType === ShippingType.Quote
            ? "Search for ID, address..."
            : "Search for ID, tracking number, address..."
        }
      />
      <SortFilterBar isFilterApplied={isFilterApplied} shippingType={shippingType} />
      <Spacer size={20} />
      {isFilterApplied ? (
        <>
          <Flex align="center" wrap>
            {status && shippingType === ShippingType.Shipment ? (
              <Pill
                suffix={<IconCross size="xs" onClick={() => resetFilterField("status")} />}
                size="small"
                css={{ marginRight: "$8", marginBottom: "$8" }}
                data-testid={"Status filter"}
              >
                {/* TODO: add number of results or what? */}
                Status (3)
              </Pill>
            ) : null}

            {recipientName && shippingType === ShippingType.Shipment ? (
              <Pill
                suffix={<IconCross size="xs" onClick={() => resetFilterField("recipientName")} />}
                size="small"
                css={{ marginRight: "$8", marginBottom: "$8" }}
                data-testid={"Recipient name filter"}
              >
                {/* TODO: add number of results or what? */}
                Recipient name (10)
              </Pill>
            ) : null}

            {originalAddress && shippingType === ShippingType.Quote ? (
              <Pill
                suffix={<IconCross size="xs" onClick={() => resetFilterField("originalAddress")} />}
                size="small"
                css={{ marginRight: "$8", marginBottom: "$8" }}
                data-testid={"Original address filter"}
              >
                {/* TODO: add number of results or what? */}
                Original address (12)
              </Pill>
            ) : null}

            {destinationAddress ? (
              <Pill
                suffix={
                  <IconCross size="xs" onClick={() => resetFilterField("destinationAddress")} />
                }
                size="small"
                css={{ marginRight: "$8", marginBottom: "$8" }}
                data-testid={"Destination address filter"}
              >
                {/* TODO: add number of results or what? */}
                Destination address (15)
              </Pill>
            ) : null}
          </Flex>
          <Spacer size={12} />
        </>
      ) : null}

      <Flex align="center" justify="between">
        <Flex align="center">
          <Copy scale={9} css={{ paddingRight: "$4" }}>
            Found:
          </Copy>
          <Copy scale={9} color="system-black" bold>
            12/{bookings.length}
          </Copy>
        </Flex>
        <Flex align="center">
          {direction === SortDirection.ASC ? (
            <IconArrowDown size="xs" />
          ) : (
            <IconArrowTop size="xs" />
          )}
          <Copy scale={9} css={{ paddingX: "$4" }}>
            Sort by:
          </Copy>
          <Copy scale={9} color="system-black" bold>
            {sortOrder}
          </Copy>
        </Flex>
      </Flex>
      <Spacer size={12} />
      <Stack as="ul" space={12}>
        {bookings.map((booking) => (
          <ShippingCard key={booking.code} booking={booking} shippingType={shippingType} />
        ))}
      </Stack>
      {bookings.length > 0 ? (
        // {loading || data?.bookings.total > 0 ? (
        <>
          <Spacer size={24} />
          <DashboardPagination
            scroll
            paginatedTerm={"shipping"}
            loading={false}
            // loading={loading}
            total={bookings.length + 100}
            // total={data?.bookings.total}
            limit={20}
            // limit={state.limit}
            offset={0}
            // offset={state.offset}
            getNext={() => console.log("getNext")}
            // getNext={getNext}
            getPrevious={() => console.log("getPrevious")}
            // getPrevious={getPrevious}
          />
        </>
      ) : null}
    </>
  )
}
