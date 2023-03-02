import { getIconRotation } from "../utils"

import { IIconProps, withIcon } from "../Icon"

const IconChevronImpl = withIcon(
  '<path fill="currentColor" d="M10.17 5a1 1 0 0 1 .78.37l4.83 6a1 1 0 0 1 0 1.27l-5 6a1.001 1.001 0 0 1-1.54-1.28L13.71 12 9.39 6.64A1 1 0 0 1 10.17 5Z"/>',
)

export const IconChevron = ({ direction, ...props }: IIconProps) => (
  <IconChevronImpl {...props} rotate={getIconRotation(direction)} />
)

export const IconChevronTop = (props: IIconProps) => <IconChevron {...props} direction="top" />
export const IconChevronRight = (props: IIconProps) => <IconChevron {...props} direction="right" />
export const IconChevronDown = (props: IIconProps) => <IconChevron {...props} direction="bottom" />
export const IconChevronLeft = (props: IIconProps) => <IconChevron {...props} direction="left" />
