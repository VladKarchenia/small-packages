import { createContext, ComponentProps } from "@/utils"
import { useId } from "@/shared/hooks"

import { useAccordionContext } from "./Accordion"
import { SAccordionItem } from "./AccordionItem.styles"

type AccordionItemContextValue = {
  id: string
  value: string
  open: boolean
  disabled: boolean
}

export const [AccordionItemProvider, useAccordionItemContext] =
  createContext<AccordionItemContextValue>("AccordionItem")

export interface IAccordionItemProps extends ComponentProps<typeof SAccordionItem> {
  /**
   * An identifier for the component to know which Accordion Item is open
   */
  value: string
  /**
   * Disable the Accordion Item
   */
  disabled?: boolean
}

export const AccordionItem = ({ value, ...props }: IAccordionItemProps) => {
  const { selected, disabled } = useAccordionContext("AccordionItem")

  const id = useId(8)

  const isOpen = selected.includes(value) || false
  const isDisabled = disabled || props.disabled || false

  return (
    <AccordionItemProvider id={id} value={value} open={isOpen} disabled={isDisabled}>
      <SAccordionItem
        data-plum-ui="accordion-item"
        data-state={isOpen ? "open" : "closed"}
        data-testid="accordion-item"
        {...props}
      />
    </AccordionItemProvider>
  )
}
