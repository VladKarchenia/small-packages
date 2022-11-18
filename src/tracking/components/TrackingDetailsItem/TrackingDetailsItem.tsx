import { Spaces } from "@/config/theme/spacing"
import { Copy, Spacer } from "@/shared/components"

interface ITrackingDetailsItemProps {
  title: string
  titleIndent?: Spaces
}

export const TrackingDetailsItem: React.FC<React.PropsWithChildren<ITrackingDetailsItemProps>> = ({
  children,
  title,
  titleIndent = 16,
}) => {
  return (
    <>
      <Copy scale={10} color="neutrals-7" bold>
        {title}
      </Copy>
      <Spacer size={titleIndent} />
      {children}
    </>
  )
}
