import { useCallback, useEffect, useMemo, useState } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

import { useEventListener } from "@/shared/hooks"

export type DialogProps = DialogPrimitive.DialogProps & DialogPrimitive.DialogPortalProps

type StorageKey = "drawers" | "modals" | string

declare global {
  interface Window {
    plumDialogs: Record<StorageKey, Set<string>>
  }
}

function checkIfStorageIsInitialized(storageKey: StorageKey, cb: () => void) {
  if (
    typeof window.plumDialogs === "undefined" ||
    typeof window.plumDialogs[storageKey] === "undefined"
  ) {
    window.plumDialogs = {
      ...(window.plumDialogs || {}),
      [storageKey]: new Set(),
    }
  }

  return cb()
}

export function useDialog(name: string, storageKey: StorageKey, defaultOpen?: boolean) {
  const [container, setContainer] = useState<HTMLDivElement | null>()
  const [isOpen, setOpen] = useState(defaultOpen)

  const close = useCallback(() => {
    setOpen(false)

    window.dispatchEvent(new CustomEvent("dialog:close"))
    window.dispatchEvent(new CustomEvent(`dialog.${storageKey}.close`))

    checkIfStorageIsInitialized(storageKey, () => {
      window.plumDialogs[storageKey].delete(name)
    })
  }, [name, storageKey])

  const open = useCallback(() => {
    setOpen(true)

    window.dispatchEvent(new CustomEvent("dialog:open"))
    window.dispatchEvent(new CustomEvent(`dialog.${storageKey}.open`))

    checkIfStorageIsInitialized(storageKey, () => {
      window.plumDialogs[storageKey].add(name)
    })
  }, [name, storageKey])

  const toggle = useCallback(() => {
    checkIfStorageIsInitialized(storageKey, () => {
      window.plumDialogs[storageKey].has(name) ? close() : open()
    })
  }, [name, storageKey])

  const onOpenChange = useCallback(
    (value?: boolean) => {
      if (typeof value === "undefined") toggle()
      else if (value) open()
      else close()
    },
    [close, open, toggle],
  )

  const dialogProps = useMemo<DialogProps>(
    () => ({
      container,

      open: isOpen,
      onOpenChange: onOpenChange,
    }),
    [isOpen, container],
  )

  useEventListener(`${name}.close`, close)
  useEventListener(`${name}.open`, open)
  useEventListener(`${name}.toggle`, toggle)

  useEffect(() => {
    if (defaultOpen) {
      checkIfStorageIsInitialized(storageKey, () => {
        window.plumDialogs[storageKey].add(name)
      })
    }
  }, [defaultOpen, storageKey, name])

  return [dialogProps, { container, setContainer }] as const
}

export function useDialogActions(storageKey: StorageKey) {
  const actions = useMemo(
    () => ({
      close: (name: string) => window.dispatchEvent(new CustomEvent(`${name}.close`)),
      open: (name: string) => window.dispatchEvent(new CustomEvent(`${name}.open`)),
      toggle: (name: string) => window.dispatchEvent(new CustomEvent(`${name}.toggle`)),

      closeAll: () => {
        if (
          typeof window.plumDialogs === "undefined" ||
          typeof window.plumDialogs[storageKey] === "undefined"
        )
          return

        const items = window.plumDialogs[storageKey]

        Array.from(items).forEach((name) => {
          window.dispatchEvent(new CustomEvent(`${name}.close`))
        })
      },
    }),
    [storageKey],
  )

  return actions
}

export function useDialogManager(storageKeys: StorageKey[]) {
  // Clear `pointer-events: none` from <body> only when no dialogs (drawers/modals) are opened
  const clearPointerEvents = useCallback(() => {
    const shouldClear = storageKeys.some((storageKey) =>
      checkIfStorageIsInitialized(storageKey, () => !window.plumDialogs[storageKey].size),
    )

    if (shouldClear) {
      document.body.style.pointerEvents = ""
    }
  }, [storageKeys])

  useEventListener("dialog:close", clearPointerEvents)
}
