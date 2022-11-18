import { Box, Copy, Flex, Redacted, Spacer, Stack } from "@/shared/components"
import { IconArrowDown } from "@/shared/icons"
import { ShippingType } from "@/shipment"

import { DashboardPagination } from "../DashboardPagination"
import { SearchInput } from "../SearchInput"
import { ShippingCard } from "../ShippingCard"
import { ShippingCardPlaceholder } from "../ShippingCardPlaceholder"

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
        initialValue={""}
        // onChange={(destination) => {
        //   setValue("sender.fullAddress", destination)
        // }}
        placeholder="Search for ID, address..."
      />
      <Spacer size={20} />
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
          <IconArrowDown size="xs" />
          <Copy scale={9} css={{ paddingX: "$4" }}>
            Sort by:
          </Copy>
          <Copy scale={9} color="system-black" bold>
            creation date
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
