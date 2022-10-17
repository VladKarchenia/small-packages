import React from "react"
import { ComponentProps } from "@/utils"

import { SModalContent } from "./Content.styles"

export type ModalContentProps = ComponentProps<typeof SModalContent>

export const ModalContent: React.FC<ModalContentProps> = (props) => {
  return <SModalContent data-plum-modals="modal-content" data-testid="modal-content" {...props} />
}

ModalContent.displayName = "ModalContent"
