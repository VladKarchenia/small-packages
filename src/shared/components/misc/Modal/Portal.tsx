import { DialogPortal, DialogPortalProps } from "@radix-ui/react-dialog"

export type ModalPortalProps = DialogPortalProps

export const ModalPortal = (props: ModalPortalProps) => <DialogPortal {...props} />

ModalPortal.displayName = "ModalPortal"
