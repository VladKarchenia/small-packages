import { useEffect, useRef } from "react"

import { useMedia } from "@/shared/hooks"
import { mediaQueries } from "@/stitches/theme"
import { ComponentProps } from "@/stitches/types"

import { Box, useStepperContext } from "@/shared/components"

import { useStepperItemContext } from "./StepperItem"
import { SStepperPanel, SStepperContent } from "./Stepper.styles"

export interface IStepperPanelProps extends ComponentProps<typeof SStepperPanel> {
  mainContent: React.ReactNode
  isStepLast: boolean
}

export const StepperPanel = ({ mainContent, isStepLast, ...props }: IStepperPanelProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const offsetHeight = containerRef.current ? containerRef.current.offsetHeight : 0
  const isSmallAndAbove = useMedia([mediaQueries.sm], [true], false)
  const { id, open } = useStepperItemContext("StepperPanel")
  const { setStepHeight } = useStepperContext("StepperPanel")

  const state = open ? "open" : "closed"

  useEffect(() => {
    if (open && offsetHeight) {
      setStepHeight(offsetHeight)
    }
  }, [open, setStepHeight, offsetHeight])

  return (
    <Box css={{ "@sm": { minHeight: 100 } }}>
      <SStepperPanel
        id={id}
        role="region"
        data-ui="stepper-panel"
        initial={state}
        animate={state}
        last={isStepLast}
        {...props}
        variants={{
          open: {
            height: "100%",
          },
          closed: {
            height: "0%",
          },
        }}
        transition={{ type: "spring", damping: 50, stiffness: 500 }}
      >
        <SStepperContent
          ref={containerRef}
          css={{
            "@max-sm": {
              paddingTop: open ? "$12" : "$16",
              paddingBottom: open ? "$48" : "$16",
            },
            "@sm": {
              opacity: open ? 1 : 0,
              top: open ? 0 : -9999,
            },
          }}
        >
          {isSmallAndAbove || open ? mainContent : null}
        </SStepperContent>
      </SStepperPanel>
    </Box>
  )
}
