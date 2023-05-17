import { useState } from "react"
import { useDebouncedCallback } from "use-debounce"

import { useEventListener } from "@/shared/hooks"

/**
 * Useful whenever we need to leverage the browser window's dimensions.
 * This function will be defaulted to a debounce of 50ms, from the point when the resize event gets called.
 *
 * Note: This hook should be used with care, because it not only triggers a re-render, but also a browser paint whenever the resize event is called.
 */
export const useWindowDimensions = (ms = 50) => {
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 })

  const onResize = useDebouncedCallback(() => {
    setDimensions({
      height: window.innerHeight,
      width: window.innerWidth,
    })
  }, ms)

  useEventListener("resize", onResize, { immediate: true, passive: true })

  return dimensions
}
