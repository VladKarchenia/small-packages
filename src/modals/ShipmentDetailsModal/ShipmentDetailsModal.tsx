import { Copy, Grid, GridItem, Stack, Title, Divider } from "@/shared/components"
import { useModal } from "@/shared/hooks"
import { useShipmentStateContext } from "@/shared/state"
import { ParcelInfo } from "@/shared/components/app"
import { GeneralModal } from "../GeneralModal"

export const ShipmentDetailsModal = () => {
  const [shipmentDetails] = useModal("shipmentDetails")
  const { parcels } = useShipmentStateContext()

  return (
    <GeneralModal {...shipmentDetails}>
      <Stack space={16} css={{ paddingX: "$40" }}>
        <Stack space={8}>
          <Title as="h3" scale={6}>
            Shipment Details
          </Title>
        </Stack>
        <Grid columns={"1fr 1fr "} gap={32}>
          {parcels.map((parcel, index) => (
            <Stack space={2} key={index}>
              <GridItem>
                <Copy scale={{ "@initial": 9, "@sm": 8 }} color="system-black" bold>
                  Parcel {index + 1}
                </Copy>
                <Divider css={{ marginBottom: "$16" }} />
                <ParcelInfo parcel={parcel} />
              </GridItem>
            </Stack>
          ))}
        </Grid>
      </Stack>
    </GeneralModal>
  )
}
