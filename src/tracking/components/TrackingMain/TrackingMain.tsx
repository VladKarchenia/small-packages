import { useNavigate } from "react-router-dom"
import { HeaderBar, Hidden, Spacer } from "@/shared/components"
import { ShippingType } from "@/shipment"
import { ShipmentStatus } from "@/shared/types"
import { TrackingHeader } from "@/tracking"

interface ITrackingDetailsItemProps {
  headerTitle: string
  shipmentID: string
  shipmentDate: Date | null
  shippingType: ShippingType
  status: ShipmentStatus
}

export const TrackingMain: React.FC<React.PropsWithChildren<ITrackingDetailsItemProps>> = ({
  children,
  headerTitle,
  shipmentID,
  shipmentDate,
  shippingType,
  status,
}) => {
  const navigate = useNavigate()

  return (
    <>
      <Hidden above="sm">
        <HeaderBar title={headerTitle} onClick={() => navigate("/")} />
      </Hidden>
      <TrackingHeader
        shipmentID={shipmentID}
        shipmentDate={shipmentDate}
        shippingType={shippingType as ShippingType}
        status={status}
      />
      <Spacer size={{ "@initial": 16, "@sm": 24 }} />
      {children}
      <Spacer size={{ "@initial": 24, "@sm": 0 }} />
    </>
  )
}
