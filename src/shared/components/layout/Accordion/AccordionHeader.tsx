import { ComponentProps } from "@/stitches/types"

import { Title, TypographyScale } from "@/shared/components"

import { SAccordionHeader } from "./AccordionHeader.styles"

export interface IAccordionHeaderProps extends ComponentProps<typeof SAccordionHeader> {
  scale?: TypographyScale
}

export const AccordionHeader = ({ children, scale = 6, ...props }: IAccordionHeaderProps) => {
  return (
    <SAccordionHeader data-ui="accordion-header" data-testid="accordion-header" {...props}>
      <Title as="h4" scale={scale}>
        {children}
      </Title>
    </SAccordionHeader>
  )
}
