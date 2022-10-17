import { ComponentProps } from "@/utils"

import { SDivider } from "./Divider.styles"

export interface IDividerProps extends ComponentProps<typeof SDivider> {}

export const Divider = ({ ...props }: IDividerProps) => {
  return <SDivider {...props}></SDivider>
}
