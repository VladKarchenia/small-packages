import React from "react"

import { ITooltipProps, Tooltip } from "@/shared/components"

interface IIconTooltipProps extends ITooltipProps {
  icon: React.ReactNode
}

export const IconTooltip = ({ icon, ...props }: IIconTooltipProps) => {
  return <Tooltip {...props}>{icon}</Tooltip>
}
