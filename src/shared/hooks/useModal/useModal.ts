import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useDialog, useDialogActions, useDialogManager } from "@/shared/hooks"

export function useModal(name: string, defaultOpen?: boolean) {
  const [modalProps, { container, setContainer }] = useDialog(name, "modals", defaultOpen)

  return [modalProps, { container, setContainer }] as const
}

export function useModalActions() {
  return useDialogActions("modals")
}

export const useModalsClose = () => {
  const location = useLocation()
  const { closeAll } = useModalActions()

  useEffect(() => {
    // TODO: need to check if it's fine
    closeAll()
    // events.on("routeChangeStart", closeAll);

    // return () => {
    //   events.off("routeChangeStart", closeAll);
    // };
  }, [closeAll, location])

  useDialogManager(["drawers", "modals"])

  return {
    closeAll,
  }
}
