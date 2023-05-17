import deepmerge from "deepmerge"
import cx from "classnames"

import { ComponentProps, ResponsiveProp, Colors } from "@/stitches/types"
import { atomicClassNames } from "@/stitches/utils"

import { SCopy } from "./Copy.styles"

// type CopyIntent = "cta" | "detail" | "copy"

export interface ICopyProps extends Omit<ComponentProps<typeof SCopy>, "color"> {
  color?: Colors | ResponsiveProp<Colors>
  uppercase?: boolean | ResponsiveProp<boolean>
  dataTestid?: string
}

// function getCopyProps(intent?: CopyIntent) {
//   switch (intent) {
//     case "cta":
//       return {
//         tracking: "wider",
//         scale: 10,
//         bold: true,
//         uppercase: true,
//       }
//     case "detail":
//       return {
//         tracking: "normal",
//         scale: 8,
//       }

//     case "copy":
//     default:
//       return {}
//   }
// }

/**
 * Use for paragraphs and spans of text with options including scale and tracking.
 */
export const Copy = ({
  as,
  className,
  color = "system-inherit",
  scale = 6,
  dataTestid,
  ...props
}: ICopyProps) => {
  return (
    <SCopy
      as={as}
      className={cx(
        atomicClassNames({
          color,
        }).toString(),
        className,
      )}
      data-testid={dataTestid}
      {...deepmerge(
        {
          ...props,
          scale,
        },
        {},
      )}
    />
  )
}
