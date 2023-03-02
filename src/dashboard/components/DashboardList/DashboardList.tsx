import { useMemo } from "react"
import { shallow } from "zustand/shallow"

import { useBoundStore } from "@/store"
import { ShippingType } from "@/shared/types"
import { createFilterString, createSortString } from "@/shared/utils"
import { useModalActions } from "@/shared/hooks"
import {
  SortDirection,
  useDashboardActionContext,
  useDashboardStateContext,
} from "@/dashboard/state"
import { useAllShipments } from "@/dashboard/hooks"

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
import { IconLongArrowDown, IconLongArrowTop, IconCross } from "@/shared/icons"
import {
  SearchInput,
  ShippingCard,
  ShippingCardPlaceholder,
  SortFilterBar,
} from "@/dashboard/components"

export const DashboardList = () => {
  const { open } = useModalActions()
  const [shippingType, tab] = useBoundStore((state) => [state.shippingType, state.tab], shallow)
  const { sortOrder, direction, status, recipientName, originalAddress, destinationAddress } =
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

  const { isLoading, data } = useAllShipments({
    type: tab,
    filter: createFilterString(tab, status, recipientName, originalAddress, destinationAddress),
    sort: `${createSortString(sortOrder)},${direction}`,
  })

  const shipments = useMemo(() => (data ? data : []), [data])

  if (isLoading) {
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
            {status.length > 0 && tab === ShippingType.Shipment ? (
              <Pill
                suffix={<IconCross onClick={() => resetFilterField("status")} />}
                size="medium"
                css={{ marginRight: "$8", marginBottom: "$8" }}
                data-testid="status-filter"
              >
                Status ({status.length})
              </Pill>
            ) : null}

            {recipientName.length > 0 && tab === ShippingType.Shipment ? (
              <Pill
                suffix={<IconCross onClick={() => resetFilterField("recipientName")} />}
                size="medium"
                css={{ marginRight: "$8", marginBottom: "$8" }}
                data-testid="recipient-name-filter"
              >
                Recipient name ({recipientName.length})
              </Pill>
            ) : null}

            {originalAddress.length > 0 && tab === ShippingType.Quote ? (
              <Pill
                suffix={<IconCross onClick={() => resetFilterField("originalAddress")} />}
                size="medium"
                css={{ marginRight: "$8", marginBottom: "$8" }}
                data-testid="original-address-filter"
              >
                Original address ({originalAddress.length})
              </Pill>
            ) : null}

            {destinationAddress.length > 0 ? (
              <Pill
                suffix={<IconCross onClick={() => resetFilterField("destinationAddress")} />}
                size="medium"
                css={{ marginRight: "$8", marginBottom: "$8" }}
                data-testid="destination-address-filter"
              >
                Destination address ({destinationAddress.length})
              </Pill>
            ) : null}
          </Flex>
          <Spacer size={12} />
        </>
      ) : null}

      {!isLoading && shipments.length > 0 ? (
        <>
          <Flex align="center" justify="between">
            <Copy scale={9}>
              Found:
              <Copy as="span" scale={9} color="system-black" bold css={{ paddingLeft: "$4" }}>
                {shipments.length}
              </Copy>
            </Copy>
            <Flex align="center">
              {direction === SortDirection.ASC ? <IconLongArrowDown /> : <IconLongArrowTop />}
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
              <ShippingCard
                key={shipment.id}
                shipment={shipment}
                tab={tab}
                shippingType={shippingType}
              />
            ))}
          </Stack>
        </>
      ) : (
        <Box css={{ textAlign: "center" }}>
          <Copy as="span" scale={8} color="system-black">
            {isFilterApplied
              ? "There are no issues that match your filter"
              : "There is no data yet"}
          </Copy>
        </Box>
      )}

      <CreateRoundedButton
        size="lg"
        color="black"
        iconSize="md"
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
      <Redacted height="$24" width="$80" text animated />
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
