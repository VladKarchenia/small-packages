import { IIconProps, withIcon } from "../Icon/Icon"

const More = withIcon(
  '<path d="M0 2a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM0 10a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM0 18a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z" />',
)

export const IconMore = (props: IIconProps) => (
  <More dimensions={{ width: 4, height: 20 }} {...props} />
)
