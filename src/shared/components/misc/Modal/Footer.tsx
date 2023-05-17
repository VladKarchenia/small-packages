import React from "react"

import { ComponentProps } from "@/stitches/types"

import { SModalFooter } from "./Footer.styles"

type ModalFooterProps = ComponentProps<typeof SModalFooter>

export const ModalFooter: React.FC<ModalFooterProps> = (props) => {
  return <SModalFooter data-modals="modal-footer" {...props} />
}
