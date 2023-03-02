import React from "react"

import { Breakpoint } from "@/stitches/theme"
import { ComponentProps } from "@/stitches/types"
import { atomicClassNames } from "@/stitches/utils"

import { SHidden } from "./Hidden.styles"

export interface IHiddenProps extends ComponentProps<typeof SHidden> {
  above?: Breakpoint
  below?: Breakpoint
}

export const Hidden = React.forwardRef<HTMLDivElement, IHiddenProps>(
  ({ above, below, ...props }, ref) => {
    return (
      <SHidden
        ref={ref}
        className={atomicClassNames({
          display: {
            ...(above && { [`@${above}`]: "none" }),
            ...(below && { [`@max-${below}`]: "none" }),
          },
        })}
        {...props}
      />
    )
  },
)

Hidden.displayName = "Hidden"
