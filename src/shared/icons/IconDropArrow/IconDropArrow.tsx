import { getIconRotation } from "../utils"

import { IIconProps, withIcon } from "../Icon"

const IconDropArrowImpl = withIcon(
  '<path fill="currentColor" d="M8.768 16.943a.501.501 0 0 0 .516-.032l6.5-4.5a.5.5 0 0 0 0-.822l-6.5-4.5a.5.5 0 0 0-.784.41v9a.5.5 0 0 0 .268.444Z"/>',
)

export const IconDropArrow = ({ direction, ...props }: IIconProps) => (
  <IconDropArrowImpl {...props} rotate={getIconRotation(direction)} />
)

export const IconDropArrowTop = (props: IIconProps) => <IconDropArrow {...props} direction="top" />
export const IconDropArrowRight = (props: IIconProps) => (
  <IconDropArrow {...props} direction="right" />
)
export const IconDropArrowDown = (props: IIconProps) => (
  <IconDropArrow {...props} direction="bottom" />
)
export const IconDropArrowLeft = (props: IIconProps) => (
  <IconDropArrow {...props} direction="left" />
)
