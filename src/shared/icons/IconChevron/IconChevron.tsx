import { getIconRotation } from "../utils";

import { IIconProps, withIcon } from "../Icon";

const IconChevronImpl = withIcon(
  '<path fill="currentColor" fill-rule="evenodd" d="M16.446 12a.64.64 0 0 0-.174-.456l-7.522-7.3-.503.912L15.3 12l-7.053 6.844.503.911 7.522-7.3a.64.64 0 0 0 .174-.455Z" clip-rule="evenodd"/>'
);

export const IconChevron = ({ direction, ...props }: IIconProps) => (
  <IconChevronImpl {...props} rotate={getIconRotation(direction)} />
);

export const IconChevronTop = (props: IIconProps) => <IconChevron {...props} direction="top" />;
export const IconChevronRight = (props: IIconProps) => <IconChevron {...props} direction="right" />;
export const IconChevronDown = (props: IIconProps) => <IconChevron {...props} direction="bottom" />;
export const IconChevronLeft = (props: IIconProps) => <IconChevron {...props} direction="left" />;
