import React from "react"
import { DialogClose } from "@radix-ui/react-dialog"
import { IconCross } from "@/shared/icons"
import { SDrawerHeader, SDrawerCloseButton } from "./Header.styles"

export type DrawerHeaderProps = {
  children?: React.ReactNode
  closeIcon?: React.ReactNode

  hasSeparator?: boolean
}

export const DrawerHeader = ({ children, closeIcon, hasSeparator }: DrawerHeaderProps) => {
  return (
    <SDrawerHeader hasSeparator={hasSeparator}>
      <DialogClose asChild>
        <SDrawerCloseButton type="button">{closeIcon || <IconCross block />}</SDrawerCloseButton>
      </DialogClose>
      {children}
    </SDrawerHeader>
  )
}