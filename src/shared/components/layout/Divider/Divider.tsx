import { ComponentProps } from "@/stitches/types"

import { SDivider } from "./Divider.styles"

export interface IDividerProps extends ComponentProps<typeof SDivider> {}

export const Divider = ({ ...props }: IDividerProps) => {
  return <SDivider {...props}></SDivider>
}
