import { useEffect, useMemo, useState } from "react"
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
import { ShippingType } from "@/shipment"
import { useModalActions } from "@/shared/hooks"
import { DashboardPagination } from "../DashboardPagination"
import { SearchInput } from "../SearchInput"
import { ShippingCard } from "../ShippingCard"
import { ShippingCardPlaceholder } from "../ShippingCardPlaceholder"
import { SortFilterBar } from "../SortFilterBar"
import { useQuery } from "react-query"
import { getAllShipmentsFn } from "@/api/shipmentApi"
import { IShipmentResponse } from "@/api/types"
import { createFilterString, createSortString } from "@/shared/utils"

interface IDashboardListProps {
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

export const DashboardList = ({ shippingType }: IDashboardListProps) => {
  const [shipments, setShipments] = useState<IShipmentResponse[]>([])
  const { open } = useModalActions()
  const { sortOrder, direction, status, recipientName, originalAddress, destinationAddress } =
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

  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const { isLoading, isFetching, refetch } = useQuery(
    // TODO: check how not to call this all the time!
    ["getShipments"],
    () =>
      getAllShipmentsFn({
        organizationId: user?.activeOrganizationId,
        // TODO: sort and filters should be placed also in zustand and be used here
        filter: createFilterString(shippingType, status, recipientName, originalAddress, destinationAddress),
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
    return <DashboardListPlaceholder />
  }

  if (!isLoading && !isFetching && !shipments.length) {
    return (
      <Box css={{ height: `calc((var(--vh) * 100) - $128 - $96)`, paddingTop: "$80" }}>
        Empty
        {/* <ResetYourFiltersMessage /> */}
      </Box>
    )
  }

  return (
    <>
      <SearchInput shippingType={shippingType} />
      <SortFilterBar isFilterApplied={isFilterApplied} shippingType={shippingType} />
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

      <Flex align="center" justify="between">
        <Flex align="center">
          <Copy scale={9} css={{ paddingRight: "$4" }}>
            Found:
          </Copy>
          <Copy scale={9} color="system-black" bold>
            12/{shipments.length}
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
        {shipments.map((shipment) => (
          <ShippingCard key={shipment?.id} shipment={shipment} shippingType={shippingType} />
        ))}
      </Stack>
      {shipments.length > 0 ? (
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
            getNext={() => console.log("getNext")}
            // getNext={getNext}
            getPrevious={() => console.log("getPrevious")}
            // getPrevious={getPrevious}
          />
        </>
      ) : null}

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
