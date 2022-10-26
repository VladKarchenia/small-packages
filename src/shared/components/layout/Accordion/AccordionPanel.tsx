import { CSS } from "@stitches/react"
import { ComponentProps } from "@/utils"
import { Box, Divider } from "@/shared/components"

import { useAccordionContext } from "./Accordion"
import { useAccordionItemContext } from "./AccordionItem"
import { SAccordionPanel, SAccordionContent } from "./AccordionPanel.styles"

export interface IAccordionPanelProps extends ComponentProps<typeof SAccordionPanel> {
  contentCss?: CSS
}

export const AccordionPanel = ({ children, contentCss, ...props }: IAccordionPanelProps) => {
  const { divider } = useAccordionContext("AccordionPanel")
  const { id, open } = useAccordionItemContext("AccordionPanel")

  const state = open ? "open" : "closed"

  return (
    <SAccordionPanel
      id={id}
      role="region"
      data-ui="accordion-panel"
      {...props}
      initial={state}
      animate={state}
      variants={{
        open: {
          height: "auto",
          y: 0,
          display: "block",
        },
        closed: {
          height: 0,
          y: -8,
          transitionEnd: { display: "none" },
        },
      }}
      transition={{ type: "spring", damping: 40, stiffness: 500 }}
    >
      {divider && (
        <Box css={{ paddingX: "$12" }}>
          <Divider />
        </Box>
      )}
      <SAccordionContent css={contentCss}>{children}</SAccordionContent>
    </SAccordionPanel>
  )
}
