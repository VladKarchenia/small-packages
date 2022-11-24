import React, { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import { ComponentProps } from "@/utils"
import { Placement } from "@popperjs/core"
import { usePopper } from "react-popper"

import { CSS } from "@/config"

import {
  STooltipTrigger,
  STooltip,
  STooltipArrow,
  STooltipContent,
  STooltipWrapper,
} from "./Tooltip.styles"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FnArgs = any[]
type Fn = (...args: FnArgs) => void
type FnOrUndefined = Fn | undefined

const callAll =
  (...fns: FnOrUndefined[]) =>
  (...args: FnArgs) => {
    fns.forEach((fn) => fn && fn(...args))
  }

export type TooltipTrigger = "click" | "hover" | "focus" | "none"

export interface ITooltipProps extends ComponentProps<typeof STooltipTrigger> {
  children: React.ReactNode
  tooltip: React.ReactNode
  ariaLabel: string
  placement?: Placement
  trigger?: TooltipTrigger | TooltipTrigger[]
  delayHide?: number
  delayShow?: number
  visible?: boolean
  edgePadding?: 8 | 16 | 24 | 32
  portalContainer?: HTMLElement
  dataTrackId?: string
  contentWidth?: number
  withArrow?: boolean
  withTitle?: boolean
  contentCss?: CSS
  triggerCss?: CSS
  /**
   * Called when trigger includes click
   */
  onClick?: (event: React.MouseEvent) => void
  /**
   * Called when trigger includes click
   */
  onTouchEnd?: (event: React.TouchEvent) => void
  /**
   * Called when trigger includes hover
   */
  onMouseEnter?: (event: React.MouseEvent) => void
  /**
   * Called when trigger includes hover
   */
  onMouseLeave?: (event: React.MouseEvent) => void
  /**
   * Called when trigger includes focus
   */
  onFocus?: (event: React.FocusEvent) => void
  /**
   * Called when trigger includes focus
   */
  onBlur?: (event: React.FocusEvent) => void
}

export const Tooltip = ({
  children,
  tooltip,
  placement = "bottom",
  trigger = "click",
  delayHide = 0,
  delayShow = 0,
  visible = false,
  edgePadding = 16,
  portalContainer,
  dataTrackId,
  ariaLabel,
  contentWidth = 360,
  withArrow = true,
  withTitle = true,
  contentCss,
  triggerCss,
  onClick,
  onTouchEnd,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
}: ITooltipProps) => {
  const showTimeout = useRef<number | undefined>()
  const hideTimeout = useRef<number | undefined>()

  const triggerElement = useRef<HTMLButtonElement>(null)
  const popperElement = useRef<HTMLDivElement>(null)
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(visible || false)

  const { styles, attributes } = usePopper(triggerElement.current, popperElement.current, {
    placement,
    modifiers: [
      {
        name: "arrow",
        options: {
          element: arrowElement,
        },
      },
      {
        name: "preventOverflow",
        options: {
          padding: edgePadding,
        },
      },
    ],
  })

  const popperPlacement = React.useMemo(
    () => attributes?.popper?.["data-popper-placement"],
    [attributes],
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        !triggerElement !== null &&
        !popperElement !== null &&
        !triggerElement.current?.contains(event.target as HTMLElement) &&
        !popperElement.current?.contains(event.target as HTMLElement)
      ) {
        hideTooltip()
      }
    }

    document.addEventListener("click", handleClickOutside)
    document.addEventListener("touchend", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
      document.removeEventListener("touchend", handleClickOutside)
    }
  })

  const isTriggeredBy = (type: TooltipTrigger) =>
    trigger === type || (Array.isArray(trigger) && trigger.includes(type))

  const hideTooltip = () => {
    hideTimeout.current = window.setTimeout(() => {
      setIsVisible(false)
    }, delayHide)
  }

  const showTooltip = () => {
    showTimeout.current = window.setTimeout(() => {
      setIsVisible(true)
    }, delayShow)
  }

  const toggleTooltip = () => {
    setIsVisible((s) => !s)
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    toggleTooltip()
  }

  const clearScheduled = () => {
    clearTimeout(showTimeout.current)
    clearTimeout(hideTimeout.current)
  }

  const addTriggerEvents = () => ({
    ...(isTriggeredBy("click") && {
      onClick: callAll(handleClick, onClick),
      onTouchEnd: callAll(handleClick, onTouchEnd),
    }),
    ...(isTriggeredBy("hover") && {
      onMouseEnter: callAll(showTooltip, onMouseEnter),
      onMouseLeave: callAll(hideTooltip, onMouseLeave),
    }),
    ...(isTriggeredBy("focus") && {
      onFocus: callAll(showTooltip, onFocus),
      onBlur: callAll(hideTooltip, onBlur),
    }),
  })

  const addTooltipEvents = () => ({
    ...(isTriggeredBy("hover") && {
      onMouseEnter: callAll(clearScheduled, onMouseEnter),
      onMouseLeave: callAll(hideTooltip, onMouseLeave),
    }),
  })

  const popper = isVisible && (
    <STooltipWrapper
      data-ui="tooltip-wrapper"
      ref={popperElement}
      style={styles.popper}
      {...attributes.popper}
      {...addTooltipEvents()}
    >
      <STooltip data-ui="tooltip" data-placement={popperPlacement}>
        <STooltipArrow
          data-ui="tooltip-arrow"
          style={styles.arrow}
          ref={setArrowElement}
          data-placement={popperPlacement}
          withArrow={withArrow}
        />

        <STooltipContent data-ui="tooltip-content" css={{ maxWidth: contentWidth, ...contentCss }}>
          {tooltip}
        </STooltipContent>
      </STooltip>
    </STooltipWrapper>
  )

  return (
    <>
      <STooltipTrigger
        type="button"
        data-ui="tooltip-trigger"
        ref={triggerElement}
        data-track-id={dataTrackId}
        aria-label={ariaLabel}
        title={withTitle ? ariaLabel : undefined}
        css={{ ...triggerCss }}
        {...addTriggerEvents()}
      >
        {children}
      </STooltipTrigger>
      {portalContainer ? createPortal(popper, portalContainer) : popper}
    </>
  )
}
