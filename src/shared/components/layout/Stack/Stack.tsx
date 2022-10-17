import React from "react"
import { Spaces } from "@/config/theme/spacing"
import { CSS } from "@/config"
import { atomicClassNames, mergeCSSObjects, ResponsiveProp } from "@/utils"
import { Box, Hidden, IHiddenProps, Spacer, Divider } from "@/shared/components"

import { applyStackStyles, applyStackItemClassName } from "./Stack.styles"

export interface IStackProps {
  as?: keyof JSX.IntrinsicElements
  css?: CSS

  /**
   * The spacing between child items. Can be passed a single value or a responsive object
   */
  space: Spaces | ResponsiveProp<Spaces>

  /**
   * Show a divider between each child item
   */
  dividers?: boolean
  /**
   * Show divider(s) above and/or below the child items.
   */
  outerDividers?: boolean | "top" | "bottom"
}

export const Stack: React.FC<React.PropsWithChildren<IStackProps>> = ({
  as = "div",
  children,
  css = {},
  space,
  dividers = false,
  outerDividers,
}) => {
  const isList = as === "ul" || as === "ol"

  const ChildrenTag = isList ? "li" : "div"

  return (
    <>
      {(outerDividers === true || outerDividers === "top") && (
        <>
          <Divider />
          <Spacer size={space} />
        </>
      )}

      <Box as={as} css={mergeCSSObjects(css, applyStackStyles(space))}>
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) {
            return
          }

          const className = [applyStackItemClassName(space)]

          const isHidden =
            child && typeof child === "object" && "type" in child && child.type === Hidden
          const hiddenProps = isHidden ? (child.props as IHiddenProps) : null

          if (isHidden && hiddenProps) {
            className.push(
              atomicClassNames({
                display: {
                  ...(hiddenProps.above && {
                    [`@${hiddenProps.above}`]: "none",
                  }),
                  ...(hiddenProps.below && {
                    [`@max-${hiddenProps.below}`]: "none",
                  }),
                },
              }),
            )
          }

          return (
            <ChildrenTag key={index} className={className.join(" ")}>
              {dividers && index > 0 ? (
                <>
                  <Divider />
                  <Spacer size={space} />
                </>
              ) : null}
              {hiddenProps ? hiddenProps.children : child}
            </ChildrenTag>
          )
        })}
      </Box>

      {(outerDividers === true || outerDividers === "bottom") && (
        <>
          <Spacer size={space} />
          <Divider />
        </>
      )}
    </>
  )
}
