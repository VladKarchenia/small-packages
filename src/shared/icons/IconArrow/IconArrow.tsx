import { getIconRotation } from "../utils"

import { IIconProps, withIcon } from "../Icon"

const IconArrowImpl = withIcon(
  '<path fill="currentColor" fill-rule="evenodd" d="M4.938 12c0-.132.049-.26.137-.353a.454.454 0 0 1 .331-.146h11.056l-2.95-3.146A.518.518 0 0 1 13.374 8c0-.133.05-.26.138-.354a.455.455 0 0 1 .332-.147c.124 0 .244.053.332.147l3.75 4a.503.503 0 0 1 .137.354.528.528 0 0 1-.137.354l-3.75 4a.455.455 0 0 1-.332.146.455.455 0 0 1-.332-.146.518.518 0 0 1-.138-.354c0-.133.05-.26.138-.354l2.95-3.146H5.406a.454.454 0 0 1-.331-.147.518.518 0 0 1-.138-.353Z" clip-rule="evenodd"/>',
)

export const IconArrow = ({ direction, ...props }: IIconProps) => (
  <IconArrowImpl {...props} rotate={getIconRotation(direction)} />
)

export const IconArrowTop = (props: IIconProps) => <IconArrow {...props} direction="top" />
export const IconArrowRight = (props: IIconProps) => <IconArrow {...props} direction="right" />
export const IconArrowDown = (props: IIconProps) => <IconArrow {...props} direction="bottom" />
export const IconArrowLeft = (props: IIconProps) => <IconArrow {...props} direction="left" />
