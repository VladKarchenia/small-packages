import { getIconRotation } from "../utils"

import { IIconProps, withIcon } from "../Icon"

const More = withIcon(
  '<path fill="currentColor" d="M4 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM20 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>',
)

export const IconMore = ({ direction, ...props }: IIconProps) => (
  <More {...props} rotate={getIconRotation(direction)} />
)

export const IconMoreVertical = (props: IIconProps) => <IconMore {...props} direction="top" />
export const IconMoreHorizontal = (props: IIconProps) => <IconMore {...props} direction="right" />
