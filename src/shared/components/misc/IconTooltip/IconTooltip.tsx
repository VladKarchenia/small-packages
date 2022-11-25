import React from "react"
import { ITooltipProps, Tooltip } from "@/shared/components"
import { SIconTooltip } from "./IconTooltip.styles"

interface IIconTooltipProps extends ITooltipProps {
  icon?: React.ReactNode
}

export const IconTooltip = ({ icon, ...props }: IIconTooltipProps) => {
  return <Tooltip {...props}>{icon ? icon : <SIconTooltip />}</Tooltip>
}
