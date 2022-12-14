import { CSS } from "@stitches/react"
import { ComponentProps } from "@/utils"
import { useStepperItemContext } from "./StepperItem"
import { SStepperPanel, SStepperContent } from "./Stepper.styles"
import { Box } from "../../core"

export interface IStepperPanelProps extends ComponentProps<typeof SStepperPanel> {
  mainContent: React.ReactNode
  shortContent: React.ReactNode
  contentCss?: CSS
  isStepLast: boolean
}

export const StepperPanel = ({
  mainContent,
  shortContent,
  contentCss,
  isStepLast,
  ...props
}: IStepperPanelProps) => {
  const { id, open, completed, disabled } = useStepperItemContext("StepperPanel")

  const state = open ? "open" : "closed"

  return (
    <Box>
      <SStepperPanel
        id={id}
        role="region"
        data-ui="stepper-panel"
        {...props}
        initial={state}
        animate={state}
        css={{ before: { opacity: disabled ? 0.3 : 1 } }}
        // TODO: need to fix this animation
        variants={{
          open: {
            height: "auto",
            // y: 0,
            // display: "block",
          },
          closed: {
            height: "auto",
            // height: 0,
            // y: 0,
            // transitionEnd: { display: "none" },
          },
        }}
        transition={{ type: "spring", damping: 50, stiffness: 500 }}
      >
        {open ? (
          <SStepperContent css={{ ...contentCss, paddingBottom: isStepLast ? "$0" : "$48" }}>
            {mainContent}
          </SStepperContent>
        ) : null}
        {!open && (completed || (isStepLast && !disabled)) ? (
          <SStepperContent css={{ padding: "$12 $12 $12 $48" }}>{shortContent}</SStepperContent>
        ) : null}
        {/* TODO: need to add also condition if rate was choosen */}
        {!open && !completed && !isStepLast ? (
          <SStepperContent css={{ paddingY: "$20" }}></SStepperContent>
        ) : null}
      </SStepperPanel>
    </Box>
  )
}
