import cx from "classnames"

import { ComponentProps, ResponsiveProp, Colors } from "@/stitches/types"
import { atomicClassNames } from "@/stitches/utils"

import { STitle } from "./Title.styles"

export interface ITitleProps extends Omit<ComponentProps<typeof STitle>, "color"> {
  color?: Colors | ResponsiveProp<Colors>
  dataTestid?: string
}

export const Title = ({ as, className, color, scale = 5, dataTestid, ...props }: ITitleProps) => {
  return (
    <STitle
      as={as}
      className={cx(
        atomicClassNames({
          color,
        }).toString(),
        className,
      )}
      scale={scale}
      data-testid={dataTestid}
      {...props}
    />
  )
}
