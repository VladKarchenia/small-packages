import { getIconRotation } from "../utils"

import { IIconProps, withIcon } from "../Icon"

const IconLongArrowImpl = withIcon(
  '<path fill="currentColor" fill-rule="evenodd" d="M4.396 11.722H18.631L15.586 8.676C15.513 8.60148 15.4723 8.50116 15.4728 8.39683C15.4734 8.2925 15.515 8.19259 15.5888 8.11881C15.6626 8.04504 15.7625 8.00336 15.8668 8.00283C15.9712 8.00231 16.0715 8.04297 16.146 8.116L19.867 11.837C19.8856 11.8556 19.9024 11.8761 19.917 11.898L19.933 11.928C19.948 11.951 19.96 11.978 19.966 12.006L19.976 12.04C19.986 12.091 19.986 12.144 19.976 12.195L19.966 12.229C19.96 12.2572 19.9488 12.2839 19.933 12.308L19.917 12.338C19.9023 12.3596 19.8856 12.3797 19.867 12.398L16.146 16.119C16.0715 16.192 15.9712 16.2327 15.8668 16.2322C15.7625 16.2316 15.6626 16.19 15.5888 16.1162C15.515 16.0424 15.4734 15.9425 15.4728 15.8382C15.4723 15.7338 15.513 15.6335 15.586 15.559L18.631 12.514H4.396C4.29097 12.514 4.19025 12.4723 4.11599 12.398C4.04172 12.3238 4 12.223 4 12.118C4 12.013 4.04172 11.9123 4.11599 11.838C4.19025 11.7637 4.29097 11.722 4.396 11.722Z" />',
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
