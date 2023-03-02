import { useNavigate } from "react-router-dom"
import tzlookup from "tz-lookup"
import format from "date-fns/format"
import formatInTimeZone from "date-fns-tz/formatInTimeZone"

import { mediaQueries } from "@/stitches/theme"
import { IPackaging, IPerson, ShipmentStatus, ShippingType } from "@/shared/types"
import { useMedia } from "@/shared/hooks"
import { useUpdateShipmentStatus } from "@/tracking/hooks"
import { TRACKING } from "@/constants"

import {
  AddressInfoShort,
  Button,
  Copy,
  Flex,
  GridContainer,
  Hidden,
  Link,
  Spacer,
  Stack,
  Title,
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
          <Title as="h3" scale={{ "@initial": 8, "@md": 7 }}>
            Main Info
          </Title>
          <Spacer size={24} />
        </Hidden>
        <Stack space={24} dividers={isMediumAndAbove ? false : true}>
          <TrackingDetailsItem
            title="From where to where"
            titleScale={{ "@initial": 11, "@md": 9 }}
          >
            <AddressInfoShort fromAddress={sender.fullAddress} toAddress={recipient.fullAddress} />
          </TrackingDetailsItem>

          <TrackingDetailsItem title="Pickup Date" titleScale={{ "@initial": 11, "@md": 9 }}>
            <Flex align="center">
              <IconClock css={{ color: "$neutrals-7", paddingRight: "$8" }} />
              <Copy scale={9} color="system-black">
                {date
                  ? `${format(date, "MMM d, yyyy hh:mm aa")} ${formatInTimeZone(
                      date,
                      timeZone,
                      "(zzz)",
                    )}`
                  : ""}
              </Copy>
            </Flex>
          </TrackingDetailsItem>

          <TrackingDetailsItem title="Shipment Details" titleScale={{ "@initial": 11, "@md": 9 }}>
            <Stack space={8}>
              <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
                {`Pickup type: ${packaging.pickupType}`}
              </Copy>
              <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
                {`Package type: ${packaging.packagingType}`}
              </Copy>
              <Flex align="center" justify="between">
                <Flex align="center" justify="center" css={{ gap: "$8" }}>
                  <IconBox css={{ color: "$neutrals-7" }} />
                  <Copy scale={{ "@initial": 9, "@md": 8 }} color="system-black">
                    {`${packaging.totalPackagesNumber} ${
                      packaging.totalPackagesNumber === 1 ? "parcel" : "parcels"
                    }`}
                  </Copy>
                </Flex>
                <Link
                  onClick={() => navigate(`${TRACKING}/${shippingType}/${shipmentId}/packages`)}
                >
                  <Copy
                    as="span"
                    scale={{ "@initial": 9, "@md": 8 }}
                    color="system-black"
                    bold
                    css={{ display: "flex", alignItems: "center" }}
                  >
                    View all
                    <Spacer size={4} horizontal />
                    <IconChevronRight size="xs" css={{ paddingTop: "$2" }} />
                  </Copy>
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
            // TODO: disabled conditions?
            // disabled={
            //   (shippingType === ShippingType.Quote && !date) ||
            //   (shippingType === ShippingType.Shipment && !rate.name)
            // }

            onClick={() => updateShipmentStatus()}
          >
            <Copy as="span" scale={8} color="system-white" bold>
              Create a shipment
            </Copy>
          </Button>
        </>
      ) : null}
    </GridContainer>
  )
}
