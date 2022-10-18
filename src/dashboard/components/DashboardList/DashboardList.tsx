import { Box, Redacted, Spacer, Stack } from "@/shared/components"

import { BookingCard } from "../BookingCard"
import { BookingCardPlaceholder } from "../BookingCardPlaceholder"

interface IBooking {
  code: string
}

interface IDashboardListProps {
  isLoading: boolean
  bookings: IBooking[]
}

const DashboardListPlaceholder = () => (
  <>
    <Spacer size={8} />
    <Redacted height="$24" width="144px" text animated />
    <Spacer size={24} />
    <Stack as="ul" space={24} dividers outerDividers="bottom">
      {Array.from(new Array(20), (_, index) => index).map((v) => (
        <BookingCardPlaceholder key={`placeholder-row-${v}`} />
      ))}
    </Stack>
  </>
)

export const DashboardList = ({ isLoading, bookings = [] }: IDashboardListProps) => {
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
    <Stack as="ul" space={24}>
      {bookings.map((booking) => (
        <BookingCard key={booking.code} booking={booking} />
      ))}
    </Stack>
  )
}
