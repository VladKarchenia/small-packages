import React, { useCallback } from "react"
import { useFormContext } from "react-hook-form"

import { ComponentProps } from "@/stitches/types"
import { ShipmentState } from "@/shared/types"
import { StepName } from "@/shipment/types"

import { Hidden } from "@/shared/components"
import { IconPencil } from "@/shared/icons"

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
  const { onItemOpen, selected } = useStepperContext("StepperButton")
  const { id, value, open, disabled, completed } = useStepperItemContext("StepperButton")

  const {
    watch,
    formState: { errors },
  } = useFormContext<ShipmentState>()
  const { sender, senderReturn, recipient, packaging, parcels, hasReturnAddress } = watch()
  const currentParcelsQuantity = Object.values(parcels).reduce((sum, i) => (sum += i.quantity), 0)

  const checkButtonDisability = useCallback(() => {
    if (
      !!errors.sender ||
      !!errors.senderReturn ||
      !!errors.recipient ||
      !!errors?.parcels ||
      !!errors?.date ||
      !!errors?.rate
    ) {
      return true
    }

    if (currentParcelsQuantity !== packaging.totalPackagesNumber) {
      return true
    }

    if (selected[0] === StepName.FROM) {
      if (hasReturnAddress) {
        return (
          !sender.name ||
          !sender.phone ||
          !sender.email ||
          !sender.fullAddress.country ||
          !sender.fullAddress.zipCode ||
          !sender.fullAddress.state ||
          !sender.fullAddress.city ||
          !sender.fullAddress.address1 ||
          !sender.fullAddress.displayName ||
          !senderReturn.name ||
          !senderReturn.phone ||
          !senderReturn.email ||
          !senderReturn.fullAddress.country ||
          !senderReturn.fullAddress.zipCode ||
          !senderReturn.fullAddress.state ||
          !senderReturn.fullAddress.city ||
          !senderReturn.fullAddress.address1 ||
          !senderReturn.fullAddress.displayName
        )
      } else {
        return (
          !sender.name ||
          !sender.phone ||
          !sender.email ||
          !sender.fullAddress.country ||
          !sender.fullAddress.zipCode ||
          !sender.fullAddress.state ||
          !sender.fullAddress.city ||
          !sender.fullAddress.address1 ||
          !sender.fullAddress.displayName
        )
      }
    }

    if (selected[0] === StepName.TO) {
      return (
        !recipient.name ||
        !recipient.phone ||
        !recipient.email ||
        !recipient.fullAddress.country ||
        !recipient.fullAddress.zipCode ||
        !recipient.fullAddress.state ||
        !recipient.fullAddress.city ||
        !recipient.fullAddress.address1 ||
        !recipient.fullAddress.displayName
      )
    }

    return false
  }, [
    currentParcelsQuantity,
    sender,
    senderReturn,
    recipient,
    errors,
    hasReturnAddress,
    selected,
    packaging,
  ])

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault()

      // TODO: check this to prevent closing the Stepper panel (possibly with an additional prop)
      // if (open) {
      //   onItemClose(value)
      // } else {
      if (!checkButtonDisability()) {
        onItemOpen(value)
      }
      // }
    },
    // [onItemClose, onItemOpen, open, value],
    [onItemOpen, value, checkButtonDisability],
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
