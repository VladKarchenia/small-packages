import { getIconRotation } from "../utils"

import { IIconProps, withIcon } from "../Icon"

const IconLongArrowImpl = withIcon(
  '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 12H6m12 0-2.667 2.5M18 12l-2.667-2.5"/>',
)

export const IconLongArrow = ({ direction, ...props }: IIconProps) => (
  <IconLongArrowImpl {...props} rotate={getIconRotation(direction)} />
)

export const IconLongArrowTop = (props: IIconProps) => <IconLongArrow {...props} direction="top" />
export const IconLongArrowRight = (props: IIconProps) => (
  <IconLongArrow {...props} direction="right" />
)
export const IconLongArrowDown = (props: IIconProps) => (
  <IconLongArrow {...props} direction="bottom" />
)
export const IconLongArrowLeft = (props: IIconProps) => (
  <IconLongArrow {...props} direction="left" />
)
