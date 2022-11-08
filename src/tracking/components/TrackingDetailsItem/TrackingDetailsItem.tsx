import { ReactNode } from "react"
import { Copy, Spacer } from "@/shared/components"
import { Spaces } from "@/config/theme/spacing"


export const TrackingDetailsItem = ({title, titleIndent=16, children}: {title: string, titleIndent?: Spaces,  children?: ReactNode[] | ReactNode | null}) => {
  return(
    <>
      <Copy scale={10}  color="neutrals-7" bold>{title}</Copy>
      <Spacer size={titleIndent}/>
      {children}
    </>
  )
}
