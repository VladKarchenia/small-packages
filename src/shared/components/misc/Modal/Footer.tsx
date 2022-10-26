import React from "react"
import { ComponentProps } from "@/utils"

import { SModalFooter } from "./Footer.styles"

export type ModalFooterProps = ComponentProps<typeof SModalFooter>

export const ModalFooter: React.FC<ModalFooterProps> = (props) => {
  return <SModalFooter data-modals="modal-footer" {...props} />
}
