import React from "react"
import { ComponentProps } from "@/utils/types"
import { DialogContentProps } from "@radix-ui/react-dialog"
import { SModalPanel } from "./Panel.styles"

export type ModalPanelProps = DialogContentProps & ComponentProps<typeof SModalPanel>

export const ModalPanel = React.forwardRef<HTMLDivElement, ModalPanelProps>(
  (props, forwardedRef) => {
    return (
      <SModalPanel
        ref={forwardedRef}
        data-plum-modals="modal-panel"
        data-testid="modal-panel"
        {...props}
      />
    )
  },
)

ModalPanel.displayName = "ModalPanel"
