import { DialogClose } from "@radix-ui/react-dialog"
import { ComponentProps } from "@/utils/types"
import { Copy } from "@/shared/components"
import { IconCross } from "@/shared/icons"
import { SModalCloseButton } from "./CloseButton.styles"

export type ModalCloseButtonProps = ComponentProps<typeof SModalCloseButton>

export const ModalCloseButton = (props: ModalCloseButtonProps) => {
  return (
    <DialogClose asChild>
      <SModalCloseButton
        {...props}
        type="button"
        aria-label="Close"
        title="Close"
        data-plum-modals="modal-close-button"
        data-testid="modal-close-button"
      >
        {props?.variant === "text" ? (
          <Copy color="system-inherit" scale={8}>
            Close
          </Copy>
        ) : (
          <IconCross block />
        )}
      </SModalCloseButton>
    </DialogClose>
  )
}
