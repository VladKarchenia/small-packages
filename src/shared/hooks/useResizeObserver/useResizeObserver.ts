import { useEffect, useRef } from "react"
import ResizeObserverPolyfill from "resize-observer-polyfill"

import { useLatest } from "@/shared/hooks"

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
 */
export function useResizeObserver<T extends HTMLElement>(
  target: React.RefObject<T> | T | null,
  callback: ResizeObserverCallback,
) {
  const observer = useRef<ResizeObserver>()
  const storedCallback = useLatest(callback)

  useEffect(() => {
    const targetEl = target && "current" in target ? target.current : target

    if (!targetEl) return

    const handleObserve: ResizeObserverCallback = (entries, obs) => {
      storedCallback.current(entries, obs)
    }

    observer.current = new ResizeObserverPolyfill(handleObserve)
    if (observer.current) {
      observer.current.observe(targetEl as HTMLElement)
    }

    return () => {
      if (observer.current) {
        observer.current.unobserve(targetEl as HTMLElement)
      }
    }
  }, [target, storedCallback])
}
