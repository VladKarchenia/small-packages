import React, { useCallback } from "react"

import { ComponentProps } from "@/stitches/types"
import { easing } from "@/stitches/utils"

import { Copy } from "@/shared/components"
import { IconChevron } from "@/shared/icons"

import { useAccordionContext } from "./Accordion"
import { useAccordionItemContext } from "./AccordionItem"

import { SAccordionButton } from "./AccordionButton.styles"

export interface IAccordionButtonProps extends ComponentProps<typeof SAccordionButton> {
  /**
   * Disable the Accordion Button
   */
  disabled?: boolean
}

const AccordionIcon = ({ open = false }) => (
  <IconChevron
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
  const { textToggle, onItemOpen } = useAccordionContext("AccordionButton")
  const { id, value, open, disabled } = useAccordionItemContext("AccordionButton")

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault()

      // TODO: check this to prevent closing the accordion panel (possibly with an additional prop)
      // if (open) {
      //   onItemClose(value)
      // } else {
      onItemOpen(value)
      // }
    },
    // [onItemClose, onItemOpen, open, value],
    [onItemOpen, value],
  )

  return (
    <SAccordionButton
      aria-controls={id}
      aria-expanded={open || false}
      disabled={disabled || false}
      type="button"
      data-ui="accordion-button"
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
