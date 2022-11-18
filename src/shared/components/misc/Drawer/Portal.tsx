import * as DialogPrimitive from "@radix-ui/react-dialog"

export type DrawerPortalProps = DialogPrimitive.DialogPortalProps

export const DrawerPortal = (props: DrawerPortalProps) => {
  return <DialogPrimitive.Portal {...props} />
}
