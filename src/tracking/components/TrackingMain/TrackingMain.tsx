import { useNavigate } from "react-router-dom"
import { HeaderBar, Hidden, Spacer } from "@/shared/components"
import { TrackingHeader } from "@/tracking"

interface ITrackingDetailsItemProps {
  headerTitle: string
  shipmentDate: Date | null
}

export const TrackingMain: React.FC<React.PropsWithChildren<ITrackingDetailsItemProps>> = ({
  children,
  headerTitle,
  shipmentDate,
}) => {
  const navigate = useNavigate()

  return (
    <>
      <Hidden above="sm">
        <HeaderBar
          title={headerTitle}
          onClick={() => navigate("/")}
          css={{ paddingRight: "$40" }}
        />
      </Hidden>
      <TrackingHeader shipmentDate={shipmentDate} />
      <Spacer size={{ "@initial": 16, "@sm": 24 }} />
      {children}
      <Spacer size={{ "@initial": 24, "@md": 0 }} />
    </>
  )
}
