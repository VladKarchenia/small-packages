import { ComponentProps } from "@/utils/types"

import { Title, TypographyScale } from "@/shared/components"

import { SAccordionHeader } from "./AccordionHeader.styles"

export interface IAccordionHeaderProps extends ComponentProps<typeof SAccordionHeader> {
  scale?: TypographyScale
  thin?: boolean
}

export const AccordionHeader = ({
  children,
  scale = 6,
  thin = false,
  ...props
}: IAccordionHeaderProps) => {
  return (
    <SAccordionHeader data-plum-ui="accordion-header" data-testid="accordion-header" {...props}>
      <Title as="h4" scale={scale} thin={thin}>
        {children}
      </Title>
    </SAccordionHeader>
  )
}
