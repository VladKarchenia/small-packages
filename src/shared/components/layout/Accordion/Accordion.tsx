import React, { useCallback, useEffect, useRef, useState } from "react"

import { createContext } from "@/utils"

import { ComponentProps } from "@/utils/types"

import { SAccordion } from "./Accordion.styles"

type AccordionTextToggle = {
  hideLabel: string
  showLabel: string
}

type AccordionContextValue = {
  selected: string[]

  disabled: boolean
  divider?: boolean

  textToggle?: AccordionTextToggle

  onItemOpen: (value: string) => void
  onItemClose: (value: string) => void
}

export const [AccordionProvider, useAccordionContext] =
  createContext<AccordionContextValue>("Accordion")

export interface IAccordionProps extends ComponentProps<typeof SAccordion> {
  /**
   * Array of Accordion Item value(s) to be open by default
   */
  defaultSelected?: string[]

  disabled?: boolean
  /**
   * To enable a divider between the Accordion Header and Accordion Panel
   */
  divider?: boolean
  /**
   * Enable multiple panels open
   */
  multiple?: boolean
  /**
   * Callback with an array of string values of the Accordion Items
   */
  onSelectedChange?: (selected: string[]) => void
  /**
   * Add show and hide text labels to be shown instead of chevron icon
   */
  textToggle?: AccordionTextToggle
}

export const Accordion = ({
  defaultSelected = [],
  disabled = false,
  divider = false,
  multiple,
  onSelectedChange,
  textToggle,
  ...props
}: IAccordionProps) => {
  const [selected, setSelected] = useState(defaultSelected)
  const selectedRef = useRef(selected)

  const handleItemOpen = useCallback(
    (itemValue: string) =>
      !multiple
        ? setSelected([itemValue])
        : setSelected((prevValue = []) => [...prevValue, itemValue]),
    [multiple, setSelected],
  )

  const handleItemClose = useCallback(
    (itemValue: string) =>
      !multiple
        ? setSelected([])
        : setSelected((prevValue = []) => prevValue.filter((value) => value !== itemValue)),
    [multiple, setSelected],
  )

  useEffect(() => {
    if (selected !== selectedRef.current) {
      selectedRef.current = selected

      onSelectedChange && onSelectedChange(selected)
    }
  }, [onSelectedChange, selected])

  return (
    <AccordionProvider
      selected={selected}
      disabled={disabled}
      divider={divider}
      textToggle={textToggle}
      onItemOpen={handleItemOpen}
      onItemClose={handleItemClose}
    >
      <SAccordion data-plum-ui="accordion" data-testid="accordion" {...props} />
    </AccordionProvider>
  )
}
