import React, { useCallback } from "react"

import { ComponentProps } from "@/utils/types"

import { IconChevron } from "@/shared/icons"

import { useAccordionContext } from "./Accordion"
import { useAccordionItemContext } from "./AccordionItem"

import { SAccordionButton } from "./AccordionButton.styles"
import { easing } from "@/utils"
import { Copy } from "@/shared/components"

export interface IAccordionButtonProps extends ComponentProps<typeof SAccordionButton> {
  /**
   * Disable the Accordion Button
   */
  disabled?: boolean
}

const AccordionIcon = ({ open = false }) => (
  <IconChevron
    size="xs"
    direction={open ? "top" : "bottom"}
    css={{
      transition: easing.smooth({ duration: 150, property: "transform" }),
    }}
  />
)

interface IAccordionTextToggleProps {
  open: boolean
  hideLabel: string
  showLabel: string
}

const AccordionTextToggle = ({ open = false, hideLabel, showLabel }: IAccordionTextToggleProps) => (
  <Copy as="span" scale={8} color="brand-yellow-darker" css={{ textDecoration: "underline" }}>
    <span>&#32;</span>
    {open ? hideLabel : showLabel}
  </Copy>
)

export const AccordionButton = ({ children, ...props }: IAccordionButtonProps) => {
  const { textToggle, onItemOpen, onItemClose } = useAccordionContext("AccordionButton")
  const { id, value, open, disabled } = useAccordionItemContext("AccordionButton")

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()

      if (open) {
        onItemClose(value)
      } else {
        onItemOpen(value)
      }
    },
    [onItemClose, onItemOpen, open, value],
  )

  return (
    <SAccordionButton
      aria-controls={id}
      aria-expanded={open || false}
      disabled={disabled || false}
      type="button"
      data-plum-ui="accordion-button"
      data-testid="accordion-button"
      {...props}
      onClick={handleClick}
    >
      {children}
      {textToggle ? (
        <AccordionTextToggle
          open={open}
          hideLabel={textToggle.hideLabel}
          showLabel={textToggle.showLabel}
        />
      ) : (
        <AccordionIcon open={open} />
      )}
    </SAccordionButton>
  )
}
