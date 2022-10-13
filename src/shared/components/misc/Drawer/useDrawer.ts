import { useEffect, useState } from "react"

import { IDrawerProps } from "./Drawer"

type UseDrawerConfig = Omit<IDrawerProps, "isVisible" | "portalElement" | "onClose"> & {
  isVisible?: boolean
  portalElement?: IDrawerProps["portalElement"]
}

type UseDrawerReturn = {
  drawerProps: IDrawerProps

  openDrawer: () => void
  closeDrawer: () => void
  toggleDrawer: () => void
}

export const useDrawer = (
  config?: UseDrawerConfig,
  onToggleCb?: (v: boolean) => void,
): UseDrawerReturn => {
  const [isVisible, setVisible] = useState(config?.isVisible || false)
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(
    config?.portalElement || null,
  )

  const toggleDrawer = () => {
    setVisible((v) => {
      onToggleCb?.(!v)
      return !v
    })
  }

  const openDrawer = () => {
    onToggleCb?.(true)
    setVisible(true)
  }

  const closeDrawer = () => {
    onToggleCb?.(false)
    setVisible(false)
  }

  const onClose = () => {
    closeDrawer()
  }

  useEffect(() => {
    if (!portalElement) setPortalElement(document.body)
  }, [portalElement])

  return {
    drawerProps: {
      ...config,

      portalElement,
      isVisible,
      onClose,
    },

    openDrawer,
    closeDrawer,
    toggleDrawer,
  }
}
