import { getIconRotation } from "../utils"

import { IIconProps, withIcon } from "../Icon"

const IconArrowImpl = withIcon(
  '<path fill-rule="evenodd" clip-rule="evenodd" d="M14 4.93934L20.5303 11.4697C20.8232 11.7626 20.8232 12.2374 20.5303 12.5303L14 19.0607L12.9393 18L18.1893 12.75H3.25V11.25H18.1893L12.9393 6L14 4.93934Z" fill="currentColor"/>',
)

export const IconArrow = ({ direction, ...props }: IIconProps) => (
  <IconArrowImpl {...props} rotate={getIconRotation(direction)} />
)

export const IconArrowTop = (props: IIconProps) => <IconArrow {...props} direction="top" />
export const IconArrowRight = (props: IIconProps) => <IconArrow {...props} direction="right" />
export const IconArrowDown = (props: IIconProps) => <IconArrow {...props} direction="bottom" />
export const IconArrowLeft = (props: IIconProps) => <IconArrow {...props} direction="left" />
