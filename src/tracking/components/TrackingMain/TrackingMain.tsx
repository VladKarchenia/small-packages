import { useNavigate } from "react-router-dom"
import { HeaderBar, Hidden, Spacer } from "@/shared/components"
import { ShippingType } from "@/shipment"
import { ShipmentStatus } from "@/shared/types"
import { TrackingHeader } from "@/tracking"

interface ITrackingDetailsItemProps {
  headerTitle: string
  shipmentDate: Date | null
  shippingType: ShippingType | null
  status: ShipmentStatus | null
}

export const TrackingMain: React.FC<React.PropsWithChildren<ITrackingDetailsItemProps>> = ({
  children,
  headerTitle,
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
      <TrackingHeader shipmentDate={shipmentDate} shippingType={shippingType} status={status} />
      <Spacer size={{ "@initial": 16, "@sm": 24 }} />
      {children}
      <Spacer size={{ "@initial": 24, "@md": 0 }} />
    </>
  )
}
