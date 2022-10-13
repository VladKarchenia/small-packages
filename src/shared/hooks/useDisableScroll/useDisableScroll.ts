import React, { useState, useEffect, useRef } from "react"

export const useDisableScroll = (
  initialValue = true,
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [isScrollable, setScrollable] = useState(initialValue)

  const elements = useRef<NodeListOf<HTMLElement>>()

  useEffect(() => {
    elements.current = document.querySelectorAll("[data-plum-fixed]")
  }, [])

  useEffect(() => {
    const addStyles = () => {
      const scrollbarWidth = window.innerWidth - document.body.clientWidth

      const bodyStyles = window.getComputedStyle(document.body)

      const bodyNewPadding =
        scrollbarWidth + parseInt(bodyStyles.getPropertyValue("padding-right"), 10)

      document.body.style.overflow = "hidden"
      document.body.style.paddingRight = `${bodyNewPadding}px`

      if (elements.current) {
        for (let i = 0; i < elements.current.length; ++i) {
          elements.current[i].style.right = `${scrollbarWidth}px`
        }
      }
    }

    const clearStyles = () => {
      document.body.style.overflow = ""
      document.body.style.paddingRight = ""

      if (elements.current) {
        for (let i = 0; i < elements.current.length; ++i) {
          elements.current[i].style.right = ""
        }
      }
    }

    if (!isScrollable) {
      addStyles()
    } else {
      clearStyles()
    }

    return () => {
      clearStyles()
    }
  }, [isScrollable])

  return [isScrollable, setScrollable]
}
