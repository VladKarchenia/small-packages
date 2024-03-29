import { ResponsiveProp, Spaces } from "@/stitches/types"

import { applySpacerClassName } from "./Spacer.styles"

type BooleanProp = boolean | ResponsiveProp<boolean>

export interface ISpacerProps {
  horizontal?: BooleanProp
  inline?: BooleanProp

  size: Spaces | ResponsiveProp<Spaces>
}

export const Spacer = ({ size, horizontal = false, inline = false }: ISpacerProps) => {
  return <span className={applySpacerClassName(size, horizontal, { inline })} />
}

Spacer.displayName = "Spacer"
