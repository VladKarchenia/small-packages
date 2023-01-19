import { useEffect, useMemo, useState } from "react"
import { useQuery } from "react-query"

import { getAllShipmentsFn } from "@/api/shipmentApi"
import { IShipmentResponse } from "@/api/types"
import { ShippingType } from "@/shipment"
import { createFilterString, createSortString } from "@/shared/utils"
import { useModalActions } from "@/shared/hooks"
import {
  SortDirection,
  useDashboardActionContext,
  useDashboardStateContext,
} from "@/dashboard/state"

import {
  Box,
  Copy,
  CreateRoundedButton,
  Flex,
  Pill,
  Redacted,
  Spacer,
  Stack,
} from "@/shared/components"
import { IconArrowDown, IconArrowTop, IconCross } from "@/shared/icons"

import { SearchInput } from "../SearchInput"
import { ShippingCard } from "../ShippingCard"
import { ShippingCardPlaceholder } from "../ShippingCardPlaceholder"
import { SortFilterBar } from "../SortFilterBar"

export const DashboardList = () => {
  const [shipments, setShipments] = useState<IShipmentResponse[]>([])
  const { open } = useModalActions()
  const {
    sortOrder,
    direction,
    status,
    recipientName,
    originalAddress,
    destinationAddress,
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
    return <DashboardListPlaceholder isFilterApplied={isFilterApplied} />
  }

  return (
    <>
      <SearchInput />
      <SortFilterBar isFilterApplied={isFilterApplied} />
      <Spacer size={20} />
      {isFilterApplied ? (
        <>
          <Flex align="center" wrap>
            {status.length > 0 && shippingType === ShippingType.Shipment ? (
              <Pill
                suffix={<IconCross size="xs" onClick={() => resetFilterField("status")} />}
                size="small"
                css={{ marginRight: "$8", marginBottom: "$8" }}
                data-testid={"Status filter"}
              >
                Status ({status.length})
              </Pill>
            ) : null}

            {recipientName.length > 0 && shippingType === ShippingType.Shipment ? (
              <Pill
                suffix={<IconCross size="xs" onClick={() => resetFilterField("recipientName")} />}
                size="small"
                css={{ marginRight: "$8", marginBottom: "$8" }}
                data-testid={"Recipient name filter"}
              >
                Recipient name ({recipientName.length})
              </Pill>
            ) : null}

            {originalAddress.length > 0 && shippingType === ShippingType.Quote ? (
              <Pill
                suffix={<IconCross size="xs" onClick={() => resetFilterField("originalAddress")} />}
                size="small"
                css={{ marginRight: "$8", marginBottom: "$8" }}
                data-testid={"Original address filter"}
              >
                Original address ({originalAddress.length})
              </Pill>
            ) : null}

            {destinationAddress.length > 0 ? (
              <Pill
                suffix={
                  <IconCross size="xs" onClick={() => resetFilterField("destinationAddress")} />
                }
                size="small"
                css={{ marginRight: "$8", marginBottom: "$8" }}
                data-testid={"Destination address filter"}
              >
                Destination address ({destinationAddress.length})
              </Pill>
            ) : null}
          </Flex>
          <Spacer size={12} />
        </>
      ) : null}

      {!isLoading && !isFetching && shipments.length > 0 ? (
        <>
          <Flex align="center" justify="between">
            <Copy scale={9}>
              Found:
              <Copy as="span" scale={9} color="system-black" bold css={{ paddingLeft: "$4" }}>
                {shipments.length}
              </Copy>
            </Copy>
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
            {shipments.map((shipment) => (
              <ShippingCard key={shipment.id} shipment={shipment} shippingType={shippingType} />
            ))}
          </Stack>
        </>
      ) : (
        <Box css={{ height: `calc((var(--vh) * 100) - $128 - $96 - $8)`, textAlign: "center" }}>
          <Copy as="span" scale={8} color="system-black">
            {isFilterApplied
              ? "There are no issues that match your filter"
              : "There is no data yet"}
          </Copy>
          {/* <ResetYourFiltersMessage /> */}
        </Box>
      )}

      {/* {shipments.length > 0 ? (
        // {loading || data?.shipments.total > 0 ? (
        <>
          <Spacer size={24} />
          <DashboardPagination
            scroll
            paginatedTerm={"shipping"}
            loading={false}
            // loading={loading}
            total={shipments.length + 100}
            // total={data?.shipments.total}
            limit={20}
            // limit={state.limit}
            offset={0}
            // offset={state.offset}
            getNext={getNext}
            getPrevious={getPrevious}
          />
        </>
      ) : null} */}

      <CreateRoundedButton
        size="lg"
        color="black"
        iconSize="lg"
        ariaLabel="Create button"
        buttonCss={{ zIndex: "$9", position: "fixed", bottom: "$56", right: "$16" }}
        onClick={() => open("createShipment")}
      />
    </>
  )
}

const DashboardListPlaceholder = ({ isFilterApplied }: { isFilterApplied: boolean }) => (
  <>
    <Redacted height="$48" text animated />
    <Spacer size={20} />
    {isFilterApplied ? (
      <>
        <Redacted height="$32" text animated />
        <Spacer size={20} />
      </>
    ) : null}
    <Flex justify="between">
      <Redacted height="$24" width="70px" text animated />
      <Redacted height="$24" width="200px" text animated />
    </Flex>
    <Spacer size={12} />
    <Stack as="ul" space={12}>
      {Array.from(new Array(10), (_, index) => index).map((v) => (
        <ShippingCardPlaceholder key={`placeholder-row-${v}`} />
      ))}
    </Stack>
  </>
)
