import { useNavigate } from "react-router-dom"
import tzlookup from "tz-lookup"
import format from "date-fns/format"
import formatInTimeZone from "date-fns-tz/formatInTimeZone"

import { mediaQueries } from "@/stitches/theme"
import { IPackaging, IPerson, ShipmentStatus, ShippingType } from "@/shared/types"
import { useMedia } from "@/shared/hooks"
import { useUpdateShipmentStatus } from "@/tracking/hooks"
import { INITIAL_READY_DATE_DEFAULT, TRACKING } from "@/constants"

import {
  AddressInfoShort,
  Box,
  Button,
  Copy,
  ErrorLabel,
  Flex,
  GridContainer,
  Hidden,
  Link,
  Spacer,
  Stack,
} from "@/shared/components"
import { IconBox, IconChevronRight, IconClock } from "@/shared/icons"
import { TrackingDetailsItem } from "@/tracking/components"

import { STrackingSection } from "@/tracking/components/TrackingContainer/TrackingContainer.styles"

interface IQuoteDetailsProps {
  sender: IPerson
  recipient: IPerson
  packaging: IPackaging
  date: Date
  shipmentStatus: ShipmentStatus | null
  shipmentId: string
  shippingType: ShippingType
}

export const QuoteDetails = ({
  sender,
  recipient,
  packaging,
  date,
  shipmentStatus,
  shipmentId,
  shippingType,
}: IQuoteDetailsProps) => {
  const navigate = useNavigate()
  const isMediumAndAbove = useMedia([mediaQueries.md], [true], false)
  const timeZone = tzlookup(
    parseFloat(sender.fullAddress.latitude),
    parseFloat(sender.fullAddress.longitude),
  )
  const isDateExpired = date < new Date(INITIAL_READY_DATE_DEFAULT)

  const { mutate: updateShipmentStatus } = useUpdateShipmentStatus()

  return (
    <GridContainer
      fullBleed={{ "@initial": false, "@sm": true }}
      css={{
        "@initial": {
          maxWidth: "100%",
          paddingBottom: "$48",
        },
        "@md": {
          maxWidth: 560,
          marginLeft: "initial",
        },
      }}
    >
      <STrackingSection>
        <Hidden below="md">
          <TrackingDetailsItem title="Main Info" main />
        </Hidden>
        <Stack space={24} dividers={isMediumAndAbove ? false : true}>
          <TrackingDetailsItem title="From where to where">
            <AddressInfoShort fromAddress={sender.fullAddress} toAddress={recipient.fullAddress} />
          </TrackingDetailsItem>

          <TrackingDetailsItem title="Pickup Date">
            <Flex align="center" css={{ color: "$theme-b-n5" }}>
              <IconClock css={{ paddingRight: "$8" }} />
              <Copy>
                {date
                  ? `${format(date, "MMM d, yyyy hh:mm aa")} ${formatInTimeZone(
                      date,
                      timeZone,
                      "(zzz)",
                    )}`
                  : ""}
              </Copy>
            </Flex>
            {isDateExpired ? (
              <Box css={{ position: "absolute" }}>
                <ErrorLabel id="pickupDateError">Ready time min value not met</ErrorLabel>
              </Box>
            ) : null}
          </TrackingDetailsItem>

          <TrackingDetailsItem title="Shipment Details">
            <Stack space={8} css={{ color: "$theme-b-n5" }}>
              <Copy>{`Pickup type: ${packaging.pickupType}`}</Copy>
              <Copy>{`Package type: ${packaging.packagingType}`}</Copy>
              <Flex align="center" justify="between">
                <Flex align="center" justify="center" css={{ gap: "$8" }}>
                  <IconBox />
                  <Copy>
                    {`${packaging.totalPackagesNumber} ${
                      packaging.totalPackagesNumber === 1 ? "package" : "packages"
                    }`}
                  </Copy>
                </Flex>
                <Link
                  as="button"
                  type="button"
                  onClick={() => navigate(`${TRACKING}/${shippingType}/${shipmentId}/packages`)}
                  fontWeight="bold"
                  css={{ "& > span": { display: "flex", alignItems: "center" } }}
                >
                  View all
                  <Spacer size={4} horizontal />
                  <IconChevronRight size="xs" css={{ paddingTop: "$2" }} />
                </Link>
              </Flex>
            </Stack>
          </TrackingDetailsItem>
        </Stack>
      </STrackingSection>
      {shipmentStatus !== ShipmentStatus.CANCELLED ? (
        <>
          <Spacer size={32} />
          <Button
            type="button"
            full
            disabled={isDateExpired}
            onClick={() => updateShipmentStatus()}
          >
            Create shipment
          </Button>
        </>
      ) : null}
    </GridContainer>
  )
}
