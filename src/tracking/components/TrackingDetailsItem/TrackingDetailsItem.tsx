import { Spaces } from "@/config/theme/spacing"
import { Copy, Spacer, TypographyScale } from "@/shared/components"
import { Colors } from "@/config/theme/types"
import { ResponsiveProp } from "@/utils"

interface ITrackingDetailsItemProps {
  title: string
  titleIndent?: Spaces
  titleColor?: Colors | ResponsiveProp<Colors>
  titleScale?: TypographyScale | ResponsiveProp<TypographyScale>
}

export const TrackingDetailsItem: React.FC<React.PropsWithChildren<ITrackingDetailsItemProps>> = ({
  children,
  title,
  titleIndent = 16,
  titleColor = "neutrals-7",
  titleScale = 9,
}) => {
  return (
    <>
      <Copy scale={titleScale} color={titleColor} bold>
        {title}
      </Copy>
      <Spacer size={titleIndent} />
      {children}
    </>
  )
}
