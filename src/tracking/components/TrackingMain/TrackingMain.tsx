import { useNavigate } from "react-router-dom"

import { IPerson, ShipmentStatus } from "@/shared/types"
import { HOME } from "@/constants"

import { HeaderBar, Hidden, Spacer } from "@/shared/components"
import { TrackingHeader } from "@/tracking/components"

interface ITrackingDetailsItemProps {
  headerTitle: string
  createdAt: string
  sender: IPerson
  shipmentStatus: ShipmentStatus | null
}

export const TrackingMain: React.FC<React.PropsWithChildren<ITrackingDetailsItemProps>> = ({
  children,
  headerTitle,
  sender,
  createdAt,
  shipmentStatus,
}) => {
  const navigate = useNavigate()

  return (
    <>
      <Hidden above="sm">
        <HeaderBar
          title={headerTitle}
          onClick={() => navigate(HOME)}
          css={{ paddingRight: "$40" }}
        />
      </Hidden>
      <TrackingHeader sender={sender} createdAt={createdAt} shipmentStatus={shipmentStatus} />
      <Spacer size={{ "@initial": 16, "@sm": 24 }} />
      {children}
      <Spacer size={{ "@initial": 24, "@md": 0 }} />
    </>
  )
}
