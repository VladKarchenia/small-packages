import { useMemo, useState } from "react"
import debounce from "just-debounce-it"

import { useDialog, useDialogActions, useEventListener } from "@/shared/hooks"

import type { DrawerProps } from "./Drawer"

export function useDrawer(name: string, defaultOpen?: boolean) {
  const [dialogProps, { container, setContainer }] = useDialog(name, "drawers", defaultOpen)

  const [offset, setOffset] = useState<number>(0)
  const [scrollable, setScrollable] = useState<boolean>(true)

  const drawerProps = useMemo<Omit<DrawerProps, "trigger" | "children">>(
    () => ({
      ...dialogProps,

      offset,
      scrollable,
    }),
    [dialogProps, offset, scrollable],
  )

  const handleScroll = debounce(() => {
    if (!container) return

    setOffset(container?.scrollTop)
  }, 100)

  useEventListener("scroll", handleScroll, {
    element: container,
    passive: true,
  })

  return [drawerProps, { container, setContainer, setScrollable }] as const
}

export function useDrawerActions() {
  return useDialogActions("drawers")
}
