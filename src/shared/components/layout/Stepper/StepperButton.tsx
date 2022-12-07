import React, { useCallback } from "react"
import { useFormContext } from "react-hook-form"
import { ComponentProps } from "@/utils"
import { IconPencil } from "@/shared/icons"
import { ShipmentState } from "@/shared/state"

import { Hidden } from "../Hidden"
import { useStepperContext } from "./Stepper"
import { useStepperItemContext } from "./StepperItem"
import { SStepperButton } from "./Stepper.styles"

export interface IStepperButtonProps extends ComponentProps<typeof SStepperButton> {
  /**
   * Disable the Stepper Button
   */
  disabled?: boolean
}

export const StepperButton = ({ children, ...props }: IStepperButtonProps) => {
  const { onItemOpen } = useStepperContext("StepperButton")
  const { id, value, open, disabled, completed } = useStepperItemContext("StepperButton")
  const {
    formState: { errors },
  } = useFormContext<ShipmentState>()
  const stepperHasError =
    !!errors?.date || !!errors?.parcels || !!errors?.rate || !!errors?.recipient || !!errors?.sender

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()

      // TODO: check this to prevent closing the Stepper panel (possibly with an additional prop)
      // if (open) {
      //   onItemClose(value)
      // } else {
      if (!stepperHasError) {
        onItemOpen(value)
      }
      // }
    },
    // [onItemClose, onItemOpen, open, value],
    [onItemOpen, value, stepperHasError],
  )

  return (
    <SStepperButton
      aria-controls={id}
      aria-expanded={open || false}
      disabled={disabled || false}
      type="button"
      data-ui="stepper-button"
      data-testid="stepper-button"
      {...props}
      onClick={handleClick}
    >
      {children}
      {completed ? (
        <Hidden above="sm">
          <IconPencil />
        </Hidden>
      ) : null}
    </SStepperButton>
  )
}
