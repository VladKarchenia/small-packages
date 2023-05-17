import { useState, useEffect } from "react"

import { useDisableScroll } from "@/shared/hooks"

export const useWaitForTransition = (node: Element | null, isVisible: boolean) => {
  const [hasAnimated, setAnimated] = useState(false)

  const [, setScrollable] = useDisableScroll()

  useEffect(() => {
    const toggleVisibility = () => {
      setAnimated(isVisible)
    }

    const waitForTransition = (event: Event) => {
      if (node && event.target === node) {
        setScrollable(true)
        toggleVisibility()
        node.removeEventListener("transitionend", waitForTransition)
      }
    }

    if (node) {
      if (isVisible) {
        setScrollable(false)
        toggleVisibility()
      } else {
        node.addEventListener("transitionend", waitForTransition)
      }
    }

    return () => {
      if (node) {
        node.removeEventListener("transitionend", waitForTransition)
      }
    }
  }, [node, isVisible, setScrollable])

  return !hasAnimated && !isVisible
}
