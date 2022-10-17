import React, { useRef } from "react"
import ReactDOM from "react-dom"
import FocusLock from "react-focus-lock"
import { ComponentProps } from "@/utils"
import { useWaitForTransition } from "@/shared/hooks"
import { IconCross } from "@/shared/icons"

import { Overlay } from "../Overlay"

import {
  SDrawer,
  SDrawerPanel,
  SDrawerPanelFocusGuard,
  SDrawerContent,
  SDrawerTopBar,
  SDrawerCloseButton,
} from "./Drawer.styles"

export interface IDrawerProps extends ComponentProps<typeof SDrawerPanel> {
  isVisible: boolean

  direction?: "left" | "right"

  isLocked?: boolean

  portalElement: HTMLElement | null

  topBarContent?: React.ReactNode

  onClose: () => void
}

export const Drawer = ({
  children,
  isVisible = false,
  isLocked = true,
  portalElement = null,
  topBarContent,
  onClose,
  ...props
}: IDrawerProps) => {
  const drawerContent = useRef<HTMLDivElement>(null)

  const isHidden = useWaitForTransition(drawerContent.current, isVisible)

  if (!portalElement) {
    return null
  }

  return ReactDOM.createPortal(
    <SDrawer
      data-testid="drawer"
      data-plum-fixed
      style={{ visibility: isHidden ? "hidden" : "visible" }}
      aria-hidden={isVisible ? "false" : "true"}
    >
      <Overlay isVisible={isVisible} onClick={onClose} />
      <SDrawerPanel
        ref={drawerContent}
        role="dialog"
        aria-modal="true"
        data-testid="drawer-panel"
        {...props}
        data-state-direction={props.direction}
        data-state-variant={props.variant}
        data-state-large={String(!!props.isLarge)}
        data-state-locked={String(!!isLocked)}
        data-state-visible={String(!!isVisible)}
      >
        <FocusLock
          as={SDrawerPanelFocusGuard}
          lockProps={{
            direction: "column",
          }}
          disabled={!isVisible || !isLocked}
          returnFocus
        >
          <SDrawerTopBar>
            <SDrawerCloseButton type="button" onClick={onClose}>
              <IconCross />
            </SDrawerCloseButton>
            {topBarContent}
          </SDrawerTopBar>
          <SDrawerContent direction="column">{children}</SDrawerContent>
        </FocusLock>
      </SDrawerPanel>
    </SDrawer>,
    portalElement,
  )
}
