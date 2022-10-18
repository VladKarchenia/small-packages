import { Box, Divider, Flex, Spacer } from "@/shared/components"

interface IBooking {
  code: string
}

export const BookingCard = ({ booking }: { booking: IBooking }) => {
  const { code } = booking

  return (
    <>
      <Flex direction="column">
        <Flex align="start" justify="between">
          <Box>{code}</Box>
          <Spacer size={16} horizontal />
          <Box>Hello</Box>
        </Flex>
        <Box as="span">
          <Flex align="end" justify="between" css={{ marginTop: "$16" }}>
            <Flex direction="column" css={{ marginRight: "$16" }}>
              <Box>11</Box>
              <Box>22</Box>
            </Flex>
            <Box>33</Box>
          </Flex>
        </Box>
      </Flex>
      <Spacer size={24} />
      <Divider />
    </>
  )
}
