import { ComponentProps } from "@/utils/types";

import { SIconDots } from "./IconDots.styles";

export interface IIconDotsProps extends ComponentProps<typeof SIconDots> {}

export const IconDots = ({ size = "sm", ...props }: IIconDotsProps) => (
  <SIconDots size={size} {...props}>
    <span />
  </SIconDots>
);
