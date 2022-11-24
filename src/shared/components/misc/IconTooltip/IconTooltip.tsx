import React from "react"
import { ITooltipProps, Tooltip } from "@/shared/components"
import { SIconTooltip } from "./IconTooltip.styles"

export interface IIconTooltipProps extends Omit<ITooltipProps, "children"> {
  children?: React.ReactNode
}

export const IconTooltip = (props: IIconTooltipProps) => {
  return <Tooltip {...props}>{props.children ? props.children : <SIconTooltip />}</Tooltip>
}
